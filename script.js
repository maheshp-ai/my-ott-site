const movieData = {
    'new-releases': [
        { title: 'The Void', desc: 'Space adventure.', id: 201 },
        { title: 'Neon City', desc: 'Cyberpunk life.', id: 202 },
        { title: 'Skyline', desc: 'Urban exploration.', id: 203 },
        { title: 'Midnight', desc: 'Thriller in the dark.', id: 204 },
        { title: 'Future Boy', desc: 'Sci-fi drama.', id: 205 }
    ],
    'continue-watching': [
        { title: 'Lost Woods', desc: 'Mystery thriller.', id: 206 },
        { title: 'Deep Blue', desc: 'Underwater journey.', id: 207 },
        { title: 'The Peak', desc: 'Climbing documentary.', id: 208 },
        { title: 'Echoes', desc: 'Haunted pasts.', id: 213 }
    ],
    'recommended': [
        { title: 'Chef Life', desc: 'Reality cooking.', id: 209 },
        { title: 'Speedway', desc: 'Racing drama.', id: 210 },
        { title: 'The Loop', desc: 'Time travel mystery.', id: 211 },
        { title: 'Wildlife', desc: 'Nature docuseries.', id: 212 }
    ]
};

// --- NEW SHUFFLE LOGIC ---
/**
 * Fisher-Yates Shuffle Algorithm
 * Randomizes the order of elements in an array
 */
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

function createMovieCard(movie) {
    const rating = getRandomRating();
    const imageUrl = `https://picsum.photos/seed/${movie.id}/400/225`;
    
    return `
        <div class="movie-card">
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
        
        // Shuffle the specific category array before displaying
        const shuffledCategory = shuffleArray([...movieData[category]]);
        
        shuffledCategory.forEach(movie => {
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
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('movieModal').style.display = 'none';
}

// Initial Load
initSite();
