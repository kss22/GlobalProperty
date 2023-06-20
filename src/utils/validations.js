import * as Yup from "yup";

const propertValueRegExp = /^[a-zA-Z0-9]+$/;
const propertValueError = "Property value should be alphanumeric";
const ecomLayoutNameRegExp = /^[a-zA-Z0-9_-]+( [a-zA-Z0-9_-]+)*$/;
const ecomElementLengthRexExp = /^[0-9]+$/;
const ecomElementPaddingValueRegExp = /^[a-zA-Z0-9-_,.]+( [a-zA-Z0-9-_,.]+)*$/;
const validations = {
  propertyValue: Yup.string()
    .trim()
    .required("Property value is required")
    .matches(propertValueRegExp, propertValueError)
    .max(100, "Property value length must be less than 100"),
  ecomLayoutName: Yup.string()
    .trim()
    .required("Ecom Layout Name is required")
    .matches(
      ecomLayoutNameRegExp,
      "Ecom layout name should be alphanumeric, accepts '_' & '-'"
    )
    .max(100, "Ecom Layout Name length must be less than 100"),
  ecomElementLength: Yup.string()
    .trim()
    .required("Length is required")
    .matches(ecomElementLengthRexExp, "Length must be between 0-999")
    .max(3, "Length must be between 0-999"),
  ecomElementPaddingValue: Yup.string()
    .trim()
    .required("Padding value is required")
    .matches(
      ecomElementPaddingValueRegExp,
      "Padding value must be alphanumeric, accepts '.', '_', ',', '-'"
    )
    .max(100, "Padding Value length must be less than 100"),
};

export default validations;
