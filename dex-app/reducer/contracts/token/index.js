import { TOKEN_TYPES } from "./tokentypes"



const tokenReducer = (state, action) => {
    switch (action.type) {
        case TOKEN_TYPES.SET_CONTRACT_ADDRESS: return { ...state, contractAddress: action.payload }
        case TOKEN_TYPES.SET_CONTRACT_PROVIDER: return { ...state, contractProvider: action.payload }
        case TOKEN_TYPES.SET_ERROR: return { ...state, error: action.payload }
        case TOKEN_TYPES.SET_ERROR_MSG: return { ...state, errorMsg: action.payload }
        case TOKEN_TYPES.SET_LOADING: return { ...state, loading: action.payload }
        case TOKEN_TYPES.SET_TOKEN_NAME: return { ...state, name: action.payload }
        case TOKEN_TYPES.SET_TOKEN_SYMBOL: return { ...state, symbol: action.payload }

        default: return state;
    }
}


const TOKEN_INITIAL_STATE = {
    name:"",
    symbol:"",
    loading: false,
    error: false,
    errorMsg: "Something went wrong",
    contractAddress: "",
    contractProvider: null,


}

export { tokenReducer, TOKEN_INITIAL_STATE }
