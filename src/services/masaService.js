const ethers = require("ethers");
require("dotenv").config();

const ABI = require("../utils/masaABI.json");

async function getAdderssOfSoulName(address) {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL, {
        name: "alfajores",
        chainId: 44787,
    });

    const CONTRACT_ADDRESS = "0xf163686d50C800C49ED58836d3a4D1fBA057CeE6";

    const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ABI.result,
        provider
    );
    let getId = await contract.nameData(address);
    console.log(Number(getId[1]));

    let ownerAddress;
    try {
        ownerAddress = await contract.ownerOf(getId[1]);
    } catch (error) {
        console.log(error.code);
        return {
            check: false,
            address: null,
        };
    }

    console.log(ownerAddress);
    return {
        check: true,
        address: ownerAddress,
    };
}


module.exports = {
    getAdderssOfSoulName
}
