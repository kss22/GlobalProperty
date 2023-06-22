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
import Loading from "./loading";
import Failed from "./failedComponent";
import { FormattedMessage } from "react-intl";
import { FaBackward, FaEdit, FaForward, FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import * as authentication from "../utils/authentication";
import { States } from "../utils/constants";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const TableCellItemComponent = ({ item, setAuthState, setIdProvided }) => {
  const [status, setStatus] = useState(0);
  useEffect(() => {
    if (item.acquirerStatus === "1") {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [item]);

  return (
    <>
      <TableRow>
        <TableCell>{item.acquirerCode}</TableCell>
        <TableCell>{item.acquirerDesc}</TableCell>
        <TableCell>{item.zpk}</TableCell>
        <TableCell>{item.instName}</TableCell>
        <TableCell>{item.interfaceCode}</TableCell>

        <TableCell>
          <Tooltip title="Enable/Disable" placement="right" arrow>
            <Switch
              checked={status}
              onChange={(e) => {
                setStatus(e.target.checked);
                const post = {
                  id: item.acquirerId,
                  status: e.target.checked ? "1" : "0",
                };
                fetch(
                  `${authentication.SERVER_URL}/v1/config/acquirers/status-change`,
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
                      toast.success("Acquirer Status changed successfully", {
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
                setAuthState(States.ACQUIRER_CREATION);
                setIdProvided(item.acquirerId);
              }}
            />
          </Tooltip>
        </TableCell>
        <TableCell>
          <Tooltip title="Delete" placement="right" arrow>
            <Button
              startIcon={<FaTrashAlt />}
              // onClick={() => {
              //   var result = window.confirm(
              //     "Are you sure you want to delete this acquirer?"
              //   );
              //   if (result) {
              //     handleDelete(item.acquirerId);

              //     window.location.reload();
              //   } else {
              //     toast.info("Action canceled", {
              //       position: "top-center",
              //       autoClose: 5000,
              //       hideProgressBar: false,
              //       closeOnClick: true,
              //       pauseOnHover: true,
              //       progress: undefined,
              //     });
              //   }
              // }}
            />
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  );
};

const AcquirerTable = ({ setAuthState, setIdProvided }) => {
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [data, setData] = useState([]);
  const [sortOrderByCode, setSortOrderByCode] = useState("asc");
  const [sortOrderByDesc, setSortOrderByDesc] = useState("asc");
  const [sortOrderByInterface, setSortOrderByInterface] = useState("asc");
  const [offset, setOffset] = useState(0);
  const [numOfRecords, setNumOfRecords] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const options = [];

  useEffect(() => {
    setLoading(true);
    fetch(`${authentication.SERVER_URL}/v1/config/acquirers`, {
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
        setNumOfRecords(data.length);
        console.log(data);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSortByCode = () => {
    const sortedData = [...data].sort((a, b) => {
      const nameA = a.acquirerCode.toUpperCase();
      const nameB = b.acquirerCode.toUpperCase();

      if (nameA < nameB) {
        return sortOrderByCode === "asc" ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortOrderByCode === "asc" ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
    setSortOrderByCode(sortOrderByCode === "asc" ? "desc" : "asc");
  };

  const handleSortByDesc = () => {
    const sortedData = [...data].sort((a, b) => {
      const nameA = a.acquirerDesc.toUpperCase();
      const nameB = b.acquirerDesc.toUpperCase();

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

  const handleSortByInterface = () => {
    const sortedData = [...data].sort((a, b) => {
      const nameA = a.acquirerInterface.toUpperCase();
      const nameB = b.acquirerDescInterface.toUpperCase();

      if (nameA < nameB) {
        return sortOrderByInterface === "asc" ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortOrderByInterface === "asc" ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
    setSortOrderByInterface(sortOrderByInterface === "asc" ? "desc" : "asc");
  };

  for (let i = 5; i <= numOfRecords; i += 5) {
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
                          id="code-column"
                          defaultMessage="Code"
                        />
                        <Tooltip title="Sort by Code">
                          <IconButton onClick={handleSortByCode}>
                            {sortOrderByCode === "asc" ? (
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
                          id="zpk-column"
                          defaultMessage="ZPK"
                        />
                      </TableCell>
                      <TableCell>
                        <FormattedMessage
                          id="institution-column"
                          defaultMessage="Institution"
                        />
                      </TableCell>
                      <TableCell>
                        <FormattedMessage
                          id="interface-column"
                          defaultMessage="Interface"
                        />
                        <Tooltip title="Sort by Name">
                          <IconButton onClick={handleSortByInterface}>
                            {sortOrderByInterface === "asc" ? (
                              <ArrowDownwardIcon sx={{ color: "#ff0000" }} />
                            ) : (
                              <ArrowUpwardIcon sx={{ color: "#0000ff" }} />
                            )}
                          </IconButton>
                        </Tooltip>
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
                    {data.slice(offset*pageSize, (offset+1)*pageSize).map((item) => (
                      <TableCellItemComponent
                        key={item.acquirerId}
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
                    <MenuItem value={1}>1</MenuItem>
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

export default AcquirerTable;
