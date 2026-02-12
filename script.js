const movieData = {
    'new-releases': [
        { title: 'The Void', desc: 'Space adventure.', id: 'tile-001' },
        { title: 'Neon City', desc: 'Cyberpunk life.', id: 'tile-002' },
        { title: 'Skyline', desc: 'Urban exploration.', id: 'tile-003' },
        { title: 'Midnight', desc: 'Thriller in the dark.', id: 'tile-004' },
        { title: 'Future Boy', desc: 'Sci-fi drama.', id: 'tile-005' }
    ],
    'continue-watching': [
        { title: 'Lost Woods', desc: 'Mystery thriller.', id: 'tile-006' },
        { title: 'Deep Blue', desc: 'Underwater journey.', id: 'tile-007' },
        { title: 'The Peak', desc: 'Climbing documentary.', id: 'tile-008' }
    ],
    'recommended': [
        { title: 'Chef Life', desc: 'Reality cooking.', id: 'tile-009' },
        { title: 'Speedway', desc: 'Racing drama.', id: 'tile-010' },
        { title: 'The Loop', desc: 'Time travel mystery.', id: 'tile-011' },
        { title: 'Wildlife', desc: 'Nature docuseries.', id: 'tile-012' }
    ]
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getRandomRating() {
    return (Math.random() * (4.8 - 3.5) + 3.5).toFixed(1);
}

// THIS FUNCTION NOW EXPLICITLY BINDS THE ID TO THE TILE
function createMovieCard(movie) {
    const rating = getRandomRating();
    const imageUrl = `https://picsum.photos/seed/${movie.id}/400/225`;
    
    return `
        <div class="movie-card" id="${movie.id}">
            <div class="id-tag">ID: ${movie.id}</div>
            <div class="rating">★ ${rating}</div>
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
        grid.innerHTML = ""; 
        const shuffled = shuffleArray([...movieData[category]]);
        shuffled.forEach(movie => {
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

initSite();
