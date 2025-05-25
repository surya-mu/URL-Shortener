import React from "react";
import { useAuth } from "./services/AuthContext";
import { useState,useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
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
import './main.css'
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
  const { isAuthenticated} = useAuth();
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
      style={{background:"radial-gradient(10% 90%,circle,#232526,#000000)",height:"100vh"}}
    >
   {!isAuthenticated && <div
      className="vh-100 text-center mx-auto mt-5 glow"
      style={{ backgroundColor: "black",fontSize:"64px",fontWeight:"700",fontStretch:"100%",color:"#f2f2f2" }}
    >
          <div className="animation1" id="animation1">You are one click away <br />  from  <span className="darkpurple">Zapping</span> your URL</div>
          <img src="https://img.icons8.com/?size=100&id=70734&format=png&color=ffffff" alt="" className="animation1 mt-5 arrow" />
           
           <div><Link to="/register"><button className="btn btn-light darkpurple p-3 text-center mx-auto mt-5 about-button" style={{borderRadius:"20px",fontSize:"20px",fontWeight:"700"}}>Get Started</button></Link></div> 
           <div> <Link to="/faq" className="btn purple glow" style={{fontSize:"20px"}}>Learn More</Link></div>   
    </div>}    
      {/* <ToastContainer theme="dark" closeOnClick='true'/> */}
      {/* <Navbar/> */}
         {isAuthenticated && <div>
            <div className="Hero text-white mx-5 my-5 p-1 align-center text-center" >
              <h1 className="py-3">Welcome <span className="darkpurple"> {user.slice(0,1).toString().toUpperCase()  + user.slice(1,5)}</span></h1>
              <h2 className="text-center p-0">Shorten URL's Instantly⚡</h2>
              {/* <h2 className="text-center p-0  ">Try Now!</h2> */}
            </div>

            <div>
              <form name="userForm" className="text-center">
                <div className="d-flex gap-3 justify-content-center align-items-center">
                  <label htmlFor="URL" className="text-white m-0">
                    <h3 className="m-0 p-0 purple">Zapp this: </h3>
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
                    className="btn text-light"
                    onClick={onClickHandler}
                    id="liveToastBtn"
                    data-bs-toggle="toast"
                    data-bs-target="#liveToast"
                    style={{  backgroundColor: "#5d3fd3"}}
                  >
                    Shorten!
                  </button>
                </div>
                </form>
              {resultUrl && isValid && (
                <div className="text-white text-center ps-3">
                  Copied URL is: <a href={resultUrl}> { frontend  + resultUrl} </a>{" "}
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
          </div>} 
    </div>
  );
}

export default App;
