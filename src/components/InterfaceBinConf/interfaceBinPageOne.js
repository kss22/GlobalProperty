import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import * as authentication from "../../utils/authentication";
import validations from "../../utils/validations";


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
  const [countryCodeController, setCountryCodeController] = useState([]);
  const [currencyCodeController, setCurrencyCodeController] = useState([]);
  const [data, setData] = useState([]);

  const [cardNameValidationError, setCardNameValidationError] = useState("");
  const [cardNameValidationMessage, setCardNameValidationMessage] = useState("");
  const [bankNameValidationError, setBankNameValidationError] = useState("");
  const [bankNameValidationMessage, setBankNameValidationMessage] = useState("");


  const handleChangeCardName = (e) => {
    setCardNameValidationError(false);

    const value = e.target.value;

    validations.interfaceBinCardName
      .validate(value)
      .then(() => {
        setCardName(value);
        setCardNameValidationError(false);
        setCardNameValidationMessage(null);
      })
      .catch((error) => {
        setCardNameValidationError(true);
        setCardNameValidationMessage(error.message);

        if (error.message === "Card Name is required") {
          setCardName(value);
        }
      });
  };

  const handleChangeBankName = (e) => {
    setBankNameValidationError(false);

    const value = e.target.value;

    validations.interfaceBinBankName
      .validate(value)
      .then(() => {
        setBankName(value);
        setBankNameValidationError(false);
        setBankNameValidationMessage(null);
      })
      .catch((error) => {
        setBankNameValidationError(true);
        setBankNameValidationMessage(error.message);

        if (error.message === "Bank Name is required") {
          setBankName(value);
        }
      });
  };

  useEffect(() => {
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
      .catch((error) => console.log(error));

    fetch(`${authentication.SERVER_URL}/v1/lookup/currencies`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authentication.token}`,
        branchId: "1",
        instId: "1",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrencyCodeController(data);
      })
      .catch((error) => console.log(error));
    fetch(`${authentication.SERVER_URL}/v1/lookup/networktypes/active`, {
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
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="Entries">
      <div className="left-container">
        <div className="row">
          <label className="required">
            <FormattedMessage id="card-name" defaultMessage="Card Name" />
          </label>
          <TextField
            variant="outlined"
            label="Enter Card Name"
            type="text"
            sx={{ width: 220 }}
            size="small"
            className="MuiTextField-root"
            value={cardName}
            error={cardNameValidationError}
            helperText={cardNameValidationMessage}
            onChange={handleChangeCardName}
          />
        </div>
        <div className="row">
          <label className="required">
            <FormattedMessage
              id="currency-code"
              defaultMessage="Currency Code"
            />
          </label>
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
              {currencyCodeController.map((item) => (
                <MenuItem value={item.currencyCode}>
                  {item.currencyName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="row">
          <label className="required">
            <FormattedMessage id="country-code" defaultMessage="Country Code" />
          </label>
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
              {countryCodeController.map((item) => (
                <MenuItem value={item.countryId}>{item.countryCode}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="row">
          <label className="required">
            <FormattedMessage id="bank-name" defaultMessage="Bank Name" />
          </label>
          <TextField
            variant="outlined"
            label="Enter Bank Name"
            type="text"
            sx={{ width: 220 }}
            size="small"
            className="MuiTextField-root"
            value={bankName}
              error={bankNameValidationError}
              helperText={bankNameValidationMessage}
            onChange={handleChangeBankName}
          />
        </div>
      </div>
      <div className="right-container">
        <div className="row">
          <label className="required">
            <FormattedMessage id="network" defaultMessage="Network" />
          </label>
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
              {data.map((item)=>(
                <MenuItem value={item.netTypeId}>{item.netTypeDesc}</MenuItem>
              ))}
              
            </Select>
          </FormControl>
        </div>
        <div className="row">
          <label className="required">
            <FormattedMessage
              id="chip-option-type"
              defaultMessage="Chip Option Type"
            />
          </label>
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
              <MenuItem value={"E"}>Early</MenuItem>
              <MenuItem value={"F"}>Full</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="row">
          <label className="required">
            <FormattedMessage
              id="card-authentication-mailbox"
              defaultMessage="Card Authentication Mailbox"
            />
          </label>
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
          <label className="required">
            <FormattedMessage
              id="pin-verification-parameter-id"
              defaultMessage="PIN Verification Parameter ID"
            />
          </label>
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
            onChange={(e) => setUseKeys(e.target.checked)}
            control={<Switch />}
            checked={useKeys}
          />
        </div>
      </div>
    </div>
  );
};

export default PageOne;
