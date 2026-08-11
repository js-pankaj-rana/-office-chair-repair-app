import dbConnect from "@/backend/config/dbConnect";
import { uploadProductImages } from "@/backend/controllers/orderDetailController";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
  params: Promise<{
    id: string;
  }>;
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser).put(uploadProductImages);

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return (await router.run(request, ctx)) as Response;
}
