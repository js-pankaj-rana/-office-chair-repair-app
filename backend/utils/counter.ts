import { Schema, model, models, InferSchemaType } from "mongoose";

// Service sequence counter schema

const orderCounterSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    sequenceValue: {
      type: Number,
      default: 10099,
    },
  },
  {
    versionKey: false,
  }
);

export type IOrderCounter = InferSchemaType<typeof orderCounterSchema>;

export const OrderCounter =
  models.OrderCounter ||
  model<IOrderCounter>("OrderCounter", orderCounterSchema);

// Customer sequence counter start from 1000000;
const customerCounterSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    sequenceValue: {
      type: Number,
      default: 999999,
    },
  },
  {
    versionKey: false,
  }
);

export type ICustomerCounter = InferSchemaType<typeof customerCounterSchema>;

export const CustomerCounter =
  models.CustomerCounter ||
  model<ICustomerCounter>("CustomerCounter", customerCounterSchema);

// Customer sequence counter start from 1000000;
const employeeCounterSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    sequenceValue: {
      type: Number,
      default: 100,
    },
  },
  {
    versionKey: false,
  }
);

export type IEmployeeCounter = InferSchemaType<typeof employeeCounterSchema>;

export const EmployeeCounter =
  models.EmployeeCounter ||
  model<IEmployeeCounter>("EmployeeCounter", employeeCounterSchema);
