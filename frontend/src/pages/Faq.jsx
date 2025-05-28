import { Link } from "react-router-dom";

function Faq() {
  return (
    <>
      {/* HOW IT WORKS SECTION */}
      <section
        className="vh-100 d-flex flex-column justify-content-center align-items-center text-white"
        style={{ backgroundColor: "#000" }}
      >
        <div className="container px-3">
          <h1 className="text-center mt-2 mb-5">
            How does it <span className="darkpurple">Work</span>?
          </h1>
          <h2 className="text-center p-3">Guide to Your Zapp Journey ⚡</h2>

          <div className="row justify-content-center">
            {/* STEP 1 */}
            <div className="col-12 col-md-6 col-lg-4 d-flex align-items-center mb-4">
              <button
                className="btn flex-shrink-0"
                style={{ background: "#5d3fd3", width: "60px", color: "#fff" }}
              >
                <h3 className="m-0">1</h3>
              </button>
              <span className="ms-3 guide">Enter a URL</span>
            </div>

            {/* STEP 2 */}
            <div className="col-12 col-md-6 col-lg-4 d-flex align-items-center mb-4">
              <button
                className="btn flex-shrink-0"
                style={{ background: "#5d3fd3", width: "60px", color: "#fff" }}
              >
                <h3 className="m-0">2</h3>
              </button>
              <span className="ms-3 guide">
                Get a shortened version of the link in one click
              </span>
            </div>

            {/* STEP 3 */}
            <div className="col-12 col-md-6 col-lg-4 d-flex align-items-center mb-4">
              <button
                className="btn flex-shrink-0"
                style={{ background: "#5d3fd3", width: "60px", color: "#fff" }}
              >
                <h3 className="m-0">3</h3>
              </button>
              <span className="ms-3 guide">
                Manage your URLs in <Link to="/my-url">My URL</Link> section!
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-5">
        <div className="container d-flex flex-column align-items-center">
          <h2 className="text-center mb-4">Frequently Asked Questions</h2>

          <div className="w-100 w-md-75 w-lg-50">
            <div className="accordion accordion-flush" data-bs-theme="dark" id="accordionFlushExample">
              <div className="accordion-item my-2">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button purple collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    What is the purpose of a shortened version of these links?
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    ZappLink acts as a middle‑man to manage and serve links in
                    a short form, gather metrics, and can be used as a privacy
                    proxy when direct sharing isn’t ideal.
                  </div>
                </div>
              </div>

              <div className="accordion-item my-2">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    Can I trust ZappLink with my links?
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    Absolutely. Each user has their own account and manages
                    their collection of links. We do not collect any personal
                    data and prioritize user privacy.
                  </div>
                </div>
              </div>

              <div className="accordion-item my-2">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    Is this service free? Can I keep creating links?
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    As of May 28, 2025, the service is free with no limit on
                    link creation. This may change in the future.
                  </div>
                </div>
              </div>

              <div className="accordion-item my-2">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour"
                    aria-expanded="false"
                    aria-controls="flush-collapseFour"
                  >
                    Who should I contact regarding issues or other inquiries?
                  </button>
                </h2>
                <div
                  id="flush-collapseFour"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    Kindly send your queries to
                    <a
                      href="mailto:musurya2014@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ms-1"
                    >
                      musurya2014@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Faq;
