import { useEffect, useState } from "react";
import AddFarm from "./AddFarm";
import FarmList from "./FarmList";
import ContactForm from "./ContactForm";
import Blog from "./Blog";
import "./MainPage.css";
import FarmView from "./FarmView";
import storage from "./storage";
import profileImg from "../src/assets/profile-img.jpg"

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
    const farms = await storage.instance.getAllFiles();
    setFarmList(farms);
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

  const addFarmFunction = async (farm) => {
    console.log(farm);
    const farms = [...farmList];
    farms.push(farm);
    setFarmList(farms);
    await storage.instance.uploadJson(farm.id, JSON.stringify(farm));
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

  return (
    <div className="page-main">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <div className="row d-flex flex-1">
            <div className="col-sm-3">
              <div className="logo">
                <a class="navbar-brand" href="#">Farm Trust</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
              </div>
            </div>
            <div className="col-sm-9 d-flex justify-content-end align-items-center">
              <button onClick={() => setMenu(1)}>Main Menu</button>
              <button onClick={() => setMenu(2)}>Contact Us</button>
              <button onClick={() => setMenu(3)}>Blogs</button>

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
            </div>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="row main-page-wrap">
          <div className="col-12">
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
                        <div className="row d-flex align-items-center justify-content-center">
                          <div className="col-6">
                            <div className="card-head mt-5">
                              <h1>Welcome to your lerem ispon </h1>
                              <p className="pe-5">Lorem ipsum dolor sit amet fessions dealing with the universe of communication have a stable relationship</p>
                            </div>
                            <div className="card col-lg-11 col-12">
                              <div className="card-row">
                                <h4>Wallet Address</h4>
                                <p>
                                  {props.accountAddress.slice(0, 4)}...
                                  {props.accountAddress.slice(38, 42)}
                                </p>
                              </div>
                              <div className="card-row">
                                <h4>Wallet Balance</h4>
                                <p>{props.accountBalance}</p>
                              </div>
                            </div>
                            <div>
                              <p className="info mt-3">🎉 Connected Successfully</p>
                              <button className="btn mt-3 mb-3" onClick={props.disconnectWallet}>Disconnect</button>
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="img-wrapper text-center">
                              <img alt="profile" src={profileImg} />
                            </div>
                          </div>
                        </div>
                        <button onClick={goToAddFarm}>Add Farm</button>
                        <button onClick={loadFarms}>Refresh</button>
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
        </div>
      </div >
    </div>
  );
}
