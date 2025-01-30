import axios from "axios";
// axios.defaults.withCredentials = "include";
const instance = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  // withCredentials: "include",
});

export default instance;
