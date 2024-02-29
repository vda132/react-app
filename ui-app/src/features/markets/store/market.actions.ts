import { SearchResult } from "../../../models/search-result.model";
import { CreateMarketFailedActionType, CreateMarketStartActionType, CreateMarketSuccessActionType, DeleteMarketFailedActionType, DeleteMarketStartActionType, DeleteMarketSuccessActionType, GetMarketFailedActionType, GetMarketStartActionType, GetMarketSuccessActionType, GetMarketsFailedActionType, GetMarketsStartActionType, GetMarketsSuccessActionType, SearchMarketsFailedActionType, SearchMarketsStartActionType, SearchMarketsSuccessActionType, UpdateMarketFailedActionType, UpdateMarketStartActionType, UpdateMarketSuccessActionType, UploadMarketIconFailedActionType, UploadMarketIconStartActionType, UploadMarketIconSuccessActionType } from "./market.action.types";
import { Market, MarketActionTypes, UploadMarketIcon } from "./market.model";

export const createMarketStartAction = (payload: Market):
    CreateMarketStartActionType => ({ type: MarketActionTypes.CREATE_MARKET, payload: payload });

export const createMarketSuccessAction = ():
    CreateMarketSuccessActionType => ({ type: MarketActionTypes.CREATE_MARKET_SUCCESS, payload: undefined });

export const createMarletFailedAction = (error: Error):
    CreateMarketFailedActionType => ({ type: MarketActionTypes.CREATE_MARKET_FAILED, payload: error });

export const updateMarketStartAction = (payload: Market):
    UpdateMarketStartActionType => ({ type: MarketActionTypes.UPDATE_MARKET, payload: payload });

export const updateMarketSuccessAction = ():
    UpdateMarketSuccessActionType => ({ type: MarketActionTypes.UPDATE_MARKET_SUCCESS, payload: undefined });

export const updateMarketFailedAction = (error: Error):
    UpdateMarketFailedActionType => ({ type: MarketActionTypes.UPDATE_MARKET_FAILED, payload: error });

export const getMarketStartAction = (payload: string):
    GetMarketStartActionType => ({ type: MarketActionTypes.GET_MARKET, payload: payload });

export const getMarketSuccessAction = (payload: Market):
    GetMarketSuccessActionType => ({ type: MarketActionTypes.GET_MARKET_SUCCESS, payload: payload });

export const getMarketFailedAction = (error: Error):
    GetMarketFailedActionType => ({ type: MarketActionTypes.GET_MARKET_FAILED, payload: error });

export const getMarketsStartAction = ():
    GetMarketsStartActionType => ({ type: MarketActionTypes.GET_MARKETS, payload: undefined });

export const getMarketsSuccessAction = (payload: Market[]):
    GetMarketsSuccessActionType => ({ type: MarketActionTypes.GET_MARKETS_SUCCESS, payload: payload });

export const getMarketsFailedAction = (error: Error):
    GetMarketsFailedActionType => ({ type: MarketActionTypes.GET_MARKETS_FAILED, payload: error });

export const searchMarketsStartAction = (search: any):
    SearchMarketsStartActionType => ({ type: MarketActionTypes.SEARCH_MARKETS, payload: search });

export const searchMarketsSuccessAction = (payload: SearchResult<Market>):
    SearchMarketsSuccessActionType => ({ type: MarketActionTypes.SEARCH_MARKETS_SUCCESS, payload: payload });

export const searchMarketsFailedAction = (error: Error):
    SearchMarketsFailedActionType => ({ type: MarketActionTypes.SEARCH_MARKETS_FAILED, payload: error });

export const deleteMarketStartAction = (payload: string):
    DeleteMarketStartActionType => ({ type: MarketActionTypes.DELETE_MARKET, payload: payload });

export const deleteMarketSuccessAction = ():
    DeleteMarketSuccessActionType => ({ type: MarketActionTypes.DELETE_MARKET_SUCCESS, payload: undefined });

export const deleteMarketFailedAction = (error: Error):
    DeleteMarketFailedActionType => ({ type: MarketActionTypes.DELETE_MARKET_FAILED, payload: error });

export const uploadMarketIconStartAction = (payload: UploadMarketIcon):
    UploadMarketIconStartActionType => ({ type: MarketActionTypes.UPLOAD_MARKET_ICON, payload: payload });

export const uploadMarketIconSuccessAction = ():
    UploadMarketIconSuccessActionType => ({ type: MarketActionTypes.UPLOAD_MARKET_ICON_SUCCESS, payload: undefined });

export const uploadMarketIconFailedAction = (error: Error):
    UploadMarketIconFailedActionType => ({ type: MarketActionTypes.UPLOAD_MARKET_ICON_FAILED, payload: error });

