import { ethers } from "ethers";
import loadToken from "./loadtoken";
import loadMetaMask from "./metamask";




async function onPageLoad(walletState, walletDispatch, tokenState, tokenDispatch) {
    await loadMetaMask(walletState, walletDispatch);
    loadToken(tokenDispatch);
}


export { onPageLoad }