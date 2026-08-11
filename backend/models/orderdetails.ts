import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./user";

export interface IImage extends Document {
  public_id: string;
  url: string;
}
export type IOrderStatus =
  "Start" | "Initiated" | "Verified" | "Cancelled" | "Successful";

export interface IAddressForm {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  state: string;
  isDefault?: boolean;
  gstin?: string;
  billingName?: string;
}

type IEstimate = IImage;

export interface ImageItem {
  file: File;
  preview: string;
}

export interface IPayment extends Document {
  id: string;
  status: string;
}

export interface IOrder {
  _id: string;
  faultDescription: string;
  orderStatus: string;
  quantityOrdered: number;
  scheduleDate: string;
  productImages: IImage[];
  shippingAddress: {
    addressLine1: string;
    city: string;
    postalCode: string;
  };
}

export interface IOrderDetail extends Document {
  createdAt: Date;
  deliveryDate?: Date;
  faultDescription: string;
  quotation?: IEstimate[];
  orderNumber?: number;
  orderStatus: IOrderStatus;
  paidAt: Date;
  paymentInfo: IPayment[];
  productImages?: IImage[];
  quantityOrdered: number;
  scheduleDate: Date;
  scheduleTime: string;
  serviceCode: string;
  shippingAddress?: IAddressForm;
  billingAddress?: IAddressForm;
  updatedAt: Date;
  user: mongoose.Types.ObjectId | IUser;
}

const orderDetailsSchema = new Schema<IOrderDetail>(
  {
    deliveryDate: {
      type: Date,
    },

    faultDescription: {
      type: String,
      maxLength: 500,
    },
    orderNumber: {
      type: Number,
    },
    orderStatus: {
      type: String,
      default: "Start",
      enum: {
        values: ["Start", "Initiated", "Verified", "Cancelled", "Successful"],
        message:
          "Order status must be one of 'Start', 'Initiated', 'Verified', 'Cancelled', or 'Successful'.",
      },
    },

    paidAt: {
      type: Date,
    },

    paymentInfo: {
      id: {
        type: String,
      },
      status: {
        type: String,
      },
    },

    productImages: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],

    quotation: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],

    quantityOrdered: {
      type: Number,
      default: 1,
      validate: {
        validator: Number.isInteger,
        message: "Quantity ordered must be an integer.",
      },
    },

    scheduleDate: {
      type: Date,
    },

    scheduleTime: {
      type: String,
    },

    serviceCode: {
      type: String,
      ref: "WorkServices",
    },

    shippingAddress: {
      addressLine1: {
        type: String,
      },
      addressLine2: {
        type: String,
      },
      city: {
        type: String,
      },
      country: {
        type: String,
      },
      postalCode: {
        type: String,
      },
      state: {
        type: String,
      },
      gstin: {
        type: String,
      },
      billingName: {
        type: String,
      },
    },
    billingAddress: {
      addressLine1: {
        type: String,
      },
      addressLine2: {
        type: String,
      },
      city: {
        type: String,
      },
      country: {
        type: String,
      },
      postalCode: {
        type: String,
      },
      state: {
        type: String,
      },
      gstin: {
        type: String,
      },
      billingName: {
        type: String,
      },
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
    collection: "orderDetails",
  }
);

// Remove or fix this index because productCode doesn't exist
// orderDetailsSchema.index({ orderNumber: 1, productCode: 1 }, { unique: true });

const OrderDetails: Model<IOrderDetail> =
  mongoose.models.OrderDetails ||
  mongoose.model<IOrderDetail>("OrderDetails", orderDetailsSchema);

export default OrderDetails;
