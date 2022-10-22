import { ethers } from "ethers"
import { useEffect, useState } from "react"
import Chart from "react-google-charts";

import { EXCHANGE_CONTRACT_ABI, EXCHANGE_CONTRACT_ADDRESS } from "../../constants/exchange"
import { TOKEN_INRT_CONTACT_ADDRESS, TOKEN_USDT_CONTACT_ADDRESS, TOKEN_VARMA_CONTACT_ADDRESS } from "../../constants/tokens"
import { EXCHANGE_TYPES } from "../../reducer/contracts/exchange/exchangeTypes";

// import GoogleChart from './components/GoogleChart';




export default function OrderBook({ walletState, walletDispatch, tokenState, tokenDispatch, exchangeState, exchangeDispatch }) {


    useEffect(() => {
        loadDataOnpage()

    }, [walletState, tokenState.navtokenstate, exchangeState.buyOrSell])

    async function loadDataOnpage() {

        await loadAllOrdersPair(walletState, tokenState.navtokenstate)
    }



    async function loadAllOrdersPair(walletState, filterOption) {

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

            const sellOrders = allOrder.filter((order) => order.tokenGet == TOKEN_VARMA_CONTACT_ADDRESS && order.tokenGive == searchAddress)
            const buyOrders = allOrder.filter((order) => order.tokenGive == TOKEN_VARMA_CONTACT_ADDRESS && order.tokenGet == searchAddress)

            let allSellOrders = [];
            let allSellOrdersGraph = Array(['', '', '', '', '']);
            sellOrders.map((order) => {
                let price = sellOrderFilter(order)
                const temp = {
                    ...price
                }
                allSellOrders.push(temp)
                const _amountGet = ethers.utils.formatUnits(temp.amountGet, "18")
                const _amountGive = ethers.utils.formatUnits(temp.amountGive, "18")
                const _price = price.price
                const tempD = ["", Number(_amountGet), Number(_price), Number(_amountGive), Number(_price)]

                allSellOrdersGraph.push(tempD);
            })

            let allBuyOrders = [];
            buyOrders.map((order) => {
                let price = buyOrderFilter(order)
                const temp = {
                    ...price
                }
                allBuyOrders.push(temp)

            })

            exchangeDispatch({ type: EXCHANGE_TYPES.SET_ALL_BUY_ORDERS, payload: allBuyOrders })
            exchangeDispatch({ type: EXCHANGE_TYPES.SET_ALL_SELL_ORDERS, payload: allSellOrders })
            exchangeDispatch({ type: EXCHANGE_TYPES.SET_CANDLE_CHART, payload: allSellOrdersGraph })




        }

    }

    return (
        <div>
            <div className="grid place-items-center">
                <Chart
                    width={'83%'}
                    height={455}
                    chartType="CandlestickChart"
                    loader={<div>Loading Chart</div>}
                    data={exchangeState.candleChart}
                    options={{
                        legend: 'none',
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />


            </div>
            <div >
                <div>
                    <div className="grid grid-cols-2">
                        <div >
                            <div className="px-[8%] py-5 font-bold">Buy: Get Varma give usdt</div>
                            <table className="table-auto">
                                <thead>
                                    <tr>
                                        <th className="px-12">Varma</th>
                                        <th className="px-16">VARMA / {tokenState.navtokenstate}</th>
                                        <th className="px-12">{tokenState.navtokenstate}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {exchangeState.allSellOrders && exchangeState.allSellOrders.map((order, index) => {

                                        return (
                                            <tr key={index}>
                                                <td className="px-12">{ethers.utils.formatEther(order.amountGet.toString())}</td>
                                                <td className="px-16"> {order.price}</td>
                                                <td className="px-12">{ethers.utils.formatEther(order.amountGive.toString())}</td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>

                        </div>
                        <div>
                            <div className="px-[8%] py-5 font-bold">Sell: Give Varma get usdt</div>
                            <table className="table-auto">
                                <thead>
                                    <tr>
                                        <th className="px-12">Varma</th>
                                        <th className="px-16">VARMA / {tokenState.navtokenstate}</th>
                                        <th className="px-12">{tokenState.navtokenstate}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {exchangeState.allBuyOrders && exchangeState.allBuyOrders.map((order, index) => {

                                        return (
                                            <tr key={index}>
                                                <td className="px-12">{ethers.utils.formatEther(order.amountGet.toString())}</td>
                                                <td className="px-16"> {order.price}</td>
                                                <td className="px-12">{ethers.utils.formatEther(order.amountGive.toString())}</td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

    function getPrice(amountGive, amountGet) {
        let tokenAmount0 = amountGive
        let tokenAmount1 = amountGet
        let precision = 100000
        let tokenPrice = tokenAmount1 / tokenAmount0
        tokenPrice = Math.round(tokenPrice * precision) / precision
        return tokenPrice
    }

    function sellOrderFilter(order) {

        const price = getPrice(order.amountGet, order.amountGive)

        return {
            ...order,
            price: price
        }
    }

    function buyOrderFilter(order) {

        const price = getPrice(order.amountGive, order.amountGet)

        return {
            ...order,
            price: price
        }
    }

}
/*
            // const arr = [];

            // // Buy Order: Get Varma give usdt

            // // sell Order: Give Varma get usdt

            // for (let i = 0; i < allOrder.length; i++) {


            //     if (searchAddress) {
            //         const temp = {
            //             orderId: allOrder[i].id,
            //             timestamp: allOrder[i].timestamp,
            //             tokenGet: allOrder[i].tokenGet,
            //             tokenGive: allOrder[i].tokenGive,
            //             amountGet: allOrder[i].amountGet,
            //             amountGive: allOrder[i].amountGive,
            //             user: allOrder[i].user
            //         }
            //         arr.push(temp);
            //     }


            // }
            // exchangeDispatch({ type: EXCHANGE_TYPES.SET_ALL_ORDER_EVENTS, payload: arr });
            // exchangeDispatch({ type: EXCHANGE_TYPES.SET_ALL_ORDER_EVENTS_ACTIVE, payload: true });
*/