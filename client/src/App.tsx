// client/src/App.tsx

import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import Header from "./components/Header";

// Lazy loading des pages
const Home = React.lazy(() => import("./pages/Home"));
const Catalog = React.lazy(() => import("./pages/Catalog"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const AuthContainer = React.lazy(() => import("./components/AuthContainer"));
const Profile = React.lazy(() => import("./components/Profile"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const FAQ = React.lazy(() => import("./pages/FAQ"));

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Vérifie si l'utilisateur est connecté

  return (
    <Router>
      <ErrorBoundary>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={<div className="text-center text-white">Chargement...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />  {/* Page d'accueil */}
                <Route path="/auth" element={<AuthContainer />} />  {/* Connexion/Inscription */}
                <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/auth" />} />  {/* Profil */}
                <Route path="/catalog" element={<Catalog />} /> {/* Catalogue */}
                <Route path="/product/:id" element={<ProductDetail />} /> {/* Détail d'un produit */}
                <Route path="/about" element={<About />} /> {/* À propos */}
                <Route path="/contact" element={<Contact />} /> {/* Contact */}
                <Route path="/faq" element={<FAQ />} /> {/* FAQ */}
                <Route path="*" element={<Navigate to="/" />} />  {/* Redirection par défaut vers la page d'accueil */}
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
