// constants/invoiceTable.ts

export const COMMON_HEADERS = [
  { key: "slNo", label: "Sl No." },
  { key: "description", label: "Name of Product / Service" },
  { key: "HsnSacCode", label: "HSN / SAC" },
  { key: "unit", label: "Qty" },
  { key: "rate", label: "Rate" },
  { key: "taxableValue", label: "Taxable Value" },
];

export const INTRA_STATE_HEADERS = [
  { key: "gstPercentage", label: "% CGST" },
  { key: "cgst", label: "₹ CGST" },
  { key: "gstPercentage", label: "% SGST" },
  { key: "sgst", label: "₹ SGST" },
];

export const INTER_STATE_HEADERS = [
  { key: "gstPercentage", label: "% IGST" },
  { key: "igst", label: "₹ IGST" },
];

export const LAST_HEADER = {
  key: "totalPrice",
  label: "Total",
};
