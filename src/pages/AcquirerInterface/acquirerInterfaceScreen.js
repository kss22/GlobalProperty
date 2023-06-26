import React, { useState } from "react";
import "../../App.css";
import { saveLanguage } from "../../localStorage";
import { Button, Tooltip } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { FaPlus } from "react-icons/fa";
import AcquirerInterfaceTable from "../../components/AcquirerInterfaceScreen/acquirerInterfaceDataTable";
import { States } from "../../utils/constants";
import AcquirerInterfaceDialog from "../../components/AcquirerInterfaceScreen/acquirerInterfaceForm";

const AcquirerInterfaceScreen = () => {
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
            window.location.href = "/listAcquirers";
          }}
          variant="text"
        >
          Acquirers
        </Button>
      </Tooltip>
      <Tooltip title="Go to interface bin">
        <Button
          onClick={() => {
            window.location.href = "/interfaceBin";
          }}
          variant="text"
        >
          Interface Bin
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
      <AcquirerInterfaceDialog
      open={authState === States.ACQUIRER_INTERFACE_CREATION}
      id={id}
      title="Acquirer Interface"
      handleCancel={() => {
        setAuthState(States.PENDING);
        setId(null);
      }}
      onClose={() => {
        setAuthState(States.PENDING);
        setId(null);
      }}
      setAuth={setAuthState}
    />
        <div className="Header">
          <h2>Acquirer Interface</h2>
        </div>
        <div className="link-wrapper">
          <Tooltip title="Add new acquirer Interface" placement="top">
            <Button
              className="link"
              onClick={() => setAuthState(States.ACQUIRER_INTERFACE_CREATION)}
              variant="text"
              startIcon={<FaPlus />}
            >
              <FormattedMessage
                id="add-acquirer-interface-button"
                defaultMessage="Add Acquirer Interface"
              />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="Table">
        <AcquirerInterfaceTable setAuthState={setAuthState} setIdProvided={setId}/>
      </div>
    </div>
  );
};

export default AcquirerInterfaceScreen;
