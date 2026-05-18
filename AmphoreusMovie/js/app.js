
import Archi from './archi.js';
import Info from './info.js';

export default class App {
    constructor() {
        this.api = new Info();
        this.ui = new Archi();
        this.apiPaths = [
            ['trending/all/day', 'trending/all/week'], 
            ['movie/top_rated', 'movie/popular'],      
            ['tv/top_rated', 'tv/popular']            
        ];
    }

    async init() {
        this.setupEventListeners();
        await this.loadInitialBanner();
        this.loadCategories();
    }

    async loadInitialBanner() {
        const data = await this.api.getCustomBanner();
        if (data && data.results && data.results.length > 0 && data.results[0].backdrop_path) {
            this.ui.setBannerBackground(data.results[0].backdrop_path);
        }
    }

    loadCategories() {
        const choiceGroups = document.querySelectorAll('.choiceButton');
        const movieLists = document.querySelectorAll('#homePage .movieList'); 

        choiceGroups.forEach((group, groupIndex) => {
            const buttons = group.querySelectorAll('button');
            const container = movieLists[groupIndex];

           
            this.fetchAndDisplay(this.apiPaths[groupIndex][0], container);
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

                    this.fetchAndDisplay(this.apiPaths[groupIndex][btnIndex], container);
                });
            });
        });
    }

    async fetchAndDisplay(endpoint, container) {
        const data = await this.api.getCategory(endpoint);
        if (data) {
            const items = data.results.slice(0, 4); 
            const type = endpoint.includes('tv') ? 'tv' : 'movie'; 
            
            
            this.ui.renderMovies(items, container, type, (id, type) => this.openDetails(id, type));
        }
    }

    setupEventListeners() {
        
        document.getElementById('headLogo').addEventListener('click', () => this.ui.showHome()); 

        
        const searchForm = document.querySelector('.searchBar'); 
        searchForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            const query = this.ui.searchInput.value.trim();

            if (query.length > 0) {
                this.ui.homePage.style.display = 'none'; 
                this.ui.searchPage.style.display = 'flex'; 
                this.ui.searchTitle.textContent = `Recherche en cours pour "${query}"...`; 
                this.ui.searchGrid.innerHTML = ''; 

                const data = await this.api.searchMulti(query);
                if (data) {
                    const items = data.results.filter(item => item.media_type === 'movie' || item.media_type === 'tv'); 
                    
                    if (items.length === 0) {
                        this.ui.searchTitle.textContent = `Aucun résultat pour "${query}"`; 
                    } else {
                        this.ui.searchTitle.textContent = `Résultats pour "${query}"`; 
                        this.ui.renderMovies(items, this.ui.searchGrid, 'movie', (id, type) => this.openDetails(id, type));
                    }
                }
            } else {
                this.ui.showHome();
            }
        });
    }

    async openDetails(id, type) {
        const detailsData = await this.api.getDetails(id, type);
        const creditsData = await this.api.getCredits(id, type);
        
        if (detailsData && creditsData) {
            this.ui.showDetails(detailsData, creditsData);
        }
    }
}