import { useState, useEffect, memo } from "react";
import { getUserProfile, updateUserProfile, deleteUserAccount, getWishlist } from "../services/api";
import { useNavigate } from "react-router-dom";
import type { WishlistItem, User } from "../types";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext"; // Importation du contexte de panier
import FadeInSection from "./FadeInSection";

const Profile: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const { cartItems } = useCart(); // Utilisation du contexte de panier pour accéder aux items
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserProfile();
      fetchWishlistItems();
    }
  }, [isAuthenticated]);

  const fetchUserProfile = async () => {
    try {
      const user: User = await getUserProfile();
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération du profil utilisateur", error);
      setLoading(false);
    }
  };

  const fetchWishlistItems = async () => {
    try {
      const response = await getWishlist();
      setWishlistItems(response.data || []); // Assurez-vous que 'data' est défini ou attribuez un tableau vide
    } catch (error) {
      console.error("Erreur lors de la récupération de la liste d'envies", error);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfile({ firstName, lastName, email });
      alert("Profil mis à jour avec succès !");
      setIsEditingProfile(false);
      fetchUserProfile();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil", error);
      setErrorMessage("Erreur lors de la mise à jour du profil.");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Vous êtes déconnecté. Vous allez être redirigé vers la page d'accueil.")) {
      logout();
      navigate("/");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
      try {
        await deleteUserAccount();
        alert("Compte supprimé avec succès.");
        logout();
        navigate("/");
      } catch (error) {
        console.error("Erreur lors de la suppression du compte", error);
      }
    }
  };

  if (loading) {
    return <p>Chargement des informations...</p>;
  }

  return (
    <div role="contentinfo" className="container mx-auto pt-20 px-4 max-w-md">
      <h1 className="text-4xl font-display mb-8 text-center">Bonjour, {firstName}</h1>

      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      <FadeInSection>
        <div role="form" className="space-y-4 bg-secondary text-text p-6 rounded-md shadow-lg">
          {isEditingProfile ? (
            <form onSubmit={handleProfileUpdate}>
              <div>
                <label className="block text-sm font-serif mb-2">Prénom :</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 rounded-md bg-primary text-text"
                  aria-label="Prénom"
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
                  aria-label="Nom"
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
                  aria-label="Email"
                  placeholder="Email"
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
            </>
          )}

          {/* Affichage du panier */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Votre panier</h2>
            {cartItems.length > 0 ? (
              cartItems.map((item) =>
                item.Star ? (
                  <div key={item.id} className="mb-4">
                    <h2 className="text-xl">{item.Star.name}</h2>
                    <p>
                      {item.quantity} x {item.Star.price} €
                    </p>
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
              wishlistItems.map((item) => <div key={item.id}>{item.star.name}</div>)
            ) : (
              <p>Votre liste d'envies est vide.</p>
            )}
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default memo(Profile);
