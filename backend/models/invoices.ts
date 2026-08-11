import mongoose, { Document, Model, Schema } from "mongoose";
import { IOrderDetail } from "./orderdetails";

export interface IEstimatePrice {
  gstPercentage: number;
  cgst: number;
  sgst: number;
  igst: number;
  rate: number;
  unit: number;
  description: string;
  HsnSacCode: number | string;
  totalPrice: number;
}

export interface IInvoice extends Document {
  orderDetail: mongoose.Types.ObjectId | IOrderDetail;
  invoice: IEstimatePrice[];
  createdAt: Date;
  updatedAt: Date;
}

const InvoiceSchema = new Schema<IInvoice>(
  {
    invoice: [
      {
        gstPercentage: {
          type: Number,
          required: true,
          default: 18,
        },
        cgst: {
          type: Number,
          required: true,
          default: 0,
        },
        sgst: {
          type: Number,
          required: true,
          default: 0,
        },
        igst: {
          type: Number,
          required: true,
          default: 0,
        },
        rate: {
          type: Number,
          required: true,
        },
        unit: {
          type: Number,
          required: true,
          default: 1,
        },
        description: {
          type: String,
          trim: true,
          default: "",
        },
        HsnSacCode: {
          type: Schema.Types.Mixed, // Allows both number and string
          required: true,
        },
        totalPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    orderDetail: {
      type: Schema.Types.ObjectId,
      ref: "OrderDetails",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "invoices",
  }
);

const Invoice: Model<IInvoice> =
  mongoose.models.Invoice || mongoose.model<IInvoice>("Invoice", InvoiceSchema);

export default Invoice;
