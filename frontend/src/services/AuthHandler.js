import axios from "axios";
const API = import.meta.env.VITE_API;
// import { useAuth } from "./AuthContext";

// const login = async (username, password) => {};

const signup = async (username, password) => {
  const response = await axios.post(API + "auth/signup/", {
    username: username,
    password: password,
  });
  const message = response.data.message;
  console.log("mESSAGEE async" + message);
  return response.data.message;
};
// const getRole = async (username, password) => {
//  const role;
// };
const signin = async (username, password) => {
  const response = await axios.post(API + "auth/login/", {
    username: username,
    password: password,
  });
  const { message, authenticated,token } = response.data;
  if(authenticated){
    localStorage.setItem('user',token)
    
  }
  return { message, authenticated,token };
};

const logout = () => {
  localStorage.removeItem("user");
};

export default { signup, logout, signin };
