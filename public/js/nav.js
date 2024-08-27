// public/js/nav.js

/* global document, localStorage, window */

document.addEventListener("DOMContentLoaded", () => {
  updateNavigation();
});

async function updateNavigation() {
  const isLoggedIn = checkLoginStatus();
  let userProfile = null;
  if (isLoggedIn) {
    userProfile = await getUserProfile();
  }

  const navContent = `
        <div class="container mx-auto flex justify-between items-center">
            <a href="/" class="text-xl font-bold">Stella</a>
            <ul class="flex space-x-4">
                <li><a href="/" class="hover:text-gray-300">Accueil</a></li>
                <li><a href="/catalog.html" class="hover:text-gray-300">Catalogue</a></li>
                ${
                  isLoggedIn
                    ? `
                    <li><a href="/cart.html" class="hover:text-gray-300">Panier</a></li>
                    <li><a href="/profile.html" class="hover:text-gray-300">Profil</a></li>
                    <li><span class="text-gray-300">${userProfile ? userProfile.firstName : ""}</span></li>
                    <li><a href="#" onclick="logout()" class="hover:text-gray-300">Déconnexion</a></li>
                    ${
                      userProfile && userProfile.role === "admin"
                        ? '<li><a href="/admin.html" class="hover:text-gray-300">Admin</a></li>'
                        : ""
                    }
                    `
                    : `
                    <li><a href="/login.html" class="hover:text-gray-300">Connexion</a></li>
                    <li><a href="/register.html" class="hover:text-gray-300">Inscription</a></li>
                    `
                }
            </ul>
        </div>
    `;

  document.querySelector("nav").innerHTML = navContent;
}

function checkLoginStatus() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  // Vérifiez si le token est expiré
  const payload = JSON.parse(atob(token.split(".")[1]));
  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    return false;
  }

  return true;
}

async function getUserProfile() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await fetch("/api/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch user profile");
    return await response.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

// eslint-disable-next-line no-unused-vars
function logout() {
  localStorage.removeItem("token");
  updateNavigation();
  window.location.href = "/";
}
