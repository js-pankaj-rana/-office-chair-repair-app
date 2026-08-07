import dbConnect from "@/backend/config/dbConnect";
import {
  createInvoice,
  getInvoices,
} from "@/backend/controllers/invoicesController";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/backend/middlewares/auth";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles("admin")).get(getInvoices);
router.use(isAuthenticatedUser, authorizeRoles("admin")).post(createInvoice);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}

export async function POST(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
