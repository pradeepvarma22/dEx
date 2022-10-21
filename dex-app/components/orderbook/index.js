import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { EXCHANGE_CONTRACT_ABI, EXCHANGE_CONTRACT_ADDRESS } from "../../constants/exchange"
import { TOKEN_INRT_CONTACT_ADDRESS, TOKEN_USDT_CONTACT_ADDRESS } from "../../constants/tokens"
import { EXCHANGE_TYPES } from "../../reducer/contracts/exchange/exchangeTypes"


export default function OrderBook({ walletState, walletDispatch, tokenState, tokenDispatch, exchangeState, exchangeDispatch }) {


    useEffect(() => {
        loadDataOnpage()

    }, [walletState])

    async function loadDataOnpage() {

        await loadAllOrders(walletState, tokenState.navtokenstate)
    }


    async function loadAllOrders(walletState, filterOption) {
        let searchAddress;
        if (filterOption == "USDT") {
            searchAddress = TOKEN_USDT_CONTACT_ADDRESS;
        }
        else {
            searchAddress = TOKEN_INRT_CONTACT_ADDRESS;
        }

        if (walletState.provider != null) {
            const provider = walletState.provider
            const exchangeContract = new ethers.Contract(EXCHANGE_CONTRACT_ADDRESS, EXCHANGE_CONTRACT_ABI, provider)
            const block = await provider.getBlockNumber();
            const orderStream = await exchangeContract.queryFilter('Order', 0, block)

            const allOrder = orderStream.map(event => event.args)
            const arr = [];

            // Buy Order: Get Varma give usdt
            // sell Order: Give Varma get usdt

            for (let i = 0; i < allOrder.length; i++) {


                if (searchAddress) {
                    const temp = {
                        orderId: allOrder[i].id,
                        timestamp: allOrder[i].timestamp,
                        tokenGet: allOrder[i].tokenGet,
                        tokenGive: allOrder[i].tokenGive,
                        amountGet: allOrder[i].amountGet,
                        amountGive: allOrder[i].amountGive,
                        user: allOrder[i].user
                    }
                    arr.push(temp);
                }


            }
            exchangeDispatch({ type: EXCHANGE_TYPES.SET_ALL_ORDER_EVENTS, payload: arr });
            exchangeDispatch({ type: EXCHANGE_TYPES.SET_ALL_ORDER_EVENTS_ACTIVE, payload: true });


        }

    }


    return (
        <div>
            <div>
                Order Book
            </div>

        </div>
    )
}