import { ethers } from "ethers"
import { WALLET_TYPES } from "./walletTypes"


const walletReducer = (state, action) => {
    switch (action.type) {
        case WALLET_TYPES.SET_PROVIDER: return { ...state, provider: action.payload }
        case WALLET_TYPES.SET_WALLETADDRESS: return { ...state, walletAddress: action.payload }
        case WALLET_TYPES.SET_ERROR: return { ...state, error: action.payload }
        case WALLET_TYPES.SET_ERROR_MSG: return { ...state, errorMsg: action.payload }
        case WALLET_TYPES.SET_LOADING: return { ...state, loading: action.payload }
        case WALLET_TYPES.SET_NETWORK: return { ...state, network: action.payload }
        case WALLET_TYPES.SET_BALANCE: return { ...state, balance: action.payload }
        default: return state;
    }
}


const WALLET_INITIAL_STATE = {
    loading: false,
    error: false,
    errorMsg: "Something went wrong",
    walletAddress: "",
    network: "",
    provider: null,
    balance: ethers.utils.formatUnits(0, 18)
}

export { walletReducer, WALLET_INITIAL_STATE }
