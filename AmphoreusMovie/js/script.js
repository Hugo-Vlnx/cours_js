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
const movieLists = document.querySelectorAll('#homePage .movieList');


function formatDate(dateString) {
    if (!dateString) return 'Date inconnue';
    const date = new Date(dateString);
    let formatted = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
    return formatted.replace('.', ''); 
}


async function loadSearchBanner() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent('Girl from Nowhere')}&language=fr-FR`, options);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            const backdropPath = data.results[0].backdrop_path;
            if (backdropPath) {
                const searchingSection = document.querySelector('.searching');
                // On applique l'image de l'API combinée avec tes filtres de transparence
                searchingSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://image.tmdb.org/t/p/original${backdropPath}')`;
            }
        }
    } catch (error) {
        console.error("Erreur lors du chargement de la bannière de recherche :", error);
    }
}


loadSearchBanner();

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
            const type = endpoint.includes('tv') ? 'tv' : 'movie';
            return `
                <div class="movieCard" data-id="${item.id}" data-type="${item.media_type || type}">
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
        attachClickToCards();
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



const searchInput = document.getElementById('searchInput');
const searchForm = document.querySelector('.searchBar');
const homePage = document.getElementById('homePage');
const searchPage = document.getElementById('searchPage');
const searchGrid = document.querySelector('.searchGrid');
const searchTitle = document.getElementById('searchTitle');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const query = searchInput.value.trim();

    if (query.length > 0) {
        
        homePage.style.display = 'none';
        searchPage.style.display = 'flex'; 
        searchTitle.textContent = `Recherche en cours pour "${query}"...`;
        searchGrid.innerHTML = ''; 

        
        fetchSearchResults(query);
    } else {
        
        homePage.style.display = 'block';
        searchPage.style.display = 'none';
    }
});


async function fetchSearchResults(query) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&language=fr-FR&page=1`, options);
        const data = await response.json();
        
      
        const items = data.results.filter(item => item.media_type === 'movie' || item.media_type === 'tv');

        if (items.length === 0) {
            searchTitle.textContent = `Aucun résultat pour "${query}"`;
            return;
        }

        searchTitle.textContent = `Résultats pour "${query}"`;

        searchGrid.innerHTML = items.map(item => {
            const title = item.title || item.name; 
            const date = item.release_date || item.first_air_date;
            
            const percent = item.vote_average ? Math.round(item.vote_average * 10) : 'NR'; 
            const poster = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/220x330?text=Pas+d%27image';
            
            
            const type = item.media_type || 'movie';

            
            return `
                <div class="movieCard" data-id="${item.id}" data-type="${type}">
                    <div class="posterContainer">
                        <img src="${poster}" alt="${title}" class="moviePoster" />
                        <div class="voteCircle">${percent}${percent !== 'NR' ? '%' : ''}</div>
                    </div>
                    <div class="movieInfo">
                        <span class="movieTitle">${title}</span>
                        <span class="movieDate">${formatDate(date)}</span>
                    </div>
                </div>
            `;
        }).join('');
        
        
        attachClickToCards();

    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
    }
}



const detailsPage = document.getElementById('detailsPage');

const searchingSection = document.querySelector('.searching'); 


function formatRuntime(minutes) {
    if (!minutes) return '';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
}


async function loadMovieDetails(id, type) { 
    try {
        
        const detailsResponse = await fetch(`https://api.themoviedb.org/3/${type}/${id}?language=fr-FR`, options);
        const detailsData = await detailsResponse.json();

        
        const creditsResponse = await fetch(`https://api.themoviedb.org/3/${type}/${id}/credits?language=fr-FR`, options);
        const creditsData = await creditsResponse.json();

        
        const title = detailsData.title || detailsData.name;
        const date = detailsData.release_date || detailsData.first_air_date;
        const percent = detailsData.vote_average ? Math.round(detailsData.vote_average * 10) : 'NR';
        const posterPath = detailsData.poster_path ? `https://image.tmdb.org/t/p/w500${detailsData.poster_path}` : 'https://via.placeholder.com/270x405?text=Image';
        const backdropPath = detailsData.backdrop_path ? `https://image.tmdb.org/t/p/original${detailsData.backdrop_path}` : '';
        const genres = detailsData.genres.map(g => g.name).join(', ');
        const runtime = type === 'movie' ? formatRuntime(detailsData.runtime) : (detailsData.episode_run_time ? formatRuntime(detailsData.episode_run_time[0]) : '');

        
        const year = date ? `(${date.substring(0, 4)})` : '';

       
        document.querySelector('.movieBanner').style.backgroundImage = `url('${backdropPath}')`;
        document.getElementById('detailPoster').src = posterPath;
        document.getElementById('detailVote').textContent = `${percent}${percent !== 'NR' ? '%' : ''}`;
        document.getElementById('detailTitle').textContent = `${title} ${year}`;
        
        
        let subtitleText = `${formatDate(date)} - ${genres}`;
        if (runtime) subtitleText += ` - ${runtime}`;
        document.getElementById('detailSubtitle').textContent = subtitleText;
        
        document.getElementById('detailSynopsis').textContent = detailsData.overview || "Aucun synopsis disponible.";

        
       const castList = document.getElementById('castList');
        const topCast = creditsData.cast.slice(0, 8); 
        
        castList.innerHTML = topCast.map(actor => {
            
            const actorImage = actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : './image/photoSansVisage.jpg';
            
            return `
                <div class="castCard">
                    <div class="castImageContainer">
                        <img class="castImage" src="${actorImage}" alt="${actor.name}">
                    </div>
                    <div class="castInfo">
                        <div class="castName">${actor.name}</div>
                        <div class="castCharacter">${actor.character}</div>
                    </div>
                </div>
            `;
        }).join('');

        
        homePage.style.display = 'none';
        searchPage.style.display = 'none';
        searchingSection.style.display = 'none'; 
        detailsPage.style.display = 'block';
        window.scrollTo(0, 0); 

    } catch (error) {
        console.error("Erreur lors du chargement des détails :", error);
    }
}


function attachClickToCards() {
    const cards = document.querySelectorAll('.movieCard');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            
            const id = card.dataset.id;
            const type = card.dataset.type;
            loadMovieDetails(id, type);
        });
    });
}