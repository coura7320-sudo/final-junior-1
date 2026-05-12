const Game = require("../models/Game");

// GET ALL
exports.getGames = async (req, res) => {
  const games = await Game.find();
  res.json(games);
};

// GET BY STATUS
exports.getGamesByStatus = async (req, res) => {
  const games = await Game.find({ status: req.params.status });
  res.json(games);
};

// CREATE
exports.createGame = async (req, res) => {
  const game = await Game.create(req.body);
  res.json(game);
};

// UPDATE
exports.updateGame = async (req, res) => {
  const game = await Game.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(game);
};

// DELETE
exports.deleteGame = async (req, res) => {
  await Game.findByIdAndDelete(req.params.id);
  res.json("Game deleted");
};