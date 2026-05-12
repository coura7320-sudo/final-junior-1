import { useState, useEffect } from "react";
import GameCard from "../components/GameCard";
import { getAllGames } from "../services/api";

const FILTERS = [
  { value: "all", label: "Tous" },
  { value: "ongoing", label: "🔴 En cours" },
  { value: "upcoming", label: "🕐 À venir" },
  { value: "finished", label: "✅ Terminés" },
];

// Données de démonstration si le backend n'est pas disponible
const DEMO_GAMES = [
  {
    _id: "1",
    title: "Natation — 100m nage libre",
    date: "2024-07-28T10:00:00Z",
    status: "finished",
    location: "Paris La Défense Arena",
    description: "Finale du 100m nage libre masculin. Une compétition incroyable.",
  },
  {
    _id: "2",
    title: "Athlétisme — 100m sprint",
    date: "2024-07-30T20:00:00Z",
    status: "ongoing",
    location: "Stade de France",
    description: "La finale la plus attendue des Jeux. Qui sera l'homme le plus rapide du monde ?",
  },
  {
    _id: "3",
    title: "Basketball — Finale hommes",
    date: "2024-08-10T15:00:00Z",
    status: "upcoming",
    location: "Bercy Arena",
    description: "La grande finale du tournoi de basketball masculin.",
  },
  {
    _id: "4",
    title: "Judo — Catégorie -73kg",
    date: "2024-07-29T09:00:00Z",
    status: "finished",
    location: "Champ-de-Mars Arena",
    description: "Combats de judo dans la catégorie moins de 73kg.",
  },
  {
    _id: "5",
    title: "Cyclisme — Course sur route",
    date: "2024-08-03T08:30:00Z",
    status: "upcoming",
    location: "Paris - Nice",
    description: "La course sur route traverse les plus beaux paysages de France.",
  },
  {
    _id: "6",
    title: "Gymnasique — Concours général",
    date: "2024-07-31T13:00:00Z",
    status: "ongoing",
    location: "Bercy Arena",
    description: "Le concours général de la gymnasique artistique féminine.",
  },
];

export default function GamesPage() {
  const [games, setGames] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingDemo, setUsingDemo] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getAllGames();
        setGames(data);
      } catch {
        // Si le backend n'est pas disponible, on utilise les données démo
        setError("Impossible de charger les données. Affichage en mode démonstration.");
        setGames(DEMO_GAMES);
        setUsingDemo(true);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const filteredGames =
    filter === "all" ? games : games.filter((g) => g.status === filter);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement des épreuves...</p>
      </div>
    );
  }

  return (
    <div className="games-page">
      <div className="page-header">
        <h1>Les Épreuves</h1>
        <p>Retrouvez toutes les compétitions des Jeux Olympiques</p>
      </div>

      {usingDemo && (
        <div className="demo-banner">
          ⚠️ Mode démonstration — connectez votre backend pour voir les vraies données
        </div>
      )}

      {error && <div className="error-msg">{error}</div>}

      {/* Filtres */}
      <div className="filters">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`filter-btn ${filter === f.value ? "active" : ""}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Compteur */}
      <p className="results-count">
        {filteredGames.length} épreuve{filteredGames.length > 1 ? "s" : ""}
      </p>

      {/* Grille de cartes */}
      {filteredGames.length === 0 ? (
        <div className="empty-state">
          <span>🏅</span>
          <p>Aucune épreuve dans cette catégorie</p>
        </div>
      ) : (
        <div className="games-grid">
          {filteredGames.map((game) => (
            <GameCard key={game._id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
