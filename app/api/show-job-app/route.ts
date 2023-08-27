import { NextResponse } from "next/server";
import { loadApplicationsFromCSV } from "@/lib/csvUtils";
import commonHeaders from "@/lib/commonHeaders";

export const GET = async () => {
  try {
    const applications = await loadApplicationsFromCSV();
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
