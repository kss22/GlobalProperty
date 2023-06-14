import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as authentication from "../utils/authentication";
import { FormattedMessage } from "react-intl";


const GlobalPropertiesTable = () => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [numOfRecords, setNumOfRecords] = useState(0);
  const [loading, setLoading] = useState(false);



  function handleDelete(propId) {
    fetch(`${authentication.SERVER_URL}/v1/config/global-props/${propId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authentication.token}`,
        branchId: "1",
        instId: "1",
      },
    })
      .then((response) => {
        if (response.ok) {
          window.location.reload();
        } else {
          throw new Error("Failed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    setLoading(true);
    const post = {
      asc: "false",
      offset: offset,
      pageSize: 10,
      sortBy: "propId",
    };
    fetch(`${authentication.SERVER_URL}/v1/config/global-props/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authentication.token}`,
        branchId: "1",
        instId: "1",
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data.globalPropertiesResponseDto);
        setOffset(data.paginationResponseDto.pageNumber);
        setNumOfRecords(data.paginationResponseDto.totalNumberOfRecords);
        console.log(data);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [offset]);
  return (
    <>
      {loading ? (
        <div className="loading-message">Loading...</div>
      ) : (
        <div>
          <table className="custom-table" border={1}>
            <tr>
              <th><FormattedMessage id="name-column" defaultMessage="Name"/></th>
              <th><FormattedMessage id="key-column" defaultMessage="Key"/></th>
              <th><FormattedMessage id="value-column" defaultMessage="Value"/></th>
              <th><FormattedMessage id="institution-column" defaultMessage="Institution"/></th>
              <th colspan="2"><FormattedMessage id="actions-column" defaultMessage="Actions"/></th>
            </tr>
            {data.map((item) => (
              <tr key={item.propId}>
                <td>{item.propName}</td>
                <td>{item.propKey}</td>
                <td>{item.propValue}</td>
                <td>{item.instName}</td>
                <td>
                  <Link
                    className="edit"
                    to={`/addGlobalProperty/${item.propId}`}
                  >
                    <FaEdit />
                  </Link>
                </td>
                <td>
                  <button
                    className="delete"
                    onClick={() => {

                      var result = window.confirm(
                        "Are you sure you want to delete this property?"
                      );
                      if (result) {
                        handleDelete(item.propId);

                        alert("Property Deleted!");
                        
                        window.location.reload();
                      
                      } else {

                        alert("Action cancelled.");
                      }
                    }}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </table>
          <div className="pagination">
            {offset >= 1 && (
              <button onClick={() => setOffset(offset - 1)}> {"<"} </button>
            )}

            <label>
              Page {offset} out of {Math.floor(numOfRecords / 10)}
            </label>
            {offset < Math.floor(numOfRecords / 10) && (
              <button onClick={() => setOffset(offset + 1)}> {">"} </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalPropertiesTable;
