import { useState } from "react";

// ── Données ───────────────────────────────────────
const SPORTS = [
  { id: 1, emoji: "🏊", nom: "Natation", athletes: 878 },
  { id: 2, emoji: "🏃", nom: "Athlétisme", athletes: 2000 },
  { id: 3, emoji: "🤸", nom: "Gymnastique", athletes: 396 },
  { id: 4, emoji: "🏀", nom: "Basketball", athletes: 288 },
  { id: 5, emoji: "⚽", nom: "Football", athletes: 504 },
  { id: 6, emoji: "🥋", nom: "Judo", athletes: 386 },
  { id: 7, emoji: "🚴", nom: "Cyclisme", athletes: 570 },
  { id: 8, emoji: "🎾", nom: "Tennis", athletes: 172 },
  { id: 9, emoji: "🏋️", nom: "Haltérophilie", athletes: 196 },
  { id: 10, emoji: "🥊", nom: "Boxe", athletes: 286 },
  { id: 11, emoji: "🏄", nom: "Surf", athletes: 96 },
  { id: 12, emoji: "🧗", nom: "Escalade", athletes: 68 },
];

const EPREUVES = [
  { id: 1, sport: "🏊 Natation", nom: "100m nage libre", date: "28 juil", statut: "finished" },
  { id: 2, sport: "🏃 Athlétisme", nom: "100m sprint", date: "30 juil", statut: "ongoing" },
  { id: 3, sport: "🏀 Basketball", nom: "Finale hommes", date: "10 août", statut: "upcoming" },
  { id: 4, sport: "🥋 Judo", nom: "Catégorie -73kg", date: "29 juil", statut: "finished" },
  { id: 5, sport: "🚴 Cyclisme", nom: "Course sur route", date: "3 août", statut: "upcoming" },
  { id: 6, sport: "🤸 Gym", nom: "Concours général", date: "31 juil", statut: "ongoing" },
  { id: 7, sport: "⚽ Football", nom: "Finale femmes", date: "9 août", statut: "upcoming" },
  { id: 8, sport: "🎾 Tennis", nom: "Simple messieurs", date: "2 août", statut: "ongoing" },
];

const PAYS = [
  { id: 1, drapeau: "🇺🇸", nom: "États-Unis", or: 39, argent: 41, bronze: 33 },
  { id: 2, drapeau: "🇨🇳", nom: "Chine", or: 38, argent: 32, bronze: 18 },
  { id: 3, drapeau: "🇬🇧", nom: "Grande-Bretagne", or: 22, argent: 21, bronze: 22 },
  { id: 4, drapeau: "🇦🇺", nom: "Australie", or: 18, argent: 19, bronze: 16 },
  { id: 5, drapeau: "🇫🇷", nom: "France", or: 16, argent: 26, bronze: 22 },
  { id: 6, drapeau: "🇳🇱", nom: "Pays-Bas", or: 15, argent: 7, bronze: 12 },
  { id: 7, drapeau: "🇩🇪", nom: "Allemagne", or: 12, argent: 13, bronze: 8 },
  { id: 8, drapeau: "🇯🇵", nom: "Japon", or: 20, argent: 12, bronze: 13 },
];

const ATHLETES = [
  { id: 1, nom: "Léon Marchand", pays: "🇫🇷 France", sport: "Natation", medaille: "🥇 4 Ors" },
  { id: 2, nom: "Mondo Duplantis", pays: "🇸🇪 Suède", sport: "Perche", medaille: "🥇 Record mondial" },
  { id: 3, nom: "Simone Biles", pays: "🇺🇸 États-Unis", sport: "Gym", medaille: "🥇 3 Ors" },
  { id: 4, nom: "Noah Lyles", pays: "🇺🇸 États-Unis", sport: "Sprint", medaille: "🥇 100m" },
  { id: 5, nom: "Carlos Alcaraz", pays: "🇪🇸 Espagne", sport: "Tennis", medaille: "🥇 Simple" },
  { id: 6, nom: "Tadej Pogacar", pays: "🇸🇮 Slovénie", sport: "Cyclisme", medaille: "🥇 Route" },
];

