import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
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

const RangeDefinitionForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemProvided = JSON.parse(decodeURIComponent(searchParams.get("item")));

  const [destination, setDestination] = useState([]);
  const [entityId, setEntityId] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [cardTypes, setCardTypes] = useState([]);
  const [countryCodeController, setCountryCodeController] = useState([]);
  const [cardType, setCardType] = useState("");
  const [description, setDescription] = useState("");
  const [lowbin, setLowbin] = useState("");
  const [highbin, setHighbin] = useState("");
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [state, setState] = useState(false);

  function handleSubmit() {
    const post = {
      cardproduct: cardType,
      countryCode: parseInt(countryCode),
      description: description,
      destination: destination,
      highbin: highbin,
      lowbin: lowbin,
      status: state? "A" : "I",
    };

    fetch(`${authentication.SERVER_URL}/v1/routing/nuext-bin`, {
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
          toast.success("Range Definition added successfully", {
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
      .then((response) => {
        if(response.status===401){
            setFailed(true);
        }
        return response.json();
      })
      .then((data) => {
        setCardTypes(data);
      })
      .finally(() => {
        setLoading(false);
      });
    fetch(`${authentication.SERVER_URL}/v1/lookup/countries/active`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authentication.token}`,
        branchId: "1",
        instId: "1",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCountryCodeController(data);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (itemProvided) {
      setLoading(true);
      setCountryCode(itemProvided.countryCode);
      setCardType(itemProvided.cardproduct);
      setDescription(itemProvided.description);
      setDestination(itemProvided.destination);
      setEntityId(itemProvided.entityId);
      setLowbin(itemProvided.lowbin);
      setHighbin(itemProvided.highbin);
      setState(itemProvided.status);
      
      
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
                      <label className="required">Low Bin Range</label>
                      <TextField
                        variant="outlined"
                        label="Enter Low Bin Range"
                        type="text"
                        sx={{ width: 220 }}
                        size="small"
                        className="MuiTextField-root"
                        value={lowbin}
                        // error={cardNameValidationError}
                        // helperText={cardNameValidationMessage}
                        onChange={(e) => {
                          setLowbin(e.target.value);
                        }}
                      />
                    </div>
                    <div className="row">
                      <label className="required">High Bin Range</label>
                      <TextField
                        variant="outlined"
                        label="Enter High Bin Range"
                        type="text"
                        sx={{ width: 220 }}
                        size="small"
                        className="MuiTextField-root"
                        value={highbin}
                        // error={cardNameValidationError}
                        // helperText={cardNameValidationMessage}
                        // onChange={handleChangeCardName}
                        onChange={(e) => {
                          setHighbin(e.target.value);
                        }}
                      />
                    </div>
                    <div className="row">
                      <label className="required">Entity ID</label>
                      <TextField
                        variant="outlined"
                        label="Enter Entity ID"
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
                      <label className="required">Description</label>
                      <TextField
                        variant="outlined"
                        label="Enter Description"
                        type="text"
                        sx={{ width: 220 }}
                        size="small"
                        className="MuiTextField-root"
                        value={description}
                        // error={cardNameValidationError}
                        // helperText={cardNameValidationMessage}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="right-container">
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
                            <MenuItem key={index} value={item.cardTypeCode}>
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
                        value={destination}
                        // error={cardNameValidationError}
                        // helperText={cardNameValidationMessage}
                        // onChange={handleChangeCardName}
                        onChange={(e) => {
                          setDestination(e.target.value);
                        }}
                      />
                    </div>
                    <div className="row">
                      <label className="required">Country Code</label>
                      <FormControl sx={{ minWidth: 220 }} size="small">
                        <InputLabel id="curreny-code">
                          Choose Country Code
                        </InputLabel>

                        <Select
                          labelId="select-currenct-code"
                          value={countryCode}
                          label="Currency Code"
                          onChange={(e) => {
                            setCountryCode(e.target.value);
                          }}
                        >
                          {countryCodeController.map((item, index) => (
                            <MenuItem value={item.countryId} key={index}>
                              {item.countryCode}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="row">
                      <label className="required">Status</label>
                      <FormControlLabel
                        onChange={(e) => setState(e.target.checked)}
                        control={<Switch />}
                        checked={state}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="Submissions">
                <Tooltip title="Cancel Creation">
                  <Button
                    variant="text"
                    onClick={() => (window.location.href = "/rangeDefinition")}
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

export default RangeDefinitionForm;
