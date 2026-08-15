import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import Invoice from "../models/invoices";
import ErrorHandler from "../utils/errorHandler";
import OrderDetails from "../models/orderdetails";
import { OrderCounter } from "../utils/counter";

// Create Invoice => /api/invoice
export const createInvoice = catchAsyncErrors(async (req: NextRequest) => {
  //orderDetail:ID should require;
  const body = await req.json();
  const orderId = body.orderDetail;
  const invoiceData = await Invoice.create(body);

  const totalPrice = Number(
    invoiceData.invoice
      .reduce((total, item) => total + item.totalPrice, 0)
      .toFixed(2)
  );

  const minAdvancePrice = totalPrice * 0.25;

  const order = await OrderDetails.findById(orderId).populate("user");
  //@ts-ignore
  if (!order) {
    throw new ErrorHandler("Order not found", 404);
  }
  const user = order.user as unknown as {
    email: string;
    phone: string;
    name: string;
  };

  const { email, phone, name } = user;

  const counter = await OrderCounter.findByIdAndUpdate(
    "orderNumber",
    { $inc: { sequenceValue: 1 } },
    {
      returnDocument: "after",
    }
  );
  if (!counter) {
    throw new ErrorHandler("Unable to generate order number", 500);
  }

  order.orderNumber = counter.sequenceValue;
  order.orderStatus = "Verified";

  const smepayBaseURL = process.env.SME_PAY_URL || "https://staging.smepay.in";
  const smePaymentAuth = await fetch(`${smepayBaseURL}/api/wiz/external/auth`, {
    method: "POST",
    body: JSON.stringify({
      client_id: process.env.APP_SME_CLIENT_ID,
      client_secret: process.env.APP_SME_CLIENT_SECREAT,
    }),
  });

  const authData = await smePaymentAuth.json();

  if (!authData.access_token) {
    throw new ErrorHandler("Issue with payment link generate", 405);
  }

  const requestPayload = {
    client_id: process.env.APP_SME_CLIENT_ID,
    amount:
      minAdvancePrice < 350 ? 350.0 : Math.round(minAdvancePrice).toFixed(2),
    order_id: orderId,
    callback_url: process.env.PAYMENT_CALLBACK_URL,
    customer_details: {
      email,
      phone,
      name,
    },
  };

  const smePaymentResponse = await fetch(
    `${smepayBaseURL}/api/wiz/external/order/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authData.access_token}`,
      },
      body: JSON.stringify(requestPayload),
    }
  );
  if (!smePaymentResponse.ok) {
    throw new ErrorHandler(
      "Error on payment server",
      smePaymentResponse.status
    );
  }

  const paymentData = await smePaymentResponse.json();
  console.log(paymentData);
  order.paymentInfo.push({
    amount: Number(paymentData.amount),
    payment_url: paymentData.payment_url,
    payment_status: paymentData.payment_status,
    ref_id: paymentData.ref_id,
  });

  await order.save();

  return NextResponse.json({
    success: true,
    data: invoiceData,
  });
});

// Update Invoice => /api/invoice/update/:id
export const updateInvoice = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params;
    const body = await req.json();

    const invoice = await Invoice.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!invoice) {
      throw new ErrorHandler("Invoice not found.", 404);
    }

    return NextResponse.json({
      success: true,
      data: invoice,
    });
  }
);

// Delete Invoice => /api/invoice/delete/:id
export const deleteInvoice = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params;

    const invoice = await Invoice.findById(id);

    if (!invoice) {
      throw new ErrorHandler("Invoice not found.", 404);
    }

    await Invoice.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      data: {
        message: "Invoice deleted successfully.",
      },
    });
  }
);

// Get Invoice By Id => /api/invoice/:id
export const getInvoiceById = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params;

    const invoice = await Invoice.findById(id).populate("orderDetail");

    if (!invoice) {
      throw new ErrorHandler("Invoice not found.", 404);
    }

    return NextResponse.json({
      success: true,
      data: invoice,
    });
  }
);

// Get All Invoices => /api/invoice
export const getInvoices = catchAsyncErrors(async () => {
  const invoices = await Invoice.find()
    .populate("orderDetail")
    .sort({ createdAt: -1 });

  return NextResponse.json({
    success: true,
    count: invoices.length,
    data: invoices,
  });
});

// Get Invoice By Order => /api/invoice/order/:orderDetailId
export const getInvoiceByOrder = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await params;
    const invoice = await Invoice.findOne({
      orderDetail: id,
    }).populate("orderDetail");

    if (!invoice) {
      throw new ErrorHandler("Invoice not found.", 404);
    }

    return NextResponse.json({
      success: true,
      data: invoice,
    });
  }
);

// POST    /api/admin/invoice                    -> createInvoice
// GET     /api/admin/invoice                    -> getInvoices
// GET     /api/admin/invoice/[id]               -> getInvoiceById
// PUT     /api/admin/invoice/update/[id]        -> updateInvoice
// DELETE  /api/admin/invoice/delete/[id]        -> deleteInvoice
// GET     /api/admin/invoice/order/[orderId]    -> getInvoiceByOrder
