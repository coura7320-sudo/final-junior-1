import { useEffect, useState } from "react";

const STATUS_CONFIG = {
  upcoming: {
    label: "À venir",
    className: "badge-upcoming",
    icon: "🕐",
  },
  ongoing: {
    label: "En cours",
    className: "badge-ongoing",
    icon: "🔴",
  },
  finished: {
    label: "Terminé",
    className: "badge-finished",
    icon: "✅",
  },
};

// Images par sport (Unsplash libre de droits)
const SPORT_IMAGES = {
  natation:
    "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&q=80",
  athlétisme:
    "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&q=80",
  gymnastique:
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&q=80",
  basketball:
    "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80",
  football:
    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&q=80",
  judo: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&q=80",
  cyclisme:
    "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=400&q=80",
  tennis:
    "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&q=80",
  default:
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&q=80",
};

function getSportImage(title) {
  if (!title) return SPORT_IMAGES.default;
  const lower = title.toLowerCase();
  for (const sport in SPORT_IMAGES) {
    if (lower.includes(sport)) return SPORT_IMAGES[sport];
  }
  return SPORT_IMAGES.default;
}

function formatDate(dateStr) {
  if (!dateStr) return "Date inconnue";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getRandomScore(finished) {
  return finished
    ? Math.floor(Math.random() * 3 + 1)
    : Math.floor(Math.random() * 2);
}

export default function GameCard({ game }) {
  const config = STATUS_CONFIG[game.status] || STATUS_CONFIG.upcoming;
  const image = getSportImage(game.title);
  const [scores, setScores] = useState(() => {
    if (game.status === "ongoing" || game.status === "finished") {
      const finished = game.status === "finished";
      return {
        home: getRandomScore(finished),
        away: getRandomScore(finished),
      };
    }
    return { home: null, away: null };
  });

  useEffect(() => {
    if (game.status === "ongoing" || game.status === "finished") {
      const finished = game.status === "finished";
      setScores({
        home: getRandomScore(finished),
        away: getRandomScore(finished),
      });
    } else {
      setScores({ home: null, away: null });
    }
  }, [game.status]);

  return (
    <div className="game-card">
      <div className="card-image">
        <img src={image} alt={game.title} loading="lazy" />
        <span className={`badge ${config.className}`}>
          {config.icon} {config.label}
        </span>
      </div>

      <div className="card-body">
        <h3 className="card-title">{game.title}</h3>

        <div className="card-meta">
          <span>📅 {formatDate(game.date)}</span>
          {game.location && <span>📍 {game.location}</span>}
        </div>

        {game.description && (
          <p className="card-description">{game.description}</p>
        )}

        {/* Score fictif pour les épreuves en cours et terminées */}
        {(game.status === "ongoing" || game.status === "finished") && (
          <div className="score-box">
            <div className="team">
              <span className="team-flag">🇫🇷</span>
              <span className="team-name">France</span>
              <span className="team-score">{scores.home}</span>
            </div>
            <div className="vs">VS</div>
            <div className="team">
              <span className="team-flag">🇺🇸</span>
              <span className="team-name">USA</span>
              <span className="team-score">{scores.away}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
