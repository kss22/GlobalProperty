import * as Yup from "yup";

const propertValueRegExp = /^[a-zA-Z0-9]+$/;
const propertValueError = "Property value should be alphanumeric";
const ecomLayoutNameRegExp = /^[a-zA-Z0-9_-]+( [a-zA-Z0-9_-]+)*$/;
const ecomElementLengthRexExp = /^[0-9]+$/;
const ecomElementPaddingValueRegExp = /^[a-zA-Z0-9-_,.]+( [a-zA-Z0-9-_,.]+)*$/;
const acquirerCodeRegExp = /^[a-zA-Z0-9]+$/;
const acquirerDescRegExp = /^[a-zA-Z0-9]+$/;
const acquirerZpkRegExp = /^[a-zA-Z0-9]+$/;
const interfaceCodeRexExp = /^[0-9]+$/;
const interfaceDescriptionRegExp = /^[a-zA-Z0-9]+$/;
const interfaceKeyRegExp = /^[a-zA-Z0-9]+$/;
const interfaceCheckValueRegExp = /^[a-zA-Z0-9]+$/;
const interfaceSiteIdRexExp = /^[0-9]+$/;
const interfaceBinConfSAFAmountRegExp = /^(?:0|[1-9][0-9]*)\.[0-9]+$/;
const interfaceBinConfSAFLimitRegExp = /^[0-9]+$/;
const interfaceBinMailboxRegExp = /^[a-zA-Z0-9@.]+( [a-zA-Z0-9@.]+)*$/;
const rangeDefinitionRegExp = /^[a-zA-Z0-9 ]+$/;

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
  acquirersCode: Yup.string()
    .trim()
    .required("Code is required")
    .matches(acquirerCodeRegExp, "Come must be alphanumeric")
    .max(20, "Code length must be less than 20"),
  acquirersDesc: Yup.string()
    .trim()
    .required("Description is required")
    .matches(acquirerDescRegExp, "Description must be alphanumeric")
    .max(50, "Description length must be less than 50"),
  acquirersZpk: Yup.string()
    .trim()
    .required("Zpk is required")
    .matches(acquirerZpkRegExp, "Zpk must be alphanumeric")
    .max(32, "Zpk length must be less than 32"),
  acquirerInterfaceCode: Yup.string()
    .trim()
    .required("Interface Code is required")
    .matches(interfaceCodeRexExp, "Interface Code must be numeric")
    .max(10, "Interface Code length must be less than 10"),
  acquirerInterfaceDesc: Yup.string()
    .trim()
    .required("Interface Description is required")
    .matches(
      interfaceDescriptionRegExp,
      "Interface Description must be alphanumeric"
    )
    .max(100, "Interface Description length must be less than 100"),
  acquirerInterfaceKey: Yup.string()
    .trim()
    .required("Interface Key is required")
    .matches(interfaceKeyRegExp, "Interface Key must be alphanumeric")
    .length(32, "Interface Key must be of length 32"),
  acquirerInterfaceCheckValue: Yup.string()
    .trim()
    .required("Interface check value is required")
    .matches(
      interfaceCheckValueRegExp,
      "Interface check value must be alphanumeric"
    )
    .max(4, "Interface check value length must be less than 4"),
  acquirerInterfaceSite: Yup.string()
    .trim()
    .required("Interface site id is required")
    .matches(
      interfaceSiteIdRexExp,
      "Interface site id must be numeric and less than 99,999,999"
    )
    .max(8, "Interface site id must be less than 99,999,999"),
  interfaceBinConfSAFAmount: Yup.string()
    .trim()
    .required("SAF amount is required")
    .matches(
      interfaceBinConfSAFAmountRegExp,
      "SAF amount must be a double value"
    ),
  interfaceBinConfSAFLimit: Yup.string()
    .trim()
    .required("SAF Limit is required")
    .matches(
      interfaceBinConfSAFLimitRegExp,
      "SAF limit must be a numeric value"
    ),
  interfaceBinConfRInterval: Yup.string()
    .trim()
    .required("R interval is required")
    .matches(
      interfaceBinConfSAFLimitRegExp,
      "R Interval must be a numeric value"
    ),
  interfaceBinConfFInterval: Yup.string()
    .trim()
    .required("F interval is required")
    .matches(
      interfaceBinConfSAFLimitRegExp,
      "F Interval must be a numeric value"
    ),
  interfaceBinConfSInterval: Yup.string()
    .trim()
    .required("S interval is required")
    .matches(
      interfaceBinConfSAFLimitRegExp,
      "S Interval must be a numeric value"
    ),
  interfaceBinConfFPercent: Yup.string()
    .trim()
    .required("F Percent is required")
    .matches(
      interfaceBinConfSAFLimitRegExp,
      "F Percent must be a numeric value"
    ),
  interfaceBinConfNPercent: Yup.string()
    .trim()
    .required("N Percent is required")
    .matches(
      interfaceBinConfSAFLimitRegExp,
      "N Percent must be a numeric value"
    ),
  interfaceBinConfMaxRetry: Yup.string()
    .trim()
    .required("Max Retry is required")
    .matches(
      interfaceBinConfSAFLimitRegExp,
      "Max Retry must be a numeric value"
    ),
  interfaceBinConfFileFullSize: Yup.string()
    .trim()
    .required("File Full Size is required")
    .matches(
      interfaceBinConfSAFLimitRegExp,
      "File Full Size must be a numeric value"
    ),
  interfaceBinConfMaxOut: Yup.string()
    .trim()
    .required("Max Out Messages is required")
    .matches(
      interfaceBinConfSAFLimitRegExp,
      "Max Out Messages must be a numeric value"
    ),
  interfaceBinUser: Yup.string()
    .trim()
    .required("User Bin is required")
    .matches(
      interfaceBinConfSAFLimitRegExp,
      "User Bin must be a numeric string"
    )
    .max(10, "User Bin length must be less than 10"),
  interfaceBinDesc: Yup.string()
    .trim()
    .required("Description is required")
    .matches(
      ecomLayoutNameRegExp,
      "Description must be alphanumeric string, allows “-“ and “_”"
    )
    .max(30, "Description length must be less than 30"),
  interfaceBinCardName: Yup.string()
    .trim()
    .required("Card Name is required")
    .matches(propertValueRegExp, "Card Name must be alphanumeric string")
    .max(10, "Card Name length must be less than 10"),
  interfaceBinBankName: Yup.string()
    .trim()
    .required("Bank Name is required")
    .matches(
      ecomLayoutNameRegExp,
      "Bank Name must be alphanumeric string. The allowed special characters are “-“ and “_”"
    )
    .max(22, "Bank Name length must be less than 22"),
  interfaceBinMailbox: Yup.string()
    .trim()
    .required("MailBox is required")
    .matches(
      interfaceBinMailboxRegExp,
      "Mailbox must be alphanumeric string. The allowed special characters are “@” and “.”"
    )
    .max(30, "Mailbox length must be less than 30"),
  interfaceBinPort: Yup.string()
    .trim()
    .required("Port is required")
    .matches(interfaceBinConfSAFLimitRegExp, "Port must be a numeric string")
    .max(30, "Mailbox length must be less than 30"),
  interfaceBinTimeOut: Yup.string()
    .trim()
    .required("TimeOut is required")
    .matches(interfaceSiteIdRexExp, "TimeOut must be a numeric value"),
  interfaceBinAuthServer: Yup.string()
    .trim()
    .required("Auth Server is required")
    .matches(ecomElementLengthRexExp, "Auth Server must be a numeric string")
    .max(30, "AuthServer length must be less than 30"),
  rangeDefinitionLowBin: Yup.string()
    .trim()
    .required("Low Bin is required")
    .matches(ecomElementLengthRexExp, "Low Bin must be a numeric string")
    .max(15, "Low bin length must be less than 15"),
  rangeDefinitionHighBin: Yup.string()
    .trim()
    .required("High Bin is required")
    .matches(ecomElementLengthRexExp, "High Bin must be a numeric string")
    .max(15, "High bin length must be less than 15"),
  rangeDefinitionDestination: Yup.string()
    .trim()
    .required("Destination is required")
    .matches(ecomElementLengthRexExp, "Destination must be a numeric string")
    .max(10, "Destination length must be less than 10"),
  rangeDefinitionDescription: Yup.string()
    .trim()
    .required("Description is required")
    .matches(rangeDefinitionRegExp, "Description must be alphanumeric")
    .max(50, "Description length must be less than 50"),
};

export default validations;
