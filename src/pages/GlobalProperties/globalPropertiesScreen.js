import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import "../../App.css";
import GlobalPropertiesTable from "../../components/globalPropertiesDataTable";
import { saveLanguage } from "../../localStorage";
import { FormattedMessage } from "react-intl";
import { Button, Tooltip } from "@mui/material";
import { States } from "../../utils/constants";
import GlobalPropertiesDialog from "../../components/globalPropertiesForm";
import 'react-toastify/dist/ReactToastify.css';

const GlobalPropertiesScreen = () => {
  let [authState, setAuthState] = useState(States.PENDING);
  let [id, setId] = useState(null);
  return (
    <div className="MainContainer">
      <Tooltip title="Go to ecom">
        <Button
          onClick={() => {
            window.location.href = "/listEcomLayout";
          }}
          variant="text"
        >
          Ecom
        </Button>
      </Tooltip>
      <Tooltip title="Go to Acquirers">
        <Button
          onClick={() => {
            window.location.href = "/listAcquirers";
          }}
          variant="text"
        >
          Acquirer
        </Button>
      </Tooltip>
      <Tooltip title="Go to acquirer interfaces">
        <Button
          onClick={() => {
            window.location.href = "/listAcquirerInterface";
          }}
          variant="text"
        >
          Acquirer Interfaces
        </Button>
      </Tooltip>
      <Tooltip title="Go to reports">
        <Button
          onClick={() => {
            window.location.href = "/reports";
          }}
          variant="text"
        >
          Reports
        </Button>
      </Tooltip>
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
      <div>

      <GlobalPropertiesDialog
          open={authState === States.ACQUIRER_INTERFACE_CREATION}
          id={id}
          title="Global Property"
          handleCancel={() => {setAuthState(States.PENDING); setId(null);}}
          onClose={() => {setAuthState(States.PENDING); setId(null);}}
          setAuth={setAuthState}
        />
        <div className="Header">
          <h2>Global Properties</h2>
        </div>
        <div className="link-wrapper">
          <Tooltip title="Add new global property" placement="top">
            <Button
              className="link"
              onClick={() => setAuthState(States.ACQUIRER_INTERFACE_CREATION)}
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
        <GlobalPropertiesTable setAuthState={setAuthState} setId={setId}/>
      </div>
    </div>
  );
};

export default GlobalPropertiesScreen;
