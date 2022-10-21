import { ethers } from "ethers";
import { EXCHANGE_CONTRACT_ABI, EXCHANGE_CONTRACT_ADDRESS } from "../../constants/exchange";
import { TOKEN_CONTACT_ABI, TOKEN_INRT_CONTACT_ADDRESS, TOKEN_USDT_CONTACT_ADDRESS, TOKEN_VARMA_CONTACT_ADDRESS } from "../../constants/tokens";
import { EXCHANGE_TYPES } from "../../reducer/contracts/exchange/exchangeTypes";
import { TOKEN_TYPES } from "../../reducer/contracts/token/tokentypes";

export default async function LoadBalances(walletState, walletDispatch, tokenState, tokenDispatch, exchangeState, exchangeDispatch) {

    if (walletState != null && walletState.walletAddress != null && walletState.provider!=null) {
        const provider = walletState.provider
        const exchangeContract = new ethers.Contract(EXCHANGE_CONTRACT_ADDRESS, EXCHANGE_CONTRACT_ABI, provider)
        const balance = await exchangeContract.getBalanceOf(TOKEN_VARMA_CONTACT_ADDRESS, walletState.walletAddress)
        const x = await ethers.utils.formatEther(balance)

        exchangeDispatch({ type: EXCHANGE_TYPES.SET_BALANCE_VARMA, payload: Number(x) })
    }


    if (walletState != null && tokenState.navtokenstate == "USDT" && walletState.walletAddress != null && walletState.provider!=null) {
        const provider = walletState.provider
        const exchangeContract = new ethers.Contract(EXCHANGE_CONTRACT_ADDRESS, EXCHANGE_CONTRACT_ABI, provider)
        const balance = await exchangeContract.getBalanceOf(TOKEN_USDT_CONTACT_ADDRESS, walletState.walletAddress)
        const x = await ethers.utils.formatEther(balance)

        exchangeDispatch({ type: EXCHANGE_TYPES.SET_BALANE_TOKEN2, payload: Number(x) })
    }

    if (walletState != null && tokenState.navtokenstate == "INRT" && walletState.walletAddress != null && walletState.provider!=null) {
        const provider = walletState.provider
        const exchangeContract = new ethers.Contract(EXCHANGE_CONTRACT_ADDRESS, EXCHANGE_CONTRACT_ABI, provider)
        const balance = await exchangeContract.getBalanceOf(TOKEN_INRT_CONTACT_ADDRESS, walletState.walletAddress)
        const x = await ethers.utils.formatEther(balance)

        exchangeDispatch({ type: EXCHANGE_TYPES.SET_BALANE_TOKEN2, payload: Number(x) })
    }

    if (walletState != null && walletState.provider != null) {
        const provider = walletState.provider
        const varmaContract = new ethers.Contract(TOKEN_VARMA_CONTACT_ADDRESS, TOKEN_CONTACT_ABI, provider)
        const balace = await varmaContract.balanceOf(walletState.walletAddress)
        const x = await ethers.utils.formatEther(balace)

        tokenDispatch({ type: TOKEN_TYPES.SET_VARMA_TOKEN_BALANCE, payload: Number(x) })

    }



    if (tokenState.navtokenstate == "USDT" && walletState != null && walletState.provider != null) {
        const provider = walletState.provider
        const usdtContract = new ethers.Contract(TOKEN_USDT_CONTACT_ADDRESS, TOKEN_CONTACT_ABI, provider)
        const balace = await usdtContract.balanceOf(walletState.walletAddress)
        const x = await ethers.utils.formatEther(balace)

        tokenDispatch({ type: TOKEN_TYPES.SET_TOKEN2_BALANCE, payload: Number(x) })

    }
    
    if (tokenState.navtokenstate == "INRT" && walletState != null && walletState.provider != null) {
        const provider = walletState.provider
        const inrtContract = new ethers.Contract(TOKEN_INRT_CONTACT_ADDRESS, TOKEN_CONTACT_ABI, provider)
        const balace = await inrtContract.balanceOf(walletState.walletAddress)
        const x = await ethers.utils.formatEther(balace)
        

        tokenDispatch({ type: TOKEN_TYPES.SET_TOKEN2_BALANCE, payload: Number(x) })

    }





}