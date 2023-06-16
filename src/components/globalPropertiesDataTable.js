import React from "react";
import { FaBackward, FaEdit, FaForward, FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import * as authentication from "../utils/authentication";
import { FormattedMessage } from "react-intl";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import Loading from "./loading";

const GlobalPropertiesTable = () => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [numOfRecords, setNumOfRecords] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const options = [];

  for (let i = 5; i <= numOfRecords; i+=5) {
    options.push(i);
  }

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
      pageSize: pageSize,
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
  }, [offset, pageSize]);
  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loading/>
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
                  <TableCell>
                    <FormattedMessage id="name-column" defaultMessage="Name" />
                  </TableCell>
                  <TableCell>
                    <FormattedMessage id="key-column" defaultMessage="Key" />
                  </TableCell>
                  <TableCell>
                    <FormattedMessage
                      id="value-column"
                      defaultMessage="Value"
                    />
                  </TableCell>
                  <TableCell>
                    <FormattedMessage
                      id="institution-column"
                      defaultMessage="Institution"
                    />
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
                    <TableRow key={item.propId}>
                      <TableCell>{item.propName}</TableCell>
                      <TableCell>{item.propKey}</TableCell>
                      <TableCell>{item.propValue}</TableCell>
                      <TableCell>{item.instName}</TableCell>
                      <TableCell>
                        <Tooltip title="Edit" placement="right" arrow>
                        <Button
                          className="edit-button"
                          startIcon={<FaEdit />}
                          onClick={() =>
                            (window.location.href = `/addGlobalProperty/${item.propId}`)
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
                              handleDelete(item.propId);

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

          <div className="pagination">
            {offset >= 1 && (
              <Tooltip title="Previous Page">
                <Button onClick={() => setOffset(offset - 1)}>
                <FaBackward />
              </Button>
              </Tooltip>
              
            )}

            <label>
              Page {offset} out of {numOfRecords/pageSize !== 1 ? Math.floor(numOfRecords / pageSize) : 0 }
            </label>
            {numOfRecords / pageSize !== 1 &&
              offset < Math.floor(numOfRecords / pageSize) && (
                <Tooltip title="Next Page">
                  <Button onClick={() => setOffset(offset + 1)}>
                  <FaForward />
                </Button>
                </Tooltip>
                
              )}

            <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
              <InputLabel id="select-page-size">{pageSize}</InputLabel>

              <Select
                labelId="select-page-size"
                label="Page Size"
                onChange={(e) => setPageSize(e.target.value)}
              >
                <MenuItem value={1}>1</MenuItem>
                {options.map((number) => (
                  <MenuItem value={number}>{number}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalPropertiesTable;
