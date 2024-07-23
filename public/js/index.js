// public/js/index.js

document.addEventListener('DOMContentLoaded', () => {
    loadLatestStars();
    initializeFunFacts();
});

async function loadLatestStars() {
    try {
        const response = await fetch('/api/stars?limit=4&sort=createdAt,desc');
        if (!response.ok) throw new Error('Erreur lors du chargement des étoiles');
        const stars = await response.json();
        displayStars(stars);
    } catch (error) {
        console.error('Erreur:', error);
        document.getElementById('nouveautes').innerHTML = '<p>Impossible de charger les nouveautés pour le moment.</p>';
    }
}

function displayStars(stars) {
    const container = document.getElementById('nouveautes');
    container.innerHTML = '';
    stars.forEach(star => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-md p-4';
        card.innerHTML = `
            <h3 class="font-semibold text-lg mb-2">${star.name}</h3>
            <p class="text-gray-600 mb-2">${star.constellation}</p>
            <p class="text-gray-800">${star.price.toFixed(2)} €</p>
            <a href="/star/${star.id}" class="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Voir détails</a>
        `;
        container.appendChild(card);
    });
}

const funFacts = [
    "La plus proche étoile de la Terre, après le Soleil, est Proxima Centauri, située à 4,2 années-lumière.",
    "Il y a plus d'étoiles dans l'univers que de grains de sable sur toutes les plages de la Terre.",
    "Certaines étoiles sont si grandes que si elles remplaçaient notre Soleil, elles engloberaient l'orbite de Jupiter.",
    "Les étoiles ne scintillent pas réellement, c'est l'atmosphère terrestre qui crée cette illusion.",
    "La couleur d'une étoile indique sa température : les étoiles bleues sont les plus chaudes, les rouges les plus froides."
];

function initializeFunFacts() {
    const container = document.getElementById('fun-facts');
    let currentIndex = 0;

    function updateFact() {
        container.style.opacity = '0';
        setTimeout(() => {
            container.textContent = funFacts[currentIndex];
            container.style.opacity = '1';
            currentIndex = (currentIndex + 1) % funFacts.length;
        }, 500);
    }

    updateFact();
    setInterval(updateFact, 10000); // Change toutes les 10 secondes
}