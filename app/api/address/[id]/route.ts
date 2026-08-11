import dbConnect from "@/backend/config/dbConnect";
import { getAddressById } from "@/backend/controllers/authControllers";
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

router.use(isAuthenticatedUser).get(getAddressById);

export async function GET(
  request: NextRequest,
  ctx: RequestContext
): Promise<Response> {
  return (await router.run(request, ctx)) as Response;
}
