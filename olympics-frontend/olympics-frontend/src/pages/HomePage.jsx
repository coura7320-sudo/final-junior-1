export default function HomePage({ setPage }) {
  return (
    <div className="home-page">
      {/* Hero section */}
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

      {/* Stats section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">32</span>
            <span className="stat-label">Sports</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">329</span>
            <span className="stat-label">Épreuves</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">206</span>
            <span className="stat-label">Pays</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">10 500</span>
            <span className="stat-label">Athlètes</span>
          </div>
        </div>
      </section>

      {/* Features section */}
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
