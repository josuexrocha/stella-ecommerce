import { useState, useEffect } from "react";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
  getCart,
  getWishlist,
} from "../services/api";
import { useNavigate } from "react-router-dom";
import type { CartItem, WishlistItem, ApiResponse, User, Cart } from "../types";

const Profile: React.FC = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, _setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  // Récupération du profil utilisateur, du panier et de la liste d'envies
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile();
      fetchCartItems();
      fetchWishlistItems();
    } else {
      console.error("Token JWT non trouvé ou invalide");
    }
  }, []);

  // Fonction pour récupérer le profil de l'utilisateur
  const fetchUserProfile = async () => {
    try {
      const user = await getUserProfile();
      if (user) {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
      } else {
        console.error("Profil non trouvé ou réponse invalide");
      }
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération du profil utilisateur", error);
      setLoading(false);
    }
  };

  // Fonction pour récupérer les articles du panier
  const fetchCartItems = async () => {
    try {
      const cart = await getCart();
      console.log("Cart Items:", cart.cartItems); // Ajoute cette ligne pour voir les données récupérées
      setCartItems(cart.cartItems);
    } catch (error) {
      console.error("Erreur lors de la récupération du panier", error);
    }
  };

  // Fonction pour récupérer la liste d'envies
  const fetchWishlistItems = async () => {
    try {
      const response: ApiResponse<WishlistItem[]> = await getWishlist();
      setWishlistItems(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération de la liste d'envies", error);
    }
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    if (window.confirm("Vous êtes déconnecté. Vous allez être redirigé vers la page d'accueil.")) {
      localStorage.removeItem("token");
      navigate("/"); // Redirection vers la page d'accueil après déconnexion
    }
  };

  // Fonction pour mettre à jour le profil utilisateur
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfile({ firstName, lastName, email });
      alert("Profil mis à jour avec succès !");
      setIsEditingProfile(false); // Sortir du mode édition
      fetchUserProfile();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil", error);
    }
  };

  // Fonction pour supprimer le compte utilisateur
  const handleDeleteAccount = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
      try {
        await deleteUserAccount(); // Appel de l'API de suppression
        alert("Compte supprimé avec succès.");
        localStorage.removeItem("token"); // Supprime le token du stockage local
        navigate("/"); // Redirige vers la page d'accueil après suppression
      } catch (error) {
        console.error("Erreur lors de la suppression du compte", error);
      }
    }
  };

  if (loading) {
    return <p>Chargement des informations...</p>;
  }

  return (
    <div className="container mx-auto pt-20 px-4 max-w-md">
      {/* Message de bienvenue personnalisé */}
      <h1 className="text-4xl font-display mb-8 text-center">Bonjour, {firstName}</h1>

      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

      <div className="space-y-4 bg-secondary text-text p-6 rounded-md shadow-lg">
        {isEditingProfile ? (
          <form onSubmit={handleProfileUpdate}>
            <div>
              <label className="block text-sm font-serif mb-2">Prénom :</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 rounded-md bg-primary text-text"
              />
            </div>
            <div>
              <label className="block text-sm font-serif mb-2">Nom :</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 rounded-md bg-primary text-text"
              />
            </div>
            <div>
              <label className="block text-sm font-serif mb-2">Email :</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md bg-primary text-text"
              />
            </div>
            <button type="submit" className="btn">
              Enregistrer les modifications
            </button>
            <button type="button" className="btn mt-4" onClick={() => setIsEditingProfile(false)}>
              Annuler
            </button>
          </form>
        ) : (
          <>
            <p className="text-lg font-serif">
              Nom : {firstName} {lastName}
            </p>
            <p className="text-lg font-serif">Email : {email}</p>
            <button type="button" className="btn" onClick={() => setIsEditingProfile(true)}>
              Modifier le profil
            </button>
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

            {/* Affichage du panier */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold">Votre panier</h2>
              {cartItems.length > 0 ? (
                cartItems.map((item) =>
                  item.Star ? ( // Assure-toi que "Star" est bien en majuscule et existe
                    <div key={item.id} className="mb-4">
                      <h2 className="text-xl">{item.Star.name}</h2>
                      <p>{item.Star.description}</p>
                      <p>Quantité : {item.quantity}</p>
                      <p>Prix : {item.Star.price} €</p>
                    </div>
                  ) : (
                    <div key={item.id}>
                      <p>L'étoile associée à cet article est introuvable.</p>
                    </div>
                  ),
                )
              ) : (
                <p>Votre panier est vide.</p>
              )}
            </div>

            {/* Affichage de la liste d'envies */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold">Votre liste d'envies</h2>
              {wishlistItems && wishlistItems.length > 0 ? (
                <ul>
                  {wishlistItems.map((item) => (
                    <li key={item.id}>{item.star.name}</li>
                  ))}
                </ul>
              ) : (
                <p>Votre liste d'envies est vide.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
