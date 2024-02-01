import axios from "axios";
axios.defaults.withCredentials = "include";
const instance = axios.create({
  baseURL: process.env.BACKEND_URL,
  withCredentials: "include",
});

export default instance;
