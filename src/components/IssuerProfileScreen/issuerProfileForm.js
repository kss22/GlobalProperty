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

const IssuerProfileForm = () => {
  return (
    <>
      <div className="page-container">
        <div className="Entries">
          <div className="left-container">
            <div className="row">
              <label className="required">Card Type</label>
              <FormControl sx={{ minWidth: 220 }} size="small">
                <InputLabel id="curreny-code">Choose Card Type</InputLabel>

                <Select
                  labelId="select-currenct-code"
                  //   value={currencyCode}
                  label="Currency Code"
                  //   onChange={(e) => {
                  //     setCurrencyCode(e.target.value);
                  //   }}
                >
                  {/* {currencyCodeController.map((item) => ( */}
                  <MenuItem value={1}>1</MenuItem>
                  {/* ))} */}
                </Select>
              </FormControl>
            </div>
            <div className="row">
              <label className="required">Card Type</label>
              <FormControl sx={{ minWidth: 220 }} size="small">
                <InputLabel id="curreny-code">Choose Card Type</InputLabel>

                <Select
                  labelId="select-currenct-code"
                  //   value={currencyCode}
                  label="Currency Code"
                  //   onChange={(e) => {
                  //     setCurrencyCode(e.target.value);
                  //   }}
                >
                  {/* {currencyCodeController.map((item) => ( */}
                  <MenuItem value={1}>1</MenuItem>
                  {/* ))} */}
                </Select>
              </FormControl>
            </div>
            <div className="row">
              <label className="required">Transaction Source</label>
              <TextField
                variant="outlined"
                label="Enter Card Name"
                type="text"
                sx={{ width: 220 }}
                size="small"
                className="MuiTextField-root"
                // value={cardName}
                // error={cardNameValidationError}
                // helperText={cardNameValidationMessage}
                // onChange={handleChangeCardName}
              />
            </div>
            <div className="row">
              <label className="required">Transaction Source</label>
              <TextField
                variant="outlined"
                label="Enter Card Name"
                type="text"
                sx={{ width: 220 }}
                size="small"
                className="MuiTextField-root"
                // value={cardName}
                // error={cardNameValidationError}
                // helperText={cardNameValidationMessage}
                // onChange={handleChangeCardName}
              />
            </div>
            <div className="row">
              <label className="required">Transaction Source</label>
              <TextField
                variant="outlined"
                label="Enter Card Name"
                type="text"
                sx={{ width: 220 }}
                size="small"
                className="MuiTextField-root"
                // value={cardName}
                // error={cardNameValidationError}
                // helperText={cardNameValidationMessage}
                // onChange={handleChangeCardName}
              />
            </div>
          </div>
          <div className="right-container">
            <div className="row">
              <label className="required">Transaction Source</label>
              <TextField
                variant="outlined"
                label="Enter Card Name"
                type="text"
                sx={{ width: 220 }}
                size="small"
                className="MuiTextField-root"
                // value={cardName}
                // error={cardNameValidationError}
                // helperText={cardNameValidationMessage}
                // onChange={handleChangeCardName}
              />
            </div>
            <div className="row">
              <label className="required">Transaction Source</label>
              <TextField
                variant="outlined"
                label="Enter Card Name"
                type="text"
                sx={{ width: 220 }}
                size="small"
                className="MuiTextField-root"
                // value={cardName}
                // error={cardNameValidationError}
                // helperText={cardNameValidationMessage}
                // onChange={handleChangeCardName}
              />
            </div>
            <div className="row">
              <label className="required">Transaction Source</label>
              <TextField
                variant="outlined"
                label="Enter Card Name"
                type="text"
                sx={{ width: 220 }}
                size="small"
                className="MuiTextField-root"
                // value={cardName}
                // error={cardNameValidationError}
                // helperText={cardNameValidationMessage}
                // onChange={handleChangeCardName}
              />
            </div>
            <div className="row">
              <label className="required">Card Type</label>
              <FormControl sx={{ minWidth: 220 }} size="small">
                <InputLabel id="curreny-code">Choose Card Type</InputLabel>

                <Select
                  labelId="select-currenct-code"
                  //   value={currencyCode}
                  label="Currency Code"
                  //   onChange={(e) => {
                  //     setCurrencyCode(e.target.value);
                  //   }}
                >
                  {/* {currencyCodeController.map((item) => ( */}
                  <MenuItem value={1}>1</MenuItem>
                  {/* ))} */}
                </Select>
              </FormControl>
            </div>
            <div className="row">
              <label className="required">Transaction Source</label>
              <TextField
                variant="outlined"
                label="Enter Card Name"
                type="text"
                sx={{ width: 220 }}
                size="small"
                className="MuiTextField-root"
                // value={cardName}
                // error={cardNameValidationError}
                // helperText={cardNameValidationMessage}
                // onChange={handleChangeCardName}
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
            <FormattedMessage id="cancel-button" defaultMessage="cancel" />
          </Button>
        </Tooltip>
        <Tooltip title="Create Interface Bin Configuration">
          <Button
            variant="contained"
            endIcon={<FaSave className="save" />}
            // onClick={() => handleSubmit()}
          >
            {" "}
            <FormattedMessage id="submit-button" defaultMessage="Submit" />{" "}
          </Button>
        </Tooltip>
      </div>
    </>
  );
};

export default IssuerProfileForm;
