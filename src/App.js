import './App.css';
import { useState } from 'react';
import WalletInputs from './components/WalletInputs';
import NativeTokens from "./components/NativeTokens";
import Tokens from "./components/Tokens";
import PortfolioValue from "./components/PortfolioValue";
import TransferHistory from "./components/TransferHistory";
import Nfts from "./components/Nfts";

function App() {
    const [wallet, setWallet] = useState("");
    const [chain, setChain] = useState("0x1");
    const [nativeBalance, setNativeBalance] = useState(0);
    const [nativeValue, setNativeValue] = useState(0);
    const [tokens, setTokens] = useState([]);
    const [transfers, setTransfers] = useState([]);
    const [nfts, setNfts] = useState([]);


  return (
    <div className="App">
        <WalletInputs
            chain={chain}
            setChain={setChain}
            wallet={wallet}
            setWallet={setWallet}
        />
        <NativeTokens
            wallet={wallet}
            chain={chain}
            nativeBalance={nativeBalance}
            setNativeBalance={setNativeBalance}
            nativeValue={nativeValue}
            setNativeValue={setNativeValue}
        />
        <Tokens
            wallet={wallet}
            chain={chain}
            tokens={tokens}
            setTokens={setTokens}
        />
        <PortfolioValue
            nativeValue={nativeValue}
            tokens={tokens}
            />
        <TransferHistory
            chain={chain}
            wallet={wallet}
            transfers={transfers}
            setTransfer={setTransfers}
        />
        <Nfts
            chain={chain}
            wallet={wallet}
            nfts={nfts}
            setNfts={setNfts}
        />
    </div>
  );
}

export default App;