export default function HomePage({ setPage }) {
  const [section, setSection] = useState(null);

  const toggle = (nom) => setSection(section === nom ? null : nom);

  return (
    <div className="home-page">

      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">Paris 2024</div>
          <h1 className="hero-title">
            Les Jeux <span className="highlight">Olympiques</span>
          </h1>
          <p className="hero-subtitle">
            Suivez toutes les épreuves en direct, les scores et les résultats
            des Jeux Olympiques de Paris 2024.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => setPage("games")}>
              Voir les épreuves
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => setPage("register")}>
              S'inscrire
            </button>
          </div>
        </div>
        <div className="hero-rings">
          <div className="ring ring-blue"></div>
          <div className="ring ring-yellow"></div>
          <div className="ring ring-black"></div>
          <div className="ring ring-green"></div>
          <div className="ring ring-red"></div>
        </div>
      </section>

      {/* Boutons cliquables */}
      <section className="quick-stats">
        <button
          className={`stat-card clickable ${section === "sports" ? "active" : ""}`}
          onClick={() => toggle("sports")}
        >
          <span className="stat-number">32</span>
          <span className="stat-label">Sports</span>
          <span className="stat-arrow">{section === "sports" ? "▲" : "▼"}</span>
        </button>

        <button
          className={`stat-card clickable ${section === "epreuves" ? "active" : ""}`}
          onClick={() => toggle("epreuves")}
        >
          <span className="stat-number">329</span>
          <span className="stat-label">Épreuves</span>
          <span className="stat-arrow">{section === "epreuves" ? "▲" : "▼"}</span>
        </button>

        <button
          className={`stat-card clickable ${section === "pays" ? "active" : ""}`}
          onClick={() => toggle("pays")}
        >
          <span className="stat-number">206</span>
          <span className="stat-label">Pays</span>
          <span className="stat-arrow">{section === "pays" ? "▲" : "▼"}</span>
        </button>

        <button
          className={`stat-card clickable ${section === "athletes" ? "active" : ""}`}
          onClick={() => toggle("athletes")}
        >
          <span className="stat-number">10 500</span>
          <span className="stat-label">Athlètes</span>
          <span className="stat-arrow">{section === "athletes" ? "▲" : "▼"}</span>
        </button>
      </section>

      {/* Panneau Sports */}
      {section === "sports" && (
        <section className="panel">
          <h2 className="panel-title">🏅 Les 32 sports olympiques</h2>
          <div className="sports-grid">
            {SPORTS.map((s) => (
              <div key={s.id} className="sport-item">
                <span className="sport-emoji">{s.emoji}</span>
                <span className="sport-nom">{s.nom}</span>
                <span className="sport-sub">{s.athletes} athlètes</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Panneau Épreuves */}
      {section === "epreuves" && (
        <section className="panel">
          <h2 className="panel-title">🗓️ Quelques épreuves phares</h2>
          <div className="epreuves-list">
            {EPREUVES.map((e) => (
              <div key={e.id} className="epreuve-row">
                <span className="epreuve-sport">{e.sport}</span>
                <span className="epreuve-nom">{e.nom}</span>
                <span className="epreuve-date">📅 {e.date}</span>
                <span className={`badge badge-${e.statut}`}>
                  {e.statut === "finished" && "✅ Terminé"}
                  {e.statut === "ongoing" && "🔴 En cours"}
                  {e.statut === "upcoming" && "🕐 À venir"}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Panneau Pays */}
      {section === "pays" && (
        <section className="panel">
          <h2 className="panel-title">🌍 Classement des médailles</h2>
          <div className="pays-list">
            <div className="pays-header">
              <span>Pays</span>
              <span>🥇</span>
              <span>🥈</span>
              <span>🥉</span>
              <span>Total</span>
            </div>
            {PAYS.map((p, i) => (
              <div key={p.id} className="pays-row">
                <span className="pays-rang">#{i + 1}</span>
                <span className="pays-drapeau">{p.drapeau}</span>
                <span className="pays-nom">{p.nom}</span>
                <span className="medaille or">{p.or}</span>
                <span className="medaille argent">{p.argent}</span>
                <span className="medaille bronze">{p.bronze}</span>
                <span className="medaille total">{p.or + p.argent + p.bronze}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Panneau Athlètes */}
      {section === "athletes" && (
        <section className="panel">
          <h2 className="panel-title">⭐ Athlètes en vedette</h2>
          <div className="athletes-grid">
            {ATHLETES.map((a) => (
              <div key={a.id} className="athlete-card">
                <div className="athlete-avatar">
                  {a.nom.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="athlete-info">
                  <span className="athlete-nom">{a.nom}</span>
                  <span className="athlete-pays">{a.pays}</span>
                  <span className="athlete-sport">{a.sport}</span>
                </div>
                <span className="athlete-medaille">{a.medaille}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Features */}
      <section className="features-section">
        <h2>Tout suivre en un seul endroit</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🔴</span>
            <h3>Épreuves en cours</h3>
            <p>Suivez les compétitions en direct avec les scores mis à jour en temps réel.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🕐</span>
            <h3>À venir</h3>
            <p>Consultez le programme des prochaines épreuves et ne manquez rien.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">✅</span>
            <h3>Résultats</h3>
            <p>Retrouvez tous les résultats et palmarès des épreuves terminées.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
