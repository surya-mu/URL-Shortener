import { Link } from "react-router-dom"

function Faq() {
  return (
    <div>

        <div className="vh-100 d-flex flex-column justify-content-center align-items-center mx-auto" style={{backgroundColor:"black"}}>
            <h1 className="text-center mt-2 mb-5">How does it <span className="darkpurple">Work</span>?</h1>
              <div className="d-flex flex-column">
                <h2 className="text-center p-3">Guide to Your Zapp Journey ⚡</h2>
                <div>
                  <button className="btn darkpurple my-3" style={{background:"#5d3fd3",width:"100px",color:"black"}}> <h3>1</h3>
                  </button>
                   <span className="p-3 guide">Enter A URL </span>
                </div>
                <div>
                  <button className="btn darkpurple my-3" style={{background:"#5d3fd3",width:"100px",color:"black"  }}> <h3>2</h3> </button>
                 <span className="p-3 guide">Get a Shortened Version of the Link in One Click</span>
                 </div>
                 <div>
                  <button className="btn darkpurple my-3" style={{background:"#5d3fd3",width:"100px",color:"black"}}> <h3>3</h3> </button>
                <span className="p-3 guide">Manage your URL's in <Link to="/my-url">My URL</Link> section!</span>
             </div>
             
              </div>
    </div>
    
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <h2 className="p-3 text-center ">Frequently Asked Questions</h2>
      <div className="d-inline-block w-50">
            <div class="accordion accordion-flush" data-bs-theme="dark" id="accordionFlushExample">
            <div class="accordion-item my-2">
              <h2 class="accordion-header">
                <button class="accordion-button purple   collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  What is the purpose of Shortened Version of these Links?
                </button>
              </h2>
              <div id="flush-collapseOne" class="accordion-collapse collapse " data-bs-parent="">
                <div class="accordion-body">ZappLink simply acts as a middle-man to serve links, to easily manage variety of links in short-form and to gather metrics from the shared links as well. This can also be used as a privacy proxy, if the user cannot directly share the original link to the other parties.</div>
              </div>
            </div>
            <div class="accordion-item my-2">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  Can I Trust ZappLink with my Links?
                </button>
              </h2>
              <div id="flush-collapseTwo" class="accordion-collapse collapse  " data-bs-parent="">
                <div class="accordion-body  ">Absolutely, every user has their own account and manages their own collection of links, We do not collect any information from the user, and consider user privacy as the first priority. </div>
              </div>
            </div>
            <div class="accordion-item my-2">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                  Is this service free? Can I keep creating Links?
                </button>
              </h2>
              <div id="flush-collapseThree" class="accordion-collapse collapse  " data-bs-parent="">
                <div class="accordion-body  ">As of now the service is absolutely free, we do not have any plans of monetizing this service in the near future. You can create any number of links as of now, and is not limited by the service. This is subject to change.</div>
              </div>
            </div>
            <div class="accordion-item my-2">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                  Who should I contact regarding this website's issues or for other reasons?
                </button>
              </h2>
              <div id="flush-collapseFour" class="accordion-collapse collapse  " data-bs-parent="">
                <div class="accordion-body  ">Kindly write your queries to:  <a href="mailto:musurya2014@gmail.com" target="_blank" rel="noopener noreferrer">musurya2014@gmail.com</a> </div>
              </div>
            </div>
      </div>
      </div>
      
    </div>
    </div>
  )
}

export default Faq