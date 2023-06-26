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

const InterfaceBinHeader = ({ bin, setBin, desc, setDesc, setInstIdParent }) => {
  const [inst, setInst] = useState([]);
  const [instId, setInstId] = useState("");
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

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
                type="text"
                size="small"
                //   error={validationError}
                //   helperText={validationMessage}
                value={bin}
                onChange={(e) => setBin(e.target.value)}
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
                size="small"
                //   error={validationError}
                //   helperText={validationMessage}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default InterfaceBinHeader;
