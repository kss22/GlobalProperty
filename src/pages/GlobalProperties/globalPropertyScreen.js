import React from "react";
import GlobalPropertiesForm from "../../components/globalPropertiesForm";
import { useParams } from "react-router-dom";
import { saveLanguage } from "../../localStorage";
import { Button, Tooltip } from "@mui/material";


const GlobalPropertyScreen = () => {

  const {id} = useParams();

  return (
    <div className="wrap">
        <div className="Header">
          <h2>Global Property</h2>
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
        {id ? (
          <GlobalPropertiesForm propId={id}/>
        ):(
          <GlobalPropertiesForm/>
        )}
        
    </div>
  );
};

export default GlobalPropertyScreen;
