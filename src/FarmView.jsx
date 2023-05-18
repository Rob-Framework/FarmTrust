export default function FarmView(props) {
  return (
    <div>
      <h2>{props.farm.title}</h2> - {props.farm.id} - {props.farm.owner}
      <br />
      <h3>Description: {props.farm.description}</h3>
      <h3>Staked: {props.farm.staked}</h3>
      <h3>Harvestable: {props.farm.harvestable}</h3>
      <h3>Harvested: {props.farm.harvested}</h3>
      <h3>Donated: {props.farm.donated}</h3>
      <button onClick={props.goBack}>Go Back</button>
    </div>
  );
}
