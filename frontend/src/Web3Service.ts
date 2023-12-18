import Web3 from 'web3';
//import ABI from './abi.json';
//const CONTRACT_ADDRESS = `${process.env.REACT_APP_CONTRACT_ADDRESS}`;
import axios from 'axios';

export async function mint() {
    const nextMint = localStorage.getItem("nextMint");
    if (nextMint && parseInt(nextMint) > Date.now()) {
        throw new Error("You can't receive tokens twice in a day. Try again tomorrow.");
    }
    if (!window.ethereum) {
        throw new Error('No MetaMask found!');
    }
    const _web3 = new Web3(window.ethereum);
    const accounts = await _web3.eth.requestAccounts();
    if (!accounts || !accounts.length) {
        throw new Error('No account allowed!');
    }

    /* const contract = new _web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from: accounts[0] });
    const tx = await contract.methods.mint().send();
    return tx.transactionHash;     */
    localStorage.setItem("wallet", accounts[0]);
    localStorage.setItem("nextMint", `${Date.now() + (1000 * 60 * 60 * 24)}`);
    const stringUrl = `${process.env.REACT_APP_API_URL}/mint/${accounts[0]}`;
    const response = await axios.post(stringUrl);

    return response.data;
}