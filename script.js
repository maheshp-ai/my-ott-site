const categories = {
    'new-releases': [
        { title: 'The Void', desc: 'Space adventure.' },
        { title: 'Neon City', desc: 'Cyberpunk life.' }
    ],
    'continue-watching': [
        { title: 'Lost Woods', desc: 'Mystery thriller.' }
    ],
    'recommended': [
        { title: 'Chef Life', desc: 'Reality cooking.' },
        { title: 'Speedway', desc: 'Racing drama.' }
    ]
};

function generateRating() {
    return (Math.random() * (4.8 - 3.5) + 3.5).toFixed(1);
}

function createMovieCard(movie) {
    return `
        <div class="movie-card">
            <div class="rating">⭐ ${generateRating()}</div>
            <div class="content">
                <h3>${movie.title}</h3>
                <p>${movie.desc}</p>
                <button class="play-btn">▶ Play</button>
            </div>
        </div>
    `;
}

// Populate the sections
Object.keys(categories).forEach(id => {
    const grid = document.querySelector(`#${id} .movie-grid`);
    categories[id].forEach(movie => {
        grid.innerHTML += createMovieCard(movie);
    });
});
