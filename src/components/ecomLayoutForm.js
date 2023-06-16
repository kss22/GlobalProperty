import {
  Button,
  Divider,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import * as authentication from "../utils/authentication";
import { useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { FaSave } from "react-icons/fa";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import Loading from "./loading";
import Failed from "./failedComponent";


const EcomLayoutForm = () => {
  const { ecomLayoutId } = useParams();
  const [layoutName, setLayoutName] = useState("");
  const [layoutType, setLayoutType] = useState("");
  const [ecomElementsByUser, setEcomElementsByUser] = useState([]);
  const [ecomElements, setEcomElements] = useState([]);
  const [checked, setChecked] = useState([0]);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

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

    if (ecomLayoutId ? true : false) {
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
  return (
    <>
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
                    type="text"
                    value={ecomLayoutId ? layoutName : null}
                  />
                </div>
                <div className="right-ecom-header-container">
                  <label className="required">
                    <FormattedMessage
                      id="ecom-layout-type-label"
                      defaultMessage="Layout Type"
                    />
                  </label>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Enter Layout Type"
                    type="text"
                    value={ecomLayoutId ? layoutType : null}
                  />
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
                  <Paper
                    sx={{
                      minHeight: 600,
                      maxHeight: 600,
                      overflow: "auto",
                      maxWidth: 400,
                    }}
                  >
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 400,
                        bgcolor: "background.paper",
                      }}
                    >
                      {ecomElements.map((value) => {
                        return (
                          <ListItem
                            key={value.ecomElementId}
                            disablePadding
                            sx={{
                              border: "1px solid gray",
                              borderRadius: "4px",
                            }}
                          >
                            <ListItemButton
                              role={undefined}
                              onClick={handleToggle(value.ecomElementId)}
                              dense
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={
                                    checked.indexOf(value.ecomElementId) !== -1
                                  }
                                  tabIndex={-1}
                                  disableRipple
                                />
                              </ListItemIcon>
                              <ListItemText primary={value.elementName} />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Paper>
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
                      minWidth: 930,
                      display: "flex",
                      alignItems: "top",
                      justifyContent: "center",
                      height: 200,
                    }}
                  >
                    {ecomElementsByUser.length !== 0 ? (
                      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                        {ecomElementsByUser.map((value) => {
                          return (
                            <ListItem
                              key={value.ecomDetailId}
                              disablePadding
                              sx={{
                                border: "1px solid gray",
                                borderRadius: "4px",
                                width: "100%",
                              }}
                            >
                              <ListItemButton
                                role={undefined}
                                onClick={handleToggle(value.ecomDetailId)}
                                dense
                              >
                                <ListItemIcon>
                                  <DragHandleIcon edge="start"></DragHandleIcon>
                                </ListItemIcon>

                                <ListItemText
                                  primary={value.ecomElement.elementName}
                                />

                                <TextField
                                  variant="outlined"
                                  size="small"
                                  label="Length"
                                  type="text"
                                  value={
                                    ecomLayoutId ? value.elementLength : null
                                  }
                                />
                                <ListItemText
                                  primary={value.elementPaddingType}
                                />
                                <TextField
                                  variant="outlined"
                                  size="small"
                                  label="Padding Character"
                                  type="text"
                                  value={
                                    ecomLayoutId
                                      ? value.elementPaddingValue
                                      : null
                                  }
                                />
                              </ListItemButton>
                            </ListItem>
                          );
                        })}
                      </List>
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
                <Tooltip title="Create property">
                  <Button
                    variant="contained"
                    endIcon={<FaSave className="save" />}
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
