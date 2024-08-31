import type React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-text py-6 mt-12">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Stella. Tous droits réservés.</p>
        <div className="mt-4">
          <a href="/faq" className="mx-2 hover:text-white">FAQ</a>
          <a href="/contact" className="mx-2 hover:text-white">Contact</a>
          <a href="/about" className="mx-2 hover:text-white">À propos</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
