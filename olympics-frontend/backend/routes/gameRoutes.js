const express = require("express");
const router = express.Router();

const {
  getGames,
  getGamesByStatus,
  createGame,
  updateGame,
  deleteGame
} = require("../controllers/gameController");

const { auth, isAdmin } = require("../middleware/authMiddleware");

// public
router.get("/", getGames);
router.get("/:status", getGamesByStatus);

// admin only
router.post("/", auth, isAdmin, createGame);
router.put("/:id", auth, isAdmin, updateGame);
router.delete("/:id", auth, isAdmin, deleteGame);

module.exports = router;