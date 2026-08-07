import dbConnect from "@/backend/config/dbConnect";
import {
  getOrderByIdAdmin,
  genrateEstimation,
} from "@/backend/controllers/orderDetailController";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/backend/middlewares/auth";

interface RequestContext {
  params: Promise<{
    id: string;
  }>;
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles("admin")).get(getOrderByIdAdmin);
router.use(isAuthenticatedUser, authorizeRoles("admin")).put(genrateEstimation);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
export async function PUT(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
