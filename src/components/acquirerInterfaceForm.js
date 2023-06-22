import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { FormattedMessage } from "react-intl";
import { ToastContainer, toast } from "react-toastify";
import Loading from "./loading";
import Failed from "./failedComponent";
import * as authentication from "../utils/authentication";
import { States } from "../utils/constants";
import validations from "../utils/validations";

export default function AcquirerInterfaceDialog({
  open,
  onClose,
  title,
  handleCancel,
  id,
  setAuth,
}) {
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);
  const [interfaceCode, setInterfaceCode] = useState("");
  const [interfaceDescription, setInterfaceDescription] = useState("");
  const [key, setKey] = useState("");
  const [initialStatus, setInitialStatus] = useState("");
  const [checkDigit, setCheckDigit] = useState("");
  const [site, setSite] = useState("");

  const [codeValidationError, setCodeValidationError] = useState(false);
  const [codeValidationMessage, setCodeValidationMessage] = useState("");

  const [descValidationError, setDescValidationError] = useState(false);
  const [descValidationMessage, setDescValidationMessage] = useState("");

  const [zpkValidationError, setZpkValidationError] = useState(false);
  const [zpkValidationMessage, setZpkValidationMessage] = useState("");

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(
        `${authentication.SERVER_URL}/v1/routing/acquirer-interface/${id}`,
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
          setData(data);
          setInterfaceCode(data.interfaceCode);
          setInterfaceDescription(data.interfaceDescription);
          setKey(data.key);
          setStatus(data.status);
          setInitialStatus(data.initStatus);
          setCheckDigit(data.checkValue);
          setSite(data.siteId);

          console.log(data);
        })
        .finally(() => {
          setLoading(false);
        })
        .catch((error) => console.error(error));
    } else {
      setData([]);
      setInterfaceCode("");
      setInterfaceDescription("");
      setStatus(false);
      setKey("");
      setInitialStatus("");
      setCheckDigit("");
      setSite("");
    }
  }, [id]);

  function handleSubmit() {
    let post = {
      acquirerInterfaceId: id ? id : 0,
      checkValue: checkDigit,
      initStatus: initialStatus,
      interfaceCode: interfaceCode,
      interfaceDescription: interfaceDescription,
      key: key,
      siteId: site,
      status: status ? 1 : 0,
    };
    fetch(`${authentication.SERVER_URL}/v1/routing/acquirer-interface`, {
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
          toast.success("Acquirer Interface added successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
          });
          setAuth(States.PENDING);
          setTimeout(() => {
            window.location.reload();
          }, 5000);
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

  const handleChangeCode = (e) => {
    setCodeValidationError(false);

    const value = e.target.value;

    validations.acquirersCode
      .validate(value)
      .then(() => {
        setInterfaceCode(value);
        setCodeValidationError(false);
        setCodeValidationMessage(null);
      })
      .catch((error) => {
        setCodeValidationError(true);
        setCodeValidationMessage(error.message);
        if (error.message === "Code is required") {
          setInterfaceCode(value);
        }
      });
  };

  const handleChangeDesc = (e) => {
    setDescValidationError(false);

    const value = e.target.value;

    validations.acquirersDesc
      .validate(value)
      .then(() => {
        setInterfaceDescription(value);
        setDescValidationError(false);
        setDescValidationMessage(null);
      })
      .catch((error) => {
        setDescValidationError(true);
        setDescValidationMessage(error.message);

        if (error.message === "Description is required") {
          setInterfaceDescription(value);
        }
      });
  };

  

  return (
    <div>
      <ToastContainer />
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          style: {
            maxHeight: "150vh",
            maxWidth: "50vw",
          },
        }}
      >
        {loading ? (
          <Loading />
        ) : (
          <div className="acquirerDivContainer">
            {failed ? (
              <Failed />
            ) : (
              <div>
                <DialogTitle>{title}</DialogTitle>
                <Divider sx={{ marginBottom: 3 }} />
                <div className="Entries-acquirer">
                  <div className="left-container-acquirer">
                    <label className="required">
                      <FormattedMessage
                        id="interface-code-column"
                        defaultMessage="Interface Code"
                      />
                    </label>
                    <TextField
                      variant="outlined"
                      label="Enter Interface Code"
                      type="text"
                      size="small"
                      inputProps={{
                        maxLength: 20,
                      }}
                      className="MuiTextField-root"
                      value={interfaceCode}
                      error={codeValidationError}
                      helperText={codeValidationMessage}
                      onChange={(e) => {
                        handleChangeCode(e);
                      }}
                    />
                    <label className="required">
                      <FormattedMessage
                        id="description-column"
                        defaultMessage="Description"
                      />
                    </label>
                    <TextField
                      variant="outlined"
                      label="Enter Interface Description"
                      type="text"
                      size="small"
                      inputProps={{
                        maxLength: 50,
                      }}
                      className="MuiTextField-root"
                      value={interfaceDescription}
                      error={descValidationError}
                      helperText={descValidationMessage}
                      onChange={(e) => {
                        handleChangeDesc(e);
                      }}
                    />
                    <label className="required">
                      <FormattedMessage id="key-column" defaultMessage="Key" />
                    </label>
                    <TextField
                      variant="outlined"
                      label="Enter Interface Key"
                      type="text"
                      size="small"
                      inputProps={{
                        maxLength: 32,
                      }}
                      className="MuiTextField-root"
                      value={key}
                    //   error={zpkValidationError}
                    //   helperText={zpkValidationMessage}
                      onChange={(e) => {
                        setKey(e.target.value);
                      }}
                    />
                    <label className="required">
                      <FormattedMessage
                        id="initial-status-column"
                        defaultMessage="Insitial Status"
                      />
                    </label>
                    <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                      {id ? (
                        <InputLabel id="select-inst-name">
                          {data.instName}
                        </InputLabel>
                      ) : (
                        <InputLabel id="select-inst-name">
                          <FormattedMessage
                            id="initial-status-option"
                            defaultMessage="Choose Initial Status"
                          />
                        </InputLabel>
                      )}

                      <Select
                        labelId="select-inst-name"
                        value={initialStatus}
                        label="Institution Name"
                        onChange={(e) => {
                          setInitialStatus(e.target.value);
                        }}
                      >
                        
                          <MenuItem value={0}>
                            {0}
                          </MenuItem>
                          <MenuItem value={1}>
                            {1}
                          </MenuItem>
                        
                      </Select>
                    </FormControl>
                  </div>
                  <div className="right-container-acquirer">
                    <label className="required">
                      <FormattedMessage
                        id="check-digit-column"
                        defaultMessage="Check digit"
                      />
                    </label>
                    <TextField
                      variant="outlined"
                      label="Enter Check Digit"
                      type="text"
                      size="small"
                      inputProps={{
                        maxLength: 32,
                      }}
                      className="MuiTextField-root"
                      value={checkDigit}
                    //   error={zpkValidationError}
                    //   helperText={zpkValidationMessage}
                      onChange={(e) => {
                        // handleChangeZpk(e);
                        setCheckDigit(e.target.value);
                      }}
                    />
                    <label className="required">
                      <FormattedMessage
                        id="site-column"
                        defaultMessage="Site"
                      />
                    </label>
                    <TextField
                      variant="outlined"
                      label="Enter Interface Site"
                      type="text"
                      size="small"
                      inputProps={{
                        maxLength: 32,
                      }}
                      className="MuiTextField-root"
                      value={site}
                    //   error={zpkValidationError}
                    //   helperText={zpkValidationMessage}
                      onChange={(e) => {
                        // handleChangeZpk(e);
                        setSite(e.target.value);
                      }}
                    />
                    <label className="required">
                      <FormattedMessage
                        id="enable-disable-label"
                        defaultMessage="Enable/Disable"
                      />
                    </label>
                    <Switch
                      checked={status}
                      onChange={(e) => setStatus(e.target.checked)}
                    />
                  </div>
                </div>
                <div className="Submissions-acquirer">
                  <Tooltip title="Cancel Creation">
                    <Button variant="text" onClick={() => handleCancel()}>
                      <FormattedMessage
                        id="cancel-button"
                        defaultMessage="cancel"
                      />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Create Acquirer">
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
      </Dialog>
    </div>
  );
}
