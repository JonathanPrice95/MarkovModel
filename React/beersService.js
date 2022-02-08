import axios from "axios";

var endpoint = "https://localhost:50001/api/beers";

const updateBeerData = (payload) => {
  console.log("Update Beer Data is Firing");
  const config = {
    method: "PUT",
    url: `${endpoint}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const addBeerModel = (newModelName) => {
  console.log("Add and Initialize a Beer Model is Firing");
    const config = {
      method: "POST",
      url: `${endpoint}/models`,
      data: newModelName,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config);
  };

  const updateBeerModelName = (payload) => {
    console.log("Update Beer Model Name is Firing");
    const config = {
      method: "PUT",
      url: `${endpoint}/models/${payload.id}`,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config);
  };


  const getBeerData = () => {
    console.log("Get Beer Data is Firing");
    const config = {
      method: "GET",
      url: `${endpoint}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config);
  };

  const getBeerDataByModel = (modelId) => {
    console.log("Get Beer Data By Model Id is Firing");
    const config = {
      method: "GET",
      url: `${endpoint}/${modelId}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config);
  };

  const getBeerModelNames = () => {
    console.log("Get Beer Model Names is Firing");
    const config = {
      method: "GET",
      url: `${endpoint}/models`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config);
  };

  const deleteBeerModel = (modelId) => {
    console.log("Delete a Beer Model is Firing");
    const config = {
      method: "DELETE",
      url: `${endpoint}/models/${modelId}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config);
  };


export { addBeerModel, updateBeerData, updateBeerModelName, getBeerData, getBeerDataByModel, getBeerModelNames, deleteBeerModel};