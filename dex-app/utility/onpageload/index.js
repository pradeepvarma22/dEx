import { ethers } from "ethers";
import { WALLET_TYPES } from "../../reducer/wallet/walletTypes";
import loadExchange from "./exchange";
import loadToken from "./loadtoken";
import loadMetaMask from "./metamask";




async function onPageLoad(walletState, walletDispatch, tokenState, tokenDispatch, exchangeState, exchangeDispatch) {
    await loadMetaMask(walletState, walletDispatch);
    await loadToken(tokenDispatch, walletState.provider);
    await loadExchange(exchangeDispatch, walletState.provider)
    window.ethereum.on("accountsChanged", () => {
        loadMetaMask(walletState, walletDispatch);
    })


    window.ethereum.on("chainChanged", () => {
        walletDispatch({ type: WALLET_TYPES.SET_SYMBOL, payload: "Eth" })
        window.location.reload()                        // useState of Symbol need to change
    })
}


export { onPageLoad }