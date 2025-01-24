// src/controllers/userController.js

const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AppError } = require("../middlewares/errorHandler");

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return next(new AppError("Email already in use", 400));
    }

    // Hacher le mot de passe avant de le sauvegarder
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Enregistre le mot de passe haché
    });

    const token = jwt.sign({ userId: newUser.id, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User registered successfully",
      userId: newUser.id,
      token,
    });
  } catch (error) {
    next(new AppError(`Error registering user: ${error.message}`, 400));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(new AppError("Invalid email or password", 401));
    }

    // Comparer le mot de passe fourni avec celui haché dans la base de données
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new AppError("Invalid email or password", 401));
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

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

// fonction pour la déconnexion
exports.logout = (_req, res, _next) => {
  res.status(200).json({ message: "Logout successful" });
};

exports.deleteAccount = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    await user.destroy(); // Suppression de l'utilisateur

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    next(new AppError(`Error deleting user: ${error.message}`, 500));
  }
};

module.exports = exports;
