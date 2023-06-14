import * as Yup from "yup";

const propertValueRegExp = /^[a-zA-Z0-9]+$/;
const propertValueError = "Property value should be alphanumeric";

const validations = {
  propertyValue: Yup.string()
    .trim()
    .matches(propertValueRegExp, propertValueError)
    .required("Property value is required")
    .max(100, 'Property value length must be less than 100'),
};

export default validations;
