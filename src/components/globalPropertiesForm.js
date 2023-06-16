import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import * as authentication from "../utils/authentication";
import validations from "../utils/validations";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormattedMessage } from "react-intl";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import Loading from "./loading";
import Failed from "./failedComponent";

const GlobalPropertiesForm = () => {
  const { propId } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [property, setProperty] = useState([]);

  const [prop, setProp] = useState(null);
  const [keys, setKeys] = useState([]);
  const [inst, setInst] = useState([]);

  // const [propId, setPropId] = useState(0);

  const [propValue, setPropValue] = useState(null);
  const [propKey, setPropKey] = useState("");

  const [instId, setInstId] = useState(0);

  const [validationError, setValidationError] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [failed, setFailed] = useState(false);

  const handleChangePropValue = (e) => {
    setValidationError(false);

    const value = e.target.value;

    validations.propertyValue
      .validate(value)
      .then(() => {
        setPropValue(value);
        setValidationError(false);
      })
      .catch((error) => {
        setValidationError(true);
        setValidationMessage(error.message);
      });
  };

  function handleChange(event) {
    fetch(
      `${authentication.SERVER_URL}/v1/config/global-props/prop-values/${event.target.value}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authentication.token}`,
          branchId: "1",
          instId: "1",
        },
      }
    )
      .then((response) => {
        if (response.status === 401) {
          setFailed(true);
        }
        return response.json();
      })
      .then((data) => {
        setKeys(data);
      });
  }

  function handleSubmit() {
    const post = {
      instId: parseInt(instId),
      propId: propId ? propId : 0,
      propKey: propKey,
      propName: prop,
      propValue: propValue,
    };
    fetch(`${authentication.SERVER_URL}/v1/config/global-props`, {
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
          toast.success("Property added successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
          });
        } else if (response.status === 401) {
          setFailed(true);
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
    if (propId ? true : false) {
      fetch(`${authentication.SERVER_URL}/v1/config/global-props/${propId}`, {
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
          console.log(data);
          setProperty(data);
          setPropValue(data.propValue);
          setPropKey(data.propKey);
          setInstId(data.instId);
          setProp(data.propName);
        });
      fetch(`${authentication.SERVER_URL}/v1/config/global-props/prop-names`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authentication.token}`,
          branchId: "1",
          instId: "1",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
      fetch(`${authentication.SERVER_URL}/v1/config/institutions/user/1`, {
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
          console.log(data);
          setInst(data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      fetch(`${authentication.SERVER_URL}/v1/config/global-props/prop-names`, {
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
        });
      fetch(`${authentication.SERVER_URL}/v1/config/institutions/user/1`, {
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
          console.log(data);
          setInst(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [propId]);

  return (
    <div>
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : (
        <div className="divContainer">
          {failed ? (
            <Failed />
          ) : (
            <div>
              <div className="Entries">
                <div className="left-container">
                  <label className="required">
                    <FormattedMessage
                      id="property-name"
                      defaultMessage="Property Name:"
                    />
                  </label>
                  <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                    {propId ? (
                      <InputLabel id="select-prop-name">
                        {property.propName}
                      </InputLabel>
                    ) : (
                      <InputLabel id="select-prop-name">
                        <FormattedMessage
                          id="property-name-option"
                          defaultMessage="Choose Property Name"
                        />
                      </InputLabel>
                    )}

                    <Select
                      labelId="select-prop-name"
                      value={prop}
                      label="Property Name"
                      onChange={(e) => {
                        setProp(e.target.value);
                        handleChange(e);
                      }}
                    >
                      {data.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <label className="required">
                    <FormattedMessage
                      className="format"
                      id="property-key"
                      defaultMessage="Property Key:"
                    />
                  </label>
                  <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                    {propId ? (
                      <InputLabel id="select-prop-key">
                        {property.propKey}
                      </InputLabel>
                    ) : (
                      <InputLabel id="select-prop-key">
                        <FormattedMessage
                          id="property-key-option"
                          defaultMessage="Choose Property Key"
                        />
                      </InputLabel>
                    )}

                    <Select
                      labelId="select-prop-key"
                      value={propKey}
                      label="Property Key"
                      onChange={(e) => {
                        setPropKey(e.target.value);
                      }}
                    >
                      {keys.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="right-container">
                  <label className="required">
                    <FormattedMessage
                      className="format"
                      id="property-value"
                      defaultMessage="Property Value:"
                    />
                  </label>
                  <TextField
                    variant="outlined"
                    label="Enter Property Value"
                    type="text"
                    size="small"
                    inputProps={{
                      maxLength: 100,
                    }}
                    className="MuiTextField-root"
                    error={validationError}
                    helperText={validationMessage}
                    value={propId ? propValue : null}
                    onChange={handleChangePropValue}
                  />

                  <label className="required">
                    <FormattedMessage
                      className="format"
                      id="institution-name"
                      defaultMessage="Institution:"
                    />
                  </label>

                  <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                    {propId ? (
                      <InputLabel id="select-institution">
                        {property.instName}
                      </InputLabel>
                    ) : (
                      <InputLabel id="select-institution">
                        <FormattedMessage
                          id="institution-name-option"
                          defaultMessage="Choose Institution"
                        />
                      </InputLabel>
                    )}

                    <Select
                      labelId="select-institution"
                      label="Institution"
                      onChange={(e) => setInstId(e.target.value)}
                    >
                      {inst.map((item) => (
                        <MenuItem value={item.instId}>{item.instName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="Submissions">
                <Tooltip title="Cancel Creation">
                  <Button
                    variant="text"
                    onClick={() =>
                      (window.location.href = "/listGlobalProperties")
                    }
                  >
                    <FormattedMessage
                      id="cancel-button"
                      defaultMessage="cancel"
                    />
                  </Button>
                </Tooltip>
                <Tooltip title="Create property">
                  <Button
                    variant="contained"
                    onClick={() => handleSubmit()}
                    endIcon={<FaSave className="save" />}
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
    </div>
  );
};

export default GlobalPropertiesForm;
