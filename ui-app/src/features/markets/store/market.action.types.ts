import { SearchResult } from "../../../models/search-result.model";
import { Market, MarketActionTypes, UploadMarketIcon } from "./market.model";

export interface CreateMarketStartActionType {
    type: typeof MarketActionTypes.CREATE_MARKET;
    payload: Market;
}

export interface CreateMarketSuccessActionType {
    type: typeof MarketActionTypes.CREATE_MARKET_SUCCESS;
    payload: undefined;
}

export interface CreateMarketFailedActionType {
    type: typeof MarketActionTypes.CREATE_MARKET_FAILED;
    payload: Error;
}

export interface UpdateMarketStartActionType {
    type: typeof MarketActionTypes.UPDATE_MARKET;
    payload: Market;
}

export interface UpdateMarketSuccessActionType {
    type: typeof MarketActionTypes.UPDATE_MARKET_SUCCESS;
    payload: undefined;
}

export interface UpdateMarketFailedActionType {
    type: typeof MarketActionTypes.UPDATE_MARKET_FAILED;
    payload: Error;
}

export interface GetMarketStartActionType {
    type: typeof MarketActionTypes.GET_MARKET;
    payload: string;
}

export interface GetMarketSuccessActionType {
    type: typeof MarketActionTypes.GET_MARKET_SUCCESS;
    payload: Market;
}

export interface GetMarketFailedActionType {
    type: typeof MarketActionTypes.GET_MARKET_FAILED;
    payload: Error;
}

export interface GetMarketsStartActionType {
    type: typeof MarketActionTypes.GET_MARKETS;
    payload: undefined;
}

export interface GetMarketsSuccessActionType {
    type: typeof MarketActionTypes.GET_MARKETS_SUCCESS;
    payload: Market[];
}

export interface GetMarketsFailedActionType {
    type: typeof MarketActionTypes.GET_MARKETS_FAILED;
    payload: Error;
}

export interface SearchMarketsStartActionType {
    type: typeof MarketActionTypes.SEARCH_MARKETS;
    payload: any;
}

export interface SearchMarketsSuccessActionType {
    type: typeof MarketActionTypes.SEARCH_MARKETS_SUCCESS;
    payload: SearchResult<Market>;
}

export interface SearchMarketsFailedActionType {
    type: typeof MarketActionTypes.SEARCH_MARKETS_FAILED;
    payload: Error;
}

export interface DeleteMarketStartActionType {
    type: typeof MarketActionTypes.DELETE_MARKET;
    payload: string;
}

export interface DeleteMarketSuccessActionType {
    type: typeof MarketActionTypes.DELETE_MARKET_SUCCESS;
    payload: undefined;
}

export interface DeleteMarketFailedActionType {
    type: typeof MarketActionTypes.DELETE_MARKET_FAILED;
    payload: Error
}

export interface UploadMarketIconStartActionType {
    type: typeof MarketActionTypes.UPLOAD_MARKET_ICON;
    payload: UploadMarketIcon;
}

export interface UploadMarketIconSuccessActionType {
    type: typeof MarketActionTypes.UPLOAD_MARKET_ICON_SUCCESS;
    payload: undefined;
}

export interface UploadMarketIconFailedActionType {
    type: typeof MarketActionTypes.UPLOAD_MARKET_ICON_FAILED;
    payload: Error;
}

export type MarketActions = 
    | CreateMarketStartActionType
    | CreateMarketSuccessActionType
    | CreateMarketFailedActionType
    | UpdateMarketStartActionType
    | UpdateMarketSuccessActionType
    | UpdateMarketFailedActionType
    | GetMarketStartActionType
    | GetMarketSuccessActionType
    | GetMarketFailedActionType
    | GetMarketsStartActionType
    | GetMarketsSuccessActionType
    | GetMarketsFailedActionType
    | SearchMarketsStartActionType
    | SearchMarketsSuccessActionType
    | SearchMarketsFailedActionType
    | DeleteMarketStartActionType
    | DeleteMarketSuccessActionType
    | DeleteMarketFailedActionType
    | UploadMarketIconStartActionType
    | UploadMarketIconSuccessActionType 
    | UploadMarketIconFailedActionType