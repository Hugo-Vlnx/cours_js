
export default class Archi {
    constructor() {
        
        this.homePage = document.getElementById('homePage');
        this.searchPage = document.getElementById('searchPage');
        this.detailsPage = document.getElementById('detailsPage');
        this.searchingSection = document.querySelector('.searching');
        this.searchGrid = document.querySelector('.searchGrid');
        this.searchTitle = document.getElementById('searchTitle');
        this.searchInput = document.getElementById('searchInput');
    }

    formatDate(dateString) {
        if (!dateString) return 'Date inconnue';
        const date = new Date(dateString);
        let formatted = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
        return formatted.replace('.', ''); 
    }

    formatRuntime(minutes) {
        if (!minutes) return '';
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${h}h ${m}m`;
    }

    setBannerBackground(backdropPath) {
        this.searchingSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://image.tmdb.org/t/p/original${backdropPath}')`;
    }

    
    renderMovies(items, container, defaultType, onCardClick) {
        container.innerHTML = items.map(item => {
            const title = item.title || item.name; 
            const date = item.release_date || item.first_air_date;
            const percent = item.vote_average ? Math.round(item.vote_average * 10) : 'NR';
            const poster = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : './image/photoSansVisage.jpg';
            const type = item.media_type || defaultType;

            return `
                <div class="movieCard" data-id="${item.id}" data-type="${type}">
                    <div class="posterContainer">
                        <img src="${poster}" alt="${title}" class="moviePoster" />
                        <div class="voteCircle">${percent}${percent !== 'NR' ? '%' : ''}</div>
                    </div>
                    <div class="movieInfo">
                        <span class="movieTitle">${title}</span>
                        <span class="movieDate">${this.formatDate(date)}</span>
                    </div>
                </div>
            `;
        }).join('');

        
        container.querySelectorAll('.movieCard').forEach(card => {
            card.addEventListener('click', () => onCardClick(card.dataset.id, card.dataset.type));
        });
    }

    showDetails(detailsData, creditsData) {
        const type = detailsData.name ? 'tv' : 'movie'; 
        const title = detailsData.title || detailsData.name;
        const date = detailsData.release_date || detailsData.first_air_date;
        const percent = detailsData.vote_average ? Math.round(detailsData.vote_average * 10) : 'NR';
        const posterPath = detailsData.poster_path ? `https://image.tmdb.org/t/p/w500${detailsData.poster_path}` : './image/photoSansVisage.jpg';
        const backdropPath = detailsData.backdrop_path ? `https://image.tmdb.org/t/p/original${detailsData.backdrop_path}` : '';
        const genres = detailsData.genres.map(g => g.name).join(', ');
        const runtime = type === 'movie' ? this.formatRuntime(detailsData.runtime) : (detailsData.episode_run_time ? this.formatRuntime(detailsData.episode_run_time[0]) : '');
        const year = date ? `(${date.substring(0, 4)})` : '';

        
        document.querySelector('.movieBanner').style.backgroundImage = `url('${backdropPath}')`;
        document.getElementById('detailPoster').src = posterPath;
        document.getElementById('detailVote').textContent = `${percent}${percent !== 'NR' ? '%' : ''}`;
        document.getElementById('detailTitle').textContent = `${title} ${year}`;
        
        let subtitleText = `${this.formatDate(date)} - ${genres}`;
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

        
        this.homePage.style.display = 'none';
        this.searchPage.style.display = 'none';
        this.searchingSection.style.display = 'none'; 
        this.detailsPage.style.display = 'block';
        window.scrollTo(0, 0); 
    }

    showHome() {
        this.searchPage.style.display = 'none';
        this.detailsPage.style.display = 'none';
        this.searchingSection.style.display = 'flex'; 
        this.homePage.style.display = 'block';
        this.searchInput.value = '';
        window.scrollTo(0, 0);
    }
}