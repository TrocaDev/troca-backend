require("dotenv").config();
const { Masa } = require("@masa-finance/masa-sdk");
const ethers = require("ethers");

async function checkSoulAddress() {
    const _provider = new ethers.JsonRpcProvider("https://celo-alfajores.infura.io/v3/b06f8038697947818cf523e9a007ef47", {
        name: "alfajores",
        chainId: 44787
    })
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, _provider);

    const signer = _provider.getSigner(wallet.address);
    const masa = new Masa({
        signer: signer,
    })

    let result = masa.loadSoulNameByName("iamphased.celo");
    console.log(result);
}

checkSoulAddress();