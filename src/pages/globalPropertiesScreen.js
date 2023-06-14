import React from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import "../App.css";
import GlobalPropertiesTable from "../components/globalPropertiesDataTable";
import { saveLanguage } from "../localStorage";
import { FormattedMessage } from "react-intl";

const GlobalPropertiesScreen = () => {
  return (
    <div className="MainContainer">
      <div>
        <div className="Header">
          <h2>Global Properties</h2>
          <button onClick={() => {saveLanguage('fr'); window.location.reload();}}>Fr</button>
          <button onClick={() => {saveLanguage('en'); window.location.reload();}}>En</button>
        </div>
        <div className="link-wrapper">
          <Link to="/addGlobalProperty" className="link">
            <FaPlus className="plus" />
            <FormattedMessage id="add-global-property-button" defaultMessage='Add Global Property'/>
          </Link>
        </div>
      </div>
      <div className="Table">
        <GlobalPropertiesTable />
      </div>
    </div>
  );
};

export default GlobalPropertiesScreen;
