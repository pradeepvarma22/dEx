import { ethers } from "ethers";
import { useState } from "react";

import { EXCHANGE_CONTRACT_ABI, EXCHANGE_CONTRACT_ADDRESS } from "../../constants/exchange";
import { TOKEN_INRT_CONTACT_ADDRESS, TOKEN_USDT_CONTACT_ADDRESS, TOKEN_VARMA_CONTACT_ADDRESS } from "../../constants/tokens";
import { EXCHANGE_TYPES } from "../../reducer/contracts/exchange/exchangeTypes";

export default function Order({ walletState, walletDispatch, tokenState, tokenDispatch, exchangeState, exchangeDispatch }) {
    const [defOrder, setDefOrder] = useState("b")
    const [amount, setAmount] = useState(0)
    const [price, setPrice] = useState(0)

    // TOKEN_VARMA_CONTACT_ADDRESS

    function buyHandler(e) {


        // call makeTrade
        let tokens = []
        tokens.push(TOKEN_VARMA_CONTACT_ADDRESS)
        if (tokenState.navtokenstate == "USDT") {
            tokens.push(TOKEN_USDT_CONTACT_ADDRESS)
        }
        else {
            tokens.push(TOKEN_INRT_CONTACT_ADDRESS)
        }
        makeBuyOrder(walletState.provider, tokens)
    }

    function sellHandler(e) {
        // call makeTrade


        let tokens = []
        tokens.push(TOKEN_VARMA_CONTACT_ADDRESS)
        if (tokenState.navtokenstate == "USDT") {
            tokens.push(TOKEN_USDT_CONTACT_ADDRESS)
        }
        else {
            tokens.push(TOKEN_INRT_CONTACT_ADDRESS)
        }
        makeSellOrder(walletState.provider, tokens)
    }

    return (
        <div>
            <div>
                <div className="px-2">
                    <div className="flex">
                        <div className="">New Order [{defOrder}]</div>
                        <div className=" absolute left-[16%]">
                            <button onClick={e => setDefOrder(e.target.value)} type="button" value="b" className="bg-slate-700 hover:bg-gray-400 text-white py-1 px-2 rounded-l">Buy</button>
                            <button onClick={e => setDefOrder(e.target.value)} type="button" value="s" className="bg-slate-700 hover:bg-gray-400 text-white py-1 px-2 rounded-r">Sell</button>
                        </div>
                    </div>
                    <div className="py-3 flex flex-col gap-2">
                        <input onChange={e => setAmount(e.target.value)} type="text" id="amount" className="form-control block w-2/3 px-3 py-1 text-base font-normal text-slate-50 bg-slate-700 bg-clip-padding rounded transition ease-in-out m-0 " placeholder={defOrder == "b" ? "Buy Amount 0.0" : "Sell Amount 0.0"} />
                        <input onChange={e => setPrice(e.target.value)} type="text" id="price" className="form-control block w-2/3 px-3 py-1 text-base font-normal text-slate-50 bg-slate-700 bg-clip-padding rounded transition ease-in-out m-0 " placeholder={defOrder == "b" ? "Buy Price 0.0" : "Sell Price 0.0"} />
                    </div>
                    <div className="pt-2 px-[22%]">
                        <button onClick={defOrder == "b" ? buyHandler : sellHandler} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                {defOrder == "b" ? (<>Buy</>) : (<>Sell</>)}
                            </span>
                        </button>
                    </div>

                </div>
            </div>

        </div>
    )


    async function makeBuyOrder(provider, tokens) {

        if (provider != null && tokens) {
            exchangeDispatch({ type: EXCHANGE_TYPES.SET_BUY_OR_SELL_DONE, payload: false })
            const signer = await provider.getSigner();
            const tokenGet = tokens[0];
            const amountGet = ethers.utils.parseEther(amount);      //buy amount
            const tokenGive = tokens[1];      //buy amount
            const amountGive = ethers.utils.parseEther((amount * price).toString());                                // amount give : orderAmount * orderPrice
            const contractE = new ethers.Contract(EXCHANGE_CONTRACT_ADDRESS, EXCHANGE_CONTRACT_ABI, signer)

            let txn = await contractE.makeOrder(tokenGet, amountGet, tokenGive, amountGive)
            txn = await txn.wait();

            exchangeDispatch({ type: EXCHANGE_TYPES.SET_BUY_OR_SELL_DONE, payload: true })
        }
    }

    async function makeSellOrder(provider, tokens) {

        if (provider != null && tokens) {
            exchangeDispatch({ type: EXCHANGE_TYPES.SET_BUY_OR_SELL_DONE, payload: false })

            const signer = await provider.getSigner();
            const tokenGet = tokens[1];
            const amountGet = ethers.utils.parseEther((amount * price).toString());
            const tokenGive = tokens[0];
            const amountGive = ethers.utils.parseEther(amount);
            const contractE = new ethers.Contract(EXCHANGE_CONTRACT_ADDRESS, EXCHANGE_CONTRACT_ABI, signer)

            let txn = await contractE.makeOrder(tokenGet, amountGet, tokenGive, amountGive)
            txn = await txn.wait();

            exchangeDispatch({ type: EXCHANGE_TYPES.SET_BUY_OR_SELL_DONE, payload: true })


        }
    }

}