import dbConnect from "@/backend/config/dbConnect";
import { getAllOrder } from "@/backend/controllers/orderDetailController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser).get(getAllOrder);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return (await router.run(request, ctx)) as Response;
}
