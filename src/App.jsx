import { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import Login from "./Login";
import MainPage from "./MainPage";

function App() {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState(0);
  const { ethereum } = window;
  const provider = new ethers.BrowserProvider(window.ethereum);

  useEffect(() => {
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccountAddress(accounts[0]);
      setIsConnected(true);

      const balance = await provider.getBalance(accounts[0]);
      // Convert balance from wei to ether
      const balanceInEther = ethers.formatEther(balance);
      setAccountBalance(balanceInEther);
    } catch (error) {
      console.log(error);
      setIsConnected(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      setIsConnected(false);
      setAccountAddress("");
      setAccountBalance(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {haveMetamask ? (
          <div className="App-header">
            {isConnected ? (
              <MainPage
                accountAddress={accountAddress}
                accountBalance={accountBalance}
                disconnectWallet={disconnectWallet}
              />
            ) : (
              <Login connectWallet={connectWallet} />
            )}
          </div>
        ) : (
          <p>Please Install MataMask</p>
        )}
      </header>
    </div>
  );
}

export default App;
