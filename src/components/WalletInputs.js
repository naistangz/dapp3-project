import React from 'react';

function WalletInputs({chain, setChain, wallet, setWallet}) {
    return(
        <>
            <h1>Input a wallet and Chain</h1>
            <p>
                <span>Set Wallet</span>
                <input
                    onChange={(e) => setWallet(e.target.value)}
                    value={wallet}
                ></input>
            </p>

            <select onChange={(e) => setChain(e.target.value)} value={chain}>
                <option value="0x1">ETH</option>
                <option value="0x89">Polygon</option>
            </select>
        </>
    )
}

export default WalletInputs
