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
      checkIfWasConnected();
    };
    checkMetamaskAvailability();
  }, []);

  const checkIfWasConnected = () => {
    const wasConnected = localStorage.getItem("wallet_address");
    if (wasConnected) {
      connectWallet();
    }
  };

  const connectWallet = async (checkedWallet = "") => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (checkedWallet) {
        if (accounts[0] == checkedWallet) {
          localStorage.removeItem("wallet_address");
          return;
        }
      }

      setAccountAddress(accounts[0]);
      setIsConnected(true);

      const balance = await provider.getBalance(accounts[0]);
      const balanceInEther = ethers.formatEther(balance);
      setAccountBalance(balanceInEther);
      localStorage.setItem("wallet_address", accounts[0]);
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
      localStorage.removeItem("wallet_address");
    } catch (error) {
      console.log(error);
    }
  };

  const donate = async (amount, to) => {
    if (!ethereum) {
      sethaveMetamask(false);
      return;
    }

    if (amount <= 0 || !to || !accountAddress || to == accountAddress) {
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const tx = await signer.sendTransaction({
      to: to,
      value: ethers.utils.parseEther(amount),
    });

    console.log("sent tx", tx);
    //update the farm list with the new donated amount
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
                donate={donate}
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
