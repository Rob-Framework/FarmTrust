import { useState } from "react";
import storage from "./storage";

export default function AddFarm(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [harvestable, setHarvestable] = useState(0);
  const [harvested, setHarvested] = useState(0);

  const addFarm = async () => {
    if (!title || !description || !harvestable || !harvested) {
      return;
    }

    if (await storage.instance.nameExists(title)) {
      return;
    }

    const id = await storage.instance.getUniquieId();

    const farmObject = {
      id: id,
      owner: props.address,
      name: title,
      description: description,
      staked: 0,
      harvestable: harvestable,
      harvested: harvested,
      donated: 0,
    };

    props.addFarm(farmObject);
    props.goBack();
  };

  return (
    <div>
      <h2>Add Farm</h2>
      <div className="card">
        <div className="card-row">
          <h3>Title:</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <h3>Description:</h3>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <h3>Harvestable:</h3>
          <input
            type="number"
            value={harvestable}
            onChange={(e) => setHarvestable(e.target.value)}
          />

          <h3>Harvested:</h3>
          <input
            type="number"
            value={harvested}
            onChange={(e) => setHarvested(e.target.value)}
          />
        </div>
      </div>
      <button onClick={addFarm}>Add Farm</button>
      <button onClick={props.goBack}>Go Back</button>
    </div>
  );
}
