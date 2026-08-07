import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import Invoice from "../models/invoices";
import ErrorHandler from "../utils/errorHandler";

// Create Invoice => /api/invoice
export const createInvoice = catchAsyncErrors(async (req: NextRequest) => {
  //orderDetail:ID should require;
  const body = await req.json();
  const invoice = await Invoice.create(body);

  return NextResponse.json({
    success: true,
    data: invoice,
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
