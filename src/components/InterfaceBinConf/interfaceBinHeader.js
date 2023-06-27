import { useEffect, useState } from "react";
import * as authentication from "../../utils/authentication";
import Loading from "../loading";
import Failed from "../failedComponent";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import { ToastContainer } from "react-toastify";
import validations from "../../utils/validations";

const InterfaceBinHeader = ({
  bin,
  setBin,
  desc,
  setDesc,
  setInstIdParent,
}) => {
  const [inst, setInst] = useState([]);
  const [instId, setInstId] = useState("");
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [descValidationError, setDescValidationError] = useState("");
  const [descValidationMessage, setDescValidationMessage] = useState("");
  const [binValidationError, setBinValidationError] = useState("");
  const [binValidationMessage, setBinValidationMessage] = useState("");


  const handleChangeBin = (e) => {
    setDescValidationError(false);

    const value = e.target.value;

    validations.interfaceBinUser
      .validate(value)
      .then(() => {
        setBin(value);
        setBinValidationError(false);
        setBinValidationMessage(null);
      })
      .catch((error) => {
        setBinValidationError(true);
        setBinValidationMessage(error.message);

        if (error.message === "User Bin is required") {
          setBin(value);
        }
      });
  };

  const handleChangeDesc = (e) => {
    setDescValidationError(false);

    const value = e.target.value;

    validations.interfaceBinDesc
      .validate(value)
      .then(() => {
        setDesc(value);
        setDescValidationError(false);
        setDescValidationMessage(null);
      })
      .catch((error) => {
        setDescValidationError(true);
        setDescValidationMessage(error.message);

        if (error.message === "Description is required") {
          setDesc(value);
        }
      });
  };

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
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : (
        <div>
          {failed ? (
            <Failed />
          ) : (
            <div className="interface-bin-header-container">
              <label className="required">
                <FormattedMessage
                  id="institution-column"
                  defaultMessage="Institution:"
                />
              </label>
              <FormControl sx={{ minWidth: 220 }} size="small">
                <InputLabel id="select-inst">
                  <FormattedMessage
                    id="institution-name-option"
                    defaultMessage="Choose Institution"
                  />
                </InputLabel>

                <Select
                  labelId="select-inst"
                  value={instId}
                  label="Institution Name"
                  onChange={(e) => {
                    setInstId(e.target.value);
                    setInstIdParent(e.target.value);
                  }}
                >
                  {inst.map((item) => (
                    <MenuItem value={item.instId}>{item.instName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <label className="required">
                <FormattedMessage id="bin-column" defaultMessage="Bin: " />
              </label>
              <TextField
                variant="outlined"
                label="Enter Bin Value"
                className="MuiTextField-root"
                type="text"
                size="small"
                  error={binValidationError}
                  helperText={binValidationMessage}
                value={bin}
                onChange={handleChangeBin}
              />

              <label className="required">
                <FormattedMessage
                  id="description-column"
                  defaultMessage="Description: "
                />
              </label>
              <TextField
                variant="outlined"
                label="Enter Description"
                type="text"
                className="MuiTextField-root"
                size="small"
                error={descValidationError}
                helperText={descValidationMessage}
                value={desc}
                onChange={handleChangeDesc}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default InterfaceBinHeader;
