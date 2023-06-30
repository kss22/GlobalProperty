import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { FaSave } from "react-icons/fa";
import { FormattedMessage } from "react-intl";
import * as authentication from "../../utils/authentication";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import Loading from "../loading";
import Failed from "../failedComponent";

const IssuerProfileForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemProvided = JSON.parse(decodeURIComponent(searchParams.get("item")));

  const [txnSources, setTxnSources] = useState([]);
  const [cardTypes, setCardTypes] = useState([]);
  const [routingBins, setRoutingBins] = useState([]);
  const [txnSrc, setTxnSrc] = useState("");
  const [cardType, setCardType] = useState("");
  const [txnDest, setTxnDest] = useState("");
  const [entityId, setEntityId] = useState("");
  const [msgType, setMsgType] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [pcode, setPcode] = useState("");
  const [hasPin, setHasPin] = useState("");
  const [routingBin, setRoutingBin] = useState("");
  const [priority, setPriority] = useState("");
  const [instId, setInstId] = useState("");
  const [userBinId, setUserBinId] = useState("");
  const [loading, setLoading] =useState(false);
  const [failed, setFailed] = useState(false);

  function handleSubmit() {
    const post = {
      cardProduct: cardType,
      issInstId: instId.toString(),
      issUserbinId: userBinId.toString(),
      priority: parseInt(priority),
      txnSrc: txnSrc,
    };

    fetch(`${authentication.SERVER_URL}/v1/routing/iss-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authentication.token}`,
        branchId: "1",
        instId: "1",
      },
      body: JSON.stringify(post),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Issuer Profile added successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.reload();
          }, 5000);
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
  }

  useEffect(() => {
    setLoading(true);
    fetch(
      `${authentication.SERVER_URL}/v1/lookup/transactionlocations/active`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authentication.token}`,
          instId: "1",
          branchId: "1",
        },
      }
    )
      .then((response) => {
        if(response.status===401){
          setFailed(true);
        }
        return response.json();
      }
      )
      .then((data) => {
        setTxnSources(data);
      }).finally(()=>{
        setLoading(false);
      });
    fetch(
      `${authentication.SERVER_URL}/v1/config/cardtypes/lookup-debit-perso/active`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authentication.token}`,
          instId: "1",
          branchId: "1",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setCardTypes(data);
      }).finally(()=>{
        setLoading(false);
      });
    fetch(`${authentication.SERVER_URL}/v1/config/bins/active`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authentication.token}`,
        instId: "1",
        branchId: "1",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRoutingBins(data);
      }).finally(()=>{
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (itemProvided) {
      setLoading(true);
      setTxnSrc(itemProvided.txnSrc);
      setCardType(itemProvided.cardProduct);
      setDeviceType(itemProvided.deviceType);
      setEntityId(itemProvided.entityId);
      setHasPin(itemProvided.hasPin);
      setMsgType(itemProvided.msgType);
      setPcode(itemProvided.pcode);
      setTxnDest(itemProvided.txnDest);
      setPriority(itemProvided.issInstId);
      setRoutingBin(itemProvided.issUserbinId);
      setLoading(false);
    }
    // eslint-disable-next-line
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
              <div className="page-container">
                <div className="Entries">
                  <div className="left-container">
                    <div className="row">
                      <label className="required">Transaction Source</label>
                      <FormControl sx={{ minWidth: 220 }} size="small">
                        <InputLabel id="curreny-code">
                          Choose Transaction Source
                        </InputLabel>

                        <Select
                          labelId="select-currenct-code"
                          value={txnSrc}
                          label="Currency Code"
                          onChange={(e) => {
                            setTxnSrc(e.target.value);
                          }}
                        >
                          {txnSources.map((item, index) => (
                            <MenuItem value={item.locationId} key={index}>
                              {item.locationDesc}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="row">
                      <label className="required">Card Type</label>
                      <FormControl sx={{ minWidth: 220 }} size="small">
                        <InputLabel id="curreny-code">
                          Choose Card Type
                        </InputLabel>

                        <Select
                          labelId="select-currenct-code"
                          value={cardType}
                          label="Currency Code"
                          onChange={(e) => {
                            setCardType(e.target.value);
                          }}
                        >
                          {cardTypes.map((item, index) => (
                            <MenuItem value={item.cardTypeCode} key={index}>
                              {item.cardTypeCode}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="row">
                      <label className="required">Destination</label>
                      <TextField
                        variant="outlined"
                        label="Enter Destination"
                        type="text"
                        sx={{ width: 220 }}
                        size="small"
                        className="MuiTextField-root"
                        value={txnDest}
                        // error={cardNameValidationError}
                        // helperText={cardNameValidationMessage}
                        onChange={(e) => {
                          setTxnDest(e.target.value);
                        }}
                      />
                    </div>
                    <div className="row">
                      <label className="required">Entity ID</label>
                      <TextField
                        variant="outlined"
                        label="Enter Entity iD"
                        type="text"
                        sx={{ width: 220 }}
                        size="small"
                        className="MuiTextField-root"
                        value={entityId}
                        // error={cardNameValidationError}
                        // helperText={cardNameValidationMessage}
                        // onChange={handleChangeCardName}
                        onChange={(e) => {
                          setEntityId(e.target.value);
                        }}
                      />
                    </div>
                    <div className="row">
                      <label className="required">MSG Type</label>
                      <TextField
                        variant="outlined"
                        label="Enter MSG Type"
                        type="text"
                        sx={{ width: 220 }}
                        size="small"
                        className="MuiTextField-root"
                        value={msgType}
                        // error={cardNameValidationError}
                        // helperText={cardNameValidationMessage}
                        // onChange={handleChangeCardName}
                        onChange={(e) => {
                          setMsgType(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="right-container">
                    <div className="row">
                      <label className="required">Device Type</label>
                      <TextField
                        variant="outlined"
                        label="Enter Device Type"
                        type="text"
                        sx={{ width: 220 }}
                        size="small"
                        className="MuiTextField-root"
                        value={deviceType}
                        // error={cardNameValidationError}
                        // helperText={cardNameValidationMessage}
                        // onChange={handleChangeCardName}
                        onChange={(e) => {
                          setDeviceType(e.target.value);
                        }}
                      />
                    </div>
                    <div className="row">
                      <label className="required">Processing Code</label>
                      <TextField
                        variant="outlined"
                        label="Enter Processing Code"
                        type="text"
                        sx={{ width: 220 }}
                        size="small"
                        className="MuiTextField-root"
                        value={pcode}
                        // error={cardNameValidationError}
                        // helperText={cardNameValidationMessage}
                        // onChange={handleChangeCardName}
                        onChange={(e) => {
                          setPcode(e.target.value);
                        }}
                      />
                    </div>
                    <div className="row">
                      <label className="required">Has Pin</label>
                      <TextField
                        variant="outlined"
                        label="Enter Card Name"
                        type="text"
                        sx={{ width: 220 }}
                        size="small"
                        className="MuiTextField-root"
                        value={hasPin}
                        // error={cardNameValidationError}
                        // helperText={cardNameValidationMessage}
                        // onChange={handleChangeCardName}
                        onChange={(e) => {
                          setHasPin(e.target.value);
                        }}
                      />
                    </div>
                    <div className="row">
                      <label className="required">Routing Bin</label>
                      <FormControl sx={{ minWidth: 220 }} size="small">
                        <InputLabel id="curreny-code">
                          Choose Routing Bin
                        </InputLabel>

                        <Select
                          labelId="select-currenct-code"
                          value={routingBin}
                          label="Currency Code"
                          onChange={(e) => {
                            setRoutingBin(e.target.value);
                            const selectedItem = routingBins.find(
                              (item) => item.bin === e.target.value
                            );
                            const issInstId = selectedItem
                              ? selectedItem.instId
                              : null;
                            setInstId(issInstId);

                            const issUserBinId = selectedItem
                              ? selectedItem.binId
                              : null;
                            setUserBinId(issUserBinId);
                          }}
                        >
                          {routingBins.map((item, index) => (
                            <MenuItem key={index} value={item.bin}>
                              {item.bin}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="row">
                      <label className="required">Priority</label>
                      <TextField
                        variant="outlined"
                        label="Enter Priority"
                        type="text"
                        sx={{ width: 220 }}
                        size="small"
                        className="MuiTextField-root"
                        value={priority}
                        // error={cardNameValidationError}
                        // helperText={cardNameValidationMessage}
                        // onChange={handleChangeCardName}
                        onChange={(e) => {
                          setPriority(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="Submissions">
                <Tooltip title="Cancel Creation">
                  <Button
                    variant="text"
                    onClick={() => (window.location.href = "/issuerProfile")}
                  >
                    <FormattedMessage
                      id="cancel-button"
                      defaultMessage="cancel"
                    />
                  </Button>
                </Tooltip>
                <Tooltip title="Create Interface Bin Configuration">
                  <Button
                    variant="contained"
                    endIcon={<FaSave className="save" />}
                    onClick={() => handleSubmit()}
                  >
                    {" "}
                    <FormattedMessage
                      id="submit-button"
                      defaultMessage="Submit"
                    />{" "}
                  </Button>
                </Tooltip>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default IssuerProfileForm;
