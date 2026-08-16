import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import User, { IAddress } from "../models/user";
import ErrorHandler from "../utils/errorHandler";
import { delete_file, upload_file } from "../utils/cloudinary";
import { resetPasswordTemplate } from "../mailerTemplates/resetPasswordTemplate";
import { registrationTemplate } from "../mailerTemplates/registrationTemplate";

import sendEmail from "../utils/sendEmail";
import { Types } from "mongoose";
import crypto from "crypto";

// Register user  =>  /api/auth/register
export const registerUser = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const { name, email, password, phone } = body;

  const user = await User.create({
    name,
    email,
    phone,
    password,
  });

  const emailVerificationToken = user.emailVerificationToken();
  await user.save();
  const mailVerficationUrl = `${process.env.API_URL}/email/verification/${emailVerificationToken}`;
  const message = registrationTemplate(
    user?.name,
    process.env.APP_NAME ?? "ChairCare",
    process.env.API_URL ?? "www.zhelps.in",
    mailVerficationUrl
  );

  try {
    await sendEmail({
      email: user.email,
      subject: "ZHelps | Welcome to Chair Services",
      message,
    });
  } catch (error: unknown) {
    throw new ErrorHandler((error as Error)?.message, 500);
  }

  return NextResponse.json({
    success: true,
    data: user,
  });
});

// Update use profile  =>  /api/me/update
export const updateProfile = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();
  const { name, email, phone } = body;

  const user = await User.findByIdAndUpdate(req.user._id, {
    $set: {
      name,
      email,
      phone,
    },
  });

  return NextResponse.json({
    success: true,
    data: user,
  });
});

// Add new user address =>  /api/address/add
export const addAddress = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();
  const { address } = body;

  if (!address) {
    throw new ErrorHandler("Address is required.", 400);
  }

  await User.findByIdAndUpdate(req.user._id, {
    $push: {
      address: {
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        postalCode: address.postalCode,
        state: address.state,
        isDefault: address.isDefault,
      },
    },
  });

  const user = await User.findById(req.user._id);
  const lastAddressIndex = user?.address.length - 1;

  user?.address?.forEach((address: IAddress, index: number) => {
    if (index === lastAddressIndex) {
      address.isDefault = true;
      return;
    }
    address.isDefault = false;
  });

  user?.save();

  return NextResponse.json({
    success: true,
    data: user,
  });
});

// Get all user address =>  /api/address/all
export const getAllAddress = catchAsyncErrors(async (req: NextRequest) => {
  if (!req.user) {
    throw new ErrorHandler("Unauthorized", 401);
  }

  const user = await User.findById(req.user._id).select("address");

  if (!user) {
    throw new ErrorHandler("User not found.", 404);
  }

  return NextResponse.json(
    {
      success: true,
      count: user.address?.length || 0,
      data: user.address || [],
    },
    { status: 200 }
  );
});

// Get signle address by id =>  /api/address/:id

export const getAddressById = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const user = await User.findById(req.user._id).populate("address");

    const address = user?.address.find(
      (addr: IAddress) => addr._id.toString() === id
    );

    return NextResponse.json({
      success: true,
      data: address,
    });
  }
);

// Update user address =>  /api/address/edit/:id

export const editAddress = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const address = await req.json();
    const { addressLine1, addressLine2, city, postalCode, state, isDefault } =
      address;

    const user = await User.findOneAndUpdate(
      {
        _id: req.user._id,
        "address._id": id,
      },
      {
        $set: {
          "address.$.addressLine1": addressLine1,
          "address.$.addressLine2": addressLine2,
          "address.$.city": city,
          "address.$.state": state,
          "address.$.postalCode": postalCode,
          "address.$.isDefault": isDefault,
        },
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (isDefault) {
      user.address.forEach((addr: IAddress) => {
        if (addr._id.toString() != id) {
          addr.isDefault = false;
          return;
        }
      });
      user?.save();
    }

    if (!user) {
      throw new ErrorHandler("Address not found.", 404);
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  }
);

// Delete user address =>  /api/address/delete/:id
export const deleteAddress = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params;
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new ErrorHandler("User not found.", 404);
    }
    if (user.address.length === 1) {
      throw new ErrorHandler("You cannot delete your only address.", 400);
    }
    // @ts-ignore
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: {
          address: {
            _id: new Types.ObjectId(id as string),
          },
        },
      },
      { new: true }
    );
    // @ts-ignore
    const newUser = await User.findById(req.user._id);
    const isDefaultAddress = newUser.address.find(
      (address: IAddress) => address.isDefault === true
    );

    if (!isDefaultAddress) {
      newUser.address[0].isDefault = true;
      newUser.save();
    }

    return NextResponse.json({
      success: true,
      data: newUser,
    });
  }
);

