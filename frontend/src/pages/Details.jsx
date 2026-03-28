import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Details.css';

/**
 * Composant de la page de détails d'un artisan.
 * @component
 * @description Récupère les données d'un artisan via l'API, affiche son profil complet 
 * et propose un formulaire de contact dynamique.
 * @returns {JSX.Element} La vue détaillée de l'artisan avec le formulaire de contact.
 */
function Details() {
  /** @constant {string} id - Récupère l'identifiant de l'artisan depuis l'URL */
  const { id } = useParams();

  /** @state {Object|null} artisan - Stocke les données de l'artisan récupérées depuis le serveur */
  const [artisan, setArtisan] = useState(null);
  
  /** @state {Object} formData - État local pour gérer les champs du formulaire de contact */
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    objet: '',
    message: ''
  });

  /** @state {boolean} isSent - Gère l'affichage du message de confirmation après l'envoi */
  const [isSent, setIsSent] = useState(false);

  /**
   * Effet pour charger les données de l'artisan au montage du composant ou quand l'ID change.
   */
  useEffect(() => {
    fetch(`https://artisan-v2-production-3f9e.up.railway.app/api/artisans/${id}`)
      .then(res => res.json())
      .then(data => setArtisan(data))
      .catch(err => console.error("Erreur detail:", err));
  }, [id]);

  /**
   * Gère l'envoi du formulaire de contact.
   * @param {React.FormEvent} e - L'événement de soumission du formulaire.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setIsSent(true);
        // Reset du formulaire après succès
        setFormData({ nom: '', email: '', objet: '', message: '' });
        // Disparition du message de succès après 5 secondes
        setTimeout(() => setIsSent(false), 5000);
      }
    })
    .catch(err => console.error("Erreur envoi:", err));
  };

  // Affichage d'un état de chargement si les données ne sont pas encore arrivées
  if (!artisan) return <div className="container py-5 text-center"><h3>Chargement...</h3></div>;

  /** @type {string} imagePath - Définition de l'image de catégorie par défaut */
  let imagePath = "/img/default.png"; 
  if (artisan.Catégorie === "Alimentation") imagePath = "/img/boulanger.png";
  else if (artisan.Catégorie === "Bâtiment") imagePath = "/img/electricien.png";
  else if (artisan.Catégorie === "Services") imagePath = "/img/coiffeur.png";
  else if (artisan.Catégorie === "Fabrication") imagePath = "/img/menuisier.png";

  return (
    <div className="details-page-wrapper container py-5">
      <div className="details-container row g-4">
        
        {/* --- COLONNE GAUCHE : Informations de l'artisan --- */}
        <div className="details-left col-md-7">
          <div className="artisan-card-header d-flex align-items-center mb-4">
            <img src={imagePath} alt="Icone" className="artisan-icon rounded-circle me-3 shadow-sm" style={{width: '80px', height: '80px', objectFit: 'cover'}} />
            <div className="header-text">
              <h2 className="artisan-name fw-bold">{artisan.Nom}</h2>
              <div className="stars text-warning fs-4">{"★".repeat(artisan.Note || 5)}</div>
              <p className="mb-1"><strong>{artisan.Spécialité}</strong></p>
              <p className="text-muted">{artisan.Lieu}</p>
            </div>
          </div>

          <div className="presentation-section p-3 bg-light rounded shadow-sm">
            <h3 className="h4 border-bottom pb-2 mb-3">Présentation</h3>
            <div className="description-text">
              {/* Gestion de l'affichage des paragraphes pour respecter les sauts de ligne du texte original */}
              {(artisan["A propos"] || artisan.A_propos) ? 
                (artisan["A propos"] || artisan.A_propos).split('\n').map((p, i) => <p key={i} className="mb-2">{p}</p>) 
                : <p>Aucune description disponible.</p>}
            </div>
          </div>
        </div>

        {/* --- COLONNE DROITE : Formulaire de contact --- */}
        <div className="details-right col-md-5">
          <div className="contact-form-container card p-4 shadow-sm border-0">
            <h3 className="h4 fw-bold mb-4">Contacter cet artisan</h3>
            
            {/* Feedback visuel après envoi */}
            {isSent && <div className="success-msg alert alert-success py-2">✅ Message envoyé avec succès !</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input 
                  type="text" className="form-control" placeholder="Votre Nom" required 
                  value={formData.nom} 
                  onChange={(e) => setFormData({...formData, nom: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <input 
                  type="email" className="form-control" placeholder="Votre Email" required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <input 
                  type="text" className="form-control" placeholder="Objet du message" required 
                  value={formData.objet}
                  onChange={(e) => setFormData({...formData, objet: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <textarea 
                  className="form-control" placeholder="Votre Message" rows="5" required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn-send btn btn-primary w-100 fw-bold">Envoyer</button>
            </form>
            <p className="form-footer text-center text-muted small mt-3">Une réponse sera apportée sous 48h.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Details;