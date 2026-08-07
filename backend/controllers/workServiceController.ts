import { NextRequest, NextResponse } from "next/server";
import WorkServices from "@/backend/models/workservice";
import ErrorHandler from "@/backend/utils/errorHandler";
import { catchAsyncErrors } from "@/backend/middlewares/catchAsyncErrors";

// Create Work Service
export const createWorkService = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const workService = await WorkServices.create(body);

  return NextResponse.json(
    {
      success: true,
      data: workService,
    },
    { status: 201 }
  );
});

// Get All Work Services
export const getWorkServices = catchAsyncErrors(async () => {
  const workServices = await WorkServices.find().sort({
    serviceName: 1,
  });

  return NextResponse.json({
    success: true,
    count: workServices.length,
    data: workServices,
  });
});

// Get Single Work Service
export const getWorkService = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const workService = await WorkServices.findById(id);

    if (!workService) {
      throw new ErrorHandler("Work service not found.", 404);
    }

    return NextResponse.json({
      success: true,
      data: workService,
    });
  }
);

// Update Work Service
export const updateWorkService = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const body = await req.json();

    const workService = await WorkServices.findById(id);

    if (!workService) {
      throw new ErrorHandler("Work service not found.", 404);
    }

    const updatedWorkService = await WorkServices.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json({
      success: true,
      data: updatedWorkService,
    });
  }
);

// Delete Work Service
export const deleteWorkService = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const workService = await WorkServices.findById(id);

    if (!workService) {
      throw new ErrorHandler("Work service not found.", 404);
    }

    await workService.deleteOne();

    return NextResponse.json({
      success: true,
      data: {
        message: "Work service deleted successfully.",
      },
    });
  }
);
