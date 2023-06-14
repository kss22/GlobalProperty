import React from "react";
import GlobalPropertiesForm from "../components/globalPropertiesForm";
import { useParams } from "react-router-dom";
import { saveLanguage } from "../localStorage";


const GlobalPropertyScreen = () => {

  const {id} = useParams();

  return (
    <div className="wrap">
        <div className="Header">
          <h2>Global Property</h2>
          <button onClick={() => {saveLanguage('fr'); window.location.reload();}}>Fr</button>
          <button onClick={() => {saveLanguage('en'); window.location.reload();}}>En</button>
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
