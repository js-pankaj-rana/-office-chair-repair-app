import { createEdgeRouter } from "next-connect";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/backend/config/dbConnect";
import {
  createWorkService,
  getWorkServices,
} from "@/backend/controllers/workServiceController";

interface RequestContext {
  params: Promise<{
    id: string;
  }>;
}

dbConnect();

const router = createEdgeRouter<NextRequest, {}>();

router.get(getWorkServices);
router.post(createWorkService);

export async function GET(request: NextRequest, ctx: {}) {
  return (await router.run(request, ctx)) as Response;
}

export async function POST(request: NextRequest, ctx: {}) {
  return (await router.run(request, ctx)) as Response;
}
