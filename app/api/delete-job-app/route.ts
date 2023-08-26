import { NextResponse, NextRequest } from "next/server";
import { deleteJobApplication } from "@/lib/jobApplicationUtils";
import commonHeaders from "@/lib/commonHeaders";

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  deleteJobApplication(body);
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
