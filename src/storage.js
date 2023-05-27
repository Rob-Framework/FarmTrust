import { Web3Storage } from "web3.storage";
import { API_KEY } from "./constants";

export default class storage {
  static instance;
  client;

  constructor() {
    storage.instance = this;

    this.client = new Web3Storage({ token: API_KEY });
  }

  uploadJson = async (id, json) => {
    const file = new File([json], id + "_farm.json", {
      type: "application/json",
    });

    const cid = await this.client.put([file]);
    return cid;
  };

  getAllFiles = async () => {
    const files = await this.client.list();
    if (!files) return [];
    const filesJson = [];
    const filesArray = [];

    for await (const file of files) {
      filesArray.push(file);
    }

    for (const file of filesArray) {
      const json = await this.client.get(file.cid);
      let data = await json.text();

      try {
        data = data.substring(data.indexOf("{"));
        const jsonData = JSON.parse(data);
        filesJson.push(jsonData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
    return filesJson;
  };

  getFile = async (cid) => {
    const file = await this.client.get(cid);
    return file;
  };

  randomString = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++)
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
  };

  getUniquieId = async () => {
    const jsons = await this.getAllFiles();
    let id = this.randomString(10);

    while (jsons.find((json) => json.id === id)) {
      id = this.randomString(10);
    }

    return id;
  };

  nameExists = async (name) => {
    const jsons = await this.getAllFiles();
    return jsons.find((json) => json.name === name);
  };
}
