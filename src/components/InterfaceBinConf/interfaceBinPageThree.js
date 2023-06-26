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
  setForwardModePercentage

}) => {
  return (
    <div className="Entries">
      <div className="left-container">
        <div className="row">
          <label className="required">RESEND INTERVAL</label>
          <TextField
            variant="outlined"
            label="Enter Interface Code"
            type="text"
            sx={{ width: 220 }}
            size="small"
            className="MuiTextField-root"
            value={resendInterval}
            //   error={codeValidationError}
            //   helperText={codeValidationMessage}
            onChange={(e) => {
              setResendInterval(e.target.value);
            }}
          />
        </div>
        <div className="row">
          <label className="required">FAST INTERVAL</label>
          <TextField
            variant="outlined"
            label="Enter Interface Code"
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
            label="Enter Interface Code"
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
            label="Enter Interface Code"
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
            label="Enter Interface Code"
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
            label="Enter Interface Code"
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
      <div className="right-container">
        <div className="row">
          <label className="required">FULL FILE SIZE</label>
          <TextField
            variant="outlined"
            label="Enter Interface Code"
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
          <label className="required">REPLACE RESPONSES</label>
          <FormControlLabel
            onChange={(e)=>setReplaceRespones(e.target.checked)}
            control={<Checkbox />}
            checked={replaceResponses}
            label="YES"
            labelPlacement="start"
          />
        </div>
        <div className="row">
          <label className="required">ENABLE SYSTEM MESSAGES</label>
          <FormControlLabel
            onChange={(e)=>setEnableSystemMessages(e.target.checked)}
            control={<Checkbox />}
            checked={enableSystemMessages}
            label="YES"
            labelPlacement="start"
          />
        </div>
        <div className="row">
          <label className="required">VERIFY RESPONSE</label>
          <FormControlLabel
            onChange={(e)=>setVerifyResponse(e.target.checked)}
            control={<Checkbox />}
            checked={verifyResponse}
            label="YES"
            labelPlacement="start"
          />
        </div>
        <div className="row">
          <label className="required">MAX RETRY</label>
          <TextField
            variant="outlined"
            label="Enter Interface Code"
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
            <InputLabel id="select-inst-name">
              <FormattedMessage
                id="initial-status-option"
                defaultMessage="Choose Initial Status"
              />
            </InputLabel>

            <Select
              labelId="select-inst-name"
              value={typeOfStoreAndForward}
              label="Institution Name"
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
        <div className="row">
          <label className="required">Use SAF File</label>
          <FormControlLabel
            onChange={(e)=>setUseSafFile(e.target.checked)}
            control={<Checkbox />}
            checked={useSafFile}
            label="YES"
            labelPlacement="start"
          />
        </div>
        <div className="row">
          <label className="required">SAF AMOUNT</label>
          <TextField
            variant="outlined"
            label="Enter Interface Code"
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
            label="Enter Interface Code"
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
      </div>
    </div>
  );
};

export default PageThree;
