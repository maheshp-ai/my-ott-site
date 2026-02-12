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

let watchlist = [];

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

function createMovieCard(movie, isWatchlist = false) {
    const rating = getRandomRating();
    const imageUrl = `https://picsum.photos/seed/${movie.id}/400/225`;
    const likedClass = watchlist.some(m => m.id === movie.id) ? 'liked' : '';
    
    return `
        <div class="movie-card" id="${isWatchlist ? 'wl-' : ''}${movie.id}">
            <button class="like-btn ${likedClass}" onclick="toggleWatchlist('${movie.id}')">❤</button>
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

function toggleWatchlist(movieId) {
    // Find movie in any category
    let movie;
    for (const cat in movieData) {
        const found = movieData[cat].find(m => m.id === movieId);
        if (found) { movie = found; break; }
    }

    const index = watchlist.findIndex(m => m.id === movieId);
    if (index === -1) {
        watchlist.push(movie); // Add to list
    } else {
        watchlist.splice(index, 1); // Remove from list
    }

    updateWatchlistUI();
    initSite(); // Re-render main categories to sync the heart colors
}

function updateWatchlistUI() {
    const wlSection = document.getElementById('my-list');
    const wlGrid = wlSection.querySelector('.movie-grid');
    
    if (watchlist.length > 0) {
        wlSection.style.display = 'block';
        wlGrid.innerHTML = "";
        watchlist.forEach(movie => {
            wlGrid.innerHTML += createMovieCard(movie, true);
        });
    } else {
        wlSection.style.display = 'none';
    }
}

function initSite() {
    for (const category in movieData) {
        const grid = document.querySelector(`#${category} .movie-grid`);
        if (!grid) continue;
        grid.innerHTML = ""; 
        const items = [...movieData[category]]; // We aren't shuffling here to keep UI stable during "likes"
        items.forEach(movie => {
            grid.innerHTML += createMovieCard(movie);
        });
    }
}

// Search, Modal, and Scroll logic remains same
function searchMovies() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    document.querySelectorAll('.movie-card').forEach(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = title.includes(query) ? "block" : "none";
    });
}

function openModal(title, desc) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDesc').innerText = desc;
    document.getElementById('movieModal').style.display = 'block';
}

function closeModal() { document.getElementById('movieModal').style.display = 'none'; }

window.onscroll = function() {
    const btn = document.getElementById("backToTop");
    btn.style.display = (window.scrollY > 300) ? "block" : "none";
};

function scrollToTop() { window.scrollTo({top: 0, behavior: 'smooth'}); }

initSite();
