import { Button, Tooltip } from "@mui/material";
import { saveLanguage } from "../../localStorage";
import { FaPlus } from "react-icons/fa";
import { FormattedMessage } from "react-intl";
import EcomLayoutsTable from "../../components/ecomLayoutDataTable";

const ListEcomLayout = () => {
  return (
    <div className="MainContainer">
      <Tooltip title="Go to Global Properties">
        <Button
          onClick={() => {
            window.location.href = "/listGlobalProperties";
          }}
          variant="text"
        >
          GlobalProperties
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
        <div className="Header">
          <h2>
            <FormattedMessage
              id="ecom-header"
              defaultMessage="New Ecom Layout"
            />
          </h2>
          <h5>
            <FormattedMessage
              id="ecom-list-sub-header"
              defaultMessage="Manage Ecom Layouts"
            />
          </h5>
        </div>
        <div className="link-wrapper">
          <Tooltip title="Add new ecom layout" placement="top">
            <Button
              className="link"
              onClick={() => (window.location.href = "/addEcomLayout")}
              variant="text"
              startIcon={<FaPlus />}
            >
              <FormattedMessage
                id="add-ecom-layout-button"
                defaultMessage="Add Ecom Layout"
              />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="Table">
        <EcomLayoutsTable />
      </div>
    </div>
  );
};

export default ListEcomLayout;
