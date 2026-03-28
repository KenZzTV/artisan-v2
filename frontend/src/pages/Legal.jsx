/**
 * Composant de la page des Mentions Légales.
 * @component
 * @description Affiche les informations juridiques obligatoires du site.
 * @returns {JSX.Element} Le rendu de la page légale.
 */
function Legal() {
  return (
    <div className="legal-page container py-5">
      {/* Titre principal de la page */}
      <h1 className="fw-bold mb-4">Mentions Légales</h1>
      <p className="text-muted">Contenu en cours de rédaction...</p>
    </div>
  );
}

export default Legal;