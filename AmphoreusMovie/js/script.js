const API_KEY = 'b2035964a070a334d6997917ffcbdf98'; 
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjAzNTk2NGEwNzBhMzM0ZDY5OTc5MTdmZmNiZGY5OCIsIm5iZiI6MTc3OTAyMjI5NC43ODMsInN1YiI6IjZhMDliOWQ2OGJmYTExNWU4MGVlNDRkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eUCMUbawZ0v2PFSVjPsBF1CcJD6VNOxYzadTNv8OuQI'; // Ton jeton

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`
  }
};


const apiPaths = [
    ['trending/all/day', 'trending/all/week'], 
    ['movie/top_rated', 'movie/popular'],      
    ['tv/top_rated', 'tv/popular']            
];

const choicesButtons = document.querySelectorAll('.choiceButton');
const movieLists = document.querySelectorAll('.movieList');


function formatDate(dateString) {
    if (!dateString) return 'Date inconnue';
    const date = new Date(dateString);
    let formatted = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
    return formatted.replace('.', ''); 
}


async function fetchAndRender(endpoint, container) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/${endpoint}?language=fr-FR&page=1`, options);
        const data = await response.json();
        const items = data.results.slice(0, 4);

        
        container.innerHTML = items.map(item => {
            const title = item.title || item.name; 
            const date = item.release_date || item.first_air_date;
            const percent = Math.round(item.vote_average * 10);
            const poster = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/220x330?text=Pas+d%27image';

            return `
                <div class="movieCard">
                    <div class="posterContainer">
                        <img src="${poster}" alt="${title}" class="moviePoster" />
                        <div class="voteCircle">${percent}%</div>
                    </div>
                    <div class="movieInfo">
                        <span class="movieTitle">${title}</span>
                        <span class="movieDate">${formatDate(date)}</span>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error("Erreur API :", error);
    }
}


choicesButtons.forEach((group, groupIndex) => {
    const buttons = group.querySelectorAll('button');
    const container = movieLists[groupIndex];


    fetchAndRender(apiPaths[groupIndex][0], container);


    buttons[0].style.backgroundColor = '#032541';
    buttons[0].style.color = '#ffffff';


    buttons.forEach((button, btnIndex) => {
        button.addEventListener('click', () => {

            buttons.forEach(btn => {
                btn.style.backgroundColor = 'transparent';
                btn.style.color = '#032541';
            });
            button.style.backgroundColor = '#032541';
            button.style.color = '#ffffff';

            fetchAndRender(apiPaths[groupIndex][btnIndex], container);
        });
    });
});