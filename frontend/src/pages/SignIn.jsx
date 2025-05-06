import React, { useEffect } from "react";
import { useState } from "react";
import AuthHandler from "../services/AuthHandler";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

function SignIn() {
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const formHandler = async (e) => {
    // implement
    e.preventDefault();
    const { message, authenticated, token } = await AuthHandler.signin(
      userName,
      userPassword
    );
    if (!authenticated) {
      toast.error(message);
      setUserPassword("");
      setUsername("");
      return;
    }
    login(token);
    console.log("Is Authenticated?" + authenticated);
    toast.success("Signed In Successfully");
    setIsLoading(true);
    setTimeout(() => {
      // window.location.href = "/";
      navigate("/");
      setIsLoading(false);
    }, 3000);
  };

  const userHandler = (e) => {
    setUsername(e.target.value);
  };
  const passHandler = (e) => {
    setUserPassword(e.target.value);
  };

  return (
    <div
      className="vh-100 mt-3 text-center my-auto text-white"
      style={{ background: "rgb(38,38,39)" }}
    >
      <h3 className="text-center">Login</h3>
      <form
        onSubmit={formHandler}
        className="form-control form-dark mx-auto w-50 p-5 my-5"
        data-bs-theme="dark"
        style={{ maxWidth: "600px" }}
      >
        <div className="row align-items-center">
          <label htmlFor="email" className="col-form-label">
            Email ID
          </label>
          <input
            type="email"
            name="email"
            data-bs-theme="dark"
            placeholder="Enter Email ID"
            className="form-control mx-auto w-50 text-center border-2 mb-3 "
            required
            minLength={5}
            onChange={userHandler}
            value={userName}
          />
        </div>
        <div className="row align-items-center">
          <label htmlFor="password" className="col-form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control mx-auto w-50 text-center border-2 mb-3"
            placeholder="Enter Password"
            name="password"
            required
            autoComplete="false"
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
          New Here? <Link to="/register">Register Now</Link>
        </p>
      </form>
      {/* <ToastContainer
        theme="dark"
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        autoClose={1000}
      /> */}
    </div>
  );
}

export default SignIn;
