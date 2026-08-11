import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";
import dbConnect from "@/backend/config/dbConnect";
import {
  getWorkService,
  updateWorkService,
  deleteWorkService,
} from "@/backend/controllers/workServiceController";

interface RequestContext {
  params: Promise<{
    id: string;
  }>;
}

dbConnect();

const router = createEdgeRouter<NextRequest, RequestContext>();

router.get(getWorkService);
router.put(updateWorkService);
router.delete(deleteWorkService);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return (await router.run(request, ctx)) as Response;
}

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return (await router.run(request, ctx)) as Response;
}

export async function DELETE(request: NextRequest, ctx: RequestContext) {
  return (await router.run(request, ctx)) as Response;
}
