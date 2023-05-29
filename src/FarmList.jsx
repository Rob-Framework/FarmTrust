export default function FarmList(props) {
  const renderFarms = () => {
    const farms = props.farms ? props.farms : [];
    const listItems = farms.map((farm) => (
      <div key={farm.id}>
        <h2>{farm.name}</h2> {farm.id} - {farm.owner}
        <br />
        <h3>Description: {farm.description}</h3>
        <button
          onClick={() => {
            props.selectFarm(farm.id);
          }}
        >
          View
        </button>
      </div>
    ));
    return listItems;
  };

  return (
    <div className="Farmlist">
      <h1>Farm List</h1>
      {renderFarms()}
    </div>
  );
}