// Update password  =>  /api/me/update_password
export const updatePassword = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const user = await User.findById(req?.user?._id).select("+password");

  const isMatched = await user.comparePassword(body.oldPassword);

  if (!isMatched) {
    throw new ErrorHandler("Old password is incorrect", 400);
  }

  user.password = body.password;
  await user.save();

  return NextResponse.json({
    success: true,
    data: null,
  });
});

// Upload user avatar  =>  /api/me/upload_avatar
export const uploadAvatar = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const avatarResponse = await upload_file(body?.avatar, "profile/avatars");

  // Remove avatar from cloudinary
  if (req?.user?.avatar?.public_id) {
    await delete_file(req?.user?.avatar?.public_id);
  }

  const user = await User.findByIdAndUpdate(req?.user?._id, {
    avatar: avatarResponse,
  });

  return NextResponse.json({
    success: true,
    data: user,
  });
});

// Forgot password  =>  /api/password/forgot
export const forgotPassword = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const user = await User.findOne({ email: body.email });

  if (!user) {
    throw new ErrorHandler("User not found with this email", 404);
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save();

  // Create reset password url
  const resetUrl = `${process.env.API_URL}/password/reset/${resetToken}`;

  const message = resetPasswordTemplate(
    user?.name,
    resetUrl,
    process.env.APP_NAME,
    process.env.API_URL
  );

  try {
    await sendEmail({
      email: user.email,
      subject: "ZHelps | Password Reset",
      message,
    });
  } catch (error: unknown) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    throw new ErrorHandler((error as Error)?.message, 500);
  }

  return NextResponse.json({
    success: true,
    data: user,
  });
});

// Reset password  =>  /api/password/reset/:token
export const resetPassword = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { token: string } }) => {
    const { token } = await params;
    const body = await req.json();

    // Hash the token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      throw new ErrorHandler(
        "Password reset token is invalid or has been expired",
        404
      );
    }

    if (body.password !== body.confirmPassword) {
      throw new ErrorHandler("Passwords does not match", 400);
    }

    // Set the new password
    user.password = body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return NextResponse.json({
      success: true,
      data: null,
    });
  }
);

// Email verification  =>  /api/email/verification/:token
export const emailValidation = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { token: string } }) => {
    // Hash the token
    const { token } = await params;
    const emailValidationToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      emailValidationToken,
      emailValidationExpire: { $gt: Date.now() },
    });

    if (!user) {
      throw new ErrorHandler(
        "Email validation token is invalid or has been expired",
        404
      );
    }

    user.emailValidationToken = undefined;
    user.emailValidationExpire = undefined;
    user.emailVerified = true;

    await user.save();

    return NextResponse.json({
      success: true,
      data: null,
    });
  }
);

// Reset email verification  =>  /api/email/reset/:token
export const resetEmail = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { token: string } }) => {
    const { token } = await params;
    // Hash the token
    const emailValidationToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      emailValidationToken,
    });

    const emailVerificationToken = user.emailVerificationToken();
    await user.save();
    const mailVerficationUrl = `${process.env.API_URL}/email/verification/${emailVerificationToken}`;
    const message = registrationTemplate(
      user?.name,
      process.env.APP_NAME ?? "ChairCare",
      process.env.SUPPORT_EMAIL ?? "admin@zhelps.in",
      mailVerficationUrl
    );

    try {
      await sendEmail({
        email: user.email,
        subject: "ZHelps | Welcome to Chair Services",
        message,
      });
    } catch (error: unknown) {
      throw new ErrorHandler((error as Error)?.message, 500);
    }

    if (!user) {
      // This use case occures when some suspecious activity detected.
      throw new ErrorHandler("Something went wrong...", 404);
    }

    await user.save();

    return NextResponse.json({
      success: true,
      data: null,
    });
  }
);

// Get all users  =>  /api/admin/users
export const allAdminUsers = catchAsyncErrors(async (req: NextRequest) => {
  const users = await User.find();

  return NextResponse.json({
    success: true,
    data: users,
  });
});

// Get user details  =>  /api/admin/users/:id
export const getUserDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const user = await User.findById(params.id);

    if (!user) {
      throw new ErrorHandler("User not found with this ID", 404);
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  }
);

// Update user details  =>  /api/admin/users/:id
export const updateUser = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const body = await req.json();

    const newUserData = {
      name: body.name,
      email: body.email,
      role: body.role,
    };

    const user = await User.findByIdAndUpdate(params.id, newUserData);

    return NextResponse.json({
      success: true,
      data: user,
    });
  }
);

// Delete user  =>  /api/admin/users/:id
export const deleteUser = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const user = await User.findById(params.id);

    if (!user) {
      throw new ErrorHandler("User not found with this ID", 404);
    }

    // Remove avatar from cloudinary
    if (user?.avatar?.public_id) {
      await delete_file(user?.avatar?.public_id);
    }

    await user.deleteOne();

    return NextResponse.json({
      success: true,
      data: null,
    });
  }
);
