import { useState, useEffect } from "react";
import { loginUser, registerUser, getUserProfile, getCart, getWishlist, deleteUserAccount } from "../services/api";
import type { CartItem, WishlistItem, ApiResponse, User, Cart } from "../types";  // Importer 'Cart'
import { useNavigate } from "react-router-dom";


const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const navigate = useNavigate();

  // Vérification de l'état de connexion
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      fetchUserProfile();
      fetchCartItems();
      fetchWishlistItems();
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response: ApiResponse<User> = await getUserProfile();
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmail(response.data.email);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response: ApiResponse<Cart> = await getCart();  // Typage correct pour ApiResponse<Cart>
      setCartItems(response.data.cartItems);  // Accéder à cartItems dans l'objet Cart
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const fetchWishlistItems = async () => {
    try {
      const response: ApiResponse<WishlistItem[]> = await getWishlist();
      setWishlistItems(response.data);
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      if (isLogin) {
        const response = await loginUser({ email, password });
        const data: { token: string } = response.data; // Typage correct de la donnée renvoyée
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        alert("Connexion réussie !");
        navigate("/");
      } else {
        await registerUser({
          username: email.split("@")[0],
          email,
          password,
          firstName,
          lastName,
        });
        alert("Inscription réussie !");
        navigate("/");
      }
    } catch (error: unknown) {
      if (error instanceof Error && error?.message) {
        setErrorMessage(
          error.message.includes("Email already in use")
            ? "Cet email est déjà utilisé."
            : "Une erreur est survenue.",
        );
      } else {
        setErrorMessage("Une erreur est survenue.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
      try {
        await deleteUserAccount();
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/");
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  if (isAuthenticated) {
    return (
      <div className="container mx-auto pt-20 px-4 max-w-md">
        <h1 className="text-4xl font-display mb-8 text-center">Votre profil</h1>
        <div className="space-y-4 bg-secondary text-text p-6 rounded-md shadow-lg">
          <p className="text-lg font-serif">Email : {email}</p>
          <p className="text-lg font-serif">
            Nom : {firstName} {lastName}
          </p>

          <button type="button" className="btn" onClick={handleLogout}>
            Se déconnecter
          </button>
          <button
            type="button"
            className="btn bg-red-500 text-white mt-4"
            onClick={handleDeleteAccount}
          >
            Supprimer le compte
          </button>

          <div className="mt-8">
            <h2 className="text-2xl font-bold">Votre Panier</h2>
            {cartItems.length > 0 ? (
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id}>
                    {item.star.name} - {item.quantity}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Votre panier est vide.</p>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold">Votre Liste d'envies</h2>
            {wishlistItems.length > 0 ? (
              <ul>
                {wishlistItems.map((item) => (
                  <li key={item.id}>{item.star.name}</li>
                ))}
              </ul>
            ) : (
              <p>Votre liste d'envies est vide.</p>
            )}
          </div>
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
