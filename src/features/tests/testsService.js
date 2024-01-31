import axios from "../axios";
const API_URL = "/tests/";

//Get All Tests
const getTests = async () => {
  const response = await axios.get(API_URL);
  return response.data.tests;
};

//get Test
const getTest = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios(API_URL + id, config);
  return response.data.test;
};

//create Result
const createResult = async (id, answers, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_URL + id + "/createResult",
    { answers },
    config
  );
  return response.data;
};
//deleteTest
const deleteTest = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + id, config);
  return response.data;
};
//create Test
const createTest = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "addTest", data, config);
  return response.data;
};
const testsService = {
  getTests,
  getTest,
  createResult,
  deleteTest,
  createTest,
};

export default testsService;
