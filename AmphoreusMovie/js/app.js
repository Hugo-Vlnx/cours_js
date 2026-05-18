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

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const type = urlParams.get('type');
        const view = urlParams.get('view');

        if (id && type) {
            await this.openDetails(id, type);
        } else if (view) {
            await this.displayFullView(view);
        } else {
            await this.loadInitialBanner();
            this.loadCategories();
        }
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
            this.ui.renderMovies(items, container, type);
        }
    }

    setupEventListeners() {
        
        const mobileMenu = document.getElementById('mobileMenu');
        const desktopNav = document.getElementById('desktopNav');

        if (mobileMenu && desktopNav) {
            mobileMenu.addEventListener('click', () => {
                desktopNav.classList.toggle('active'); 
            });
        }

        const navFilms = document.getElementById('navFilms');
        const navSeries = document.getElementById('navSeries');
        const navPopulaires = document.getElementById('navPopulaires');

        if (navFilms) navFilms.addEventListener('click', (e) => { e.preventDefault(); this.displayFullView('movie'); });
        if (navSeries) navSeries.addEventListener('click', (e) => { e.preventDefault(); this.displayFullView('tv'); });
        if (navPopulaires) navPopulaires.addEventListener('click', (e) => { e.preventDefault(); this.displayFullView('popular'); });

    
        const headLogo = document.getElementById('headLogo');
        if (headLogo && !window.location.pathname.includes('focus.html')) {
            headLogo.addEventListener('click', () => this.ui.showHome());
        }

       
        const searchForm = document.querySelector('.searchBar'); 
        if (searchForm) {
            searchForm.addEventListener('submit', async (e) => {
                e.preventDefault(); 
                const query = this.ui.searchInput.value.trim();

                if (query.length > 0) {
                    this.ui.homePage.style.display = 'none'; 
                    this.ui.searchPage.style.display = 'flex'; 
                    this.ui.searchTitle.textContent = `Recherche en cours pour "${query}"`; 
                    this.ui.searchGrid.innerHTML = ''; 

                    const data = await this.api.searchMulti(query);
                    if (data) {
                        const items = data.results.filter(item => item.media_type === 'movie' || item.media_type === 'tv'); 
                        
                        if (items.length === 0) {
                            this.ui.searchTitle.textContent = `Aucun résultat pour "${query}"`; 
                        } else {
                            this.ui.searchTitle.textContent = `Résultats pour "${query}"`; 
                            this.ui.renderMovies(items, this.ui.searchGrid, 'movie');
                        }
                    }
                } else {
                    this.ui.showHome();
                }
            });
        }
    }


    async displayFullView(view) {
        if (!this.ui.homePage) return; 

        this.ui.homePage.style.display = 'none';
        this.ui.searchPage.style.display = 'flex';
        this.ui.searchGrid.innerHTML = '';

        let data = null;
        let title = '';
        let defaultType = 'movie';

        if (view === 'movie') {
            title = "Films populaires";
            data = await this.api.getCategory('movie/popular');
            defaultType = 'movie';
        } else if (view === 'tv') {
            title = "Séries populaires";
            data = await this.api.getCategory('tv/popular');
            defaultType = 'tv';
        } else if (view === 'popular') {
            title = "Populaire cette selaine";
            data = await this.api.getCategory('trending/all/week');
            defaultType = 'movie';
        }

        this.ui.searchTitle.textContent = title;

        if (data && data.results) {
            this.ui.renderMovies(data.results, this.ui.searchGrid, defaultType);
        } else {
            this.ui.searchTitle.textContent = "Erreur lors du chargement des données.";
        }
        
        
        const desktopNav = document.getElementById('desktopNav');
        if (desktopNav) desktopNav.classList.remove('active');
    }

    async openDetails(id, type) {
        const detailsData = await this.api.getDetails(id, type);
        const creditsData = await this.api.getCredits(id, type);
        
        if (detailsData && creditsData) {
            this.ui.showDetails(detailsData, creditsData);
        }
    }
}