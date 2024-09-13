import { useState, memo } from "react";
import { useAuth } from "../context/AuthContext"; // Import du contexte
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import FadeInSection from "./FadeInSection";

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState<string>(""); // Assure-toi que le type est bien string
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth(); // Utilisation du contexte pour gérer l'inscription
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerUser({
        username: email,
        firstName,
        lastName,
        email,
        password,
      });
      const token = response.token;

      if (token) {
        login(token); // Mise à jour via le contexte
        navigate("/profile"); // Redirection après inscription
      }
    } catch (error) {
      console.error("Erreur d'inscription :", error);
    }
  };

  return (
    <FadeInSection>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-secondary text-text p-6 rounded-md shadow-lg"
      >
        <div>
          <label className="block text-sm font-serif mb-2">Prénom :</label>
          <input
            type="text"
            value={firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} // Typage explicite
            className="w-full p-3 rounded-md bg-primary text-text"
            placeholder="Prénom"
            aria-label="Prénom"
          />
        </div>
        <div>
          <label className="block text-sm font-serif mb-2">Nom :</label>
          <input
            type="text"
            value={lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} // Typage explicite
            className="w-full p-3 rounded-md bg-primary text-text"
            placeholder="Nom"
            aria-label="Nom"
          />
        </div>
        <div>
          <label className="block text-sm font-serif mb-2">Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} // Typage explicite
            className="w-full p-3 rounded-md bg-primary text-text"
            placeholder="Email"
            aria-label="Email"
          />
        </div>
        <div>
          <label className="block text-sm font-serif mb-2">Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} // Typage explicite
            className="w-full p-3 rounded-md bg-primary text-text"
            placeholder="Mot de passe"
            aria-label="Mot de passe"
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn">
            S'inscrire
          </button>
        </div>
      </form>
    </FadeInSection>
  );
};

export default memo(Register);
