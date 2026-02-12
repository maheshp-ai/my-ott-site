const movieData = {
    'new-releases': [
        { title: 'The Silent Sea', desc: 'A perilous mission on the moon.', id: 101 },
        { title: 'Cyber Drift', desc: 'Neon racing in a future city.', id: 102 },
        { title: 'Red Notice', desc: 'A global warrant for art thieves.', id: 103 },
        { title: 'Outer Banks', desc: 'Teenagers hunting for gold.', id: 104 }
    ],
    'continue-watching': [
        { title: 'Stranger Things', desc: 'Mystery in Hawkins, Indiana.', id: 105 },
        { title: 'The Witcher', desc: 'Geralt fights monsters.', id: 106 }
    ],
    'recommended': [
        { title: 'Dark', desc: 'Time travel and family secrets.', id: 107 },
        { title: 'Inception', desc: 'Entering dreams to steal secrets.', id: 108 },
        { title: 'Arcane', desc: 'Steampunk action and sisterhood.', id: 109 }
    ]
};

function getRandomRating() {
    return (Math.random() * (4.8 - 3.5) + 3.5).toFixed(1);
}

function createMovieCard(movie) {
    const rating = getRandomRating();
    // Using a placeholder service with a random keyword to get "movie-like" shots
    const imageUrl = `https://picsum.photos/seed/${movie.id}/400/225`;
    
    return `
        <div class="movie-card">
            <div class="rating">⭐ ${rating}</div>
            <img src="${imageUrl}" alt="${movie.title}">
            <div class="card-details">
                <h3>${movie.title}</h3>
                <p>${movie.desc}</p>
                <button class="play-btn" onclick="openModal('${movie.title}', '${movie.desc}')">▶ Play</button>
            </div>
        </div>
    `;
}

function initSite() {
    for (const category in movieData) {
        const grid = document.querySelector(`#${category} .movie-grid`);
        movieData[category].forEach(movie => {
            grid.innerHTML += createMovieCard(movie);
        });
    }
}

function searchMovies() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const cards = document.querySelectorAll('.movie-card');
    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = title.includes(query) ? "block" : "none";
    });
}

function openModal(title, desc) {
    const modal = document.getElementById('movieModal');
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDesc').innerText = desc;
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('movieModal').style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById('movieModal')) closeModal();
}

initSite();
