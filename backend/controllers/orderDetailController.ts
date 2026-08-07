import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import OrderDetails, { IImage, ImageItem } from "../models/orderdetails";
import ErrorHandler from "../utils/errorHandler";
import { upload_file, delete_file } from "../utils/cloudinary";
import { OrderCounter } from "../utils/counter";
import WorkService from "../models/workservice";
import { image } from "html2canvas/dist/types/css/types/image";
import sendEmail from "../utils/sendEmail";
import { emailUserInvoiceTemplate } from "../utils/emailUserInvoiceTemplate";

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

    const { gstin, billingName, ...billingAddress } = body?.billingAddress;

    const order = await OrderDetails.findByIdAndUpdate(id, {
      $set: {
        faultDescription: body?.faultDescription,
        quantityOrdered: body?.quantityOrdered,
        scheduleDate: body?.scheduleDate,
        shippingAddress: body?.shippingAddress,
        orderStatus: "Initiated",
        gstin,
        billingName,
        billingAddress: billingAddress,
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

    const uploader = (images: ImageItem[]) =>
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
    console.log("body===>>>>", body);
    const order = await OrderDetails.findById(orderId);

    if (!order) {
      throw new ErrorHandler("Order not found", 404);
    }

    const isDeleted = await delete_file(body.public_id);
    console.log(isDeleted);

    if (isDeleted) {
      order.productImages = order?.productImages.filter(
        (img: IImage) => img.public_id !== body.public_id
      );
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
    const workService = await WorkService.findOne({
      serviceCode: order?.serviceCode,
    });

    return NextResponse.json({
      success: true,
      data: { order, workService },
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
    }

    await order.save();

    return NextResponse.json({
      success: true,
      data: order,
    });
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

    const uploaded = await upload_file(
      body.images[0].file,
      "office_chair_app/invoices",
      "image"
    );

    order.quotation.push(uploaded);

    await order.save();
    console.log("uploaded.url===>>>", uploaded.url);
    console.log("uploaded.url===>>>", order.user?.name);

    const message = emailUserInvoiceTemplate(order.user.name, uploaded.url);

    try {
      await sendEmail({
        email: order.user.email,
        subject: "ZHelps | Quotation/Estimate Generated",
        message,
      });
    } catch (error: unknown) {
      console.log("error===>>>", error);
      throw new ErrorHandler((error as Error)?.message, 500);
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
