import { NextResponse } from "next/server";
import { loadJobApplications } from "@/lib/jobApplicationUtils";
import commonHeaders from "@/lib/commonHeaders";

// FIXME
export const GET = async () => {
  try {
    // Load job applications from CSV
    const applications = await loadJobApplications();

    // Return the job applications
    return NextResponse.json(
      {
        applications,
      },
      {
        status: 200,
        headers: commonHeaders,
      }
    );
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      {
        error: "An error occurred",
      },
      {
        status: 500,
      }
    );
  }
};

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: commonHeaders,
    }
  );
}
