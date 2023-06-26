import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import * as authentication from "../../utils/authentication";
import { FormattedMessage } from "react-intl";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../loading";
import Failed from "../failedComponent";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const EcomLayoutsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = () => {
    const sortedData = [...data].sort((a, b) => {
      const nameA = a.layoutName.toUpperCase();
      const nameB = b.layoutName.toUpperCase();

      if (nameA < nameB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  function handleDelete(layoutId) {
    fetch(`${authentication.SERVER_URL}/v1/config/ecom-layouts/${layoutId}`, {
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
        } else if (response.status === 401) {
          setFailed(true);
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
    fetch(`${authentication.SERVER_URL}/v1/config/ecom-layouts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authentication.token}`,
        branchId: "1",
        instId: "1",
      },
    })
      .then((response) => {
        if (response.status === 401) {
          setFailed(true);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : (
        <div>
          {failed ? (
            <Failed />
          ) : (
            <div>
              <TableContainer
                className="custom-table"
                component={Paper}
                variant="outlined"
              >
                <Table aria-label="demo table">
                  <TableHead>
                    <TableRow>
                      <TableCell width={"85%"}>
                        <FormattedMessage
                          id="name-column"
                          defaultMessage="Name"
                        />
                        <Tooltip title="Sort by Name">
                        <IconButton  onClick={handleSort}>
                          {sortOrder === "asc" ? (
                            <ArrowDownwardIcon sx={{ color:'#ff0000' }}/>
                          ) : (
                            <ArrowUpwardIcon sx={{ color:'#0000ff'}}/>
                          )}
                        </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell colSpan="2" className="actions-header">
                        <FormattedMessage
                          id="actions-column"
                          defaultMessage="Actions"
                        />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((item) => (
                      <>
                        <TableRow key={item.ecomLayoutId}>
                          <TableCell>{item.layoutName}</TableCell>
                          <TableCell>
                            <Tooltip title="Edit" placement="right" arrow>
                              <Button
                                className="edit-button"
                                startIcon={<FaEdit />}
                                onClick={() =>
                                  (window.location.href = `/addEcomLayout/${item.ecomLayoutId}`)
                                }
                              />
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Delete" placement="right" arrow>
                              <Button
                                startIcon={<FaTrashAlt />}
                                onClick={() => {
                                  var result = window.confirm(
                                    "Are you sure you want to delete this property?"
                                  );
                                  if (result) {
                                    handleDelete(item.ecomLayoutId);

                                    window.location.reload();
                                  } else {
                                    toast.info("Action canceled", {
                                      position: "top-center",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      progress: undefined,
                                    });
                                  }
                                }}
                              />
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default EcomLayoutsTable;
