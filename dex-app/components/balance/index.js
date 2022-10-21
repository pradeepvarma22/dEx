import { ethers } from "ethers";
import { useEffect, useState } from "react"
import { EXCHANGE_CONTRACT_ABI, EXCHANGE_CONTRACT_ADDRESS } from "../../constants/exchange";
import { TOKEN_CONTACT_ABI, TOKEN_INRT_CONTACT_ADDRESS, TOKEN_USDT_CONTACT_ADDRESS, TOKEN_VARMA_CONTACT_ADDRESS } from "../../constants/tokens";
import LoadBalances from "../../utility/balances";

export default function Balance({ walletState, walletDispatch, tokenState, tokenDispatch, exchangeState, exchangeDispatch }) {

    const [defaultCurrency, setDefaultCurrency] = useState("VARMA");
    const [paymentType, setPaymentType] = useState("Deposit");
    const [token1TransferAmount, setToken1TransferAmount] = useState(0)
    const [token2TransferAmount, setToken2TransferAmount] = useState(0)
    const [dummyTxn, setDummyTxn] = useState(0)



    useEffect(() => {
        LoadBalances(walletState, walletDispatch, tokenState, tokenDispatch, exchangeState, exchangeDispatch)
    }, [walletState, tokenState.navtokenstate, dummyTxn])

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
                    <input onChange={(e) => { handleTransferAmount(e, "token1") }} className="bg-slate-700 px-10 py-2" placeholder="0.00" type="text" />
                    <div className="pt-2 px-[22%]">
                        <button onClick={(e) => handlePayment_D_W(e, "token1")} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
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
                        <input onChange={(e) => { handleTransferAmount(e, "token2") }} className="bg-slate-700 px-10 py-2" placeholder="0.00" type="text" />
                        <div className="pt-2 px-[22%]">
                            <button onClick={(e) => handlePayment_D_W(e, "token2")} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
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

    function handleTransferAmount(event, tokenX) {
        if (tokenX == "token2") {
            setToken2TransferAmount(event.target.value)
        }
        else {
            setToken1TransferAmount(event.target.value)

        }
    }


    function handlePayment_D_W(event, token) {

        if (paymentType == "Deposit") {
            if (token == "token1") {
                depositHandler(EXCHANGE_CONTRACT_ADDRESS, TOKEN_VARMA_CONTACT_ADDRESS, walletState.provider, token1TransferAmount)
            }
            else {
                const address_ = tokenState.navtokenstate =="USDT" ? (TOKEN_USDT_CONTACT_ADDRESS) : (TOKEN_INRT_CONTACT_ADDRESS) 
                depositHandler(EXCHANGE_CONTRACT_ADDRESS, address_, walletState.provider, token2TransferAmount)

            }
        }
        else {
            if (token == "token1") {

            }
            else {

            }
        }


    }

    async function depositHandler(exchangeAddress, tokenAddress, provider, amount) {
        if (provider != null) {
            const signer = await provider.getSigner();
            const amountToTransfer = ethers.utils.parseEther(amount);
            const tokenContract = new ethers.Contract(tokenAddress, TOKEN_CONTACT_ABI, signer)
            let txn = await tokenContract.approve(exchangeAddress, amountToTransfer)
            await txn.wait();

            const exchangeContract = new ethers.Contract(exchangeAddress, EXCHANGE_CONTRACT_ABI, signer)
            txn = await exchangeContract.depositToken(tokenAddress, amountToTransfer)
            txn = await txn.wait();
            setDummyTxn(dummyTxn + 1);
        }
    }



}