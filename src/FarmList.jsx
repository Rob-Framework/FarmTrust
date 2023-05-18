export default function FarmList(prop) {
  const renderFarms = () => {
    const farms = prop.farms;
    const listItems = farms.map((farm) => (
      <div key={farm.id}>
        <h2>{farm.title}</h2> - {farm.id} - {farm.owner}
        <br />
        <h3>Description: {farm.description}</h3>
      </div>
    ));
    return listItems;
  };

  return (
    <div>
      <h1>Farm List</h1>
      {renderFarms()}
    </div>
  );
}
