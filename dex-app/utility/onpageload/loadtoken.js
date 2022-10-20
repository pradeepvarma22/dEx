
import { ethers } from "ethers"
import { TOKEN_CONTACT_ABI, TOKEN_INRT_CONTACT_ADDRESS, TOKEN_USDT_CONTACT_ADDRESS, TOKEN_VARMA_CONTACT_ADDRESS } from "../../constants/tokens/index"
import { TOKEN_TYPES } from "../../reducer/contracts/token/tokentypes"


export default async function loadToken(tokenDispatch, provider) {

    const varma = new ethers.Contract(TOKEN_VARMA_CONTACT_ADDRESS, TOKEN_CONTACT_ABI, provider)
    tokenDispatch({ type: TOKEN_TYPES.SET_VARMA_PROVIDER, payload: varma })
    const inrt = new ethers.Contract(TOKEN_INRT_CONTACT_ADDRESS, TOKEN_CONTACT_ABI, provider);
    tokenDispatch({ type: TOKEN_TYPES.SET_INRT_PROVIDER, payload: inrt });
    const usdt = new ethers.Contract(TOKEN_USDT_CONTACT_ADDRESS, TOKEN_CONTACT_ABI, provider);
    tokenDispatch({ type: TOKEN_TYPES.SET_USDT_PROVIDER, payload: usdt });

}