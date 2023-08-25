import { NextResponse, NextRequest } from "next/server";
import { createJobApplication } from "@/lib/jobApplicationUtils";
import commonHeaders from "@/lib/commonHeaders";

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
      headers: commonHeaders,
    }
  );
}

export async function OPTIONS() {
  const { json: jsonResponse } = NextResponse;
  return jsonResponse(
    {},
    {
      status: 200,
      headers: commonHeaders,
    }
  );
}
