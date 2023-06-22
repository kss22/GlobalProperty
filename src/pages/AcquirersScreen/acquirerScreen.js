import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import "../../App.css";
import { saveLanguage } from "../../localStorage";
import { FormattedMessage } from "react-intl";
import { Button, Tooltip } from "@mui/material";
import AcquirerTable from "../../components/acquirerDataTable";
import AcquirerDialog from "../../components/acquirerFormDialog";
import { States } from "../../utils/constants";

const AcquirerScreen = () => {
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
      <Tooltip title="Go to global properties">
        <Button
          onClick={() => {
            window.location.href = "/listGlobalProperties";
          }}
          variant="text"
        >
          Global Properties
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
        <AcquirerDialog
          open={authState === States.ACQUIRER_CREATION}
          id={id}
          title="Acquirer"
          handleCancel={() => {setAuthState(States.PENDING); setId(null);}}
          onClose={() => {setAuthState(States.PENDING); setId(null);}}
          setAuth={setAuthState}
        />
        <div className="Header">
          <h2>Acquirers</h2>
        </div>
        <div className="link-wrapper">
          <Tooltip title="Add new acquirer" placement="top">
            <Button
              className="link"
              onClick={() => setAuthState(States.ACQUIRER_CREATION)}
              variant="text"
              startIcon={<FaPlus />}
            >
              <FormattedMessage
                id="add-acquirer-button"
                defaultMessage="Add Acquirer"
              />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="Table">
        <AcquirerTable setAuthState={setAuthState} setIdProvided={setId}/>
      </div>
    </div>
  );
};

export default AcquirerScreen;
