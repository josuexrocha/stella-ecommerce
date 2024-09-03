import { useState } from "react";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="container mx-auto pt-20 px-4 max-w-md">
      <h1 className="text-4xl font-display mb-8 text-center">
        {isLogin ? "Connexion" : "Inscription"}
      </h1>
      <form className="space-y-4 bg-secondary text-text p-6 rounded-md shadow-lg">
        {!isLogin && (
          <>
            <div>
              <label className="block text-sm font-serif mb-2">Nom :</label>
              <input
                type="text"
                placeholder="Nom"
                className="w-full p-3 rounded-md bg-primary text-text placeholder-text"
              />
            </div>
            <div>
              <label className="block text-sm font-serif mb-2">Prénom :</label>
              <input
                type="text"
                placeholder="Prénom"
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
            className="w-full p-3 rounded-md bg-primary text-text placeholder-text"
          />
        </div>
        <div>
          <label className="block text-sm font-serif mb-2">Mot de passe :</label>
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full p-3 rounded-md bg-primary text-text placeholder-text"
          />
        </div>
        <button
          type="submit"
          className="btn"
        >
          {isLogin ? "Se connecter" : "S'inscrire"}
        </button>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm font-serif text-text">
          {isLogin ? "Pas encore de compte ?" : "Vous avez déjà un compte ?"}
          <button
            type="button"
            onClick={toggleAuthMode}
            className="btn ml-4"
          >
            {isLogin ? "S'inscrire" : "Se connecter"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
