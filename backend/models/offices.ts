import { Schema, model, models, Document } from "mongoose";

export interface IOffice extends Document {
  officeCode: string;
  city?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  state: string;
  country: string;
  postalCode: string;
  createdAt: Date;
  updatedAt: Date;
}

const officesSchema = new Schema<IOffice>(
  {
    officeCode: {
      type: String,
      required: [true, "Office Code is required."],
      unique: true,
      trim: true,
      maxlength: [10, "Office Code cannot exceed 10 characters."],
    },
    city: {
      type: String,
      trim: true,
      maxlength: [50, "City cannot exceed 50 characters."],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [50, "Phone cannot exceed 50 characters."],
    },
    addressLine1: {
      type: String,
      trim: true,
      maxlength: [50, "Address Line 1 cannot exceed 50 characters."],
    },
    addressLine2: {
      type: String,
      trim: true,
      maxlength: [50, "Address Line 2 cannot exceed 50 characters."],
    },
    state: {
      type: String,
      required: [true, "State is required."],
      trim: true,
      maxlength: [50, "State cannot exceed 50 characters."],
    },
    country: {
      type: String,
      required: [true, "Country is required."],
      trim: true,
      maxlength: [50, "Country cannot exceed 50 characters."],
    },
    postalCode: {
      type: String,
      required: [true, "Postal Code is required."],
      trim: true,
      maxlength: [15, "Postal Code cannot exceed 15 characters."],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "offices",
  }
);

const Offices = models.Offices || model<IOffice>("Offices", officesSchema);

export default Offices;
