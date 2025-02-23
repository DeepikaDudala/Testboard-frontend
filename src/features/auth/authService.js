import axios from "../axios";

const API_URL = "/users/";

//Register User
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
//Login User
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
//Logout  User
const logout = () => {
  localStorage.removeItem("user");
};

//Set Password
const setPassword = async (userData) => {
  const response = await axios.post(API_URL + "setPassword", userData);
  return response.data;
}
const authService = {
  register,
  logout,
  login,
  setPassword
};
export default authService;
