import { NextResponse, NextRequest } from "next/server";
import { editJobApplication } from "@/lib/jobApplicationUtils";
import commonHeaders from "@/lib/commonHeaders";

export async function POST(req: NextRequest) {
  const body = await req.json();
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
