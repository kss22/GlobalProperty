import { Button, Tooltip } from "@mui/material";
import EcomLayoutForm from "../../components/ecomLayoutForm";
import { saveLanguage } from "../../localStorage";
import { useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const AddEcomLayout = () => {
  const { id } = useParams();

  return (
    <div className="wrap">
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
      <div className="Header">
        <h2><FormattedMessage id="ecom-header" defaultMessage="New Ecom Layout"/></h2>
        <h5><FormattedMessage id="ecom-sub-header" defaultMessage="Add New Ecom Style Layout"/></h5>
      </div>
      {id ? <EcomLayoutForm ecomLayoutId={id} /> : <EcomLayoutForm />}
    </div>
  );
};

export default AddEcomLayout;
