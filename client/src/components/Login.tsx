// client/src/components/Login.tsx
import { useState, memo } from "react";
import { useAuth } from "../context/AuthContext"; // Import du contexte
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import FadeInSection from "./FadeInSection";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Utilisation du contexte pour se connecter
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      const token = response.data.token;

      if (token) {
        login(token); // Mise à jour via le contexte
        navigate("/profile"); // Redirection après connexion
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  return (
    <FadeInSection>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-secondary text-text p-6 rounded-md shadow-lg"
      >
        <div>
          <label className="block text-sm font-serif mb-2">Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md bg-primary text-text"
            placeholder="Email"
            aria-label="Adresse e-mail"
          />
        </div>
        <div>
          <label className="block text-sm font-serif mb-2">Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md bg-primary text-text"
            placeholder="Mot de passe"
            aria-label="Mot de passe"
          />
        </div>
        <button type="submit" className="btn">
          Se connecter
        </button>
      </form>
    </FadeInSection>
  );
};

export default memo(Login);
