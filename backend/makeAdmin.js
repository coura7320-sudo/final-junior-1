const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

// Mettez l'email de l'utilisateur que vous voulez rendre admin ici :
const emailToMakeAdmin = "coura7320@gmail.com"; 

async function makeAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connecté à MongoDB.");

    const user = await User.findOneAndUpdate(
      { email: emailToMakeAdmin },
      { role: "admin" },
      { new: true }
    );

    if (user) {
      console.log(`L'utilisateur ${user.email} est maintenant admin !`);
    } else {
      console.log(`Utilisateur avec l'email ${emailToMakeAdmin} introuvable.`);
    }

    process.exit(0);
  } catch (error) {
    console.error("Erreur:", error);
    process.exit(1);
  }
}

makeAdmin();
