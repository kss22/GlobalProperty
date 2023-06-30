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
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const RangeDefinitionTable = () => {
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [data, setData] = useState([]);
  const [sortOrderByHighBin, setSortOrderByHighBin] = useState("asc");
  const [sortOrderByLowBin, setSortOrderByLowBin] = useState("asc");
  const [offset, setOffset] = useState(0);
  const [numOfRecords, setNumOfRecords] = useState(0);
  const [pageSize, setPageSize] = useState("");
  const options = [];

  useEffect(() => {
    setLoading(true);
    fetch(`${authentication.SERVER_URL}/v1/routing/nuext-bin`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authentication.token}`,
        instId: "1",
        branchId: "1",
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
        if (data.length < 4) {
          setPageSize(data.length);
        } else {
          setPageSize(4);
        }
        console.log(data);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSortByHighBin = () => {
    const sortedData = [...data].sort((a, b) => {
      const lowBinA = Number(a.highbin);
      const lowBinB = Number(b.highbin);
  
      if (lowBinA < lowBinB) {
        return sortOrderByHighBin === "asc" ? -1 : 1;
      }
      if (lowBinA > lowBinB) {
        return sortOrderByHighBin === "asc" ? 1 : -1;
      }
      return 0;
    });
  
    setData(sortedData);
    setSortOrderByHighBin(sortOrderByHighBin === "asc" ? "desc" : "asc");
  };

  const handleSortByLowBin = () => {
    const sortedData = [...data].sort((a, b) => {
      const lowBinA = Number(a.lowbin);
      const lowBinB = Number(b.lowbin);
  
      if (lowBinA < lowBinB) {
        return sortOrderByLowBin === "asc" ? -1 : 1;
      }
      if (lowBinA > lowBinB) {
        return sortOrderByLowBin === "asc" ? 1 : -1;
      }
      return 0;
    });
  
    setData(sortedData);
    setSortOrderByLowBin(sortOrderByLowBin === "asc" ? "desc" : "asc");
  };

  for (let i = 4; i <= numOfRecords; i += 4) {
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
                      Low Bin Range
                        <Tooltip title="Sort by Transaction Source">
                          <IconButton onClick={handleSortByHighBin}>
                            {sortOrderByHighBin === "asc" ? (
                              <ArrowDownwardIcon sx={{ color: "#ff0000" }} />
                            ) : (
                              <ArrowUpwardIcon sx={{ color: "#0000ff" }} />
                            )}
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                      High Bin Range
                        <Tooltip title="Sort by Desc">
                          <IconButton onClick={handleSortByLowBin}>
                            {sortOrderByLowBin === "asc" ? (
                              <ArrowDownwardIcon sx={{ color: "#ff0000" }} />
                            ) : (
                              <ArrowUpwardIcon sx={{ color: "#0000ff" }} />
                            )}
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell>Entity ID</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Card Type</TableCell>
                      <TableCell>Destination</TableCell>
                      <TableCell>Country Code</TableCell>
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
                      .map((item, index) => (
                        <TableCellItemComponent item={item} key={index} />
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
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value)}
                  >
                    {options.map((number, index) => (
                      <MenuItem value={number} key={index}>
                        {number}
                      </MenuItem>
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

const TableCellItemComponent = ({ item }) => {
  const [status, setStatus] = useState(false);
  
  useEffect(() => {
    if (item.status === "A") {
      setStatus(true);
    } else {
      setStatus(false);
    }
  }, [item]);

  function handleDelete(value) {
    fetch(`${authentication.SERVER_URL}/v1/routing/nuext-bin`, {
      method: "Delete",
      headers: {
        Authorization: `Bearer ${authentication.token}`,
        instId: "1",
        branchId: "1",
      },
      body: JSON.stringify(value),
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
  return (
    <>
      
      <TableRow>
        <TableCell>{item.lowbin}</TableCell>
        <TableCell>{item.highbin}</TableCell>
        <TableCell>{item.entityId}</TableCell>
        <TableCell>{item.description}</TableCell>
        <TableCell>{item.cardproduct}</TableCell>
        <TableCell>{item.destination}</TableCell>
        <TableCell>{item.countryCode}</TableCell>

        <TableCell>
          <Tooltip title="Enable/Disable" placement="right" arrow>
            <Switch
              checked={status}
              onChange={(e) => {
                setStatus(e.target.checked);
                const post = {
                  cardproduct: item.cardproduct,
                  destination: item.destination,
                  entityId: item.entityId,
                  highbin: item.highbin,
                  lowbin: item.lowbin,
                  status: e.target.checked ? "A" : "I",
                };
                fetch(
                  `${authentication.SERVER_URL}/v1/routing/nuext-bin/status-change`,
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
                      toast.success(
                        "Range Definition Status changed successfully",
                        {
                          position: "top-center",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          progress: undefined,
                        }
                      );
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
                window.location.href = `/rangeDefinitionCreate?item=${encodeURIComponent(
                  JSON.stringify(item)
                )}`;
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
                  "Are you sure you want to delete this issuer profile?"
                );
                if (result) {
                    const post = {
                        cardproduct: item.cardproduct,
                        destination: item.destination,
                        entityId: item.entityId,
                        highbin: item.highbin,
                        lowbin: item.lowbin,
                        status: item.status
                      };
                  handleDelete(post);

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

export default RangeDefinitionTable;
