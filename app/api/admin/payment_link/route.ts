import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Get request body from your frontend
    const body = await req.json();

    const { client_id, amount, order_id, callback_url, customer_details } =
      body;

    // Validate required fields
    if (
      !client_id ||
      !amount ||
      !order_id ||
      !callback_url ||
      !customer_details
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const baseUrl = process.env.WIZ_BASE_URL;

    if (!baseUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "WIZ_BASE_URL is not configured",
        },
        { status: 500 }
      );
    }

    // Call WIZ external API
    const response = await fetch(`${baseUrl}/api/wiz/external/order/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id,
        amount,
        order_id,
        callback_url,
        customer_details,
      }),
    });

    // Try to parse JSON response
    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("WIZ order creation error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create WIZ order",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
