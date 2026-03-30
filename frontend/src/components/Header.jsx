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
  <header className="container-fluid bg-light border-bottom py-2">
    <div className="row align-items-center g-2">
      
      {/* LOGO : Prend 12 colonnes sur mobile, 3 sur PC */}
      <div className="col-12 col-md-3 text-center text-md-start">
        <Link to="/">
          <img 
            id="logo" 
            src="/img/Logo.png" 
            alt="Trouve ton artisan" 
            style={{ maxWidth: '180px', height: 'auto' }} 
          />
        </Link>
      </div>

      {/* BARRE DE RECHERCHE + LOUPE : Milieu */}
      <div className="col-12 col-md-4">
        <div className="input-group">
          <input 
            type="text" 
            className="form-control shadow-none border-dark" 
            placeholder="Rechercher par nom..." 
            onChange={handleInputChange} 
            style={{ borderRadius: '10px 0 0 10px' }}
          />
          <span className="input-group-text bg-white border-dark border-start-0" style={{ borderRadius: '0 10px 10px 0' }}>
            <img src='/img/loupe.png' alt='Loupe' style={{ width: '18px' }} />
          </span>
        </div>
      </div>

      {/* NAVIGATION : ms-auto pousse tout le bloc à droite sur PC */}
      <nav className="col-12 col-md-5 ms-auto">
        <div className="d-flex justify-content-center justify-content-md-end gap-3 flex-wrap">
          <Link className="nav-link-custom" to="/liste-artisans?categorie=Bâtiment">Bâtiment</Link>
          <Link className="nav-link-custom" to="/liste-artisans?categorie=Services">Services</Link>
          <Link className="nav-link-custom" to="/liste-artisans?categorie=Fabrication">Fabrication</Link>
          <Link className="nav-link-custom" to="/liste-artisans?categorie=Alimentation">Alimentation</Link>
        </div>
      </nav>

    </div>
  </header>
);
}

export default Header;