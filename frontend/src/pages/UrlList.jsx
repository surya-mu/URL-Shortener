import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
const api = import.meta.env.VITE_API;
const frontend = import.meta.env.VITE_FRONTEND;
function UrlList() {
  const [listed, setListed] = useState([]);

  useEffect(() => {
    const values = async () => {
      try {
        const token = localStorage.getItem("user");
        const response = await axios.get(`${api}list`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log(response.data.list.clicks);
        setListed(response.data.list);
      } catch {
        setListed([]);
      }
    };
    values();
  }, []);

  const deleteHandler = async (e) => {
    // console.log(
    //   `Deleting: http://localhost:5000/api/delete/${e.currentTarget.id}`
    // );
    // const id = e.currentTarget.id;
    try {
      const response = await axios.delete(`${api}delete/${e.target.id}`);
      const deletedId = await response.data.deleted;
      setListed((prevListed) =>
        prevListed.filter((item) => item._id !== e.target.id)
      );
      toast.error("Deleted Item successfully");
      console.log(`${deletedId} was deleted from the table.`);
    } catch {
      console.log("Error Occurred in Deleting");
    }
  };
  console.log("listed variable:", listed);
  return (
    <div
      className="text-white container-fluid p-1 text-center"
      style={{ background: "black", height: "100vh", maxHeight: "auto" }}
    >
      <h1 className="py-4">List of URL's</h1>

      {listed.length ? (
        <table className="custom-table w-auto mx-auto my-4">
          <thead>
            <tr>
              <th scope="col"> Original Link</th>
              <th scope="col"> Zapped Link</th>
              <th scope="col">Clicks</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {listed.map((item, index) => {
              return (
                <tr key={index} scope="row" className="table table-dark">
                  <td>
                    <a target="_blank" href={`${item.originUrl}`}>
                      {item.originUrl}
                    </a>
                  </td>
                  <td>
                    <a
                      target="_blank"
                      href={`${frontend}/${item.newUrl}`}
                      rel="noreferrer"
                    >
                      {frontend}/{item.newUrl}{" "}
                    </a>
                  </td>
                  <td>{item.clicks}</td>
                  <td>
                    <button
                      type="button"
                      id={item._id}
                      className="btn btn-danger p-1"
                      onClick={deleteHandler}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>
          Nothing to see here.
          <br />
          {/* Go ahead and shorten your link from the home tab! */}
        </div>
      )}
      {/* <ToastContainer theme="dark" autoClose="1500" /> */}
    </div>
  );
}

export default UrlList;
