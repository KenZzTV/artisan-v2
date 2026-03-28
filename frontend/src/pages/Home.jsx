import { useState, useEffect } from 'react';
import ArtisanCard from '../components/ArtisanCard';
import '../styles/Home.css';

/**
 * Composant de la page d'accueil (Home).
 * @component
 * @description Affiche le guide d'utilisation en 4 étapes et la section "Artisans du mois".
 * @returns {JSX.Element} Le rendu de la page d'accueil.
 */
function Home() {
  /** * @state {Array} artisans - Liste complète des artisans récupérée depuis l'API.
   * Initialisé avec un tableau vide pour éviter les erreurs de .map() avant le chargement.
   */
  const [artisans, setArtisans] = useState([]);

  /**
   * Hook d'effet pour charger les données des artisans dès l'affichage de la page.
   * @async
   */
  useEffect(() => {
    fetch('https://artisan-v2-production-3f9e.up.railway.app/api/artisans')
      .then(response => response.json())
      .then(data => {
        setArtisans(data);
      })
      .catch(error => console.error("Erreur de chargement SQL:", error));
  }, []);

  /** * @constant {Array} topArtisans 
   * Filtre les artisans pour ne garder que ceux ayant la propriété 'Top' à "1".
   */
  const topArtisans = artisans.filter(a => a.Top === "1");

  return (
    <div className="home-page container py-5">
      
      {/* --- SECTION 1 : GUIDE D'UTILISATION --- */}
      <section className="how-it-works mb-5">
        <h2 className="main-title text-center fw-bold mb-4">Comment trouver mon artisan ?</h2>
        <div className="steps-container row row-cols-1 row-cols-md-4 g-4 text-center">
          
          <div className="col">
            <div className="step p-3 border rounded shadow-sm h-100">
              <div className="circle badge bg-primary rounded-circle mb-3 fs-4">1</div>
              <p className="mb-0">Choisir la catégorie d’artisanat dans le menu.</p>
            </div>
          </div>
          
          <div className="col">
            <div className="step p-3 border rounded shadow-sm h-100">
              <div className="circle badge bg-primary rounded-circle mb-3 fs-4">2</div>
              <p className="mb-0">Choisir un artisan.</p>
            </div>
          </div>
          
          <div className="col">
            <div className="step p-3 border rounded shadow-sm h-100">
              <div className="circle badge bg-primary rounded-circle mb-3 fs-4">3</div>
              <p className="mb-0">Le contacter via le formulaire de contact.</p>
            </div>
          </div>
          
          <div className="col">
            <div className="step p-3 border rounded shadow-sm h-100">
              <div className="circle badge bg-primary rounded-circle mb-3 fs-4">4</div>
              <p className="mb-0">Une réponse sera apportée sous 48h</p>
            </div>
          </div>
          
        </div>
      </section>

      <hr className="my-5" />

      {/* --- SECTION 2 : LES ARTISANS DU MOIS --- */}
      <section className="top-artisans-section">
        <h2 className="main-title text-center fw-bold mb-4">Les trois artisans du mois</h2>
        
        {/* Mapping des artisans filtrés vers le composant réutilisable ArtisanCard */}
        <div className="artisans-row row row-cols-1 row-cols-md-3 g-4">
          {topArtisans.map(artisan => (
            <div className="col" key={artisan.ID}>
              <ArtisanCard artisan={artisan} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;