import { NextResponse } from "next/server";
import { loadApplicationsFromCSV } from "@/lib/csvUtils";
import commonHeaders from "@/lib/commonHeaders";
export const GET = async () => {
  try {
    const rawApplications = await loadApplicationsFromCSV();
    const applications = rawApplications.map((application) => {
      console.log(application);
      return {
        company: application.Company,
        jobTitle: application["Job Title"],
        applicationDate: application["Date of Application"],
        contactPerson: application["Contact Person"] || "Not provided",
        status: application.Status,
        notes: application.Notes,
      };
    });

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
