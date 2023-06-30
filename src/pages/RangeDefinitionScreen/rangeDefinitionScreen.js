import { Button, Tooltip } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import NavBar from "../../components/navBar";
import RangeDefinitionTable from "../../components/RangeDefinitionScreen/rangeDefinitionDataTable";

const RangeDefinitionScreen = () => {

    return(
        
        <div className="MainContainer">
      <NavBar/>
        <div className="Header">
          <h2>Range Definition</h2>
        </div>
        <div className="link-wrapper">
          <Tooltip title="Add Range" placement="top">
            <Button
              className="link"
              onClick={() => window.location.href="/rangeDefinitionCreate"}
              variant="text"
              startIcon={<FaPlus />}
            >
              Add Range
            </Button>
          </Tooltip>
        </div>
      <div className="Table">
        <RangeDefinitionTable/>
      </div>
    </div>
    )

}

export default RangeDefinitionScreen;