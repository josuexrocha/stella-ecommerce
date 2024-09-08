// client/src/components/Login.tsx

import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await loginUser({ email, password });
      const data: { token: string } = response.data;

      // Stockage du token dans le localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Connexion réussie !");
        navigate("/"); // Redirection vers la page d'accueil après connexion
      } else {
        setErrorMessage("Le token d'authentification est manquant.");
      }
    } catch (error: unknown) {
      if (error instanceof Error && error?.message) {
        setErrorMessage(
          error.message.includes("Unauthorized")
            ? "Email ou mot de passe incorrect."
            : "Une erreur est survenue.",
        );
      } else {
        setErrorMessage("Une erreur est survenue.");
      }
    }
  };

  return (
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
        />
      </div>
      {errorMessage && <p className="text-red-500 text-sm font-serif">{errorMessage}</p>}
      <button type="submit" className="btn">
        Se connecter
      </button>
    </form>
  );
};

export default Login;
