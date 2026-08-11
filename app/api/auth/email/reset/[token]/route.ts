import dbConnect from "@/backend/config/dbConnect";
import { resetEmail } from "@/backend/controllers/authControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
  params: Promise<{
    token: string;
  }>;
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.get(resetEmail);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return (await router.run(request, ctx)) as Response;
}
