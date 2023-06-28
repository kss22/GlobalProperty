import EcomLayoutForm from "../../components/EcomScreens/ecomLayoutForm";
import { useParams } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import NavBar from "../../components/navBar";

const AddEcomLayout = () => {
  const { id } = useParams();

  return (
    <div className="wrap">
      <NavBar/>
      <div className="Header">
        <h2><FormattedMessage id="ecom-header" defaultMessage="New Ecom Layout"/></h2>
        <h5><FormattedMessage id="ecom-sub-header" defaultMessage="Add New Ecom Style Layout"/></h5>
      </div>
      {id ? <EcomLayoutForm ecomLayoutId={id} /> : <EcomLayoutForm />}
    </div>
  );
};

export default AddEcomLayout;
