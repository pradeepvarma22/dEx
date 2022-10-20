import { useEffect } from "react"
import { onPageLoad } from "../../utility/onpageload"

export default function Main({ walletState, walletDispatch, tokenState, tokenDispatch, exchangeState, exchangeDispatch }) {

    useEffect(() => {
        onPageLoad(walletState, walletDispatch, tokenState, tokenDispatch, exchangeState, exchangeDispatch)

    }, [])

    return (
        <div>
            <div>
                <div className="grid grid-cols-[23%_80%] w-full h-screen text-slate-50">
                    <div className='bg-slate-800'>A</div>
                    <div className='bg-slate-900'>B</div>
                </div>
            </div >

        </div>
    )
}
