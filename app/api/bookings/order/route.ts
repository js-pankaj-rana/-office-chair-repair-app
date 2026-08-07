import dbConnect from "@/backend/config/dbConnect";
import { newOrder } from "@/backend/controllers/orderDetailController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser).post(newOrder);

export async function POST(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
