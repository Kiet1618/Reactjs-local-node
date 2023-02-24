const FetchNodeDetails = require('@toruslabs/fetch-node-details').default
const TorusUtils = require('@toruslabs/torus.js').default
const { keccak256 } = require('@toruslabs/torus.js')
const { Wallet, utils } = require('ethers')



const main = async () => {
    //async function main() {
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
    const verifierId = 'kiettran@lecle.co.kr'
    const { torusNodeEndpoints, torusNodePub, torusIndexes, currentEpoch, nodeListAddress } = torusTestLocal
    const publicAddress = await torus.getPublicAddress(torusNodeEndpoints, torusNodePub, { verifier, verifierId }, 0)
    console.log(":rocket: ~ file: index.js:30 ~ main ~ publicAddress", publicAddress)

    const idToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI0OWM1MDYyZDg5MGY1Y2U0NDllODkwYzg4ZThkZDk4YzRmZWUwYWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNzU2NTQwMDY5NjYtczM3ZWpsOGt2dTM1Ym9nNTRwOGJsNmFhOGRuNWlvZTQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NTY1NDAwNjk2Ni1zMzdlamw4a3Z1MzVib2c1NHA4Ymw2YWE4ZG41aW9lNC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExMDgyMDc0MTU1NzQ2OTM2MDQwMSIsImhkIjoibGVjbGUuY28ua3IiLCJlbWFpbCI6ImtpZXR0cmFuQGxlY2xlLmNvLmtyIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJ1WE9MeHVWMTBSaGRtdkI5aVc4LUl3IiwibmFtZSI6IktpZXQgVHJhbiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BRWRGVHA0ZmNmV0tnTHZWMG11SGc4ZGlYU2RaYUI5ZEd1QWlvSGtpbHotQz1zOTYtYyIsImdpdmVuX25hbWUiOiJLaWV0IiwiZmFtaWx5X25hbWUiOiJUcmFuIiwibG9jYWxlIjoia28iLCJpYXQiOjE2NzU4Mzc5ODIsImV4cCI6MTY3NTg0MTU4MiwianRpIjoiNmI5MmM1OGI2YTI4YjRiNjlmMDI3NzZiZjc1YTMwYTA4NzU0MTIwMyJ9.LUGjIi7j45gmAtD_3tsok5IX0PvYum8raqH_6zTU6PvaXUllIanWOpk2RtkTZq2EUO5WuaxSeDDcC7zFYgyaGBO2Y6v6VYNSi1eimzDC9oSaCIHChMfgaL4D7njdsKxFi-qnF8NuswG7jj1AHJYcIVBdi93iE-FG6K1dPYoEtsKnwI9sF85J-_peNhrdwNJxXSY5snK0R0Oo4FlZoIu1bEhyuvC4oZNfxrI4rnEc0QT4eF15k-03CzUCUK3WvqM1UtPgRNshGEffps4JdwrogiI8p2c77N84yL5Ug_Vaw80qvEtigwERf0y7Pq5hOOR-hsdMJFGrwKXFy0dprmbl7g'
    const keyData = await torus.retrieveShares(torusNodeEndpoints, torusIndexes, verifier, { verifier_id: verifierId }, idToken, {}, 0)
    console.log("🚀 ~ file: index.js:14 ~ main ~ keyData", keyData)
    return keyData;
}
main();
