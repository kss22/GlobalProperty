import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import * as authentication from "../utils/authentication";
import validations from "../utils/validations";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormattedMessage } from 'react-intl';


const GlobalPropertiesForm = () => {
  const { propId } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [property, setProperty] = useState([]);

  const [prop, setProp] = useState(null);
  const [keys, setKeys] = useState([]);
  const [inst, setInst] = useState([]);

  // const [propId, setPropId] = useState(0);

  const [propValue, setPropValue] = useState(null);
  const [propKey, setPropKey] = useState("");

  const [instId, setInstId] = useState(0);

  const [validationError, setValidationError] = useState(false);

  const handleChangePropValue = (e) => {

    setValidationError(false);
    

    const value = e.target.value;

    validations.propertyValue
      .validate(value)
      .then(() => {
        setPropValue(value);
        setValidationError(false);
      })
      .catch((error) => {
        setValidationError(true);
        toast.error(`Validation error: ${error.message}`);
      });
  };

  function handleChange(event) {
    fetch(
      `${authentication.SERVER_URL}/v1/config/global-props/prop-values/${event.target.value}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authentication.token}`,
          branchId: "1",
          instId: "1",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setKeys(data);
      });
  }

  function handleSubmit() {
    const post = {
      instId: parseInt(instId),
      propId: propId ? propId : 0,
      propKey: propKey,
      propName: prop,
      propValue: propValue,
    };
    fetch(`${authentication.SERVER_URL}/v1/config/global-props`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authentication.token}`,
        branchId: "1",
        instId: "1",
      },
      body: JSON.stringify(post),
    })
      .then((response) => {
        if (response.ok) {
          toast.success('Property added successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
          });
          
        } else {
          console.log(response);
          throw new Error(response);
          
        }
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      });
  }
  useEffect(() => {
    setLoading(true);
    if (propId ? true : false) {
      fetch(`${authentication.SERVER_URL}/v1/config/global-props/${propId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authentication.token}`,
          branchId: "1",
          instId: "1",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setProperty(data);
          setPropValue(data.propValue);
          setPropKey(data.propKey);
          setInstId(data.instId);
          setProp(data.propName);
        });
      fetch(`${authentication.SERVER_URL}/v1/config/global-props/prop-names`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authentication.token}`,
          branchId: "1",
          instId: "1",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
      fetch(`${authentication.SERVER_URL}/v1/config/institutions/user/1`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authentication.token}`,
          branchId: "1",
          instId: "1",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setInst(data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      fetch(`${authentication.SERVER_URL}/v1/config/global-props/prop-names`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authentication.token}`,
          branchId: "1",
          instId: "1",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
      fetch(`${authentication.SERVER_URL}/v1/config/institutions/user/1`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authentication.token}`,
          branchId: "1",
          instId: "1",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setInst(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [propId]);

  return (
    <div>
      <ToastContainer />
      {loading ? (
        <div className="loading-message">Loading...</div>
      ) : (
        <div className="divContainer">
          <div className="Entries">
            <label><FormattedMessage  id="property-name" defaultMessage='Property Name:'/></label>
            <select
              value={prop}
              onChange={(e) => {
                setProp(e.target.value);
                handleChange(e);
              }}
            >
              {propId ? (
                <option>{property.propName}</option>
              ) : (
                <option><FormattedMessage id="property-name-option" defaultMessage="Choose Property Name"/></option>
              )}

              {data.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>

            <span>
            <label><FormattedMessage className='format' id="property-value" defaultMessage='Property Value:'/></label>
              <input
                maxLength={100}
                value={propId ? propValue : null}
                type="text"
                placeholder={"Enter Property Value"}
                className={validationError ? "invalid" : "valid"}
                onChange={handleChangePropValue}
              />
              <br></br>
            </span>
            <label><FormattedMessage className='format' id="property-key" defaultMessage='Property Key:'/></label>
            <select
              value={propKey}
              onChange={(e) => {
                setPropKey(e.target.value);
              }}
            >
              {propId ? (
                <option>{property.propKey}</option>
              ) : (
                <option><FormattedMessage id="property-key-option" defaultMessage="Choose Property Key"/></option>
              )}

              {keys.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
            <label><FormattedMessage className='format' id="institution-name" defaultMessage='Institution:'/></label>
            <select onChange={(e) => setInstId(e.target.value)}>
              {propId ? (
                <option>{property.instName}</option>
              ) : (
                <option><FormattedMessage id="institution-name-option" defaultMessage="Choose Institution"/></option>
              )}

              {inst.map((item) => (
                <option value={item.instId}>{item.instName}</option>
              ))}
            </select>
          </div>
          <div className="Submissions">
            <Link to="/"><FormattedMessage id="cancel-button" defaultMessage='cancel'/></Link>
            <button onClick={() => handleSubmit()}>
              <FaSave className="save" />
              <FormattedMessage id="submit-button" defaultMessage='Submit'/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalPropertiesForm;
