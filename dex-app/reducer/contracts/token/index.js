import { TOKEN_TYPES } from "./tokentypes"


const tokenReducer = (state, action) => {
    switch (action.type) {
        case TOKEN_TYPES.SET_VARMA_PROVIDER: return { ...state, varmaTokenProvider: action.payload }
        case TOKEN_TYPES.SET_USDT_PROVIDER: return { ...state, usdtTokenProvider: action.payload }
        case TOKEN_TYPES.SET_INRT_PROVIDER: return { ...state, inrtTokenProvider: action.payload }
        case TOKEN_TYPES.SET_ERROR: return { ...state, error: action.payload }
        case TOKEN_TYPES.SET_ERROR_MSG: return { ...state, errorMsg: action.payload }
        case TOKEN_TYPES.SET_LOADING: return { ...state, loading: action.payload }
        case TOKEN_TYPES.SET_TOKEN_STATE: return { ...state, navtokenstate: action.payload }
        case TOKEN_TYPES.SET_TOKEN2_BALANCE: return { ...state, token2Balance: action.payload }
        case TOKEN_TYPES.SET_VARMA_TOKEN_BALANCE: return { ...state, varmaTokenBalance: action.payload }

        default: return state;
    }
}


const TOKEN_INITIAL_STATE = {
    varmaTokenProvider: null,
    usdtTokenProvider: null,
    inrtTokenProvider: null,
    token2Balance: 0,
    varmaTokenBalance: 0,
    loading: false,
    error: false,
    errorMsg: "Something went wrong",
    navtokenstate: "USDT"
}

export { tokenReducer, TOKEN_INITIAL_STATE }
