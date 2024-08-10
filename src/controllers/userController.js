// src/controllers/userController.js

const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AppError } = require("../middlewares/errorHandler");

exports.register = async (req, res, next) => {
  console.log("Register function called with body:", req.body);
  try {
    const { firstName, lastName, email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log("User already exists with email:", email);
      return next(new AppError("Email already in use", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      // Le rôle "client" sera automatiquement attribué par défaut
    });

    console.log("New user created:", newUser.id);

    // Générer un token JWT pour le nouvel utilisateur
    const token = jwt.sign(
      { userId: newUser.id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      userId: newUser.id,
      token,
    });
  } catch (error) {
    console.error("Detailed error in register function:", error);
    next(new AppError(`Error registering user: ${error.message}`, 400));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
      return next(new AppError("Invalid email or password", 401));
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      userId: user.id,
      role: user.role,
    });
  } catch (error) {
    next(new AppError(`Error logging in: ${error.message}`, 500));
  }
};

exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    res.json(user);
  } catch (error) {
    next(new AppError(`Error fetching user profile: ${error.message}`, 500));
  }
};

// Nouvelle fonction pour mettre à jour le profil de l'utilisateur
exports.updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;
    const user = await User.findByPk(req.user.userId);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    // Mettre à jour les champs
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(new AppError(`Error updating user profile: ${error.message}`, 500));
  }
};

// Nouvelle fonction pour la déconnexion
exports.logout = async (req, res, next) => {
  // Dans une implémentation JWT, la déconnexion se fait côté client
  // en supprimant le token. Côté serveur, nous pouvons simplement
  // envoyer une réponse de succès.
  res.json({ message: "Logout successful" });
};

module.exports = exports;
