import axios from "axios";
axios.defaults.withCredentials = "include";
const instance = axios.create({
  baseURL: 'https://testboard-api-v1.onrender.com/api/v1',
  withCredentials: "include",
});

export default instance;
