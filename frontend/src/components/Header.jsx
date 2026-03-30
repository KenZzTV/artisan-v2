import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

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
    <header className="container-fluid bg-light border-bottom p-3">
      <div className="row align-items-center">
        
        {/* LOGO : Prend 12 colonnes sur mobile (centré), et 3 sur PC */}
        <div className="col-12 col-md-3 text-center text-md-start mb-3 mb-md-0">
          <Link to="/">
            <img 
              src="/img/Logo.png" 
              alt="Trouve ton artisan" 
              style={{ maxWidth: '180px', height: 'auto' }} 
            />
          </Link>
        </div>

        {/* RECHERCHE : Prend 12 colonnes sur mobile, et 4 sur PC */}
        <div className="col-12 col-md-5 mb-3 mb-md-0">
          <div className="input-group">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Rechercher par nom..." 
              onChange={handleInputChange} 
            />
            <span className="input-group-text bg-white">
              <img src='/img/loupe.png' alt='Loupe' style={{ width: '18px' }} />
            </span>
          </div>
        </div>

        {/* NAVIGATION : Prend 12 colonnes sur mobile, et 4 sur PC */}
        <nav className="col-12 col-md-4 d-flex justify-content-center justify-content-md-end gap-2 flex-wrap">
          <Link className="btn btn-sm btn-outline-primary" to="/liste-artisans?categorie=Bâtiment">Bâtiment</Link>
          <Link className="btn btn-sm btn-outline-primary" to="/liste-artisans?categorie=Services">Services</Link>
          <Link className="btn btn-sm btn-outline-primary" to="/liste-artisans?categorie=Fabrication">Fabrication</Link>
          <Link className="btn btn-sm btn-outline-primary" to="/liste-artisans?categorie=Alimentation">Alimentation</Link>
        </nav>

      </div>
    </header>
  );
}

export default Header;