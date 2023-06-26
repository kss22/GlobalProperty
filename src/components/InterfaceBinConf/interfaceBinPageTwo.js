import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FormattedMessage } from "react-intl";

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
  setDuplicateTranCheckAsIssuer
}) => {
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
            //   error={codeValidationError}
            //   helperText={codeValidationMessage}
            onChange={(e) => {
              setMailbox(e.target.value);
            }}
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
            //   error={codeValidationError}
            //   helperText={codeValidationMessage}
            onChange={(e) => {
              setPort(e.target.value);
            }}
          />
        </div>
        <div className="row">
          <label className="required">BIN TYPE</label>
          <FormControl sx={{ minWidth: 220 }} size="small">
            <InputLabel id="select-inst-name">
              <FormattedMessage
                id="initial-status-option"
                defaultMessage="Choose Initial Status"
              />
            </InputLabel>

            <Select
              labelId="select-inst-name"
              value={binType}
              label="Bin Type"
              onChange={(e) => {
                setBinType(e.target.value);
              }}
            >
              <MenuItem value={0}>Default</MenuItem>
              <MenuItem value={1}>Points to ONUS BIN</MenuItem>
              <MenuItem value={2}>Points to ONUS BIN for COPAC transactions</MenuItem>
              <MenuItem value={3}>Points to OFFUS BIN for COPAC transactions</MenuItem>
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
            //   error={codeValidationError}
            //   helperText={codeValidationMessage}
            onChange={(e) => {
              setTimeoutValue(e.target.value);
            }}
          />
        </div>
        <div className="row">
          <label className="required">Action on Timeout</label>
          <FormControl sx={{ minWidth: 220 }} size="small">
            <InputLabel id="select-inst-name">
              <FormattedMessage
                id="initial-status-option"
                defaultMessage="Choose Initial Status"
              />
            </InputLabel>

            <Select
              labelId="select-inst-name"
              value={actionOnTimeout}
              label="Institution Name"
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
            <InputLabel id="select-inst-name">
              <FormattedMessage
                id="initial-status-option"
                defaultMessage="Choose Initial Status"
              />
            </InputLabel>

            <Select
              labelId="select-inst-name"
              value={echoTest}
              label="Institution Name"
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
            <InputLabel id="select-inst-name">
              <FormattedMessage
                id="initial-status-option"
                defaultMessage="Choose Initial Status"
              />
            </InputLabel>

            <Select
              labelId="select-inst-name"
              value={authorizationFlag}
              label="Institution Name"
              onChange={(e) => {
                setAuthorizationFlag(e.target.value);
              }}
            >
              <MenuItem value={"PREA"}>PREA</MenuItem>
              {/* <MenuItem value={"D"}>D</MenuItem> */}
            </Select>
          </FormControl>
        </div>
        <div className="row">
          <label className="required">AUTHORIZATION SERVER</label>
          <TextField
            variant="outlined"
            label="Enter Interface Code"
            type="text"
            sx={{ width: 220 }}
            size="small"
            className="MuiTextField-root"
              value={authorizationServer}
            //   error={codeValidationError}
            //   helperText={codeValidationMessage}
              onChange={(e) => {
                setAuthorizationServer(e.target.value);
              }}
          />
        </div>
        <div className="row">
          <label className="required">DEBIT_CREDIT</label>
          <FormControl sx={{ minWidth: 220 }} size="small">
            <InputLabel id="select-inst-name">
              <FormattedMessage
                id="initial-status-option"
                defaultMessage="Choose Initial Status"
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
            onChange={(e)=>setSendReversals(e.target.checked)}
            control={<Checkbox />}
            checked={sendReversals}
            label="YES"
            labelPlacement="start"
          />
        </div>
        <div className="row">
          <label className="required">REVERSAL TO ISSUER</label>
          <FormControlLabel
            onChange={(e)=>setReversalToIssuer(e.target.checked)}
            control={<Checkbox />}
            checked={reversalToIssuer}
            label="YES"
            labelPlacement="start"
          />
        </div>
        <div className="row">
          <label className="required">DUPLICATE TRAN CHECK AS ISSUER</label>
          <FormControlLabel
            onChange={(e)=>setDuplicateTranCheckAsIssuer(e.target.checked)}
            control={<Checkbox />}
            checked={duplicateTranCheckAsIssuer}
            label="YES"
            labelPlacement="start"
          />
        </div>
      </div>
    </div>
  );
};

export default PageTwo;
