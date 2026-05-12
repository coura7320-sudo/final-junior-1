const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  title: String,
  date: Date,
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "finished"]
  },
  location: String,
  description: String
});

module.exports = mongoose.model("Game", gameSchema);