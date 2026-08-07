import dbConnect from "@/backend/config/dbConnect";
import { addAddress } from "@/backend/controllers/authControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser).put(addAddress);

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
