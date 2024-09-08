// client/src/components/AuthContainer.tsx

import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const AuthContainer: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="container mx-auto pt-20 px-4 max-w-md">
      <h1 className="text-4xl font-display mb-8 text-center">
        {isLogin ? "Connexion" : "Inscription"}
      </h1>
      {isLogin ? <Login /> : <Register />}
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

export default AuthContainer;
