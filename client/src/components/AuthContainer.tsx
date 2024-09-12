// client/src/components/AuthContainer.tsx
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "./Login";
import Register from "./Register";

const AuthContainer: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  if (isAuthenticated) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="container mx-auto pt-20 px-4 max-w-md">
      <h1 className="text-4xl font-display mb-8 text-center">
        {isLogin ? "Connexion" : "Inscription"}
      </h1>
      {isLogin ? <Login /> : <Register />}
      <button type="button" onClick={() => setIsLogin(!isLogin)} className="btn mt-6">
        {isLogin ? "S'inscrire" : "Se connecter"}
      </button>
    </div>
  );
};

export default AuthContainer;
