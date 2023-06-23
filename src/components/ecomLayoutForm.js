import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import * as authentication from "../utils/authentication";
import { useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { FaSave } from "react-icons/fa";
import Loading from "./loading";
import Failed from "./failedComponent";
import { ToastContainer, toast } from "react-toastify";
import ElementList from "./ecomElementsList";
import EcomDisplayElementList from "./ecomDisplayElementList";
import validations from "../utils/validations";

const EcomLayoutForm = () => {
  const { ecomLayoutId } = useParams();
  const [layoutName, setLayoutName] = useState("");
  const [layoutType, setLayoutType] = useState('0');
  const [ecomElementsByUser, setEcomElementsByUser] = useState([]);
  const [ecomElements, setEcomElements] = useState([]);
  const [checked, setChecked] = useState([0]);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [nameValidationError, setNameValidationError] = useState(false);
  const [nameValidationMessage, setNameValidationMessage] = useState("");

  var numberOfObjectsNeeded = ecomElementsByUser.length;

  const handleChangeLayoutName = (e) => {
    setNameValidationError(false);

    const value = e.target.value;

    validations.ecomLayoutName
      .validate(value)
      .then(() => {
        setLayoutName(value);
        setNameValidationError(false);
        setNameValidationMessage(null);
      })
      .catch((error) => {
        setNameValidationError(true);
        setNameValidationMessage(error.message);

        if (error.message === "Ecom Layout Name is required") {
          setLayoutName(value);
        }
      });
  };

  const layoutTypeMap = {
    "Choose Type": 0,
    XML: 1,
    EXCEL: 2,
    TXT: 3,
    CSV: 4,
  };

  function getKeyFromValue(value, map) {
    for (const [key, val] of Object.entries(map)) {
      if (val === value) {
        return key;
      }
    }
    return null;
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      ecomElementsByUser.push({
        ecomDetailId: 0,
        ecomElement: ecomElements.find((item) => item.ecomElementId === value),
        ecomElementOrder: 0,
        ecomLayoutId: 0,
        elementLength: "",
        elementPaddingType: "0",
        elementPaddingValue: "",
      });
    } else {
      newChecked.splice(currentIndex, 1);
      setEcomElementsByUser((prevEcomElementsByUser) =>
        prevEcomElementsByUser.filter(
          (item) => item.ecomElement.ecomElementId !== value
        )
      );
    }

    setChecked(newChecked);
  };

  function handleSubmit() {
    let post = {
      ecomDetails: [],
      ecomLayoutId: ecomLayoutId ? ecomLayoutId : 0,
      layoutName: layoutName,
      layoutType: layoutType,
    };

    for (let i = 0; i < numberOfObjectsNeeded; i++) {
      let ecomDetailsJson = {
        ecomElementId: ecomElementsByUser[i].ecomElement.ecomElementId,
        ecomElementOrder: i + 1,
        ecomElementParentId: ecomElementsByUser[i].ecomElement.ecomElementId,
        elementLength: ecomElementsByUser[i].elementLength,
        elementPaddingType: ecomElementsByUser[i].elementPaddingType,
        elementPaddingValue: ecomElementsByUser[i].elementPaddingValue,
      };

      post.ecomDetails.push(ecomDetailsJson);
    }

    fetch(`${authentication.SERVER_URL}/v1/config/ecom-layouts`, {
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
        console.log(response);
        if (response.ok) {
          toast.success("Property added successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.href = "/listEcomLayout";
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
    fetch(`${authentication.SERVER_URL}/v1/lookup/ecom-elements`, {
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
        setEcomElements(data);
        console.log(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (ecomLayoutId) {
      setLoading(true);
      fetch(
        `${authentication.SERVER_URL}/v1/config/ecom-layouts/${ecomLayoutId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authentication.token}`,
            branchId: "1",
            instId: "1",
          },
        }
      )
        .then((response) => {
          if (response.status === 401) {
            setFailed(true);
          }
          return response.json();
        })
        .then((data) => {
          setLayoutName(data.layoutName);
          setLayoutType(data.layoutType);
          setEcomElementsByUser(data.ecomDetails);
          console.log(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [ecomLayoutId]);

  useEffect(() => {
    let updatedCheck = [];

    for (let i = 0; i < ecomElementsByUser.length; i++) {
      updatedCheck.push(ecomElementsByUser[i].ecomElement.ecomElementId);
    }
    setChecked(updatedCheck);
  }, [checked, ecomElementsByUser]);

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
            <div className="EcomLayoutContainer">
              <div className="ecom-header">
                <div className="left-ecom-header-container">
                  <label className="required">
                    <FormattedMessage
                      id="ecom-layout-name-label"
                      defaultMessage="Layout Name:"
                    />
                  </label>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Enter Layout Name"
                    inputProps={{
                      maxLength: 100,
                    }}
                    type="text"
                    error={nameValidationError}
                    helperText={nameValidationMessage}
                    value={ecomLayoutId ? layoutName : null}
                    onChange={handleChangeLayoutName}
                  />
                </div>
                <div className="right-ecom-header-container">
                  <label className="required">
                    <FormattedMessage
                      id="ecom-layout-type-label"
                      defaultMessage="Layout Type"
                    />
                  </label>
                  <FormControl
                    sx={{ m: 1, width: 150, bgcolor: "#ffffff" }}
                    size="small"
                  >
                    <InputLabel id="select-layout-type">
                      {getKeyFromValue(parseInt(layoutType), layoutTypeMap)}
                    </InputLabel>
                    <Select
                      labelId="select-layout-type"
                      label="Layout Type"
                      onChange={(e) => setLayoutType(e.target.value)}
                    >
                      <MenuItem value={layoutTypeMap["XML"]}>{"XML"}</MenuItem>
                      <MenuItem value={layoutTypeMap["EXCEL"]}>
                        {"EXCEL"}
                      </MenuItem>
                      <MenuItem value={layoutTypeMap["TXT"]}>{"TXT"}</MenuItem>
                      <MenuItem value={layoutTypeMap["CSV"]}>{"CSV"}</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <Typography className="MuiTypoGraphy-root">
                <FormattedMessage
                  id="ecom-element-label"
                  defaultMessage="Ecom Element"
                />
              </Typography>
              <Divider />
              <div className="ElementDivContainer">
                <div className="left-list">
                  <Typography className="MuiTypoGraphy-root-paper">
                    <FormattedMessage
                      id="select-element-to-add-label"
                      defaultMessage="Select Element To Add"
                    />
                  </Typography>
                  <ElementList
                    ecomElements={ecomElements}
                    checked={checked}
                    handleToggle={handleToggle}
                  />
                </div>
                <div className="right-list">
                  <Typography className="MuiTypoGraphy-root-paper">
                    <FormattedMessage
                      id="edit-layout-label"
                      defaultMessage="Edit Layout"
                    />
                  </Typography>
                  <Paper
                    sx={{
                      minHeight: 600,
                      overflow: "auto",
                      width: 930,
                      display: "flex",
                      alignItems: "top",
                      justifyContent: "center",
                      height: 200,
                    }}
                  >
                    {ecomElementsByUser.length !== 0 ? (
                      <EcomDisplayElementList
                        ecomElementsByUser={ecomElementsByUser}
                        setEcomElementsByUser={setEcomElementsByUser}
                      />
                    ) : (
                      <Typography>
                        <FormattedMessage
                          id="no-rows-to-show-label"
                          defaultMessage="No Rows To Show"
                        />
                      </Typography>
                    )}
                  </Paper>
                </div>
              </div>
              <div className="Submissions">
                <Tooltip title="Cancel Creation">
                  <Button
                    variant="text"
                    onClick={() => (window.location.href = "/listEcomLayout")}
                  >
                    <FormattedMessage
                      id="cancel-button"
                      defaultMessage="cancel"
                    />
                  </Button>
                </Tooltip>
                <Tooltip title="Create Ecom Layout">
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
    </>
  );
};

export default EcomLayoutForm;
