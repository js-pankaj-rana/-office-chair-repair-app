// test if the device is SM
import { ToWords } from "to-words";

import { IFieldConfig } from "@/constants/formConstant";

export function isMobileDevice() {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(max-width: 768px)").matches;
}

export function checkIgstOrSgst(
  fieldList: IFieldConfig[],
  businessState: string,
  billingState: string
) {
  return fieldList.filter((field) => {
    if (businessState === billingState && field.name === "igst") {
      return false;
    }
    if (
      businessState !== billingState &&
      (field.name === "cgst" || field.name === "sgst")
    ) {
      return false;
    }
    return true;
  });
}

export const hasIGST = (businessState: string, billingState: string) => {
  return businessState !== billingState;
};

export const handleFieldClassName = (fieldName: string): string => {
  switch (fieldName) {
    case "description":
      return "col-md-3";
      break;

    case "igst":
    case "cgst":
    case "sgst":
    case "unit":
    case "gstPercentage":
    case "servicing":
    case "rate":
    case "totalPrice":
    case "HsnSacCode":
      return "col-md-1";
      break;

    default:
      return "col-md-2";
      break;
  }
};

export const calculateEstimate = (
  rate: string,
  unit: string,
  gstPercentage: string,
  businessState: string,
  billingState: string
) => {
  const servicing: number = parseInt(rate) * parseInt(unit);
  const gstAmount = (servicing * parseInt(gstPercentage)) / 100;

  const data = {
    cgst: businessState === billingState ? (gstAmount / 2).toFixed(2) : 0,
    sgst: businessState === billingState ? (gstAmount / 2).toFixed(2) : 0,
    igst: businessState !== billingState ? gstAmount.toFixed(2) : 0,
    totalPrice: (servicing + gstAmount).toFixed(2),
  };

  return data;
};

export const toWords = new ToWords({
  localeCode: "en-IN",
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
    doNotAddOnly: false,
    currencyOptions: {
      name: "Rupee",
      plural: "Rupees",
      symbol: "₹",
      fractionalUnit: {
        name: "Paisa",
        plural: "Paise",
        symbol: "",
      },
    },
  },
});
