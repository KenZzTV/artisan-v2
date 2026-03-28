import { Link } from 'react-router-dom';
import '../styles/Footer.css';

/**
 * Composant de pied de page (Footer).
 * * @component
 * @description Affiche les informations de contact de l'antenne de Lyon 
 * ainsi que les liens légaux obligatoires (Mentions, Données, etc.).
 * @returns {JSX.Element} Le rendu HTML du footer.
 */
function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        
        {/* Section de l'adresse physique et contact téléphonique */}
        <div className="footer-address">
          <p>L'adresse et les contacts de l'antenne à Lyon :</p>
          <p>101 cours Charlemagne</p>
          <p>CS 2033</p>
          <p>69269 LYON CEDEX 02</p>
          <p>FRANCE</p>
          {/* Note pour les collègues : Le numéro est au format international */}
          <p>+33 (0)4 26 73 40 00</p>
        </div>

        {/* Barre de navigation secondaire pour les pages légales.
            Note : Utilise 'Link' de react-router-dom pour éviter le rechargement de la page.
        */}
        <div className="footer-links">
          <Link to="/mentions">Mentions légales</Link>
          <span>|</span>
          <Link to="/donnees">Données Personnelles</Link>
          <span>|</span>
          <Link to="/accessibilite">Accessibilité</Link>
          <span>|</span>
          <Link to="/cookies">Cookies</Link>
        </div>

      </div>
    </footer>
  );
}

export default Footer;