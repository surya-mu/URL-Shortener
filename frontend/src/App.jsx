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

  useEffect(() => {
    if (resultUrl && isValid) {
      navigator.clipboard.writeText(`${frontend}/${resultUrl}`);
      // toast.success("URL copied to clipboard!",);
    }
  }, [resultUrl, isValid]);

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
        //  navigator.clipboard.writeText(`${frontend}/${resultUrl}`);
        toast.success(
          `Your URL is created at ${frontend}:/${response.data.newUrl}`
        );
      } catch (error) {
        console.log(error);
      }
      

      
    };
    return (
      <div
        className="container-fluid d-flex flex-column justify-content-center align-items-center"
        style={{background:"radial-gradient(10% 90%,circle,#232526,#000000)"}}
      >
    {!isAuthenticated && <div
        className="text-center mt-5 mx-auto glow"
        style={{ backgroundColor: "black",fontSize:"64px",fontWeight:"700",fontStretch:"100%",color:"#f2f2f2" }}
      >
            <div className="animation1" id="animation1">You are one click away <br />  from  <span className="darkpurple">Zapping</span> your URL</div>
            <img src="https://img.icons8.com/?size=100&id=70734&format=png&color=ffffff" alt="" className="animation1 mt-5 arrow" />
            
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">
  <Link to="/register" className="d-flex justify-content-center text-decoration-none">
    <button
      className="btn btn-light darkpurple p-3 about-button"
      style={{ borderRadius: "20px", fontWeight: "700", fontSize: "clamp(14px, 2vw, 20px)" }}
    >
      Get Started
    </button>
  </Link>
  <Link to="/faq" className="d-flex justify-content-center">
    <button
      className="btn purple glow"
      style={{ fontSize: "clamp(14px, 2vw, 20px)" }}
    >
      Learn More
    </button>
  </Link>
</div>

      </div>}    
        {/* <ToastContainer theme="dark" closeOnClick='true'/> */}
        {/* <Navbar/> */}
          {isAuthenticated && <div>
              <div className="Hero text-white mt-5 mx-auto p-1 align-center text-center" >
                <h1 className="py-3">Welcome <span className="darkpurple"> {user.slice(0,1).toString().toUpperCase()  + user.slice(1,5)}</span></h1>
                <h2 className="text-center p-0 mb-5">Shorten URL's Instantly⚡</h2>
                {/* <h2 className="text-center p-0  ">Try Now!</h2> */}
              </div>

              <div>
                <form name="userForm" className="text-center">
                  <div className="row gap-3 justify-content-center align-items-center">
                    <label htmlFor="URL" className="text-white m-0">
                      <h3 className="m-0 p-0 purple">Zapp this: </h3>
                    </label>
                    <div className="col-10 col-lg-10 col-sm-4">
                    <input
                      required
                      value={inputUrl}
                      onChange={onChangeHandler}
                      type="text"
                      placeholder="https://www.example.com"
                      name="URL"
                      className="form-control"
                      style={{ fontSize: "13px" }}
                    />
                    </div>
                    <div className="col-10">
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
                  </div>
                  </form>
                {resultUrl && isValid && (
                  <div className="text-white text-center ps-3">
                    URL Copied!  <a href={resultUrl}>  { frontend  + "/" + resultUrl} </a>{" "}
                    {/* {navigator.clipboard.writeText(resultUrl)} */}
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
