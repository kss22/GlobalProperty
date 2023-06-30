import { Divider } from "@mui/material";
import NavBar from "../../components/navBar";
import RangeDefinitionForm from "../../components/RangeDefinitionScreen/rangeDefinitonForm";

const RangeDefinitionEditScreen = () => {
  return (
    <div className="MainContainer">
      <NavBar />
      <div className="Header">
        <h2>Range Definition</h2>
      </div>
      <Divider />
      <RangeDefinitionForm />
    </div>
  );
};

export default RangeDefinitionEditScreen;
