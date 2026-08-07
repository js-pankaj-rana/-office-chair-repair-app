import bcrypt from "bcryptjs";
import * as crypto from "crypto";
import mongoose, { Document, Schema } from "mongoose";

export interface IAddress extends Document {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  isDefault?: boolean;
  postalCode: string;
  state: string;
}

export interface IAddressForm {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  state: string;
  isDefault?: boolean;
}

export interface IUser extends Document {
  address?: IAddress[];
  avatar?: {
    public_id: string;
    url: string;
  };
  comparePassword(enteredPassword: string): Promise<boolean>;
  country: string;
  createdAt: Date;
  email: string;
  emailVerified: boolean;
  getResetPasswordToken(): string;
  emailVerificationToken(): string;
  name: string;
  password: string;
  phone: string;
  phoneVerified: boolean;
  resetPasswordExpire: Date;
  resetPasswordToken: string;
  emailValidationExpire: Date;
  emailValidationToken: string;
  role: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  address: [
    {
      addressLine1: {
        type: String,
        required: [true, "Please enter address line 1"],
      },
      addressLine2: {
        type: String,
      },
      city: {
        type: String,
        required: [true, "Please enter city"],
      },
      isDefault: {
        type: Boolean,
        default: false,
      },
      postalCode: {
        type: String,
      },
      state: {
        type: String,
      },
    },
  ],
  avatar: {
    public_id: String,
    url: String,
  },
  country: {
    type: String,
    default: "IN",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    minlength: [2, "Your name must be longer than 2 characters"],
    required: [true, "Please enter your name"],
  },
  password: {
    type: String,
    minlength: [6, "Your password must be longer than 6 characters"],
    required: [true, "Please enter your password"],
    select: false,
  },
  phone: {
    type: String,
    required: [true, "Please enter your phone number."],
    trim: true,
    unique: true,
    validate: {
      validator: (value: string) => /^[6-9]\d{9}$/.test(value),
      message: "Please enter a valid 10-digit Indian mobile number.",
    },
  },
  phoneVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordExpire: Date,
  resetPasswordToken: String,

  emailValidationExpire: Date,
  emailValidationToken: String,

  role: {
    type: String,
    default: "user",
  },
});

// Encrypting password before saving the user
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare user password
userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate email password token
userSchema.methods.emailVerificationToken = function (): string {
  const emailVerificationToken = crypto.randomBytes(20).toString("hex");
  this.emailValidationToken = crypto
    .createHash("sha256")
    .update(emailVerificationToken)
    .digest("hex");

  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 2); // User can validate his email address withing 2 days
  this.emailValidationExpire = nextDay;
  return emailVerificationToken;
};

// Generate reset password token
userSchema.methods.getResetPasswordToken = function (): string {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  return resetToken;
};

export default mongoose.models.User ||
  mongoose.model<IUser>("User", userSchema);
