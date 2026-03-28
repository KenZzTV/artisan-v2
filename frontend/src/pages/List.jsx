import { useState, useEffect } from 'react';
import ArtisanCard from '../components/ArtisanCard';
import '../styles/List.css';

/**
 * Composant de la page de liste des artisans.
 * @component
 * @param {Object} props - Propriétés du composant.
 * @param {string} [props.searchTerm=""] - Terme de recherche provenant de la barre de recherche globale (Header).
 * @description Affiche la liste complète des artisans avec un système de filtrage par catégorie et par nom/spécialité.
 * @returns {JSX.Element} La vue de la liste filtrable.
 */
function List({ searchTerm = "" }) { 
  /** @state {Array} artisans - Stocke la liste brute de tous les artisans récupérés depuis l'API. */
  const [artisans, setArtisans] = useState([]);

  /** @state {string} filter - Catégorie actuellement sélectionnée ("Tous" par défaut). */
  const [filter, setFilter] = useState("Tous");

  /**
   * Récupère la liste complète des artisans au chargement de la page.
   * @async
   */
  useEffect(() => {
    fetch('https://artisan-v2-production-3f9e.up.railway.app/api/artisans')
      .then(res => res.json())
      .then(data => setArtisans(data))
      .catch(err => console.error("Erreur SQL:", err));
  }, []);

  /** * LOGIQUE DE FILTRAGE :
   * Cette constante calcule en temps réel quels artisans afficher en fonction :
   * 1. Du bouton de catégorie sélectionné.
   * 2. Du texte saisi dans la barre de recherche.
   * @constant {Array} filteredArtisans
   */
  const filteredArtisans = artisans.filter(artisan => {
    // Vérifie si l'artisan appartient à la catégorie sélectionnée
    const matchesCategory = filter === "Tous" || artisan.Catégorie === filter;
    
    // Vérifie si le nom ou la spécialité contient le terme recherché
    const matchesSearch = artisan.Nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          artisan.Spécialité.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="list-page container py-5">
      <h1 className="mb-4">Liste des artisans</h1>
      
      {/* --- BARRE DE FILTRES --- 
          Génère dynamiquement les boutons pour chaque catégorie principale.
      */}
      <div className="filter-bar btn-group mb-5 d-flex flex-wrap" role="group">
        {["Tous", "Bâtiment", "Alimentation", "Fabrication", "Services"].map((cat) => (
          <button 
            key={cat}
            className={`btn ${filter === cat ? "btn-primary" : "btn-outline-primary"}`} 
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="artisans-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {filteredArtisans.length > 0 ? (
          filteredArtisans.map(artisan => (
            <div className="col" key={artisan.id || artisan.ID || artisan.Nom}>
              <ArtisanCard artisan={artisan} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <p className="fs-5 text-muted">Aucun artisan trouvé pour cette recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default List;