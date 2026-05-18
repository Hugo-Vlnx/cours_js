
import { API_OPTIONS, BASE_URL } from './config.js';

export default class Info {
    async fetchFromApi(endpoint) {
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, API_OPTIONS);
            return await response.json();
        } catch (error) {
            console.error(`Erreur API sur ${endpoint}:`, error);
            return null;
        }
    }

    
    async getCategory(path) {
        return this.fetchFromApi(`/${path}?language=fr-FR&page=1`);
    }

    
    async searchMulti(query) {
        return this.fetchFromApi(`/search/multi?query=${encodeURIComponent(query)}&language=fr-FR&page=1`);
    }

    
    async getDetails(id, type) {
        return this.fetchFromApi(`/${type}/${id}?language=fr-FR`);
    }

    
    async getCredits(id, type) {
        return this.fetchFromApi(`/${type}/${id}/credits?language=fr-FR`);
    }

    
    async getCustomBanner() {
        return this.fetchFromApi(`/search/tv?query=Girl%20from%20Nowhere&language=fr-FR`);
    }
    
    async getVideos(id, type) {
        return this.fetchFromApi(`/${type}/${id}/videos?language=fr-FR`);
    }
}