const bcrypt = require("bcrypt");
const { User } = require("../models"); // Adapter au chemin vers ton fichier models

const hashPasswords = async () => {
  try {
    const users = await User.findAll(); // Récupère tous les utilisateurs

    for (const user of users) {
      if (!user.password.startsWith("$2b$")) {
        // Vérifie si le mot de passe est déjà haché
        const hashedPassword = await bcrypt.hash(user.password, 10); // Hachage du mot de passe
        user.password = hashedPassword;
        await user.save(); // Met à jour l'utilisateur dans la base de données
        console.log(`Mot de passe haché pour l'utilisateur : ${user.email}`);
      }
    }

    console.log("Tous les mots de passe ont été hachés.");
  } catch (error) {
    console.error("Erreur lors du hachage des mots de passe:", error);
  }
};

hashPasswords();
