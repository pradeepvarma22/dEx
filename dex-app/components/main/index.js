import { useEffect } from "react"
import { onPageLoad } from "../../utility/onpageload"
import Navbar from "../navbar"

export default function Main({ walletState, walletDispatch, tokenState, tokenDispatch, exchangeState, exchangeDispatch }) {

    useEffect(() => {
        onPageLoad(walletState, walletDispatch, tokenState, tokenDispatch, exchangeState, exchangeDispatch)

    }, [])




    return (
        <div>
            <div>
                <Navbar walletState={walletState} walletDispatch={walletDispatch} />
                <div className="grid grid-cols-[23%_77%] w-full h-screen text-slate-50">
                    <div className='bg-slate-800'>A</div>
                    <div className='bg-slate-900'>
                        B
                    </div>
                </div>
            </div >

        </div>
    )
}
