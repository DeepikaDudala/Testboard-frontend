import axios from "axios";
axios.defaults.withCredentials = "include";
const instance = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v1",
  withCredentials: "include",
});

export default instance;
