import dbConnect from "@/backend/config/dbConnect";
import { emailValidation } from "@/backend/controllers/authControllers";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
  params: Promise<{
    token: string;
  }>;
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.get(emailValidation);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
