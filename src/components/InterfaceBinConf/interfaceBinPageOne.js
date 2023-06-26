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

const PageOne = ({
  cardName,
  setCardName,
  currencyCode,
  setCurrencyCode,
  countryCode,
  setCountryCode,
  bankName,
  setBankName,
  network,
  setNetwork,
  chipOptionType,
  setChipOptionType,
  cardAuthenticationMailbox,
  setCardAuthenticationMailbox,
  pinVerificationParameterId,
  setPinVerificationParameterId,
  useKeys,
  setUseKeys,
}) => {
  return (
    <div className="Entries">
      <div className="left-container">
        <div className="row">
          <label className="required"><FormattedMessage id="card-name" defaultMessage="Card Name"/></label>
          <TextField
            variant="outlined"
            label="Enter Card Name"
            type="text"
            sx={{ width: 220 }}
            size="small"
            
            className="MuiTextField-root"
              value={cardName}
              // error={codeValidationError}
              // helperText={codeValidationMessage}
              onChange={(e) => {
                setCardName(e.target.value);
              }}
          />
        </div>
        <div className="row">
          <label className="required"><FormattedMessage id="currency-code" defaultMessage="Currency Code"/></label>
          <FormControl sx={{ minWidth: 220 }} size="small">
            <InputLabel id="curreny-code">
              <FormattedMessage
                id="currency-code-choose"
                defaultMessage="Choose Currency Code"
              />
            </InputLabel>

            <Select
              labelId="select-currenct-code"
              value={currencyCode}
              label="Currency Code"
              onChange={(e) => {
                setCurrencyCode(e.target.value);
              }}
            >
              <MenuItem value={818}>818</MenuItem>
              {/* <MenuItem value={"D"}>D</MenuItem> */}
            </Select>
          </FormControl>
        </div>
        <div className="row">
          <label className="required"><FormattedMessage id="country-code" defaultMessage="Country Code"/></label>
          <FormControl sx={{ minWidth: 220 }} size="small">
            <InputLabel id="select-country-code">
              <FormattedMessage
                id="country-code-choose"
                defaultMessage="Choose Country Code"
              />
            </InputLabel>

            <Select
              labelId="select-country-code"
              value={countryCode}
              label="Country Code"
              onChange={(e) => {
                setCountryCode(e.target.value);
              }}
            >
              <MenuItem value={818}>818</MenuItem>
              {/* <MenuItem value={"D"}>D</MenuItem> */}
            </Select>
          </FormControl>
        </div>
        <div className="row">
          <label className="required"><FormattedMessage id="bank-name" defaultMessage="Bank Name"/></label>
          <TextField
            variant="outlined"
            label="Enter Bank Name"
            type="text"
            sx={{ width: 220 }}
            size="small"
            
            className="MuiTextField-root"
              value={bankName}
            //   error={codeValidationError}
            //   helperText={codeValidationMessage}
              onChange={(e) => {
                setBankName(e.target.value);
              }}
          />
        </div>
      </div>
      <div className="right-container">
        <div className="row">
          <label className="required"><FormattedMessage id="network" defaultMessage="Network"/></label>
          <FormControl sx={{ minWidth: 220 }} size="small">
            <InputLabel id="select-network">
              <FormattedMessage
                id="network-choose"
                defaultMessage="Choose Network"
              />
            </InputLabel>

            <Select
              labelId="select-network"
              value={network}
              label="Network"
              onChange={(e) => {
              setNetwork(e.target.value);
              }}
            >
              <MenuItem value={426868}>426868</MenuItem>
              {/* <MenuItem value={"D"}>D</MenuItem> */}
            </Select>
          </FormControl>
        </div>
        <div className="row">
          <label className="required"><FormattedMessage id="chip-option-type" defaultMessage="Chip Option Type"/></label>
          <FormControl sx={{ minWidth: 220 }} size="small">
            <InputLabel id="select-chip-option-type">
              <FormattedMessage
                id="chip-option-type-choose"
                defaultMessage="Choose Chip Option Type"
              />
            </InputLabel>

            <Select
              labelId="select-chip-option-type"
              value={chipOptionType}
              label="Chip Option Type"
              onChange={(e) => {
                setChipOptionType(e.target.value);
              }}
            >
              <MenuItem value={"1   EYYYYY Y"}>Early</MenuItem>
              <MenuItem value={"1   FYYYYY Y"}>Full</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="row">
          <label className="required"><FormattedMessage id="card-authentication-mailbox" defaultMessage="Card Authentication Mailbox"/></label>
          <FormControl sx={{ minWidth: 220 }} size="small">
            <InputLabel id="select-card-authentication-mailbox">
              <FormattedMessage
                id="card-authentication-mailbox-option"
                defaultMessage="Choose Card Athentication Mailbox"
              />
            </InputLabel>

            <Select
              labelId="select-card-auth-mailbox"
              value={cardAuthenticationMailbox}
              label="Card Authentication Mailbox"
              onChange={(e) => {
                setCardAuthenticationMailbox(e.target.value);
              }}
            >
              <MenuItem value={"CAMSRVVSDC"}>CAMSRVVSDC</MenuItem>
              <MenuItem value={"CAMSRVMCHIP"}>CAMSRVMCHIP</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="row">
          <label className="required"><FormattedMessage id="pin-verification-parameter-id" defaultMessage="PIN Verification Parameter ID"/></label>
          <FormControl sx={{ minWidth: 220 }} size="small">
            <InputLabel id="select-pin-ver-param-id">
              <FormattedMessage
                id="pin-verification-parameter-id-option"
                defaultMessage="Choose PIN Verification Parameter ID"
              />
            </InputLabel>

            <Select
              labelId="select-pin-ver-param-id"
              value={pinVerificationParameterId}
              label="PIN Verification Parameter ID"
              onChange={(e) => {
                setPinVerificationParameterId(e.target.value);
              }}
            >
              <MenuItem value={426868}>426868</MenuItem>
              {/* <MenuItem value={"D"}>D</MenuItem> */}
            </Select>
          </FormControl>
        </div>
        <div className="row">
          <label className="required">USEKEYS</label>
          <FormControlLabel
            onChange={(e)=>setUseKeys(e.target.checked)}
            control={<Checkbox />}
            checked={useKeys}
            label="YES"
            labelPlacement="start"
          />
        </div>
      </div>
    </div>
  );
};

export default PageOne;
