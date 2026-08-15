import { Schema, model, models, Model, InferSchemaType } from "mongoose";

// Service sequence counter schema

const orderCounterSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  sequenceValue: {
    type: Number,
    default: 20260000,
  },
});

export type IOrderCounter = InferSchemaType<typeof orderCounterSchema>;

export const OrderCounter =
  (models.OrderCounter as Model<IOrderCounter>) ||
  model<IOrderCounter>("OrderCounter", orderCounterSchema);
