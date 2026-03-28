import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

/**
 * Composant d'en-tête (Header).
 * @component
 * @param {Object} props - Propriétés du composant.
 * @param {Function} props.onSearch - Fonction de rappel (callback) pour transmettre la valeur de recherche au composant parent.
 * @description Contient le logo, la barre de recherche dynamique et le menu de navigation par catégorie.
 * @returns {JSX.Element} L'en-tête complet du site.
 */
function Header({ onSearch }) {
  /** @constant {Function} Hook pour déclencher des redirections programmées */
  const navigate = useNavigate();

  /**
   * Gère la saisie dans la barre de recherche.
   * 1. Met à jour l'état global via onSearch.
   * 2. Redirige automatiquement l'utilisateur vers la page liste s'il commence à taper.
   * @param {React.ChangeEvent<HTMLInputElement>} e - L'événement de changement d'input.
   */
  const handleInputChange = (e) => {
    const value = e.target.value;
    
    // Transmission de la valeur au parent (ex: App.js ou PageListe)
    onSearch(value); 

    // UX : Si l'utilisateur tape au moins un caractère, on l'envoie sur la page des résultats
    if (value.length > 0) {
      navigate('/liste-artisans'); 
    }
  };

  return (
    <header className="main-header">
      
      {/* LOGO : Retour à l'accueil via Link pour éviter le rechargement navigateur */}
      <div className="header-logo">
        <Link to="/">
          <img id='logo' src="/img/Logo.png" alt="Trouve ton artisan" />
        </Link>
      </div>

      {/* BARRE DE RECHERCHE : Input contrôlé par handleInputChange */}
      <div className="header-search">
        <input 
          type="text" 
          placeholder="Rechercher par nom..." 
          onChange={handleInputChange} 
        />
        <img id='loupe' src='/img/loupe.png' alt='Loupe de recherche' />
      </div>

      {/* NAVIGATION : Filtres par catégories via Query Params (?categorie=...) */}
      <nav className="header-nav">
        <Link to="/liste-artisans?categorie=Bâtiment">Bâtiment</Link>
        <Link to="/liste-artisans?categorie=Services">Services</Link>
        <Link to="/liste-artisans?categorie=Fabrication">Fabrication</Link>
        <Link to="/liste-artisans?categorie=Alimentation">Alimentation</Link>
      </nav>

    </header>
  );
}

export default Header;