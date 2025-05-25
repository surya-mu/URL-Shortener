import React from "react";
import '../main.css'
import {Link} from 'react-router-dom';
import surya from '../images/surya.png';


function About() {
  return (
    <>
          <div className="d-flex vh-100 flex-column justify-content-center align-items-center">
            <img src={surya} alt="Portfolio image" width={140} height={140}/>
            <h3> Created by Surya M.U.</h3>
              <div className="p-3 links d-flex flex-row gap-3">
               <div>
                 <button className="btn btn-dark"><a className="text-decoration-none text-white" href="https://linkedin.com/in/suryamu7" target="_blank" rel="noopener noreferrer">Linkedin</a></button>
               </div>
               <div>
                 <button className="btn btn-dark "><a className="text-decoration-none text-white" href="https://github.com/surya-mu" target="_blank" rel="noopener noreferrer">Github</a></button>
               </div>
                <div>
                  <button className="btn btn-dark"><a className="text-decoration-none text-white" href="https://surya-mu.me" target="_blank" rel="noopener noreferrer">Portfolio</a></button>
                </div>
              </div>
          </div>
    
    </>
  );
}

export default About;
