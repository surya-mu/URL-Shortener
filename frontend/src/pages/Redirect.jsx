import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
const api = import.meta.env.VITE_API
function Redirect() {
  const { url } = useParams();

  useEffect(() => {
    const goto = async () => {
      try {
        const response = await axios.post(`${api}${url}`);
        const redirect = response.data.redirect;

        window.location.replace(redirect)   
      } catch (error) {
        console.log(error);
      }
    };
    goto();
  }, [url]);

  return (
    <div
      className="container-fluid text-white mt-3 ms-3"
      style={{ background: "#262727", height: "100vh" }}
    >
      <h1>Redirecting....</h1>
    </div>
  );
}

export default Redirect;
