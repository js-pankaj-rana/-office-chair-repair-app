import dbConnect from "@/backend/config/dbConnect";
import { getInvoiceByOrder } from "@/backend/controllers/invoicesController";
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

router.use(isAuthenticatedUser, authorizeRoles("admin")).get(getInvoiceByOrder);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
