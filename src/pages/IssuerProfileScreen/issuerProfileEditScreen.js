import { Divider} from "@mui/material";
import IssuerProfileForm from "../../components/IssuerProfileScreen/issuerProfileForm";
import NavBar from "../../components/navBar";


const IssuerProfileEditScreen = () => {
  return (
    <div className="MainContainer">
      <NavBar />
      <div className="Header">
        <h2>Issuer Profile</h2>
      </div>
      <Divider/>
      <IssuerProfileForm/>
    </div>
  );
};

export default IssuerProfileEditScreen;
