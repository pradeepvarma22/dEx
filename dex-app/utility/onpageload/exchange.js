import { EXCHANGE_TYPES } from "../../reducer/contracts/exchange/exchangeTypes";
import { EXCHANGE_CONTRACT_ADDRESS, EXCHANGE_CONTRACT_ABI } from "../../constants/exchange/index"
import { ethers } from "ethers";

export default async function loadExchange(exchangeDispatch, provider) {

    exchangeDispatch({ type: EXCHANGE_TYPES.SET_CONTRACT_ADDRESS, payload: EXCHANGE_CONTRACT_ADDRESS });

    const contract = new ethers.Contract(EXCHANGE_CONTRACT_ADDRESS, EXCHANGE_CONTRACT_ABI, provider)
    exchangeDispatch({ type: EXCHANGE_TYPES.SET_CONTRACT_PROVIDER, payload: contract });


}