import { useState } from "react";
import AddFarm from "./AddFarm";
import FarmList from "./FarmList";

export default function MainPage(props) {
  const [farmList, setFarmList] = useState([]);
  const [addFarm, setAddFarm] = useState(false);

  const goToAddFarm = () => {
    setAddFarm(true);
  };
  const goBack = () => {
    setAddFarm(false);
  };

  return (
    <div>
      {addFarm ? (
        <AddFarm goBack={goBack} />
      ) : (
        <div>
          {" "}
          <buttom onClick={goToAddFarm}>Add Farm</buttom>
          <div className="card">
            <div className="card-row">
              <h3>Wallet Address:</h3>
              <p>
                {props.accountAddress.slice(0, 4)}...
                {props.accountAddress.slice(38, 42)}
              </p>
            </div>
            <div className="card-row">
              <h3>Wallet Balance:</h3>
              <p>{props.accountBalance}</p>
            </div>
          </div>
          <div>
            <p className="info">🎉 Connected Successfully</p>
            <button onClick={props.disconnectWallet}>Disconnect</button>
          </div>
          <FarmList farmList={farmList} />
        </div>
      )}
    </div>
  );
}
