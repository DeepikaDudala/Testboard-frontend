import axios from "../axios";
const API_URL = "results/";

//Get All Results
const getAllResults = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data.results;
};

//get Result
const getResult = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + id, config);
  return response.data.result;
};
//delete student results
const deleteResults = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + id, config);
  return response.data;
};
const resultsService = {
  getAllResults,
  getResult,
  deleteResults,
};

export default resultsService;
