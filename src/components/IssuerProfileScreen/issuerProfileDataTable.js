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
  
  const IssuerProfileTable = () => {
    const [loading, setLoading] = useState(false);
    const [failed, setFailed] = useState(false);
    const [data, setData] = useState([]);
    const [sortOrderBytxnSrc, setSortOrderBytxnSrc] = useState("asc");
    const [sortOrderByCardProduct, setSortOrderByCardProduct] = useState("asc");
    const [offset, setOffset] = useState(0);
    const [numOfRecords, setNumOfRecords] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const options = [];
  
    useEffect(() => {
      setLoading(true);
      fetch(`${authentication.SERVER_URL}/v1/routing/iss-profile`, {
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
  
    const handleSortBytxnSrc = () => {
      const sortedData = [...data].sort((a, b) => {
        const nameA = a.txnSrc.toUpperCase();
        const nameB = b.txnSrc.toUpperCase();
  
        if (nameA < nameB) {
          return sortOrderBytxnSrc === "asc" ? -1 : 1;
        }
        if (nameA > nameB) {
          return sortOrderBytxnSrc === "asc" ? 1 : -1;
        }
        return 0;
      });
  
      setData(sortedData);
      setSortOrderBytxnSrc(sortOrderBytxnSrc === "asc" ? "desc" : "asc");
    };
  
    const handleSortByCardProduct = () => {
      const sortedData = [...data].sort((a, b) => {
        const nameA = a.cardProduct.toUpperCase();
        const nameB = b.cardProduct.toUpperCase();
  
        if (nameA < nameB) {
          return sortOrderByCardProduct === "asc" ? -1 : 1;
        }
        if (nameA > nameB) {
          return sortOrderByCardProduct === "asc" ? 1 : -1;
        }
        return 0;
      });
  
      setData(sortedData);
      setSortOrderByCardProduct(sortOrderByCardProduct === "asc" ? "desc" : "asc");
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
                          Transaction Source
                          <Tooltip title="Sort by Transaction Source">
                            <IconButton onClick={handleSortBytxnSrc}>
                              {sortOrderBytxnSrc === "asc" ? (
                                <ArrowDownwardIcon sx={{ color: "#ff0000" }} />
                              ) : (
                                <ArrowUpwardIcon sx={{ color: "#0000ff" }} />
                              )}
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          Card Type
                          <Tooltip title="Sort by Desc">
                            <IconButton onClick={handleSortByCardProduct}>
                              {sortOrderByCardProduct === "asc" ? (
                                <ArrowDownwardIcon sx={{ color: "#ff0000" }} />
                              ) : (
                                <ArrowUpwardIcon sx={{ color: "#0000ff" }} />
                              )}
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          Destination
                        </TableCell>
                        <TableCell>
                          Entity ID
                        </TableCell>
                        <TableCell>
                          MSG Type
                        </TableCell>
                        <TableCell>
                          Devise Type
                        </TableCell>
                        <TableCell>
                          Processing Code
                        </TableCell>
                        <TableCell>
                          Has Pin
                        </TableCell>
                        <TableCell>
                          Routing Bin
                        </TableCell>
                        <TableCell>
                          Priority
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
                            key={item.entityId}
                            item={item}
                            // setAuthState={setAuthState}
                            // setIdProvided={setIdProvided}
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
  
  const TableCellItemComponent = ({ item, providedId }) => {
  
    const [status, setStatus] = useState(0);
//   useEffect(() => {
//     if (item.status === "1") {
//       setStatus(true);
//     } else {
//       setStatus(false);
//     }
//   }, [item]);

    function handleDelete(value){
      fetch(`${authentication.SERVER_URL}/v1/routing/iss-profile/${value}`,{
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
          <TableCell>{item.txnSrc}</TableCell>
          <TableCell>{item.cardProduct}</TableCell>
          <TableCell>{item.txnDest}</TableCell>
          <TableCell>{item.entityId}</TableCell>
          <TableCell>{item.msgType}</TableCell>
          <TableCell>{item.deviceType}</TableCell>
          <TableCell>{item.pcode}</TableCell>
          <TableCell>{item.hasPin}</TableCell>
          <TableCell>{item.issUserbinId}</TableCell>
          <TableCell>{item.issInstId}</TableCell>
          <TableCell>
          <Tooltip title="Enable/Disable" placement="right" arrow>
            <Switch
              checked={status}
              onChange={(e) => {
                setStatus(e.target.checked);
                // const post = {
                //   id: item.acquirerInterfaceId,
                //   status: e.target.checked ? "1" : "0",
                // };
                // fetch(
                //   `${authentication.SERVER_URL}/v1/routing/acquirer-interface/status-change`,
                //   {
                //     method: "POST",
                //     headers: {
                //       "Content-Type": "application/json",
                //       Authorization: `Bearer ${authentication.token}`,
                //       branchId: "1",
                //       instId: "1",
                //     },
                //     body: JSON.stringify(post),
                //   }
                // )
                //   .then((response) => {
                //     if (response.ok) {
                //       toast.success("Acquirer Interface Status changed successfully", {
                //         position: "top-center",
                //         autoClose: 5000,
                //         hideProgressBar: false,
                //         closeOnClick: true,
                //         pauseOnHover: true,
                //         progress: undefined,
                //       });
                //     }
                //     return response.json();
                //   })
                //   .then((data) => {
                //     if (data.errors !== null) {
                //       const lengthOfErrors = data.errors.length;
                //       for (let i = 0; i < lengthOfErrors; i++) {
                //         toast.error(data.errors[i], {
                //           position: "top-center",
                //           autoClose: 5000,
                //           hideProgressBar: false,
                //           closeOnClick: true,
                //           pauseOnHover: true,
                //           progress: undefined,
                //         });
                //       }
                //     }
                //   })
                //   .catch((err) => {
                //     toast.error(err, {
                //       position: "top-center",
                //       autoClose: 5000,
                //       hideProgressBar: false,
                //       closeOnClick: true,
                //       pauseOnHover: true,
                //       progress: undefined,
                //     });
                //   });
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
                // setAuthState(States.ACQUIRER_INTERFACE_CREATION);
                // setIdProvided(item.acquirerInterfaceId);
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
                    handleDelete(item.entityId);
  
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
  
  export default IssuerProfileTable;
  