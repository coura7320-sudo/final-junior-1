const BASE_URL = "http://localhost:5000/api";

// ── Auth ──────────────────────────────────────────
export const registerUser = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) throw new Error("Erreur lors de l'inscription");
  return res.json();
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Email ou mot de passe incorrect");
  return res.json();
};

// ── Games ─────────────────────────────────────────
export const getAllGames = async () => {
  const res = await fetch(`${BASE_URL}/games`);
  if (!res.ok) throw new Error("Erreur lors du chargement des jeux");
  return res.json();
};

export const getGamesByStatus = async (status) => {
  const res = await fetch(`${BASE_URL}/games/${status}`);
  if (!res.ok) throw new Error("Erreur lors du chargement");
  return res.json();
};

export const createGame = async (gameData, token) => {
  const res = await fetch(`${BASE_URL}/games`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(gameData),
  });
  if (!res.ok) throw new Error("Erreur lors de la création");
  return res.json();
};

export const updateGame = async (id, gameData, token) => {
  const res = await fetch(`${BASE_URL}/games/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(gameData),
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour");
  return res.json();
};

export const deleteGame = async (id, token) => {
  const res = await fetch(`${BASE_URL}/games/${id}`, {
    method: "DELETE",
    headers: { Authorization: token },
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression");
  return res.json();
};
