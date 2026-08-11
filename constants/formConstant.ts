import { IEstimatePrice } from "@/backend/models/invoices";

export interface IFieldConfig {
  label: string;
  name: keyof IEstimatePrice;
  type?: "text" | "number";
  readOnly?: boolean;
  placeholder?: string;
  className?: string;
  formatter?: (value: string | number) => string;
  min?: number;
}

export const ORDER_ESTIMATION_FIELDS: IFieldConfig[] = [
  {
    label: "Work Description (for quotation purpose)",
    name: "description",
    type: "text",
    placeholder: "e.g. Gas Lift Replacement",
  },
  {
    label: "GST %",
    name: "gstPercentage",
    type: "text",
  },
  {
    label: "CGST",
    name: "cgst",
    readOnly: true,
    formatter: (value) => Number(value).toFixed(2),
  },
  {
    label: "SGST",
    name: "sgst",
    type: "number",
    readOnly: true,
    formatter: (value) => Number(value).toFixed(2),
  },
  {
    label: "IGST",
    name: "igst",
    type: "number",
    readOnly: true,
    formatter: (value) => Number(value).toFixed(2),
  },
  {
    label: "@Rate",
    name: "rate",
    type: "number",
    min: 1,
  },
  {
    label: "Unit",
    name: "unit",
    type: "number",
    min: 1,
  },
  {
    label: "HSN/SAC",
    name: "HsnSacCode",
    type: "text",
  },
  {
    label: "Total Price",
    name: "totalPrice",
    type: "number",
    readOnly: true,
    formatter: (value) => Number(value).toFixed(2),
  },
];
