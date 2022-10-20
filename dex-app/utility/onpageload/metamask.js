import { ethers } from "ethers";
import { WALLET_TYPES } from "../../reducer/wallet/walletTypes";


export default async function loadMetaMask(walletState, walletDispatch) {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const walletAddress = await ethers.utils.getAddress(accounts[0]);
        walletDispatch({ type: WALLET_TYPES.SET_WALLETADDRESS, payload: walletAddress });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        walletDispatch({ type: WALLET_TYPES.SET_PROVIDER, payload: provider })
        const { chainId } = await provider.getNetwork();
        walletDispatch({ type: WALLET_TYPES.SET_NETWORK, payload: chainId.toString() })
        const balance = await provider.getBalance(walletAddress)
        walletDispatch({ type: WALLET_TYPES.SET_BALANCE, payload: ethers.utils.formatUnits(balance,"18") })
    }
    catch (error) {
        console.log('ERROR at loadMetaMask', error);
        walletDispatch({ type: WALLET_TYPES.SET_ERROR, payload: true });
        walletDispatch({ type: WALLET_TYPES.SET_ERROR_MSG, payload: error.toString() });
    }

  

}
