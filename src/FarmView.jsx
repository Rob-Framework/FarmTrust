import { useState } from "react";

export default function FarmView(props) {
  const [donationAmount, setDonationAmount] = useState(0);

  const donate = async () => {
    props.donate(donationAmount, props.farm.owner);
  };

  return (
    <div>
      <h2>{props.farm.name}</h2> - {props.farm.id} - {props.farm.owner}
      <br />
      <h3>Description: {props.farm.description}</h3>
      <h3>Staked: {props.farm.staked}</h3>
      <h3>Harvestable: {props.farm.harvestable}</h3>
      <h3>Harvested: {props.farm.harvested}</h3>
      <h3>Donated: {props.farm.donated}</h3>
      <br />
      <input
        type="number"
        value={donationAmount}
        onChange={(e) => setDonationAmount(e.target.value)}
      />
      <br />
      <button onClick={donate}>Donate</button>
      <br />
      <button onClick={props.goBack}>Go Back</button>
    </div>
  );
}
