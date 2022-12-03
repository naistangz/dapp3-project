const Moralis = require('moralis').default;
const express = require('express')
const app = express()
const cors = require('cors');
const port = 8080

require("dotenv").config();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/nativeBalance', async (req, res) => {

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY});

  try {

    const { address, chain } = req.query;
    const response = await Moralis.EvmApi.balance.getNativeBalance({
        address: address,
        chain: chain,
    });
    const nativeBalance = response.data;
      let nativeCurrency;
      if (chain === "0x1") {
        nativeCurrency = ""
      } else if (chain === "0x89") {
        nativeCurrency = ""
      }

      const nativePrice = await Moralis.EvmApi.token.getTokenPrice({
        address: nativeCurrency,
        chain: chain
      });

      nativeBalance.usd = nativePrice.data.usdPrice;

      res.send(nativeBalance)

  } catch(e) {
    res.send(e)
  }

})

app.get('/tokenBalances', async(req, res) => {
  await Moralis.start({apiKey: process.env.MORALIS_API_KEY});

  try {
    const {address, chain} = req.query;

    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      address: address,
      chain: chain
    });
    let tokens = response.data

      let legitTokens = [];
      for (let i = 0; i < tokens.length; i++) {
        const priceResponse = await Moralis.EvmApi.token.getTokenPrice({
          address: tokens[i].token_address,
          chain: chain,
        });

        if (priceResponse.data.usdPrice > 0.01) {
          tokens[i].usd = priceResponse.data.usdPrice;
          legitTokens.push(tokens[i]);
        } else {
          console.log("💩 coin");
        }
      }
      res.send(legitTokens)
      } catch (e) {
      res.send(e);
      }
    })