
import { TOKEN_VARMA_CONTACT_ADDRESS } from "../../constants/tokens/index"
import { TOKEN_TYPES } from "../../reducer/contracts/token/tokentypes"


export default function loadToken(tokenDispatch) {

    tokenDispatch({ type: TOKEN_TYPES.SET_CONTRACT_ADDRESS, payload: TOKEN_VARMA_CONTACT_ADDRESS });
    tokenDispatch({ type: TOKEN_TYPES.SET_TOKEN_NAME, payload: "VARMA Token" });
    tokenDispatch({ type: TOKEN_TYPES.SET_TOKEN_SYMBOL, payload: "VARMA" });
}