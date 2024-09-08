// client/src/components/Register.tsx

import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      await registerUser({
        username: email.split("@")[0],
        email,
        password,
        firstName,
        lastName,
      });
      alert("Inscription réussie !");
      navigate("/profile");
    } catch (error: unknown) {
      if (error instanceof Error && error?.message) {
        setErrorMessage(
          error.message.includes("Email already in use")
            ? "Cet email est déjà utilisé."
            : "Une erreur est survenue."
        );
      } else {
        setErrorMessage("Une erreur est survenue.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-secondary text-text p-6 rounded-md shadow-lg">
      <div>
        <label className="block text-sm font-serif mb-2">Prénom :</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-3 rounded-md bg-primary text-text"
          placeholder="Prénom"
        />
      </div>
      <div>
        <label className="block text-sm font-serif mb-2">Nom :</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-3 rounded-md bg-primary text-text"
          placeholder="Nom"
        />
      </div>
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
      <button type="submit" className="btn">S'inscrire</button>
    </form>
  );
};

export default Register;
