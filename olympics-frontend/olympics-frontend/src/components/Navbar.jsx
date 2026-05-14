import { useAuth } from "../context/AuthContext";

export default function Navbar({ page, setPage }) {
  const { auth, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => setPage("home")}>
        <span className="olympic-rings">⊕</span>
        <span className="brand-text">JO 2024</span>
      </div>

      {auth && (
        <div className="navbar-links">
          <button
            className={`nav-btn ${page === "home" ? "active" : ""}`}
            onClick={() => setPage("home")}
          >
            Accueil
          </button>
          <button
            className={`nav-btn ${page === "games" ? "active" : ""}`}
            onClick={() => setPage("games")}
          >
            Épreuves
          </button>
          {auth?.user?.role === "admin" && (
            <button
              className={`nav-btn ${page === "admin" ? "active" : ""}`}
              onClick={() => setPage("admin")}
            >
              Admin
            </button>
          )}
        </div>
      )}

      <div className="navbar-auth">
        {auth ? (
          <div className="user-info">
            <span className="username">👋 {auth.user.name}</span>
            <button className="btn btn-outline" onClick={logout}>
              Déconnexion
            </button>
          </div>
        ) : (
          <div className="auth-buttons">
            <button className="btn btn-outline" onClick={() => setPage("login")}>
              Connexion
            </button>
            <button className="btn btn-primary" onClick={() => setPage("register")}>
              S'inscrire
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
