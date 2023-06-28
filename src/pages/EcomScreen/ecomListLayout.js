import { Button, Tooltip } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { FormattedMessage } from "react-intl";
import EcomLayoutsTable from "../../components/EcomScreens/ecomLayoutDataTable";
import NavBar from "../../components/navBar";

const ListEcomLayout = () => {
  return (
    <div className="MainContainer">
      <NavBar/>
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
