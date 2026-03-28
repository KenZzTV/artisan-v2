import { Link } from 'react-router-dom';

/**
 * Composant de la page d'erreur 404 (NotFound).
 * @component
 * @description S'affiche automatiquement via React Router lorsqu'une URL 
 * ne correspond à aucune route définie dans l'application.
 * @returns {JSX.Element} La vue d'erreur 404 avec un lien de redirection.
 */
function NotFound() {
  return (
    <div className="not-found container py-5 text-center">
      {/* Code d'erreur visuel pour l'utilisateur */}
      <h1 className="display-1 fw-bold text-primary">404</h1>
      
      <div className="error-icon fs-1 mb-4">⚠️</div>
      
      <h2 className="mb-3">Oups ! La page que vous recherchez n'existe pas.</h2>
      
      <p className="text-muted mb-4">
        Il semblerait que vous vous soyez perdu en chemin ou que l'artisan ait déménagé !
      </p>

      <Link to="/" className="btn btn-primary btn-lg px-4 shadow-sm">
        Retourner à l'accueil
      </Link>
    </div>
  );
}

export default NotFound;