import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";
import dbConnect from "@/backend/config/dbConnect";
import {
  createWorkService,
  getWorkServices,
} from "@/backend/controllers/workServiceController";

dbConnect();

const router = createEdgeRouter<NextRequest>();

router.get(getWorkServices);
router.post(createWorkService);

export async function GET(req: NextRequest, ctx: unknown) {
  return router.run(req, ctx);
}

export async function POST(req: NextRequest, ctx: unknown) {
  return router.run(req, ctx);
}
