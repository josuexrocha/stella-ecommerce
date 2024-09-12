// client/src/components/Login.tsx
import { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import du contexte
import { loginUser } from "../services/api";
import FadeInSection from "./FadeInSection";

const Login: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();

  // Vérifie si l'utilisateur est redirigé après avoir cliqué sur le panier ou la liste de souhaits
  const from = location.state?.from || "/";
  const message = location.state?.message || "Connectez-vous pour accéder à votre compte.";

  if (isAuthenticated) {
    return <Navigate to={from} />; // Redirection vers la page d'origine après connexion
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      const token = response.data.token;

      if (token) {
        login(token); // Mise à jour via le contexte
        // Redirection automatique via le hook useAuth
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  return (
    <FadeInSection>
      <div className="container mx-auto pt-20 px-4 max-w-md">
        <h1 className="text-4xl font-display mb-8 text-center">Connexion</h1>
        {/* Message personnalisé */}
        <p className="text-center text-lg mb-6">{message}</p>
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
      </div>
    </FadeInSection>
  );
};

export default Login;
