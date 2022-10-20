import { ethers } from "ethers";
import loadExchange from "./exchange";
import loadToken from "./loadtoken";
import loadMetaMask from "./metamask";




async function onPageLoad(walletState, walletDispatch, tokenState, tokenDispatch, exchangeState, exchangeDispatch) {
    await loadMetaMask(walletState, walletDispatch);
    await loadToken(tokenDispatch, walletState.provider);
    await loadExchange(exchangeDispatch, walletState.provider)

}


export { onPageLoad }