import { Link } from 'react-router-dom';
import '../styles/ArtisanCard.css';

/**
 * Composant représentant une carte individuelle pour un artisan.
 * * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.artisan - L'objet contenant les données de l'artisan.
 * @param {number|string} props.artisan.id - Identifiant unique de l'artisan.
 * @param {string} props.artisan.Nom - Nom de l'artisan ou de l'entreprise.
 * @param {string} props.artisan.Catégorie - Secteur d'activité (Bâtiment, Services, etc.).
 * @param {number} [props.artisan.Note=5] - Note sur 5 de l'artisan.
 * @param {string} props.artisan.Lieu - Ville ou département.
 * @returns {JSX.Element} La carte d'artisan cliquable.
 */
function ArtisanCard({ artisan }) {
  
  /** * @type {string} 
   * Chemin de l'image d'illustration basé sur la catégorie 
   */
  let imagePath = "/img/default.png"; 
  if (artisan.Catégorie === "Alimentation") imagePath = "/img/boulanger.png";
  else if (artisan.Catégorie === "Bâtiment") imagePath = "/img/electricien.png";
  else if (artisan.Catégorie === "Services") imagePath = "/img/coiffeur.png";
  else if (artisan.Catégorie === "Fabrication") imagePath = "/img/menuisier.png";

  /** @constant {number|string} ID sécurisé (gère les variantes de casse de l'API) */
  const artisanId = artisan.ID || artisan.id;

  return (
    <Link to={`/artisan/${artisanId}`} className="artisan-card-link text-decoration-none h-100 d-block">
      <div className="artisan-card card h-100 shadow-sm border-0 w-100">
        
        {/* Bannière visuelle de la catégorie */}
        <img 
          src={imagePath} 
          className="artisan-banner card-img-top p-3" 
          alt={artisan.Nom} 
          style={{ height: '140px', objectFit: 'contain' }} 
        />
        
        <div className="artisan-info card-body text-center d-flex flex-column justify-content-center">
          <h3 className="h5 fw-bold mb-1 text-dark text-truncate">{artisan.Nom}</h3>
          
          {/* Génération dynamique des étoiles (Score sur 5) */}
          <div className="stars text-warning mb-2">
            {"★".repeat(artisan.Note || 5)}{"☆".repeat(5 - (artisan.Note || 5))}
          </div>
          
          <p className="specialty card-text mb-1 fw-medium text-secondary small">
            {artisan.Spécialité || artisan.Speciality}
          </p>
          
          <p className="location card-text small text-muted">
             {artisan.Lieu}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ArtisanCard;