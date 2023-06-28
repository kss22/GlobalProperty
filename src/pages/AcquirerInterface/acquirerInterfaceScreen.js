import React, { useState } from "react";
import "../../App.css";
import { Button, Tooltip } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { FaPlus } from "react-icons/fa";
import AcquirerInterfaceTable from "../../components/AcquirerInterfaceScreen/acquirerInterfaceDataTable";
import { States } from "../../utils/constants";
import AcquirerInterfaceDialog from "../../components/AcquirerInterfaceScreen/acquirerInterfaceForm";
import NavBar from "../../components/navBar";

const AcquirerInterfaceScreen = () => {
  let [authState, setAuthState] = useState(States.PENDING);
  let [id, setId] = useState(null);

  return (
    <div className="MainContainer">
      <NavBar/>
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
