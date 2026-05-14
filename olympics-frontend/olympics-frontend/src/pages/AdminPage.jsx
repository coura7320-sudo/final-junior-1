import { useState, useEffect } from "react";
import {
  getAllGames,
  createGame,
  updateGame,
  deleteGame,
} from "../services/api";
import { useAuth } from "../context/AuthContext";

const EMPTY_FORM = {
  title: "",
  date: "",
  status: "upcoming",
  location: "",
  description: "",
};

export default function AdminPage() {
  const { auth } = useAuth();
  const [games, setGames] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const fetchGames = async () => {
    try {
      const data = await getAllGames();
      setGames(data);
    } catch (err) {
      showMessage(err.message, "error");
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadGames = async () => {
      try {
        const data = await getAllGames();
        if (isMounted) setGames(data);
      } catch (err) {
        showMessage(err.message, "error");
      }
    };

    loadGames();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await updateGame(editingId, form, auth.token);
        showMessage("Épreuve mise à jour ✅");
      } else {
        await createGame(form, auth.token);
        showMessage("Épreuve créée ✅");
      }
      setForm(EMPTY_FORM);
      setEditingId(null);
      fetchGames();
    } catch (err) {
      showMessage(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (game) => {
    setEditingId(game._id);
    setForm({
      title: game.title,
      date: game.date ? game.date.substring(0, 10) : "",
      status: game.status,
      location: game.location || "",
      description: game.description || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette épreuve ?")) return;
    try {
      await deleteGame(id, auth.token);
      showMessage("Épreuve supprimée");
      fetchGames();
    } catch (err) {
      showMessage(err.message, "error");
    }
  };

  const handleCancel = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>⚙️ Panneau Admin</h1>
        <p>Gérez les épreuves des Jeux Olympiques</p>
      </div>

      {message && (
        <div className={`message-banner ${message.type}`}>{message.text}</div>
      )}

      {/* Formulaire */}
      <div className="admin-form-card">
        <h2>
          {editingId ? "✏️ Modifier l'épreuve" : "➕ Ajouter une épreuve"}
        </h2>

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-row">
            <div className="form-group">
              <label>Titre *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Ex: Natation — 100m nage libre"
                required
              />
            </div>
            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Statut *</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="upcoming">À venir</option>
                <option value="ongoing">En cours</option>
                <option value="finished">Terminé</option>
              </select>
            </div>
            <div className="form-group">
              <label>Lieu</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Ex: Stade de France"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description de l'épreuve..."
              rows={3}
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading
                ? "Enregistrement..."
                : editingId
                  ? "Mettre à jour"
                  : "Ajouter"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleCancel}
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Liste des épreuves */}
      <div className="admin-list">
        <h2>📋 Toutes les épreuves ({games.length})</h2>
        {games.length === 0 ? (
          <div className="empty-state">
            <span>🏅</span>
            <p>Aucune épreuve pour l'instant</p>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Date</th>
                  <th>Statut</th>
                  <th>Lieu</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {games.map((game) => (
                  <tr key={game._id}>
                    <td>
                      <strong>{game.title}</strong>
                    </td>
                    <td>
                      {game.date
                        ? new Date(game.date).toLocaleDateString("fr-FR")
                        : "—"}
                    </td>
                    <td>
                      <span className={`badge badge-${game.status}`}>
                        {game.status === "upcoming" && "🕐 À venir"}
                        {game.status === "ongoing" && "🔴 En cours"}
                        {game.status === "finished" && "✅ Terminé"}
                      </span>
                    </td>
                    <td>{game.location || "—"}</td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="btn btn-sm btn-outline"
                          onClick={() => handleEdit(game)}
                        >
                          ✏️ Modifier
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(game._id)}
                        >
                          🗑️ Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
