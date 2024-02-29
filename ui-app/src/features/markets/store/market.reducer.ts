import { MarketActions } from "./market.action.types";
import { MarketActionTypes, marketState } from "./market.model";

export const marketReducer = (state = marketState, action: MarketActions) => {
    switch (action.type) {
        case MarketActionTypes.CREATE_MARKET: {
            return {
                ...state
            }
        }
        case MarketActionTypes.CREATE_MARKET_SUCCESS: {
            return {
                ...state
            }
        }
        case MarketActionTypes.CREATE_MARKET_FAILED: {
            return {
                ...state
            }
        }
        case MarketActionTypes.UPDATE_MARKET: {
            return {
                ...state
            }
        }
        case MarketActionTypes.UPDATE_MARKET_SUCCESS: {
            return {
                ...state
            }
        }
        case MarketActionTypes.UPDATE_MARKET_FAILED: {
            return {
                ...state
            }
        }
        
        case MarketActionTypes.DELETE_MARKET: {
            return {
                ...state
            }
        }
        case MarketActionTypes.DELETE_MARKET_SUCCESS: {
            return {
                ...state
            }
        }
        case MarketActionTypes.DELETE_MARKET_FAILED: {
            return {
                ...state
            }
        }
        case MarketActionTypes.GET_MARKET: {
            return {
                ...state
            }
        }
        case MarketActionTypes.GET_MARKET_SUCCESS: {
            return {
                ...state,
                market: action.payload
            }
        }
        case MarketActionTypes.GET_MARKET_FAILED: {
            return {
                ...state
            }
        }
        case MarketActionTypes.GET_MARKETS: {
            return {
                ...state
            }
        }
        case MarketActionTypes.GET_MARKETS_SUCCESS: {
            return {
                ...state,
                markets: action.payload
            }
        }
        case MarketActionTypes.GET_MARKETS_FAILED: {
            return {
                ...state
            }
        }
        case MarketActionTypes.SEARCH_MARKETS: {
            return {
                ...state
            }
        }
        case MarketActionTypes.SEARCH_MARKETS_SUCCESS: {
            return {
                ...state,
                marketsBySearch: action.payload
            }
        }
        case MarketActionTypes.SEARCH_MARKETS_FAILED: {
            return {
                ...state
            }
        }
        case MarketActionTypes.UPLOAD_MARKET_ICON: {
            return {
                ...state
            }
        }
        case MarketActionTypes.UPLOAD_MARKET_ICON_SUCCESS: {
            return {
                ...state
            }
        }
        case MarketActionTypes.UPLOAD_MARKET_ICON_FAILED: {
            return {
                ...state
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}