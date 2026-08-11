import dbConnect from "@/backend/config/dbConnect";
import { genrateInvoice } from "@/backend/controllers/orderDetailController";
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

router.use(isAuthenticatedUser, authorizeRoles("admin")).put(genrateInvoice);

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return (await router.run(request, ctx)) as Response;
}
