// public/js/index.js

document.addEventListener("DOMContentLoaded", () => {
  loadLatestStars();
  initializeFunFacts();
  initializeParallaxEffect();
});

async function loadLatestStars() {
  try {
    const response = await fetch("/api/stars?limit=4&sort=createdAt,desc");
    if (!response.ok) throw new Error("Erreur lors du chargement des étoiles");
    const stars = await response.json();
    displayStars(stars);
  } catch (error) {
    console.error("Erreur:", error);
    document.getElementById("nouveautes").innerHTML =
      '<p class="text-red-400">Impossible de charger les nouveautés pour le moment.</p>';
  }
}

function displayStars(stars) {
  const container = document.getElementById("nouveautes");
  container.innerHTML = "";
  stars.forEach((star, index) => {
    const card = document.createElement("div");
    card.className =
      "bg-white bg-opacity-10 rounded-lg shadow-lg p-6 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg";
    card.style.animationDelay = `${index * 0.1}s`;
    card.innerHTML = `
            <h3 class="font-orbitron font-semibold text-xl mb-3">${star.name}</h3>
            <p class="text-purple-300 mb-2">${star.constellation}</p>
            <p class="text-yellow-400 text-2xl mb-4">${star.price.toFixed(2)} €</p>
            <a href="/star/${star.id}" class="inline-block bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition duration-300">Découvrir</a>
        `;
    container.appendChild(card);
    setTimeout(() => card.classList.add("opacity-100"), 50);
  });
}

const funFacts = [
  "La plus proche étoile de la Terre, après le Soleil, est Proxima Centauri, située à 4,2 années-lumière.",
  "Il y a plus d'étoiles dans l'univers que de grains de sable sur toutes les plages de la Terre.",
  "Certaines étoiles sont si grandes que si elles remplaçaient notre Soleil, elles engloberaient l'orbite de Jupiter.",
  "Les étoiles ne scintillent pas réellement, c'est l'atmosphère terrestre qui crée cette illusion.",
  "La couleur d'une étoile indique sa température : les étoiles bleues sont les plus chaudes, les rouges les plus froides.",
];

function initializeFunFacts() {
  const container = document.getElementById("fun-facts");
  let currentIndex = 0;

  function updateFact() {
    container.style.opacity = "0";
    setTimeout(() => {
      container.textContent = funFacts[currentIndex];
      container.style.opacity = "1";
      currentIndex = (currentIndex + 1) % funFacts.length;
    }, 500);
  }

  updateFact();
  setInterval(updateFact, 10000); // Change toutes les 10 secondes
}

function initializeParallaxEffect() {
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll(".parallax");
    parallaxElements.forEach((el) => {
      const speed = el.dataset.speed || 0.5;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}
