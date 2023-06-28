import { Button, Tooltip } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import NavBar from "../../components/navBar";
import IssuerProfileTable from "../../components/IssuerProfileScreen/issuerProfileDataTable";

const IssuerProfileScreen = () => {

    return(
        
        <div className="MainContainer">
      <NavBar/>
        <div className="Header">
          <h2>Issuer Profile</h2>
        </div>
        <div className="link-wrapper">
          <Tooltip title="Add new issuer profile" placement="top">
            <Button
              className="link"
              onClick={() => window.location.href="/issuerProfileEdit"}
              variant="text"
              startIcon={<FaPlus />}
            >
              Add Issuer Profile
            </Button>
          </Tooltip>
        </div>
      <div className="Table">
        <IssuerProfileTable/>
      </div>
    </div>
    )

}

export default IssuerProfileScreen;