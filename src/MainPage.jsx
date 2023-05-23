import { useEffect, useState } from "react";
import AddFarm from "./AddFarm";
import FarmList from "./FarmList";
import ContactForm from "./ContactForm";
import Blog from "./Blog";
import Explore from "./Explore";

export default function MainPage(props) {
  const [farmList, setFarmList] = useState([]);
  const [addFarm, setAddFarm] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [menu, setMenu] = useState(1);

  useEffect(() => {
    loadFarms();
  }, []);

  const loadFarms = async () => {
    setFarmList([]);
  };

  const goToAddFarm = () => {
    setAddFarm(true);
    setSelectedFarm(null);
  };

  const goBack = () => {
    setAddFarm(false);
    setSelectedFarm(null);
  };

  const addFarmFunction = (farm) => {
    const farms = [...farmList];
    farms.push(farm);
    setFarmList(farms);
  };

  return (
    <div>
      <button onClick={() => setMenu(1)}>Main Menu</button>
      <button onClick={() => setMenu(2)}>Contact Us</button>
      <button onClick={() => setMenu(3)}>Blogs</button>
      <button onClick={() => setMenu(4)}>Explore</button>
      {menu === 1 ? (
        <div>
          {addFarm ? (
            <AddFarm
              goBack={goBack}
              addFarm={addFarmFunction}
              address={props.accountAddress}
            />
          ) : (
            <div>
              {selectedFarm ? (
                <FarmView
                  farm={selectedFarm}
                  goBack={goBack}
                  donate={props.donate}
                />
              ) : (
                <div>
                  <button onClick={goToAddFarm}>Add Farm</button>
                  <button onClick={loadFarms}>Refresh</button>
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
          )}
        </div>
      ) : menu === 2 ? (
        <div>
          <ContactForm />
        </div>
      ) : menu === 3 ? (
        <div>
          <Blog />
        </div>
      ) : (
        <div>
          <Explore />
        </div>
      )}
    </div>
  );
}
