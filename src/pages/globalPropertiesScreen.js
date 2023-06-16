import React from "react";
import { FaPlus } from "react-icons/fa";
import "../App.css";
import GlobalPropertiesTable from "../components/globalPropertiesDataTable";
import { saveLanguage } from "../localStorage";
import { FormattedMessage } from "react-intl";
import { Button, Tooltip } from "@mui/material";

const GlobalPropertiesScreen = () => {
  return (
    <div className="MainContainer">
      <div>
        <div className="Header">
          <h2>Global Properties</h2>
          <Tooltip title="French">
          <Button
            onClick={() => {
              saveLanguage("fr");
              window.location.reload();
            }}
            variant="text"
          >
            Fr
          </Button>
          </Tooltip>
          <Tooltip title="English">
          <Button
            onClick={() => {
              saveLanguage("en");
              window.location.reload();
            }}
            variant="text"
          >
            En
          </Button>
          </Tooltip>
          
        </div>
        <div className="link-wrapper">
          <Tooltip title="Add new global property" placement="top">
          <Button
            className="link"
            onClick={() => (window.location.href = "/addGlobalProperty")}
            variant="text"
            startIcon={<FaPlus />}
          >
            <FormattedMessage
              id="add-global-property-button"
              defaultMessage="Add Global Property"
            />
          </Button>
          </Tooltip>
          
        </div>
      </div>
      <div className="Table">
        <GlobalPropertiesTable />
      </div>
    </div>
  );
};

export default GlobalPropertiesScreen;
