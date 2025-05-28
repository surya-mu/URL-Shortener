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
      className="navbar navbar-expand-lg m-0 p-0"
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
         <button
          className="navbar-toggler me-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{stroke:"white !important;"}}/>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav navbar-nav ms-auto pe-3 d-flex align-items-center gap-2">
            <li className="nav-item">
            <Link className="nav-link text-white" to="/">
              Home
            </Link>
            </li>
          {isAuthenticated && (
            <li className="nav-item">
            <Link className="nav-link text-white" to="/my-url">
              My URLs
            </Link>
            </li>
          )}

         <li className="nav-item"> <Link className="nav-link text-white" to="/faq"> Guide </Link></li>
          
          

          {!isAuthenticated && (
           <li className="nav-item"> <Link to="/signin" className="nav-link text-white">
              Sign In 
            </Link>
            </li>
          )}
          {!isAuthenticated && ( <li className="nav-item"><span className="sep"> / </span></li>)}
          {!isAuthenticated && (
            <li className="nav-item"><Link to="register" className="nav-link text-white">
              Register
            </Link>
            </li>
          )}
          <li className="nav-item">
            <Link className="nav-link text-white about" to="/about">
            About
          </Link> 
          </li>
          {isAuthenticated && (
            <li className="nav-item">
            <button className="btn btn-danger" onClick={LogoutHandler}>
              Logout
            </button>
            </li>
          )}
        </ul>
        
        </div>
      </div>

      {/* <ToastContainer closeOnClick={true}
        pauseOnFocusLoss={false}
        pauseOnHover={false}/> */}
    </nav>
  );
}

export default Navbar;
