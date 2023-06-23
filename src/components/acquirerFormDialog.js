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


export default function AcquirerDialog({
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
  const [inst, setInst] = useState([]);
  const [interfaces, setInterfaces] = useState([]);
  const [interfaceId, setInterfaceId] = useState("");
  const [instId, setInstId] = useState("");
  const [status, setStatus] = useState(false);
  const [acquirerCode, setAcquirerCode] = useState("");
  const [acquirerDesc, setAcquirerDesc] = useState("");
  const [zpk, setZpk] = useState("");
  const [codeValidationError, setCodeValidationError] = useState(false);
  const [codeValidationMessage, setCodeValidationMessage] = useState("");

  const [descValidationError, setDescValidationError] = useState(false);
  const [descValidationMessage, setDescValidationMessage] = useState("");

  const [zpkValidationError, setZpkValidationError] = useState(false);
  const [zpkValidationMessage, setZpkValidationMessage] = useState("");

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`${authentication.SERVER_URL}/v1/config/acquirers/${id}`, {
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
          setAcquirerCode(data.acquirerCode);
          setAcquirerDesc(data.acquirerDesc);
          setZpk(data.zpk);
          setStatus(data.acquirerStatus);

          console.log(data);
        })
        .finally(() => {
          setLoading(false);
        })
        .catch((error) => console.error(error));
    } else {
      setData([]);
      setInterfaceId("");
      setInstId("");
      setStatus(false);
      setAcquirerCode("");
      setAcquirerDesc("");
      setZpk("");
    }
  }, [id]);

  function handleSubmit() {
    let post = {
      acquirerCode: acquirerCode,
      acquirerDesc: acquirerDesc,
      acquirerId: id ? id : 0,
      acquirerInterfaceId: interfaceId,
      acquirerStatus: status ? 1 : 0,
      zpk: zpk,
    };
    fetch(`${authentication.SERVER_URL}/v1/config/acquirers`, {
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
          toast.success("Acquirer added successfully", {
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
  useEffect(() => {
    setLoading(true);
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
      });

    fetch(`${authentication.SERVER_URL}/v1/routing/acquirer-interface/active`, {
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
        setInterfaces(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  const handleChangeCode = (e) => {
    setCodeValidationError(false);

    const value = e.target.value;

    validations.acquirersCode
      .validate(value)
      .then(() => {
        setAcquirerCode(value);
        setCodeValidationError(false);
        setCodeValidationMessage(null);
      })
      .catch((error) => {
        setCodeValidationError(true);
        setCodeValidationMessage(error.message);
        if (error.message === "Code is required") {
          setAcquirerCode(value);
        }
      });
  };

  const handleChangeDesc = (e) => {
    setDescValidationError(false);

    const value = e.target.value;

    validations.acquirersDesc
      .validate(value)
      .then(() => {
        setAcquirerDesc(value);
        setDescValidationError(false);
        setDescValidationMessage(null);
      })
      .catch((error) => {
        setDescValidationError(true);
        setDescValidationMessage(error.message);

        if (error.message === "Description is required") {
          setAcquirerDesc(value);
        }
      });
  };

  const handleChangeZpk = (e) => {
    setZpkValidationError(false);

    const value = e.target.value;

    validations.acquirersDesc
      .validate(value)
      .then(() => {
        setZpk(value);
        setZpkValidationError(false);
        setZpkValidationMessage(null);
      })
      .catch((error) => {
        setZpkValidationError(true);
        setZpkValidationMessage(error.message);
        if (error.message === "Zpk is required") {
          setZpk(value);
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
                        id="code-column"
                        defaultMessage="Code:"
                      />
                    </label>
                    <TextField
                      variant="outlined"
                      label="Enter Acquirer Code"
                      type="text"
                      sx={{width: 220}}
                      size="small"
                      inputProps={{
                        maxLength: 20,
                      }}
                      className="MuiTextField-root"
                      value={acquirerCode}
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
                      label="Enter Acquirer Description"
                      type="text"
                      sx={{width: 220}}
                      size="small"
                      inputProps={{
                        maxLength: 50,
                      }}
                      className="MuiTextField-root"
                      value={acquirerDesc}
                      error={descValidationError}
                      helperText={descValidationMessage}
                      onChange={(e) => {
                        handleChangeDesc(e);
                      }}
                    />
                    <label className="required">
                      <FormattedMessage id="zpk-column" defaultMessage="ZPK" />
                    </label>
                    <TextField
                      variant="outlined"
                      label="Enter Acquirer ZPK"
                      type="text"
                      sx={{width: 220}}
                      size="small"
                      inputProps={{
                        maxLength: 32,
                      }}
                      className="MuiTextField-root"
                      value={zpk}
                      error={zpkValidationError}
                      helperText={zpkValidationMessage}
                      onChange={(e) => {handleChangeZpk(e);}}
                    />
                  </div>
                  <div className="right-container-acquirer">
                    <label className="required">
                      <FormattedMessage
                        id="isntitution-column"
                        defaultMessage="Institution"
                      />
                    </label>
                    <FormControl sx={{  minWidth: 220 }} size="small">
                      {id ? (
                        <InputLabel id="select-inst-name">
                          {data.instName}
                        </InputLabel>
                      ) : (
                        <InputLabel id="select-inst-name">
                          <FormattedMessage
                            id="institution-name-option"
                            defaultMessage="Choose Institution Name"
                          />
                        </InputLabel>
                      )}

                      <Select
                        labelId="select-inst-name"
                        value={instId}
                        label="Institution Name"
                        onChange={(e) => {
                          setInstId(e.target.value);
                        }}
                      >
                        {inst.map((item) => (
                          <MenuItem value={item.instId}>
                            {item.instName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <label className="required">
                      <FormattedMessage
                        id="interface-column"
                        defaultMessage="Interface"
                      />
                    </label>
                    <FormControl sx={{ minWidth: 220 }} size="small">
                      {id ? (
                        <InputLabel id="select-interface">
                          {data.interfaceCode}
                        </InputLabel>
                      ) : (
                        <InputLabel id="select-interface">
                          <FormattedMessage
                            id="interface-option"
                            defaultMessage="Choose Interface"
                          />
                        </InputLabel>
                      )}

                      <Select
                        labelId="select-interface-name"
                        value={interfaceId}
                        label="Interface"
                        onChange={(e) => {
                          setInterfaceId(e.target.value);
                        }}
                      >
                        {interfaces.map((item) => (
                          <MenuItem value={item.acquirerInterfaceId}>
                            {item.interfaceCode}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
