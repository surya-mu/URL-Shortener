import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import {useAuth} from './services/AuthContext';
const api = import.meta.env.VITE_API;
const frontend = import.meta.env.VITE_FRONTEND
console.log(api)
// import { useNavigate } from 'react-router-dom';o
// import validator from './../node_modules/validator/es/index';
import validator from "validator";
import { jwtDecode } from "jwt-decode";
function App() {
  const [user,setUser] = useState('User');
  // const navigate = useNavigate("/")
  

  useEffect(()=>{
    const token = localStorage.getItem('user')
    try{
      const decoded = jwtDecode(token)
      setUser(decoded.username)
    }
    catch(error){
      console.log(error)
      setUser('User')
    }
  },[])
  const [inputUrl, setInputUrl] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(false);
  const onChangeHandler = (e) => {
    setInputUrl(e.target.value);
    console.log(inputUrl);
  };
  const isValidURL = (url) => {
    return validator.isURL(url, {
      protocols: ["http", "https"],
      require_valid_protocol: true,
      allow_underscores: false,
      allow_trailing_dot: false,
    });
  };

  const onClickHandler = async () => {
    // e.preventDefault()
    //if(!isValidURL()) setIsValid(false)
    if (isValidURL(inputUrl) == true) {
      setIsValid(true);
      setError(false);
    }
    if (isValidURL(inputUrl) == false) {
      setIsValid(false);
      setError(true);
      toast.error("This URL is not Valid, Try Again!");
      return;
    }
    try {
      const token = localStorage.getItem('user')
      const response = await axios.post(`${api}shorten`, {
        inputUrl: inputUrl,
      },{headers: {Authorization: `Bearer ${token}`}});
      console.log("New URL:", response.data.newUrl);
      setResultUrl(response.data.newUrl);
      setInputUrl("");
      toast.success(
        `Your URL is created at ${frontend}:/${response.data.newUrl}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="container-fluid"
      style={{ height: "100vh", fontFamily: "Poppins" }}
    >
      {/* <ToastContainer theme="dark" closeOnClick='true'/> */}
      {/* <Navbar/> */}

      <div className="Hero text-white mx-5 my-5 p-1 align-center text-center">
        <h1 className="py-3">Welcome <span style={{color:"gold"}}> {user.slice(0,5)}</span></h1>
        <h2 className="text-center p-0">Shorten URL's in Zap</h2>
        <h2 className="text-center p-0  ">Try Now!</h2>
      </div>

      <div>
        <form name="userForm" className="text-center">
          <div className="d-flex gap-3 justify-content-center align-items-center">
            <label htmlFor="URL" className="text-white m-0">
              <h3 className="m-0 p-0" style={{color:"gold"}}>Zapp this Link: </h3>
            </label>
            <input
              required
              value={inputUrl}
              onChange={onChangeHandler}
              type="text"
              placeholder="https://www.example.com"
              name="URL"
              className="form-control w-auto"
              style={{ minWidth: "250px", fontSize: "13px" }}
            />
            <button
              type="button"
              className="btn btn-warning"
              onClick={onClickHandler}
              id="liveToastBtn"
              data-bs-toggle="toast"
              data-bs-target="#liveToast"
            >
              Shorten!
            </button>
          </div>
          </form>
        {resultUrl && isValid && (
          <div className="text-white text-center ps-3">
            Copied URL is: <a href={resultUrl}> {resultUrl} </a>{" "}
          </div>
        )}

        {error && (
          <div className="text-white text-center ps-3">
            <ToastContainer 
            closeOnClick={true}
            pauseOnFocusLoss={false}
            pauseOnHover={false}
            theme="dark"/>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
