import { useEffect, useState } from "react";
import AddFarm from "./AddFarm";
import FarmList from "./FarmList";
import ContactForm from "./ContactForm";
import Blog from "./Blog";
import "./MainPage.css";
import FarmView from "./FarmView";

export default function MainPage(props) {
  const [farmList, setFarmList] = useState([]);
  const [addFarm, setAddFarm] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [menu, setMenu] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [filteredFarms, setFilteredFarms] = useState([]);

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

  const selectFarm = (farmId) => {
    console.log(farmId);
    setSelectedFarm(farmId);
  };

  const getSelectedFarm = () => {
    const farm = farmList.find((farm) => farm.id === selectedFarm);
    return farm;
  };

  const addFarmFunction = (farm) => {
    console.log(farm);
    const farms = [...farmList];
    farms.push(farm);
    setFarmList(farms);
    filterFarms();
    setSearchTerm("");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    filterFarms();
  }, [searchTerm, farmList]);

  const filterFarms = () => {
    const _farms = farmList.filter((farm) =>
      !searchTerm
        ? true
        : farm.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFarms(_farms);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown((prevState) => !prevState);
  };

  const handleProfileOptionClick = (option) => {
    if (option === "Profile") {
      // Handle "Profile" option click
    } else if (option === "Dark Mode") {
      setDarkMode((prevMode) => !prevMode);
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  console.log("MainPage rendered ", selectedFarm);
  return (
    <div>
      <div className="profile-dropdown">
        <button onClick={toggleProfileDropdown}>Your Profile</button>
        {showProfileDropdown && (
          <div className="profile-options">
            <button onClick={() => handleProfileOptionClick("Profile")}>
              Profile
            </button>
            <button onClick={() => handleProfileOptionClick("Dark Mode")}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        )}
      </div>
      <button onClick={() => setMenu(1)}>Main Menu</button>
      <button onClick={() => setMenu(2)}>Contact Us</button>
      <button onClick={() => setMenu(3)}>Blogs</button>
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
                  farm={getSelectedFarm()}
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
                  <input
                    type="text"
                    placeholder="Search farms..."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <FarmList farms={filteredFarms} selectFarm={selectFarm} />
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
        <div></div>
      )}
    </div>
  );
}
