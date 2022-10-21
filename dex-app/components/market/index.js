// take care of default addresses

import { TOKEN_TYPES } from "../../reducer/contracts/token/tokentypes"

export default function Market({ walletState, walletDispatch, tokenState, tokenDispatch, exchangeState, exchangeDispatch }) {


    const marketHandler = (event) => {
        tokenDispatch({type: TOKEN_TYPES.SET_TOKEN_STATE, payload: event.target.value})
    }

    return (
        <div>
            <div className="px-2 py-2">
                <select onChange={marketHandler} className="font-norma bg-slate-700 text-sm text-gray-400 appearance-none border-none py-1 pl-3 pr-5 rounded">

                    <option value="USDT">VARMA / USDT</option>
                    <option value="INRT">VARMA / INRT</option>
                </select>
            </div>

        </div>
    )
}