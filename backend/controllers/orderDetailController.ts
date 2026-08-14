import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import OrderDetails, { IImage } from "../models/orderdetails";
import ErrorHandler from "../utils/errorHandler";
import { upload_file, delete_file } from "../utils/cloudinary";
import { OrderCounter } from "../utils/counter";
import sendEmail from "../utils/sendEmail";
import { userInvoiceTemplate } from "../mailerTemplates/userInvoiceTemplate";
import mongoose from "mongoose";
import Invoice from "../models/invoices";

// Create new Order   =>  /api/order
export const newOrder = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const { orderStatus, serviceCode } = body;

  const hasPreviousOrder = await OrderDetails.findOne({
    user: req.user._id,
    orderStatus: "Start",
  });

  if (hasPreviousOrder) {
    return NextResponse.json({
      success: true,
      data: hasPreviousOrder,
    });
  } else {
    const order = await OrderDetails.create({
      user: req.user._id,
      serviceCode,
      orderStatus,
    });

    return NextResponse.json({
      success: true,
      data: order,
    });
  }
});

// Upload product user input  =>  /api/order/update/:id

export const updateOrder = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params;
    const body = await req.json();

    const { ...billingAddress } = body?.billingAddress;

    const order = await OrderDetails.findByIdAndUpdate(id, {
      $set: {
        faultDescription: body?.faultDescription,
        quantityOrdered: body?.quantityOrdered,
        scheduleDate: body?.scheduleDate,
        shippingAddress: body?.shippingAddress,
        orderStatus: "Initiated",
        billingAddress,
      },
    });

    return NextResponse.json({
      success: true,
      data: order,
    });
  }
);

// Review the order booking service availability   =>  /api/order/review
// TODO

// Upload product images  =>  /api/order/upload_image/:id
export const uploadProductImages = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params;
    const order = await OrderDetails.findById(id);
    const body = await req.json();

    if (!order) {
      throw new ErrorHandler("Order not found", 404);
    }
    if (body?.images.length === 0) {
      throw new ErrorHandler("Bad request, please select image", 400);
    }

    const uploader = (images: string) =>
      upload_file(images, "office_chair_app/product", "image");
    const urls = await Promise.all(body.images.map(uploader));
    order?.productImages?.push(...urls);

    await order.save();

    return NextResponse.json({
      success: true,
      data: order ?? "dddd",
    });
  }
);

// Delete room image  =>  /api/order/delete_image/:orderId
export const deleteProductImage = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { orderId: string } }) => {
    const { orderId } = await params;
    const body = await req.json();
    // console.log("body===>>>>", body);
    const order = await OrderDetails.findById(orderId);

    if (!order) {
      throw new ErrorHandler("Order not found", 404);
    }

    const isDeleted = await delete_file(body.public_id);
    // console.log(isDeleted);

    if (isDeleted) {
      order.productImages = order?.productImages
        ? order?.productImages.filter(
            (img: IImage) => img.public_id !== body.public_id
          )
        : [];
    }

    await order.save();

    return NextResponse.json({
      success: true,
      data: order,
    });
  }
);

//Review oreder availability /api/order/review
// TO DO
export const reviewOrderAvailability = catchAsyncErrors(
  async (req: NextRequest) => {
    const { orderStatus, orderId } = await req.json();

    const order = await OrderDetails.findByIdAndUpdate(
      {
        _id: orderId,
      },
      {
        $set: {
          orderStatus,
        },
      },
      {
        new: true,
      }
    );

    return NextResponse.json({
      success: true,
      data: order,
    });
  }
);

// Request user or representative to booked the servicing dates   =>  /api/order/booked_dates

export const scheduleServiceDate = catchAsyncErrors(
  async (req: NextRequest) => {
    const { orderId, scheduleDate, scheduleTime } = await req.json();

    const order = await OrderDetails.findByIdAndUpdate(
      {
        _id: orderId,
      },
      {
        $set: {
          scheduleDate,
          scheduleTime,
        },
      },
      {
        new: true,
      }
    );

    return NextResponse.json({
      success: true,
      data: order,
    });
  }
);

// Request user or representative to booked the servicing dates   =>  /api/order/payment

export const confirmBookingAmount = catchAsyncErrors(
  async (req: NextRequest) => {
    const { orderId, paymentInfo } = await req.json();

    const order = await OrderDetails.findByIdAndUpdate(
      {
        _id: orderId,
      },
      {
        $push: {
          paymentInfo: {
            ...paymentInfo,
          },
        },
      },
      {
        new: true,
      }
    );

    return NextResponse.json({
      success: true,
      data: order,
    });
  }
);

// Get booking order details   =>  /api/orders?page=1

