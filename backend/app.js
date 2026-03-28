const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

/**
 * CONFIGURATION DU SERVEUR
 * On utilise CORS pour permettre au Frontend (React) de discuter avec le Backend.
 */
app.use(cors());

/**
 * CONNEXION À LA BASE DE DONNÉES
 */
const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db.promise();

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err.message);
        return;
    }
    console.log('Connecté à la base de données MySQL !');
});

// Middlewares standards
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * @route GET /api/artisans
 * @description Récupère la liste de tous les artisans.
 */
app.get('/api/artisans', (req, res) => {
    db.query('SELECT * FROM data', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

/**
 * @route GET /api/artisans/:id
 * @description Récupère un artisan précis par son ID.
 */
app.get('/api/artisans/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM data WHERE ID = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ message: "Artisan non trouvé" });
        }
    });
});

/**
 * @route POST /api/contact
 * @description Enregistre le message du formulaire dans la table "formulaire".
 */
app.post('/api/contact', (req, res) => {
    const { nom, email, message } = req.body;
    const query = "INSERT INTO formulaire (nom, email, message) VALUES (?, ?, ?)";
    
    db.query(query, [nom, email, message], (err, result) => {
        if (err) {
            console.error("Erreur SQL :", err);
            return res.status(500).json({ error: "Erreur lors de l'enregistrement" });
        }
        res.json({ success: true, message: "Données insérées avec succès !" });
    });
});

/**
 * @route ALL *
 * @description Gestion des routes inconnues (404 API).
 */
app.use((req, res) => {
    res.status(404).json({ error: "Route non trouvée sur le serveur API" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Serveur en ligne sur le port ${PORT}`);
});

module.exports = app;