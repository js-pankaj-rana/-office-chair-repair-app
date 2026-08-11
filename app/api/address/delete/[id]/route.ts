import dbConnect from "@/backend/config/dbConnect";
import { deleteAddress } from "@/backend/controllers/authControllers";
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

router.use(isAuthenticatedUser).delete(deleteAddress);

export async function DELETE(request: NextRequest, ctx: RequestContext) {
  return (await router.run(request, ctx)) as Response;
}
