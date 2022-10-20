import { useReducer } from 'react';
import Main from '../components/main';
import { exchangeReducer, EXCHANGE_INITIAL_STATE } from '../reducer/contracts/exchange';
import { tokenReducer, TOKEN_INITIAL_STATE } from '../reducer/contracts/token';
import { walletReducer, WALLET_INITIAL_STATE } from '../reducer/wallet';

export default function Home() {

  const [walletState, walletDispatch] = useReducer(walletReducer, WALLET_INITIAL_STATE)
  const [tokenState, tokenDispatch] = useReducer(tokenReducer, TOKEN_INITIAL_STATE)
  const [exchangeState, exchangeDispatch] = useReducer(exchangeReducer, EXCHANGE_INITIAL_STATE)

  return (
    <div>


      <Main
        walletState={walletState}
        walletDispatch={walletDispatch}
        tokenState={tokenState}
        tokenDispatch={tokenDispatch}
        exchangeState={exchangeState}
        exchangeDispatch={exchangeDispatch}
      />


    </div>
  )
}