export const getAllOrder = catchAsyncErrors(async (req: NextRequest) => {
  //  if (req?.user?.role !== "admin") {
  //   throw new ErrorHandler("You can not view this booking", 403);
  // }

  const { searchParams } = new URL(req.url);

  // 6a48cb69ab06a64a8be28053

  const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);

  const limit = 40;
  const skip = (page - 1) * limit;

  const orders = await OrderDetails.find({
    user: req.user._id,
    orderStatus: {
      $ne: "Start",
    },
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const totalRecords = orders.length;

  return NextResponse.json({
    success: true,
    data: orders,
    pagination: {
      page,
      perPage: limit,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      hasNextPage: page * limit < totalRecords,
      hasPreviousPage: page > 1,
    },
  });
});

// Get booking order details   =>  /api/admin/orders?page=1

export const getAllOrderAdmin = catchAsyncErrors(async (req: NextRequest) => {
  if (req?.user?.role !== "admin") {
    throw new ErrorHandler("You can not view this booking", 403);
  }
  const { searchParams } = new URL(req.url);

  const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);

  const limit = 40;
  const skip = (page - 1) * limit;

  const orders = await OrderDetails.find({
    orderStatus: {
      $ne: "Start",
    },
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const totalRecords = orders.length;

  return NextResponse.json({
    success: true,
    data: orders,
    pagination: {
      page,
      perPage: limit,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      hasNextPage: page * limit < totalRecords,
      hasPreviousPage: page > 1,
    },
  });
});

// Get single order by ID   =>  /api/order/:id

export const getOrderById = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params;
    const order = await OrderDetails.findById(id);

    return NextResponse.json({
      success: true,
      data: order,
    });
  }
);

// Get single order by ID   =>  /api/admin/order/:id

export const getOrderByIdAdmin = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params;
    const order = await OrderDetails.findById(id);
    if (!order) {
      throw new ErrorHandler("You order detail is missing", 403);
    }

    await order?.populate("user");
    // const workService = await WorkService.findOne({
    //   serviceCode: order?.serviceCode,
    // });

    return NextResponse.json({
      success: true,
      data: { order },
    });
  }
);

// Get single order by ID   =>  /api/generate_invoice/:id
// Update single order by ID   =>  /api/order/:id

export const genrateInvoice = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params;

    const body = await req.json();

    const order = await OrderDetails.findById(id);

    if (order) {
      await order.populate("user");
      const counter = await OrderCounter.findByIdAndUpdate(
        "orderNumber",
        { $inc: { sequenceValue: 1 } },
        {
          new: true,
          upsert: true,
        }
      );

      order.orderNumber = counter.sequenceValue;
      order.scheduleDate = body?.servicingDate;
      order.orderStatus = "Verified";
      await order.save();

      return NextResponse.json({
        success: true,
        data: order,
      });
    } else {
      return NextResponse.json({
        success: false,
        data: {
          error: "something went wrong",
        },
      });
    }
  }
);

// Get single order by ID   =>  /api/quotation/:id
// Get single order by ID   =>  /api/admin/order/:id

export const genrateEstimation = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params;
    const body = await req.json();
    const order = await OrderDetails.findById(id);
    if (!order) {
      throw new ErrorHandler("You order detail is missing", 403);
    }
    if (order) {
      const counter = await OrderCounter.findByIdAndUpdate(
        "orderNumber",
        { $inc: { sequenceValue: 1 } },
        {
          new: true,
          upsert: true,
        }
      );
      order.orderNumber = counter.sequenceValue;
      order.orderStatus = "Verified";
      order.scheduleDate = body?.servicingDate;
      await order.save();
    }

    return NextResponse.json({
      success: true,
      data: order,
    });
  }
);

// Upload product images  =>  /api/admin/order/upload_invoice/:id
export const uploadInvoiceImages = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params;
    const order = await OrderDetails.findById(id).populate("user");
    const body = await req.json();
    if (!order) {
      throw new ErrorHandler("Order not found", 404);
    }
    if (body?.images.length === 0) {
      throw new ErrorHandler("Bad request, please select image", 400);
    }

    const invoiceData = await Invoice.findOne({
      orderDetail: id,
    });

    let totalPrice = 0;

    if (invoiceData) {
      const { invoice } = invoiceData;
      totalPrice = invoice.reduce((total, item) => total + item.totalPrice, 0);
    }
    const minValue = totalPrice * 0.25;
    let minAmount = minValue < 350 ? 350.0 : minValue.toFixed(2);

    const uploaded = await upload_file(
      body.images[0].file,
      "office_chair_app/invoices",
      "image"
    );
    //@ts-ignore
    order.quotation.push(uploaded);

    await order.save();
    if (order.user && !(order.user instanceof mongoose.Types.ObjectId)) {
      //ToDO generate payment link paymentLink;
      const message = userInvoiceTemplate(
        order.user.name,
        uploaded.url,
        "www.zhelps.in",
        totalPrice ?? 1000,
        Number(minAmount),
        "zhelps.in",
        process.env.API_URL
      );

      try {
        await sendEmail({
          email: order?.user?.email,
          subject:
            "ZHelps | Service Request Approved – Quotation & Payment Required",
          message,
        });
      } catch (error: unknown) {
        throw new ErrorHandler((error as Error)?.message, 500);
      }
    }
    return NextResponse.json({
      success: true,
      data: {
        message:
          "Invoice has been uploaded and notification has been sent to the customer",
      },
    });
  }
);
