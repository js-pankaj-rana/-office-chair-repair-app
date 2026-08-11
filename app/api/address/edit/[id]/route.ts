import dbConnect from "@/backend/config/dbConnect";
import { editAddress } from "@/backend/controllers/authControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";

interface RequestContext {
  params: Promise<{
    id: string;
  }>;
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser).put(editAddress);

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return (await router.run(request, ctx)) as Response;
}
