import type React from "react";

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-display mb-6 text-center">Contactez-nous</h1>
      <div className="bg-secondary text-text p-6 rounded-md shadow-lg mb-8">
        <p className="text-lg font-serif mb-4">
          Vous avez des questions sur nos services ou besoin d'informations supplémentaires ? N'hésitez pas à nous contacter. Notre équipe est là pour vous répondre.
        </p>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nom</label>
            <input
              type="text"
              placeholder="Votre nom"
              className="w-full p-3 rounded-md bg-primary text-text placeholder-text"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Votre email"
              className="w-full p-3 rounded-md bg-primary text-text placeholder-text"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Sujet</label>
            <input
              type="text"
              placeholder="Sujet de votre message"
              className="w-full p-3 rounded-md bg-primary text-text placeholder-text"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              placeholder="Votre message..."
              className="w-full p-3 rounded-md bg-primary text-text placeholder-text"
              rows={5}
            />
          </div>
          <button
            type="submit"
            className="btn bg-primary text-white py-3 px-6 rounded-md hover:bg-secondary transition-colors"
          >
            Envoyer
          </button>
        </form>
      </div>
      <div className="bg-secondary text-text p-6 rounded-md shadow-lg">
        <h3 className="text-2xl font-display mb-4">Autres moyens de nous contacter</h3>
        <p className="text-lg font-serif">Email : contact@stella.com</p>
        <p className="text-lg font-serif">Téléphone : +33 1 23 45 67 89</p>
        <p className="text-lg font-serif">Adresse : 123 Rue des Étoiles, 75000 Paris, France</p>
      </div>
    </div>
  );
};

export default Contact;
