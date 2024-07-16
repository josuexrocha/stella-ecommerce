const { User } = require('../models');
// Nous utiliserons bcrypt pour le hachage des mots de passe plus tard
// const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // TODO: Add password hashing
    const newUser = await User.create({ firstName, lastName, email, password });
    res.status(201).json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    res.status(400).json({ message: "Error registering user", error: error.message });
  }
};

exports.login = async (req, res) => {
  // TODO: Implement login logic
  res.status(501).json({ message: "Login not implemented yet" });
};

exports.getUserProfile = async (req, res) => {
  // TODO: Implement get user profile logic
  res.status(501).json({ message: "Get user profile not implemented yet" });
};