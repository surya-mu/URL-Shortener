import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const api = import.meta.env.VITE_API;
const frontend = import.meta.env.VITE_FRONTEND;

function UrlList() {
  const [listed, setListed] = useState([]);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const token = localStorage.getItem("user");
        const response = await axios.get(`${api}list`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setListed(response.data.list);
      } catch {
        setListed([]);
      }
    };
    fetchUrls();
  }, []);

  const deleteHandler = async (e) => {
    try {
      const response = await axios.delete(`${api}delete/${e.target.id}`);
      const deletedId = response.data.deleted;
      setListed((prevListed) =>
        prevListed.filter((item) => item._id !== e.target.id)
      );
      toast.error("Deleted Item successfully");
      console.log(`${deletedId} was deleted from the table.`);
    } catch {
      console.log("Error Occurred in Deleting");
    }
  };

  return (
    <div
      className="text-white container-fluid p-1 text-center"
      style={{ background: "black" }}
    >
      <h1 className="py-4">List of URL's</h1>

 
      <div className="table-responsive d-none d-md-block">
        {listed.length ? (
          <table className="custom-table table table-dark table-sm w-auto mx-auto my-4">
            <thead>
              <tr>
                <th>Original Link</th>
                <th>Zapped Link</th>
                <th>Clicks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listed.map((item) => (
                <tr key={item._id}>
                  <td>
                    <a
                      href={item.originUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-break"
                      style={{ wordBreak: "break-word" }}
                    >
                      {item.originUrl}
                    </a>
                  </td>
                  <td>
                    <a
                      href={`${frontend}/${item.newUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-break"
                    >
                      {frontend}/{item.newUrl}
                    </a>
                  </td>
                  <td>{item.clicks}</td>
                  <td>
                    <button
                      type="button"
                      id={item._id}
                      className="btn btn-danger btn-sm"
                      onClick={deleteHandler}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>Nothing to see here.</div>
        )}
      </div>


      <div className="d-block d-md-none">
        {listed.length ? (
          listed.map((item) => (
            <div
              key={item._id}
              className="card mb-3 p-3 text-white"
              style={{
                background: "#121212",
                maxWidth: "400px",
                margin: "auto",
                wordBreak: "break-word",
              }}
            >
              <div>
                <strong>Original Link:</strong>{" "}
                <a href={item.originUrl} target="_blank" rel="noreferrer" className="text-break">
                  {item.originUrl}
                </a>
              </div>
              <div>
                <strong>Zapped Link:</strong>{" "}
                <a
                  href={`${frontend}/${item.newUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-break"
                >
                  {frontend}/{item.newUrl}
                </a>
              </div>
              <div>
                <strong>Clicks:</strong> {item.clicks}
              </div>
              <div>
                <button
                  type="button"
                  id={item._id}
                  className="btn btn-danger btn-sm mt-2"
                  onClick={deleteHandler}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>Nothing to see here.</div>
        )}
      </div>

      <ToastContainer theme="dark" autoClose={1500} />
    </div>
  );
}

export default UrlList;
