import { NextResponse, NextRequest } from "next/server";
import { createJobApplication } from "@/lib/jobApplicationUtils";

export async function POST(req: NextRequest) {
  const { json } = req;
  const { body } = await json();
  console.log("body: ", body);
  createJobApplication(body);
  const { json: jsonResponse } = NextResponse;
  return jsonResponse(
    { success: true },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "https://chat.openai.com",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, openai-ephemeral-user-id, openai-conversation-id",
      },
    }
  );
}

export async function OPTIONS() {
  const { json: jsonResponse } = NextResponse;
  return jsonResponse(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "https://chat.openai.com",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, openai-ephemeral-user-id, openai-conversation-id",
      },
    }
  );
}
