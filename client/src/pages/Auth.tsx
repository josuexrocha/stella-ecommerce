// client/src/pages/Auth.tsx

import { useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  // Vérification de l'état de connexion
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // Si un token est présent, l'utilisateur est considéré comme connecté
    }
  }, []);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      if (isLogin) {
        // Connexion
        const response = await loginUser({ email, password });
        localStorage.setItem("token", response.data.token); // Stocker le token JWT
        setIsAuthenticated(true); // Mettre à jour l'état de connexion
        alert("Connexion réussie !");
        navigate("/"); // Redirection vers la page d'accueil
      } else {
        // Inscription
        const response = await registerUser({
          username: email.split("@")[0],
          email,
          password,
          firstName,
          lastName,
        });
        alert("Inscription réussie !");
        navigate("/"); // Redirection vers la page d'accueil
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || "Une erreur est survenue.";
      if (message.includes("Email already in use")) {
        setErrorMessage("Cet email est déjà utilisé. Veuillez en choisir un autre.");
      } else {
        setErrorMessage(message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false); // Mettre à jour l'état de connexion
    navigate("/login");
  };

  if (isAuthenticated) {
    return (
      <div className="container mx-auto pt-20 px-4 max-w-md">
        <h1 className="text-4xl font-display mb-8 text-center">Bienvenue sur votre profil</h1>
        <div className="space-y-4 bg-secondary text-text p-6 rounded-md shadow-lg">
          <p className="text-lg font-serif">Email : {email}</p>
          <p className="text-lg font-serif">Nom : {firstName} {lastName}</p>
          <button className="btn" onClick={handleLogout}>
            Se déconnecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-20 px-4 max-w-md">
      <h1 className="text-4xl font-display mb-8 text-center">
        {isLogin ? "Connexion" : "Inscription"}
      </h1>
      <form
        className="space-y-4 bg-secondary text-text p-6 rounded-md shadow-lg"
        onSubmit={handleSubmit}
      >
        {!isLogin && (
          <>
            <div>
              <label className="block text-sm font-serif mb-2">Nom :</label>
              <input
                type="text"
                placeholder="Nom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 rounded-md bg-primary text-text placeholder-text"
              />
            </div>
            <div>
              <label className="block text-sm font-serif mb-2">Prénom :</label>
              <input
                type="text"
                placeholder="Prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 rounded-md bg-primary text-text placeholder-text"
              />
            </div>
          </>
        )}
        <div>
          <label className="block text-sm font-serif mb-2">Email :</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md bg-primary text-text placeholder-text"
          />
        </div>
        <div>
          <label className="block text-sm font-serif mb-2">Mot de passe :</label>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md bg-primary text-text placeholder-text"
          />
        </div>
        {errorMessage && <p className="text-red-500 text-sm font-serif">{errorMessage}</p>}
        <button type="submit" className="btn">
          {isLogin ? "Se connecter" : "S'inscrire"}
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm font-serif text-text">
          {isLogin ? "Pas encore de compte ?" : "Vous avez déjà un compte ?"}
          <button type="button" onClick={toggleAuthMode} className="btn ml-4">
            {isLogin ? "S'inscrire" : "Se connecter"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
