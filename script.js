// 1. Dummy Data
const movieData = {
    'new-releases': [
        { title: 'The Silent Sea', desc: 'A perilous 24-hour mission on the moon.' },
        { title: 'Cyber Drift', desc: 'Street racing in a neon-soaked future.' },
        { title: 'Red Notice', desc: 'An Interpol-issued alert is a global warrant.' },
        { title: 'Outer Banks', desc: 'A group of teenagers find a treasure map.' }
    ],
    'continue-watching': [
        { title: 'Stranger Things', desc: 'S4: E5 "The Nina Project"' },
        { title: 'The Witcher', desc: 'S2: E1 "A Grain of Truth"' }
    ],
    'recommended': [
        { title: 'Dark', desc: 'A family saga with a supernatural twist.' },
        { title: 'Inception', desc: 'A thief who steals corporate secrets.' },
        { title: 'Arcane', desc: 'The origins of two iconic League champions.' }
    ]
};

// 2. Generate Random Rating (3.5 - 4.8)
function getRandomRating() {
    return (Math.random() * (4.8 - 3.5) + 3.5).toFixed(1);
}

// 3. Create Card HTML
function createMovieCard(movie) {
    const rating = getRandomRating();
    return `
        <div class="movie-card">
            <div class="rating">⭐ ${rating}</div>
            <div class="card-details">
                <h3>${movie.title}</h3>
                <p>${movie.desc}</p>
                <button class="play-btn" onclick="openModal('${movie.title}', '${movie.desc}')">▶ Play Now</button>
            </div>
        </div>
    `;
}

// 4. Populate Sections on Load
function initSite() {
    for (const category in movieData) {
        const grid = document.querySelector(`#${category} .movie-grid`);
        movieData[category].forEach(movie => {
            grid.innerHTML += createMovieCard(movie);
        });
    }
}

// 5. Search Logic
function searchMovies() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const cards = document.querySelectorAll('.movie-card');

    cards.forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = title.includes(query) ? "block" : "none";
    });
}

// 6. Modal Logic
function openModal(title, desc) {
    const modal = document.getElementById('movieModal');
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDesc').innerText = desc;
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('movieModal').style.display = 'none';
}

// Close modal if user clicks outside of the box
window.onclick = function(event) {
    const modal = document.getElementById('movieModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Start the app
initSite();
