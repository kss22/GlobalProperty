import {
  Switch,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import validations from "../../utils/validations";
import { useState } from "react";

const PageTwo = ({
  mailbox,
  setMailbox,
  port,
  setPort,
  binType,
  setBinType,
  timeoutValue,
  setTimeoutValue,
  actionOnTimeout,
  setActionOnTimeout,
  echoTest,
  setEchoTest,
  authorizationFlag,
  setAuthorizationFlag,
  authorizationServer,
  setAuthorizationServer,
  creditDebit,
  setCreditDebit,
  reversalToIssuer,
  setReversalToIssuer,
  sendReversals,
  setSendReversals,
  duplicateTranCheckAsIssuer,
  setDuplicateTranCheckAsIssuer,
}) => {
  const [mailboxValidationError, setMailboxValidationError] = useState("");
  const [mailboxValidationMessage, setMailboxValidationMessage] = useState("");
  const [portValidationError, setPortValidationError] = useState("");
  const [portValidationMessage, setPortNameValidationMessage] = useState("");
  const [timeoutValidationError, setTimeoutValidationError] = useState("");
  const [timeoutValidationMessage, setTimeoutValidationMessage] = useState("");
  const [authServerValidationError, setAuthServerValidationError] = useState("");
  const [authServerValidationMessage, setAuthServerValidationMessage] = useState("");

  const handleChangeMailbox = (e) => {
    setMailboxValidationError(false);

    const value = e.target.value;

    validations.interfaceBinMailbox
      .validate(value)
      .then(() => {
        setMailbox(value);
        setMailboxValidationError(false);
        setMailboxValidationMessage(null);
      })
      .catch((error) => {
        setMailboxValidationError(true);
        setMailboxValidationMessage(error.message);

        if (error.message === "MailBox is required") {
          setMailbox(value);
        }
      });
  };

  const handleChangePort = (e) => {
    setPortValidationError(false);

    const value = e.target.value;

    validations.interfaceBinPort
      .validate(value)
      .then(() => {
        setPort(value);
        setPortValidationError(false);
        setPortNameValidationMessage(null);
      })
      .catch((error) => {
        setPortValidationError(true);
        setPortNameValidationMessage(error.message);

        if (error.message === "Port is required") {
          setPort(value);
        }
      });
  };

  const handleChangeTimeout = (e) => {
    setTimeoutValidationError(false);

    const value = e.target.value;

    validations.interfaceBinTimeOut
      .validate(value)
      .then(() => {
        setTimeoutValue(value);
        setTimeoutValidationError(false);
        setTimeoutValidationMessage(null);
      })
      .catch((error) => {
        setTimeoutValidationError(true);
        setTimeoutValidationMessage(error.message);

        if (error.message === "TimeOut is required") {
          setTimeoutValue(value);
        }
      });
  };

  const handleChangeAuthServer = (e) => {
    setAuthServerValidationError(false);

    const value = e.target.value;

    validations.interfaceBinAuthServer
      .validate(value)
      .then(() => {
        setAuthorizationServer(value);
        setAuthServerValidationError(false);
        setAuthServerValidationMessage(null);
      })
      .catch((error) => {
        setAuthServerValidationError(true);
        setAuthServerValidationMessage(error.message);

        if (error.message === "Auth Server is required") {
          setAuthorizationServer(value);
        }
      });
  };

  return (
    <div className="Entries">
      <div className="left-container">
        <div className="row">
          <label className="required">MAILBOX</label>
          <TextField
            variant="outlined"
            label="Enter Mailbox"
            type="text"
            sx={{ width: 220 }}
            size="small"
            className="MuiTextField-root"
            value={mailbox}
            error={mailboxValidationError}
            helperText={mailboxValidationMessage}
            onChange={handleChangeMailbox}
          />
        </div>
        <div className="row">
          <label className="required">PORT</label>
          <TextField
            variant="outlined"
            label="Enter Port"
            type="text"
            sx={{ width: 220 }}
            size="small"
            className="MuiTextField-root"
            value={port}
              error={portValidationError}
              helperText={portValidationMessage}
            onChange={handleChangePort}
          />
        </div>
        <div className="row">
          <label className="required">BIN TYPE</label>
          <FormControl sx={{ minWidth: 220 }} size="small">
            <InputLabel id="select-bin-type">
              <FormattedMessage
                id="bin-type-option"
                defaultMessage="Choose Bin Type"
              />
            </InputLabel>

            <Select
              labelId="select-bin-type"
              value={binType}
              label="Bin Type"
              onChange={(e) => {
                setBinType(e.target.value);
              }}
            >
              <MenuItem value={0}>Default</MenuItem>
              <MenuItem value={1}>Points to ONUS BIN</MenuItem>
              <MenuItem value={2}>
                Points to ONUS BIN for COPAC transactions
              </MenuItem>
              <MenuItem value={3}>
                Points to OFFUS BIN for COPAC transactions
              </MenuItem>
              <MenuItem value={4}>No Mapping to existing BIN</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="row">
          <label className="required">TIMEOUT VALUE</label>
          <TextField
            variant="outlined"
            label="Enter Timeout Value"
            type="text"
            sx={{ width: 220 }}
            size="small"
            className="MuiTextField-root"
            value={timeoutValue}
              error={timeoutValidationError}
              helperText={timeoutValidationMessage}
            onChange={handleChangeTimeout}
          />
        </div>
        <div className="row">
          <label className="required">Action on Timeout</label>
          <FormControl sx={{ minWidth: 220 }} size="small">
            <InputLabel id="select-action-on-timeout">
              <FormattedMessage
                id="action-on-timeout-option"
                defaultMessage="Choose Action"
              />
            </InputLabel>

            <Select
              labelId="select-action-on-timeout"
              value={actionOnTimeout}
              label="action-on-timeout"
              onChange={(e) => {
                setActionOnTimeout(e.target.value);
              }}
            >
              <MenuItem value={"D"}>Deny Authorization</MenuItem>
              <MenuItem value={"R"}>Repeat Transaction</MenuItem>
              <MenuItem value={"S"}>Mark System Down</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="row">
          <label className="required">ECHO TEST</label>
          <FormControl sx={{ minWidth: 220 }} size="small">
            <InputLabel id="select-echo-test">
              <FormattedMessage
                id="echo-test-option"
                defaultMessage="Choose Echo Test"
              />
            </InputLabel>

            <Select
              labelId="select-echo-test"
              value={echoTest}
              label="Echo Test"
              onChange={(e) => {
                setEchoTest(e.target.value);
              }}
            >
              <MenuItem value={"N"}>No echo</MenuItem>
              <MenuItem value={"D"}>When BIN is down</MenuItem>
              <MenuItem value={"A"}>Always</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="right-container">
        <div className="row">
          <label className="required">AUTHORIZATION FLAG</label>
          <FormControl sx={{ minWidth: 220 }} size="small">
            <InputLabel id="select-auth-flag">
              <FormattedMessage
                id="auth-flah-option"
                defaultMessage="Choose Authorization Flag"
              />
            </InputLabel>

            <Select
              labelId="select-auth-flg"
              value={authorizationFlag}
              label="Authorizaion Flag"
              onChange={(e) => {
                setAuthorizationFlag(e.target.value);
              }}
            >
              <MenuItem value={"PREA"}>PREA</MenuItem>
              <MenuItem value={"FULL"}>FULL</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="row">
          <label className="required">AUTHORIZATION SERVER</label>
          <TextField
            variant="outlined"
            label="Enter Authorization Server"
            type="text"
            sx={{ width: 220 }}
            size="small"
            className="MuiTextField-root"
            value={authorizationServer}
              error={authServerValidationError}
              helperText={authServerValidationMessage}
            onChange={handleChangeAuthServer}
          />
        </div>
        <div className="row">
          <label className="required">DEBIT_CREDIT</label>
          <FormControl sx={{ minWidth: 220 }} size="small">
            <InputLabel id="select-debit-credit">
              <FormattedMessage
                id="debit-credit-option"
                defaultMessage="Choose Type"
              />
            </InputLabel>

            <Select
              labelId="select-inst-name"
              value={creditDebit}
              label="Institution Name"
              onChange={(e) => {
                setCreditDebit(e.target.value);
              }}
            >
              <MenuItem value={"D"}>Debit</MenuItem>
              <MenuItem value={"C"}>Credit</MenuItem>
              <MenuItem value={"B"}>Both</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="row">
          <label className="required">SEND REVERSALS</label>
          <FormControlLabel
            onChange={(e) => setSendReversals(e.target.checked)}
            control={<Switch />}
            checked={sendReversals}
          />
        </div>
        <div className="row">
          <label className="required">REVERSAL TO ISSUER</label>
          <FormControlLabel
            onChange={(e) => setReversalToIssuer(e.target.checked)}
            control={<Switch />}
            checked={reversalToIssuer}
          />
        </div>
        <div className="row">
          <label className="required">DUPLICATE TRAN CHECK AS ISSUER</label>
          <FormControlLabel
            onChange={(e) => setDuplicateTranCheckAsIssuer(e.target.checked)}
            control={<Switch />}
            checked={duplicateTranCheckAsIssuer}
          />
        </div>
      </div>
    </div>
  );
};

export default PageTwo;
