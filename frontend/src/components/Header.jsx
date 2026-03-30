import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

/**
 * Composant d'en-tête (Header).
 */
function Header({ onSearch }) {
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    onSearch(value); 

    if (value.length > 0) {
      navigate('/liste-artisans'); 
    }
  };

  return (
    <header className="main-header d-flex flex-column flex-md-row align-items-center justify-content-between p-3 bg-light border-bottom">
      
      <div className="header-logo mb-3 mb-md-0">
        <Link to="/">
          <img id='logo' src="/img/Logo.png" alt="Trouve ton artisan" className="img-fluid" style={{ maxHeight: '50px' }} />
        </Link>
      </div>

      <div className="header-search d-flex align-items-center border rounded bg-white px-2 mb-3 mb-md-0 w-100 w-md-auto">
        <input 
          className="form-control border-0 shadow-none"
          type="text" 
          placeholder="Rechercher par nom..." 
          onChange={handleInputChange} 
        />
        <img id='loupe' src='/img/loupe.png' alt='Loupe de recherche' style={{ width: '20px' }} />
      </div>

      <nav className="header-nav d-flex flex-wrap justify-content-center gap-3">
        <Link className="nav-link text-dark fw-bold" to="/liste-artisans?categorie=Bâtiment">Bâtiment</Link>
        <Link className="nav-link text-dark fw-bold" to="/liste-artisans?categorie=Services">Services</Link>
        <Link className="nav-link text-dark fw-bold" to="/liste-artisans?categorie=Fabrication">Fabrication</Link>
        <Link className="nav-link text-dark fw-bold" to="/liste-artisans?categorie=Alimentation">Alimentation</Link>
      </nav>

    </header>
  );
}

export default Header;