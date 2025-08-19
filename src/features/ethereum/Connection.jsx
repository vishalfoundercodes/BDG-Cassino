import { useState } from "react";
import { ethers } from "ethers";
import abi from "./abi.json";
import { toast } from "react-toastify";
import Loader from "../../reusable_component/Loader/Loader";

const contractAddress = import.meta.env.VITE_ETHEREUM_ADDRESS;
const Admin_Wallet_id = "0xfaA81CbBb99C0B630e4d2Ad41eDa0a6A55710a75";

function Connection() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [balance, setBalance] = useState("0");
  const [tokenSymbol, setTokenSymbol] = useState("GUC");
  const [betAmount, setBetAmount] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask!");
      return;
    }

    if (isConnecting) return;

    try {
      setIsConnecting(true); 

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();
      // console.log("Network Chain ID:", network.chainId);
      const tokenContract = new ethers.Contract(contractAddress, abi, signer);

      const rawBalance = await tokenContract.balanceOf(accounts[0]);
      const decimals = await tokenContract.decimals();
      const symbol = await tokenContract.symbol();

      setBalance(ethers.formatUnits(rawBalance, decimals));
      setTokenSymbol(symbol);
    } catch (error) {
      // console.error("Error connecting wallet", error);
      if (error.code === -32002) {
        toast.error(
          "MetaMask request already pending. Please check your wallet."
        );
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const placeBet = async (amount) => {
    if (!amount || !window.ethereum) return;
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tokenContract = new ethers.Contract(contractAddress, abi, signer);

      const decimals = await tokenContract.decimals();
      const parsedAmount = ethers.parseUnits(amount, decimals);
      const userBalanceRaw = await tokenContract.balanceOf(currentAccount);
      if (parsedAmount > userBalanceRaw) {
        toast.error(
          `Insufficient balance. You have only ${balance} ${tokenSymbol}`
        );
        return;
      }
      const tx = await tokenContract.transfer(Admin_Wallet_id, parsedAmount);
      const finalRes = await tx.wait();
      toast.success(
        `Transaction successfully! ${amount} ${tokenSymbol} transferred to Admin.`
      );
      console.log("finalResfinalRes",finalRes)
      setBetAmount("");
      return finalRes;
    } catch (error) {
      console.log("Error placing bet", error);
      toast.error("Transaction failed!");
    }
  };
  return {
    currentAccount,
    balance,
    tokenSymbol,
    betAmount,
    setBetAmount,
    connectWallet,
    placeBet,
    isConnecting,
  };
}

export default Connection;
