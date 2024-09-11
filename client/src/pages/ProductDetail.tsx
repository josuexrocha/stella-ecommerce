import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStarDetail } from "../hooks/useStarDetail";
import { addToCart, getCart } from "../services/api";
import { FaHeart, FaStar } from "react-icons/fa";
import FadeInSection from "../components/FadeInSection";
import StarCard from "../components/StarCard";
import type { Star, CartItem } from "../types";

const ProductDetail: React.FC = () => {
  const { starid } = useParams<{ starid: string }>();

  const { star, relatedStars, loading, error } = useStarDetail(starid || "");
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState<string | null>(null);
  const [inCart, setInCart] = useState(false);

  // Vérification si l'étoile est déjà dans le panier
  useEffect(() => {
    const checkIfInCart = async () => {
      try {
        const cart = await getCart(); // `getCart` retourne un `Cart`
        const isInCart = cart.cartItems.some((item: CartItem) => item.starId === starid);
        setInCart(isInCart);
      } catch (error) {
        console.error("Erreur lors de la récupération du panier:", error);
      }
    };

    checkIfInCart();
  }, [starid]);

  const handleAddToCart = async () => {
    try {
      setCartLoading(true);
      await addToCart(starid || "", 1);
      setInCart(true); // Marquer l'article comme ajouté
      alert("Étoile ajoutée au panier !");
    } catch (err) {
      setCartError(`Erreur lors de l'ajout au panier: ${(err as Error).message}`);
      console.error(err);
    } finally {
      setCartLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-text">Chargement des détails de l'étoile...</p>;
  }

  if (error || !star) {
    return (
      <p className="text-center text-red-600">Erreur lors du chargement des détails de l'étoile.</p>
    );
  }

  const price = typeof star.price === "string" ? Number.parseFloat(star.price) : star.price;

  return (
    <FadeInSection>
      <div className="container mx-auto pt-20 px-4">
        <div className="flex flex-col md:flex-row items-start">
          <div className="md:w-1/2">
            <img
              src={`/assets/images/stars/${star.name.toLowerCase().replace(/\s+/g, "")}.jpg`}
              alt={star.name}
              className="w-full h-auto object-cover rounded-md"
            />
          </div>

          <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
            <h1 className="text-4xl font-display mb-4">{star.name}</h1>
            <p className="text-lg font-serif mb-6">{star.description}</p>
            <ul className="text-lg font-serif mb-6">
              <li>
                <strong>Constellation :</strong> {star.constellation}
              </li>
              <li>
                <strong>Distance de la Terre :</strong> {star.distanceFromEarth} al
              </li>
              <li>
                <strong>Luminosité :</strong> {star.luminosity} L
              </li>
              <li>
                <strong>Magnitude :</strong> {star.magnitude}
              </li>
              <li>
                <strong>Masse :</strong> {star.mass} M
              </li>
            </ul>
            <p className="text-2xl font-bold mb-4">
              {price ? `${price.toFixed(2)} €` : "Prix non disponible"}
            </p>

            <div className="flex items-center space-x-4">
              <button
                type="button"
                className={`btn ${inCart ? "bg-gray-500 cursor-not-allowed" : ""}`}
                onClick={handleAddToCart}
                disabled={inCart || cartLoading}
              >
                {inCart ? "Ajouté" : cartLoading ? "Ajout..." : "Ajouter au panier"}
              </button>
              <button type="button" className="text-special text-3xl">
                <FaHeart />
              </button>
              <button type="button" className="text-special text-3xl">
                <FaStar />
              </button>
            </div>
            {cartError && <p className="text-red-600 mt-4">{cartError}</p>}
          </div>
        </div>

        {/* Section des étoiles similaires */}
        <section className="mt-12">
          <h2 className="text-3xl font-display mb-6">Vous pouvez aimer aussi :</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedStars.map((relatedStar: Star) => (
              <StarCard key={relatedStar.starid} star={relatedStar} />
            ))}
          </div>
        </section>
      </div>
    </FadeInSection>
  );
};

export default ProductDetail;
