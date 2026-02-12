const movieData = {
    'new-releases': [
        { title: 'The Silent Sea', desc: 'A mission on the moon.', id: 101 },
        { title: 'Cyber Drift', desc: 'Neon racing in the future.', id: 102 },
        { title: 'Red Notice', desc: 'Art thieves and agents.', id: 103 },
        { title: 'Outer Banks', desc: 'Hunting for lost gold.', id: 104 },
        { title: 'Extraction', desc: 'High-stakes rescue mission.', id: 110 }
    ],
    'continue-watching': [
        { title: 'Stranger Things', desc: 'S4: E5 Mystery in Hawkins.', id: 105 },
        { title: 'The Witcher', desc: 'S2: E1 Monster hunting.', id: 106 },
        { title: 'The Crown', desc: 'S5: E2 Royal drama.', id: 111 },
        { title: 'Mindhunter', desc: 'S1: E4 Profiling killers.', id: 112 }
    ],
    'recommended': [
        { title: 'Dark', desc: 'Time travel and secrets.', id: 107 },
        { title: 'Inception', desc: 'Stealing dreams.', id: 108 },
        { title: 'Arcane', desc: 'Steampunk sisterhood.', id: 109 },
        { title: 'Peaky Blinders', desc: 'Gangsters in Birmingham.', id: 113 },
        { title: 'Black Mirror', desc: 'Tech gone wrong.', id: 114 }
    ]
};

function getRandomRating() {
    return (Math.random() * (4.8 - 3.5) + 3.5).toFixed(1);
}

function createMovieCard(movie) {
    const rating = getRandomRating();
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
        grid.innerHTML = ""; // Clear existing
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
