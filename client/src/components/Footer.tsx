// client/src/components/Footer.tsx

import type React from "react";

const Footer: React.FC = () => {
  return (
    <footer role="contentinfo" className="bg-secondary text-text py-6 mt-12">
      <div className="container mx-auto text-center">
        <div className="font-serif">
          <a href="/faq" className="mx-2 hover:text-white">
            FAQ
          </a>
          <a href="/contact" className="mx-2 hover:text-white">
            Contact
          </a>
          <a href="/about" className="mx-2 hover:text-white">
            À propos
          </a>
        </div>
        <p>&copy; 2024 Stella. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
