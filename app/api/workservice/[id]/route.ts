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

export async function GET(req: NextRequest, ctx: RequestContext) {
  return router.run(req, ctx);
}

export async function PUT(req: NextRequest, ctx: RequestContext) {
  return router.run(req, ctx);
}

export async function DELETE(req: NextRequest, ctx: RequestContext) {
  return router.run(req, ctx);
}
