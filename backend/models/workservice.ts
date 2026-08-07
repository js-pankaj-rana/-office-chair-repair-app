import mongoose, { Document, Model, Schema } from "mongoose";

export enum ServiceCode {
  CH = "CH",
  AC = "AC",
  OTHR = "OTHR",
  REFRG = "REFRG",
}

export enum ServiceName {
  CHAIR = "Chair",
  AIR = "Air",
  OTHER = "Other",
  REFRIGERATOR = "Refrigerator",
}

export enum ServiceLine {
  CHAIR_REPAIR = "chair repair",
  CHAIR_MANUFACTURER = "chair manufacturer",
  AC_REPAIR = "ac repair",
  AC_MANUFACTURE = "ac manufacture",
  REFRIGERATOR_REPAIR = "refrigerator repair",
  REFRIGERATOR_MANUFACTURE = "refrigerator manufacture",
  OTHER = "other",
}

export enum ServiceScale {
  SM = "sm",
  MD = "md",
  LG = "lg",
}

export interface IWorkService extends Document {
  serviceCode: ServiceCode;
  serviceName: ServiceName;
  serviceLine: ServiceLine;
  serviceScale: ServiceScale;
  providerVendor: string | null;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  HsnSacCode: number;
}

const workServiceSchema = new Schema<IWorkService>(
  {
    serviceCode: {
      type: String,
      enum: Object.values(ServiceCode),
      required: [true, "Service code is required."],
      unique: true,
    },

    serviceName: {
      type: String,
      enum: Object.values(ServiceName),
      required: [true, "Service name is required."],
    },

    serviceLine: {
      type: String,
      enum: Object.values(ServiceLine),
      required: [true, "Service line is required."],
    },

    serviceScale: {
      type: String,
      enum: Object.values(ServiceScale),
      required: [true, "Service scale is required."],
    },

    providerVendor: {
      type: String,
      default: null,
      trim: true,
      maxlength: [50, "Provider/vendor cannot exceed 50 characters."],
    },

    description: {
      type: String,
      required: [true, "Service description is required."],
      trim: true,
    },
    HsnSacCode: {
      type: Number,
      required: [true, "HSN code is required."],
    },
  },
  {
    timestamps: true,
    collection: "workservices",
  }
);

const WorkService: Model<IWorkService> =
  mongoose.models.WorkServices ||
  mongoose.model<IWorkService>("WorkServices", workServiceSchema);

export default WorkService;
