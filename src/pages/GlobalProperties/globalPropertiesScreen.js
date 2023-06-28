import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import "../../App.css";
import GlobalPropertiesTable from "../../components/GlobalPropertiesScreen/globalPropertiesDataTable";
import { FormattedMessage } from "react-intl";
import { Button, Tooltip } from "@mui/material";
import { States } from "../../utils/constants";
import GlobalPropertiesDialog from "../../components/GlobalPropertiesScreen/globalPropertiesForm";
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "../../components/navBar";

const GlobalPropertiesScreen = () => {
  let [authState, setAuthState] = useState(States.PENDING);
  let [id, setId] = useState(null);
  return (
    <div className="MainContainer">
      <NavBar/>
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
