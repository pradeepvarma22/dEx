import { useEffect, useState } from "react"
import LoadBalances from "../../utility/balances";

export default function Balance({ walletState, walletDispatch, tokenState, tokenDispatch, exchangeState, exchangeDispatch }) {

    const [defaultCurrency, setDefaultCurrency] = useState("VARMA");
    const [paymentType, setPaymentType] = useState("Deposit");


    useEffect(() => {
        LoadBalances(walletState, walletDispatch, tokenState, tokenDispatch, exchangeState, exchangeDispatch)
    }, [walletState, tokenState.navtokenstate])



    


    const handlePaymentType = (event) => {

        setPaymentType(event.target.value)
    }

    return (
        <div className="py-3 px-2">


            <div>
                <div className="flex space-x-2">

                    <div>
                        <button type="button" onClick={handlePaymentType} value="Deposit" className="inline-block px-3 py-1.5 bg-slate-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Deposit</button>
                        <button type="button" onClick={handlePaymentType} value="Withdraw" className="inline-block px-3 py-1.5 bg-slate-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Withdraw</button>
                    </div>
                </div>

                <div className="px-[28%] py-2 text-lg">
                    {paymentType}

                </div>
                <div className="pr-5">
                    Token: {defaultCurrency}
                </div>
                <div>
                    Balace: {tokenState.varmaTokenBalance}
                </div>
                <div>
                    Exchange: {exchangeState.balancevarma}
                </div>



                <div className="py-3">
                    <input className="bg-slate-700 px-10 py-2" placeholder="0.00" type="text" />
                    <div className="pt-2 px-[22%]">
                        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                {paymentType}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <div className="py-5">

                    <div className="flex space-x-2">
                        <div className="pr-5">
                            Token: {tokenState.navtokenstate}
                        </div>
                    </div>
                    <div>
                        Balace: {tokenState.token2Balance}
                    </div>
                    <div>
                        Exchange: {exchangeState.balanceToken2}
                    </div>



                    <div className="py-3">
                        <input className="bg-slate-700 px-10 py-2" placeholder="0.00" type="text" />
                        <div className="pt-2 px-[22%]">
                            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    {paymentType}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )



}