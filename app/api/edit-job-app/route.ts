import { NextResponse, NextRequest } from "next/server";
import { editJobApplication } from "@/lib/jobApplicationUtils";
import commonHeaders from "@/lib/commonHeaders";

export async function PUT(req: NextRequest) {
  const body = await req.json();
  console.log("body: ", body);
  editJobApplication(body);
  return NextResponse.json(
    { success: true },
    {
      status: 200,
      headers: commonHeaders,
    }
  );
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: commonHeaders,
    }
  );
}
