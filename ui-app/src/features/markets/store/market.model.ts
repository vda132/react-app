import { SearchResult } from "../../../models/search-result.model";

export const marketState: MarketState = {
    market: undefined,
    markets: [],
    marketsBySearch: undefined
}

export interface MarketState {
    markets: Market[];
    marketsBySearch: SearchResult<Market> | undefined;
    market: Market | undefined | null;
}

export interface Market {
    id?:string;
    name: string;
    icon: string;
    active: boolean;
    description: string;
    ownerId: string;
    contentPath: string;
}

export interface UploadMarketIcon {
    marketId: string;
    file: File;
}

export enum MarketActionTypes {
    CREATE_MARKET = "CREATE_MARKET",
    CREATE_MARKET_SUCCESS = "CREATE_MARKET_SUCCESS",
    CREATE_MARKET_FAILED = "CREATE_MARKET_FAILED",
    UPDATE_MARKET = "UPDATE_MARKET",
    UPDATE_MARKET_SUCCESS = "UPDATE_MARKET_SUCCESS",
    UPDATE_MARKET_FAILED = "UPDATE_MARKET_FAILED",
    GET_MARKET = "GET_MARKET",
    GET_MARKET_SUCCESS = "GET_MARKET_SUCCESS",
    GET_MARKET_FAILED = "GET_MARKET_FAILED",
    GET_MARKETS = "GET_MARKETS",
    GET_MARKETS_SUCCESS = "GET_MARKETS_SUCCESS",
    GET_MARKETS_FAILED = "GET_MARKETS_FAILED",
    SEARCH_MARKETS = "SEARCH_MARKETS",
    SEARCH_MARKETS_SUCCESS = "SEARCH_MARKETS_SUCCESS",
    SEARCH_MARKETS_FAILED = "SEARCH_MARKETS_FAILED",
    DELETE_MARKET = "DELETE_MARKET",
    DELETE_MARKET_SUCCESS = "DELETE_MARKET_SUCCESS",
    DELETE_MARKET_FAILED = "DELETE_MARKET_FAILED",
    UPLOAD_MARKET_ICON = "UPLOAD_MARKET_ICON",
    UPLOAD_MARKET_ICON_SUCCESS = "UPLOAD_MARKET_ICON_SUCCESS",
    UPLOAD_MARKET_ICON_FAILED = "UPLOAD_MARKET_ICON_FAILED"
}