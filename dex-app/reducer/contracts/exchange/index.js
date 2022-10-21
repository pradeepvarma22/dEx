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
    balanceToken2: 0


}

export { exchangeReducer, EXCHANGE_INITIAL_STATE }
