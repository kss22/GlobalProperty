import { Button, Tooltip } from "@mui/material";
import { saveLanguage } from "../localStorage";

const NavBar = () => {
  return (
    <div>
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
      <Tooltip title="Go to acquirer interface">
        <Button
          onClick={() => {
            window.location.href = "/listAcquirerInterface";
          }}
          variant="text"
        >
          Acquirer Interface
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
      <Tooltip title="Go to reports">
        <Button
          onClick={() => {
            window.location.href = "/issuerProfile";
          }}
          variant="text"
        >
          Issuer Profile
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
    </div>
  );
};

export default NavBar;
