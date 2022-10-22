import { EXCHANGE_TYPES } from "./exchangeTypes";

const exchangeReducer = (state, action) => {
    switch (action.type) {
        case EXCHANGE_TYPES.SET_CONTRACT_ADDRESS: return { ...state, contractAddress: action.payload }
        case EXCHANGE_TYPES.SET_CONTRACT_PROVIDER: return { ...state, contractProvider: action.payload }
        case EXCHANGE_TYPES.SET_ERROR: return { ...state, error: action.payload }
        case EXCHANGE_TYPES.SET_ERROR_MSG: return { ...state, errorMsg: action.payload }
        case EXCHANGE_TYPES.SET_LOADING: return { ...state, loading: action.payload }
        case EXCHANGE_TYPES.SET_BALANCE_VARMA: return { ...state, balancevarma: action.payload }
        case EXCHANGE_TYPES.SET_BALANE_TOKEN2: return { ...state, balanceToken2: action.payload }
        case EXCHANGE_TYPES.SET_ALL_ORDER_EVENTS: return { ...state, allOrderEvents: action.payload }
        case EXCHANGE_TYPES.SET_ALL_ORDER_EVENTS_ACTIVE: return { ...state, allOrderEventsActive: action.payload }
        case EXCHANGE_TYPES.SET_BUY_OR_SELL_DONE: return { ...state, buyOrSell: action.payload }
        case EXCHANGE_TYPES.SET_ALL_BUY_ORDERS: return { ...state, allBuyOrders: action.payload }
        case EXCHANGE_TYPES.SET_ALL_SELL_ORDERS: return { ...state, allSellOrders: action.payload }
        case EXCHANGE_TYPES.SET_CANDLE_CHART: return { ...state, candleChart: action.payload }

        default: return state;
    }
}


const EXCHANGE_INITIAL_STATE = {
    loading: false,
    error: false,
    errorMsg: "Something went wrong",
    contractAddress: "",
    contractProvider: null,
    balancevarma: 0,
    balanceToken2: 0,
    allOrderEventsActive: false,
    allOrderEvents: null,
    buyOrSell: false,
    allSellOrders: null,
    allBuyOrders: null,
    candleChart: null

}

export { exchangeReducer, EXCHANGE_INITIAL_STATE }
