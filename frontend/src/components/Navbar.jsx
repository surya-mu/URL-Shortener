import React from "react";
import logo1 from "../images/logo2.png";
import { Link } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { ToastContainer, toast } from "react-toastify";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const LogoutHandler = () => {
    toast.success("Logged out Successfully..");
    setTimeout(() => {
      logout();
    }, 2000);
  };
  console.log(isAuthenticated);
  return (
    <nav
      className="navbar bg-body-tertiary m-0 p-0"
      style={{ background: "black" }}
    >
      <div
        className="container-fluid justify-content-between p-0"
        style={{ background: "black" }}
      >
        <Link
          className="navbar-brand text-decoration-none text-white ps-4"
          to="/"
        >
          <img
            src={logo1}
            alt="Logo"
            // width="256px"
            // height="256px"
            style={{ objectFit: "contain" }}
            className="inline p-0"
          />
        </Link>
        <div className="d-flex gap-4 pe-5 align-items-center">
            <Link className="nav-link text-white" to="/">
              Home
            </Link>
          {isAuthenticated && (
            <Link className="nav-link text-white" to="/my-url">
              My URLs
            </Link>
          )}

          <Link className="nav-link text-white" to="/faq"> Guide </Link>
          
          

          {!isAuthenticated && (
            <Link to="/signin" className="nav-link text-white">
              Sign In 
            </Link>
          )}
          {!isAuthenticated && ( <span className="sep"> / </span>)}
          {!isAuthenticated && (
            <Link to="register" className="nav-link text-white">
              Register
            </Link>
          )}
            <Link className="nav-link text-white about" to="/about">
            About
          </Link> 
          {isAuthenticated && (
            <button className="btn btn-danger" onClick={LogoutHandler}>
              Logout
            </button>
          )}
        
        </div>
      </div>

      {/* <ToastContainer closeOnClick={true}
        pauseOnFocusLoss={false}
        pauseOnHover={false}/> */}
    </nav>
  );
}

export default Navbar;
