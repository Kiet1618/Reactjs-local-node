import FetchNodeDetails from '@toruslabs/fetch-node-details'
import TorusUtils from '@toruslabs/torus.js'
//const { keccak256 } = require('@toruslabs/torus.js')
//const { Wallet, utils } = require('ethers')
import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from "gapi-script";
import Web3 from "web3";
const Login = () => {
  const web3 = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/685d3db8f3144a69b5e3934063e9cb19'));
  const main = async (a, b) => {

    const torusTestLocal = {
      torusNodeEndpoints: [
        "http://localhost:8000/jrpc",
        "http://localhost:8001/jrpc",
        "http://localhost:8002/jrpc",
        "http://localhost:8003/jrpc",
        "http://localhost:8004/jrpc",
      ],
      torusNodePub: [
        { X: 'bc38813a6873e526087918507c78fc3a61624670ee851ecfb4f3bef55d027b5a', Y: 'ac4b21229f662a0aefdfdac21cf17c3261a392c74a8790db218b34e3e4c1d56a' },
        { X: 'b56541684ea5fa40c8337b7688d502f0e9e092098962ad344c34e94f06d293fb', Y: '759a998cef79d389082f9a75061a29190eec0cac99b8c25ddcf6b58569dad55c' },
        { X: '7bcb058d4c6ffc6ba4bfdfd93d141af35a66338a62c7c27cdad2ae3f8289b767', Y: '336ab1935e41ed4719e162587f0ab55518db4207a1eb36cc72303f1b86689d2b' },
        { X: 'bf12a136ef94399ea098f926f04e26a4ec4ac70f69cce274e8893704c4951773', Y: 'bdd44828020f52ce510e026338216ada184a6867eb4e19fb4c2d495d4a7e15e4' },
        { X: '4b5f33d7dd84ea0b7a1eb9cdefe33dbcc6822933cfa419c0112e9cbe33e84b26', Y: '7a7813bf1cbc2ee2c6fba506fa5de2af1601a093d93716a78ecec0e3e49f3a57' }
      ],
      torusIndexes: [1, 2, 3, 4, 5]
      // torusIndexes: [0, 1, 2, 3, 4]
    }
    const fetchNodeDetails = new FetchNodeDetails({ network: "testnet" })
    const torus = new TorusUtils({ network: 'mainnet' })
    const verifier = 'google'
    const verifierId = b;
    const { torusNodeEndpoints, torusNodePub, torusIndexes, currentEpoch, nodeListAddress } = torusTestLocal
    const publicAddress = await torus.getPublicAddress(torusNodeEndpoints, torusNodePub, { verifier, verifierId }, 0)
    // console.log(":rocket: ~ file: index.js:30 ~ main ~ publicAddress", publicAddress)

    const idToken = a;
    const keyData = await torus.retrieveShares(torusNodeEndpoints, torusIndexes, verifier, { verifier_id: verifierId }, idToken, {}, 0)
    //   console.log("🚀 ~ file: index.js:14 ~ main ~ keyData", keyData);
    web3.eth.getBalance(keyData.ethAddress, (error, balance) => {
      if (!error) {
        console.log("balance: " + balance);
      } else {
        console.error("error");
      }
    });
    return keyData;
  }

  const [idToken, setIdToken] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);

  var temp;

  const handleSuccess = async (response) => {
    setIdToken(response.getAuthResponse().id_token);
    setEmail(response.profileObj.email);
    temp = await main(response.getAuthResponse().id_token, response.profileObj.email);
    console.log("Private Key: " + temp.privKey);
    console.log("Address: " + temp.ethAddress);
    return temp;
  };
  const handleFailure = (error) => {
    console.error('Error logging in', error);
    setError(error);
  };
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:
        "75654006966-s37ejl8kvu35bog54p8bl6aa8dn5ioe4.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });


  const handleSubmit = async () => {

    const fromAddress = "0x7918409Cb97463A7084D5b5165E5Be97744a4C68";
    const privateKey = "db434d2bdb3924addcd33957bf8d5ffba731d5655ca436603589127b6f4e0e7c";
    const toAddress = '0x04E407C7d7C2A6aA7f2e66B0B8C0dBcafA5E3Afe';

    const rawTransaction = {
      from: fromAddress,
      to: toAddress,
      value: '0x0', // in wei (0.01 ETH = 10000000000000000)
      gas: 21000,
      gasPrice: '0x4A817C800' // 20 Gwei
    };

    web3.eth.accounts.signTransaction(rawTransaction, privateKey, function (err, signedTransaction) {
      if (err) {
        console.error(err);
      } else {
        web3.eth.sendSignedTransaction(signedTransaction.rawTransaction, function (err, transactionHash) {
          if (err) {
            console.error(err);
          } else {
            console.log(transactionHash);
          }
        });
      }
    });
  }
  return (
    <div>
      {idToken ?

        <div>
          <p>IDToken: {idToken}</p>
          <p>Email: {email}</p>


          <button onClick={handleSubmit}>signedTx</button>
        </div> :

        <GoogleLogin
          clientId="75654006966-s37ejl8kvu35bog54p8bl6aa8dn5ioe4.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          cookiePolicy={'single_host_origin'}
        />
      }
      {error && <p>Error: {error.error}</p>}
    </div >
  );
};

export default Login;

//75654006966-s37ejl8kvu35bog54p8bl6aa8dn5ioe4.apps.googleusercontent.com
//          <button onClick={signTransaction}>Sign Transaction</button>
// truffle migrate