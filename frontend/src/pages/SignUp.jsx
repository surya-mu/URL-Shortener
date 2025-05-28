import React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthHandler from "../services/AuthHandler";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../services/AuthContext";
import { useEffect } from "react";
function SignUp() {
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  // const opposite = !isAuthenticated
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);
  const userHandler = (e) => {
    setUsername(e.target.value);
  };

  const passHandler = (e) => {
    setUserPassword(e.target.value);
  };

  const formHandler = async (e) => {
    e.preventDefault();
    const status = await AuthHandler.signup(userName, userPassword);
    // console.log("Status recieved from authhandler"+status);
    if (!status) {
      setUserPassword("");
      setUsername("");
      toast.error("Error Registering, Email Already Exists...");
      return;
    }

    toast.success("Registered, Redirecting to Login...");
    setIsLoading(true);
    setTimeout(() => {
      // window.location.href = "/signin";
      navigate("/signin");
      setIsLoading(false);
    }, 3000);

    console.log(status);
    return;
  };
  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center vh-100 mt-3 text-center text-white"
      style={{ background: "black" }}
    >
      <div className="row w-100 d-flex justify-content-center">
        <div className="col-12 col-md-6 col-sm-8 col-lg-4">
          
      <h3 className="text-center">Sign Up</h3>
      <form
        onSubmit={formHandler}
        className="form-dark p-4 rounded-shadow"
        data-bs-theme="dark"
        style={{ maxWidth: "600px",background:"#121212", borderColor:"#2a2a2a",borderWidth:"2px" }}
      >
        <div className="row d-flex justify-content-center align-items-center">
          <label htmlFor="email" className="col-form-label">
            Email ID
          </label>
          <input
            type="email"
            name="email"
            data-bs-theme="dark"
            placeholder="Enter Email ID"
            className="form-control text-center border-2 mb-3"
            required
            style={{maxWidth:"400px"}}
            minLength={5}
            onChange={userHandler}
            value={userName}
          />
        </div>
        <div className="row d-flex justify-content-center align-items-center">
          <label htmlFor="password" className="col-form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control text-center border-2 mb-3"
            placeholder="Enter Password"
            name="password"
            required
            style={{maxWidth:"400px"}}
            minLength={8}
            onChange={passHandler}
            value={userPassword}
          />
        </div>
        {isLoading ? (
          <button
            type="submit"
            id="SubmitButton"
            className="btn btn-primary mt-3"
            disabled
          >
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
            <span role="status">Loading...</span>
          </button>
        ) : (
          <button
            type="submit"
            id="SubmitButton"
            className="btn btn-primary mt-3"
          >
            Submit
          </button>
        )}
        <p className="text-center mt-3">
          Already Have an Account? <Link to="/signin">Sign In</Link>
        </p>
      </form>
      {/* <ToastContainer 
      closeOnClick={true}
      pauseOnFocusLoss={false}
      pauseOnHover={false}/> */}
    </div>
        </div>
      </div>
  );
}

export default SignUp;
