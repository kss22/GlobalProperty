import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import "../../App.css";
import NavBar from "../../components/navBar";
import { FormattedMessage } from "react-intl";
import { Button, Tooltip } from "@mui/material";
import AcquirerTable from "../../components/AcquirerScreen/acquirerDataTable";
import AcquirerDialog from "../../components/AcquirerScreen/acquirerFormDialog";
import { States } from "../../utils/constants";

const AcquirerScreen = () => {
  let [authState, setAuthState] = useState(States.PENDING);
  let [id, setId] = useState(null);
  return (
    <div className="MainContainer">
      <NavBar/>
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
