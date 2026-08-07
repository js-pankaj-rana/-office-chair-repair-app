import mongoose, { Document, Model, Schema } from "mongoose";
import { EmployeeCounter } from "../utils/counter";

export interface IEmployee extends Document {
  employeeNumber: number;
  lastName: string;
  firstName: string;
  extension: string;
  email: string;
  officeCode: string;
  reportsTo?: number | null;
  jobTitle: string;
  createdAt: Date;
  updatedAt: Date;
}

const employeesSchema = new Schema<IEmployee>(
  {
    employeeNumber: {
      type: Number,
      unique: true,
      validate: {
        validator: Number.isInteger,
        message: "Employee number must be an integer.",
      },
    },

    lastName: {
      type: String,
      required: [true, "Last name is required."],
      trim: true,
      maxlength: [50, "Last name cannot exceed 50 characters."],
    },

    firstName: {
      type: String,
      required: [true, "First name is required."],
      trim: true,
      maxlength: [50, "First name cannot exceed 50 characters."],
    },

    extension: {
      type: String,
      maxlength: [10, "Extension cannot exceed 10 characters."],
    },

    email: {
      type: String,
      required: [true, "Email is required."],
      trim: true,
      lowercase: true,
      maxlength: [100, "Email cannot exceed 100 characters."],
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address."],
      unique: true,
    },

    officeCode: {
      type: String,
      required: [true, "Office code is required."],
      trim: true,
      maxlength: [10, "Office code cannot exceed 10 characters."],
      ref: "Offices",
    },

    reportsTo: {
      type: Number,
      default: null,
      validate: {
        validator: (value: number | null) =>
          value === null || Number.isInteger(value),
        message: "Reports To must be an integer.",
      },
      ref: "Employees",
    },

    jobTitle: {
      type: String,
      required: [true, "Job title is required."],
      trim: true,
      maxlength: [50, "Job title cannot exceed 50 characters."],
    },
  },
  {
    timestamps: true,
    collection: "employees",
  }
);

const Employees: Model<IEmployee> =
  mongoose.models.Employees ||
  mongoose.model<IEmployee>("Employees", employeesSchema);

employeesSchema.pre("save", async function () {
  if (!this.isNew || this.employeeNumber) return;

  const counter = await EmployeeCounter.findByIdAndUpdate(
    "employeeNumber",
    { $inc: { sequenceValue: 1 } },
    {
      new: true,
      upsert: true,
    }
  );
  this.employeeNumber = counter!.sequenceValue;
});

export default Employees;
