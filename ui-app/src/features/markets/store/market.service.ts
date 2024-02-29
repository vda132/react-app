import { API_URL } from "../../../config";
import { api } from "../../../helpers/http/api.helper";
import { Market } from "./market.model";

const marketUrl = 'markets'

export default class MarketService {
    static async createMarket(market: Market) {
        return await api.post(marketUrl, market, {
            baseURL: API_URL
        });
    }

    static async updateMarket(market: Market) {
        return await api.put(marketUrl, market, {
            baseURL: API_URL
        });
    }

    static async getMarkets() {
        return await api.get(marketUrl, {
            baseURL: API_URL
        });
    }

    static async getMarket(id: string) {
        const endpointUrl = `${marketUrl}/${id}`;

        return await api.get(endpointUrl, {
            baseURL: API_URL,
        });
    }

    static async searchMarkets(search: any) {
        const params = new URLSearchParams();
        if (search.searchTerm)
            params.append('searchTerm', search.searchTerm);

        if (!isNaN(search.currentPage))
            params.append('currentPage', search.currentPage);

        if (!isNaN(search.itemsPerPage))
            params.append('itemsPerPage', search.itemsPerPage);

        return await api.get(marketUrl, {
            baseURL: API_URL,
            params: params
        });
    }

    static async deleteMarket(id: string) {
        const endpointUrl = `${marketUrl}/${id}`;

        return await api.delete(endpointUrl, {
            baseURL: API_URL
        });
    }

    static async uploadIcon(file: File, id: string) {
        const endpointUrl = `${marketUrl}/${id}`;
        const formData = new FormData();
        formData.append('file', file);

        return await api.put(endpointUrl, formData, {
            baseURL: API_URL
        });
    }
}