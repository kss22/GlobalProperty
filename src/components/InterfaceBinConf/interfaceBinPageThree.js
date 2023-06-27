import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import validations from "../../utils/validations";
import { useState } from "react";

const PageThree = ({
  resendInterval,
  setResendInterval,
  slowInterval,
  setSlowInterval,
  fastInterval,
  setFastInterval,
  normalModePercentage,
  setNormalModePercentage,
  maxOutMessages,
  setMaxOutMessages,
  fullFileSize,
  setFullFileSize,
  replaceResponses,
  setReplaceRespones,
  enableSystemMessages,
  setEnableSystemMessages,
  verifyResponse,
  setVerifyResponse,
  maxRetry,
  setMaxRetry,
  typeOfStoreAndForward,
  setTypeOfStoreAndForward,
  useSafFile,
  setUseSafFile,
  safAmount,
  setSafAmount,
  safLimit,
  setSafLimit,
  forwardModePercentage,
  setForwardModePercentage,
}) => {
  const [rIntervalValidationError, setRIntervalValidationError] = useState("");
  const [rIntervalValidationMessage, setRIntervalValidationMessage] = useState("");
  const [fIntervalValidationError, setFIntervalValidationError] = useState("");
  const [fIntervalValidationMessage, setFIntervalValidationMessage] = useState("");
  const [sIntervalValidationError, setSIntervalValidationError] = useState("");
  const [sIntervalValidationMessage, setSIntervalValidationMessage] = useState("");
  const [nPercentageValidationError, setNPercentageValidationError] = useState("");
  const [nPercentageValidationMessage, setNPercentageValidationMessage] = useState("");
  const [fPercentageValidationError, setFPercentageValidationError] = useState("");
  const [fPercentageValidationMessage, setFPercentageValidationMessage] = useState("");
  const [maxRetryValidationError, setMaxRetryValidationError] = useState("");
  const [maxRetryValidationMessage, setMaxRetryValidationMessage] = useState("");
  const [maxoutValidationError, setMaxoutValidationError] = useState("");
  const [maxoutValidationMessage, setMaxoutValidationMessage] = useState("");
  const [fullFileSizeValidationError, setFullFileSizeValidationError] = useState("");
  const [fullFileSizeValidationMessage, setFullFileSizeValidationMessage] = useState("");
  const [safAmountValidationError, setSafAmountValidationError] = useState("");
  const [safAmountValidationMessage, setSafAmountValidationMessage] = useState("");
  const [safLimitValidationError, setSafLimitValidationError] = useState("");
  const [safLimitValidationMessage, setSafLimitValidationMessage] = useState("");

  const handleChangeRInterval = (e) => {
    setRIntervalValidationError(false);

    const value = e.target.value;

    validations.interfaceBinConfRInterval
      .validate(value)
      .then(() => {
        setResendInterval(value);
        setRIntervalValidationError(false);
        setRIntervalValidationMessage(null);
      })
      .catch((error) => {
        setRIntervalValidationError(true);
        setRIntervalValidationMessage(error.message);

        if (error.message === "R interval is required") {
          setResendInterval(value);
        }
      });
  };

  const handleChangeFInterval = (e) => {
    setFIntervalValidationError(false);

    const value = e.target.value;

    validations.interfaceBinConfFInterval
      .validate(value)
      .then(() => {
        setFastInterval(value);
        setFIntervalValidationError(false);
        setFIntervalValidationMessage(null);
      })
      .catch((error) => {
        setFIntervalValidationError(true);
        setFIntervalValidationMessage(error.message);

        if (error.message === "F interval is required") {
          setFastInterval(value);
        }
      });
  };

  const handleChangeSInterval = (e) => {
    setSIntervalValidationError(false);

    const value = e.target.value;

    validations.interfaceBinConfSInterval
      .validate(value)
      .then(() => {
        setSlowInterval(value);
        setSIntervalValidationError(false);
        setSIntervalValidationMessage(null);
      })
      .catch((error) => {
        setSIntervalValidationError(true);
        setSIntervalValidationMessage(error.message);

        if (error.message === "S interval is required") {
          setSlowInterval(value);
        }
      });
  };

  const handleChangeNPercentage = (e) => {
    setNPercentageValidationError(false);

    const value = e.target.value;

    validations.interfaceBinConfNPercent
      .validate(value)
      .then(() => {
        setNormalModePercentage(value);
        setNPercentageValidationError(false);
        setNPercentageValidationMessage(null);
      })
      .catch((error) => {
        setNPercentageValidationError(true);
        setNPercentageValidationMessage(error.message);

        if (error.message === "N Percent is required") {
          setNormalModePercentage(value);
        }
      });
  };
  const handleChangeFPercentage = (e) => {
    setFPercentageValidationError(false);

    const value = e.target.value;

    validations.interfaceBinConfFPercent
      .validate(value)
      .then(() => {
        setForwardModePercentage(value);
        setFPercentageValidationError(false);
        setFPercentageValidationMessage(null);
      })
      .catch((error) => {
        setFPercentageValidationError(true);
        setFPercentageValidationMessage(error.message);

        if (error.message === "F Percent is required") {
          setForwardModePercentage(value);
        }
      });
  };

  const handleChangeMaxRetry = (e) => {
    setMaxRetryValidationError(false);

    const value = e.target.value;

    validations.interfaceBinConfMaxRetry
      .validate(value)
      .then(() => {
        setMaxRetry(value);
        setMaxRetryValidationError(false);
        setMaxRetryValidationMessage(null);
      })
      .catch((error) => {
        setMaxRetryValidationError(true);
        setMaxRetryValidationMessage(error.message);

        if (error.message === "Max Retry is required") {
          setMaxRetry(value);
        }
      });
  };

  const handleChangeMaxOut = (e) => {
    setMaxoutValidationError(false);

    const value = e.target.value;

    validations.interfaceBinConfMaxOut
      .validate(value)
      .then(() => {
        setMaxOutMessages(value);
        setMaxoutValidationError(false);
        setMaxoutValidationMessage(null);
      })
      .catch((error) => {
        setMaxoutValidationError(true);
        setMaxoutValidationMessage(error.message);

        if (error.message === "Max Out is required") {
          setMaxOutMessages(value);
        }
      });
  };

  


  return (
    <div className="Entries">
      <div className="left-container">
        <div className="row">
          <label className="required">RESEND INTERVAL</label>
          <TextField
            variant="outlined"
            label="Enter RESEND INTERVAL"
            type="text"
            sx={{ width: 220 }}
            size="small"
            className="MuiTextField-root"
            value={resendInterval}
              error={rIntervalValidationError}
              helperText={rIntervalValidationMessage}
            onChange={handleChangeRInterval}
          />
        </div>
        <div className="row">
          <label className="required">FAST INTERVAL</label>
          <TextField
            variant="outlined"
            label="Enter FAST INTERVAL"
            type="text"
            sx={{ width: 220 }}
            size="small"
            className="MuiTextField-root"
            value={fastInterval}
            //   error={codeValidationError}
            //   helperText={codeValidationMessage}
            onChange={(e) => {
              setFastInterval(e.target.value);
            }}
          />
        </div>
        <div className="row">
          <label className="required">SLOW INTERVAL</label>
          <TextField
            variant="outlined"
            label="Enter SLOW INTERVAL"
            type="text"
            sx={{ width: 220 }}
            size="small"
            inputProps={{
              maxLength: 10,
            }}
            className="MuiTextField-root"
            value={slowInterval}
            //   error={codeValidationError}
            //   helperText={codeValidationMessage}
            onChange={(e) => {
              setSlowInterval(e.target.value);
            }}
          />
        </div>
        <div className="row">
          <label className="required">NORMAL MODE PERCENTAGE</label>
          <TextField
            variant="outlined"
            label="Enter NORMAL MODE PERCENTAGE"
            type="text"
            sx={{ width: 220 }}
            size="small"
            inputProps={{
              maxLength: 10,
            }}
            className="MuiTextField-root"
            value={normalModePercentage}
            //   error={codeValidationError}
            //   helperText={codeValidationMessage}
            onChange={(e) => {
              setNormalModePercentage(e.target.value);
            }}
          />
        </div>
        <div className="row">
          <label className="required">FORWARD MODE PERCENTAGE</label>
          <TextField
            variant="outlined"
            label="Enter FORWARD MODE PERCENTAGE"
            type="text"
            sx={{ width: 220 }}
            size="small"
            inputProps={{
              maxLength: 10,
            }}
            className="MuiTextField-root"
            value={forwardModePercentage}
            //   error={codeValidationError}
            //   helperText={codeValidationMessage}
            onChange={(e) => {
              setForwardModePercentage(e.target.value);
            }}
          />
        </div>
        <div className="row">
          <label className="required">MAX OUT MESSAGES</label>
          <TextField
            variant="outlined"
            label="Enter MAX OUT MESSAGES"
            type="text"
            sx={{ width: 220 }}
            size="small"
            inputProps={{
              maxLength: 10,
            }}
            className="MuiTextField-root"
            value={maxOutMessages}
            //   error={codeValidationError}
            //   helperText={codeValidationMessage}
            onChange={(e) => {
              setMaxOutMessages(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="mid-container">
        <div className="row">
          <label className="required">FULL FILE SIZE</label>
          <TextField
            variant="outlined"
            label="Enter FULL FILE SIZE"
            type="text"
            sx={{ width: 220 }}
            size="small"
            inputProps={{
              maxLength: 10,
            }}
            className="MuiTextField-root"
            value={fullFileSize}
            //   error={codeValidationError}
            //   helperText={codeValidationMessage}
            onChange={(e) => {
              setFullFileSize(e.target.value);
            }}
          />
        </div>
        <div className="row">
          <label className="required">SAF AMOUNT</label>
          <TextField
            variant="outlined"
            label="Enter SAF AMOUNT"
            type="text"
            sx={{ width: 220 }}
            size="small"
            className="MuiTextField-root"
            value={safAmount}
            //   error={codeValidationError}
            //   helperText={codeValidationMessage}
            onChange={(e) => {
              setSafAmount(e.target.value);
            }}
          />
        </div>
        <div className="row">
          <label className="required">SAF LIMIT</label>
          <TextField
            variant="outlined"
            label="Enter SAF LIMIT"
            type="text"
            sx={{ width: 220 }}
            size="small"
            className="MuiTextField-root"
            value={safLimit}
            //   error={codeValidationError}
            //   helperText={codeValidationMessage}
            onChange={(e) => {
              setSafLimit(e.target.value);
            }}
          />
        </div>

        <div className="row">
          <label className="required">MAX RETRY</label>
          <TextField
            variant="outlined"
            label="Enter MAX RETRY"
            type="text"
            sx={{ width: 220 }}
            size="small"
            className="MuiTextField-root"
            value={maxRetry}
            //   error={codeValidationError}
            //   helperText={codeValidationMessage}
            onChange={(e) => {
              setMaxRetry(e.target.value);
            }}
          />
        </div>
        <div className="row">
          <label className="required">Type of store and forward</label>
          <FormControl sx={{ minWidth: 220 }} size="small">
            <InputLabel id="select-type-of-store-and-forward">
              Type of store and forward
            </InputLabel>

            <Select
              labelId="select-type-of-store-and-forward"
              value={typeOfStoreAndForward}
              label="Type of store and forward"
              onChange={(e) => {
                setTypeOfStoreAndForward(e.target.value);
              }}
            >
              <MenuItem value={"D"}>Deny Authorization</MenuItem>
              <MenuItem value={"N"}>Negative Authorization</MenuItem>
              <MenuItem value={"P"}>Positive Authorization</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="right-container">
        <div className="row">
          <label className="required">Use SAF File</label>
          <FormControlLabel
            onChange={(e) => setUseSafFile(e.target.checked)}
            control={<Switch />}
            checked={useSafFile}
          />
        </div>
        <div className="row">
          <label className="required">REPLACE RESPONSES</label>
          <FormControlLabel
            onChange={(e) => setReplaceRespones(e.target.checked)}
            control={<Switch />}
            checked={replaceResponses}
          />
        </div>
        <div className="row">
          <label className="required">ENABLE SYSTEM MESSAGES</label>
          <FormControlLabel
            onChange={(e) => setEnableSystemMessages(e.target.checked)}
            control={<Switch />}
            checked={enableSystemMessages}
          />
        </div>
        <div className="row">
          <label className="required">VERIFY RESPONSE</label>
          <FormControlLabel
            onChange={(e) => setVerifyResponse(e.target.checked)}
            control={<Switch />}
            checked={verifyResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default PageThree;
