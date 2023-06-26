import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
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
import { FormattedMessage } from "react-intl";
import { FaBackward, FaEdit, FaForward, FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import * as authentication from "../../utils/authentication";
import { States } from "../../utils/constants";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const AcquirerInterfaceTable = ({ setAuthState, setIdProvided }) => {
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [data, setData] = useState([]);
  const [sortOrderByInterfaceCode, setSortOrderByInterfaceCode] = useState("asc");
  const [sortOrderByDesc, setSortOrderByDesc] = useState("asc");
  const [offset, setOffset] = useState(0);
  const [numOfRecords, setNumOfRecords] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const options = [];

  useEffect(() => {
    setLoading(true);
    fetch(`${authentication.SERVER_URL}/v1/routing/acquirer-interface`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authentication.token}`,
        instId: "1",
        branchId: "1",
      },
    }).then((response) => {
        if (response.status === 401) {
          setFailed(true);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setNumOfRecords(data.length);
        console.log(data);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSortByInterfaceCode = () => {
    const sortedData = [...data].sort((a, b) => {
      const nameA = a.interfaceCode.toUpperCase();
      const nameB = b.interfaceCode.toUpperCase();

      if (nameA < nameB) {
        return sortOrderByInterfaceCode === "asc" ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortOrderByInterfaceCode === "asc" ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
    setSortOrderByInterfaceCode(sortOrderByInterfaceCode === "asc" ? "desc" : "asc");
  };

  const handleSortByDesc = () => {
    const sortedData = [...data].sort((a, b) => {
      const nameA = a.interfaceDescription.toUpperCase();
      const nameB = b.interfaceDescription.toUpperCase();

      if (nameA < nameB) {
        return sortOrderByDesc === "asc" ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortOrderByDesc === "asc" ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
    setSortOrderByDesc(sortOrderByDesc === "asc" ? "desc" : "asc");
  };

  for (let i = 10; i <= numOfRecords; i += 10) {
    options.push(i);
  }

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
                      <TableCell>
                        <FormattedMessage
                          id="interface-code-column"
                          defaultMessage="Interface Code"
                        />
                        <Tooltip title="Sort by Interface Code">
                          <IconButton onClick={handleSortByInterfaceCode}>
                            {sortOrderByInterfaceCode === "asc" ? (
                              <ArrowDownwardIcon sx={{ color: "#ff0000" }} />
                            ) : (
                              <ArrowUpwardIcon sx={{ color: "#0000ff" }} />
                            )}
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <FormattedMessage
                          id="description-column"
                          defaultMessage="Description"
                        />
                        <Tooltip title="Sort by Desc">
                          <IconButton onClick={handleSortByDesc}>
                            {sortOrderByDesc === "asc" ? (
                              <ArrowDownwardIcon sx={{ color: "#ff0000" }} />
                            ) : (
                              <ArrowUpwardIcon sx={{ color: "#0000ff" }} />
                            )}
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <FormattedMessage
                          id="key-column"
                          defaultMessage="Key"
                        />
                      </TableCell>
                      <TableCell>
                        <FormattedMessage
                          id="initial-status-column"
                          defaultMessage="Initial Status"
                        />
                      </TableCell>
                      <TableCell>
                        <FormattedMessage
                          id="check-digit-column"
                          defaultMessage="Check digit"
                        />
                      </TableCell>
                      <TableCell>
                        <FormattedMessage
                          id="site-column"
                          defaultMessage="Site"
                        />
                      </TableCell>
                      <TableCell colSpan="3" className="actions-header">
                        <FormattedMessage
                          id="actions-column"
                          defaultMessage="Actions"
                        />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data
                      .slice(offset * pageSize, (offset + 1) * pageSize)
                      .map((item) => (
                        <TableCellItemComponent
                          key={item.acquirerInterfaceId}
                          item={item}
                          setAuthState={setAuthState}
                          setIdProvided={setIdProvided}
                        />
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
                  Page {offset} out of{" "}
                  {numOfRecords / pageSize !== 1
                    ? Math.floor(numOfRecords / pageSize)
                    : 0}
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
                    {options.map((number) => (
                      <MenuItem value={number}>{number}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

const TableCellItemComponent = ({ item, setAuthState, setIdProvided }) => {
  const [status, setStatus] = useState(0);
  useEffect(() => {
    if (item.status === "1") {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [item]);

  function handleDelete(value){
    fetch(`${authentication.SERVER_URL}/v1/routing/acquirer-interface/${value}`,{
        method:"Delete",
        headers:{
            Authorization: `Bearer ${authentication.token}`,
            instId: "1",
            branchId: "1"
        }
    }).then((response) => {
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
  return (
    <>
      <TableRow>
        <TableCell>{item.interfaceCode}</TableCell>
        <TableCell>{item.interfaceDescription}</TableCell>
        <TableCell>{item.key}</TableCell>
        <TableCell>{item.initStatus}</TableCell>
        <TableCell>{item.checkValue}</TableCell>
        <TableCell>{item.siteId}</TableCell>

        <TableCell>
          <Tooltip title="Enable/Disable" placement="right" arrow>
            <Switch
              checked={status}
              onChange={(e) => {
                setStatus(e.target.checked);
                const post = {
                  id: item.acquirerInterfaceId,
                  status: e.target.checked ? "1" : "0",
                };
                fetch(
                  `${authentication.SERVER_URL}/v1/routing/acquirer-interface/status-change`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${authentication.token}`,
                      branchId: "1",
                      instId: "1",
                    },
                    body: JSON.stringify(post),
                  }
                )
                  .then((response) => {
                    if (response.ok) {
                      toast.success("Acquirer Interface Status changed successfully", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        progress: undefined,
                      });
                    }
                    return response.json();
                  })
                  .then((data) => {
                    if (data.errors !== null) {
                      const lengthOfErrors = data.errors.length;
                      for (let i = 0; i < lengthOfErrors; i++) {
                        toast.error(data.errors[i], {
                          position: "top-center",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          progress: undefined,
                        });
                      }
                    }
                  })
                  .catch((err) => {
                    toast.error(err, {
                      position: "top-center",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      progress: undefined,
                    });
                  });
              }}
            />
          </Tooltip>
        </TableCell>
        <TableCell>
          <Tooltip title="Edit" placement="right" arrow>
            <Button
              className="edit-button"
              startIcon={<FaEdit />}
              onClick={() => {
                setAuthState(States.ACQUIRER_INTERFACE_CREATION);
                setIdProvided(item.acquirerInterfaceId);
              }}
            />
          </Tooltip>
        </TableCell>
        <TableCell>
          <Tooltip title="Delete" placement="right" arrow>
            <Button
              startIcon={<FaTrashAlt />}
              onClick={() => {
                var result = window.confirm(
                  "Are you sure you want to delete this acquirer interface?"
                );
                if (result) {
                  handleDelete(item.acquirerInterfaceId);

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
  );
};

export default AcquirerInterfaceTable;
