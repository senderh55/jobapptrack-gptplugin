import { NextResponse } from "next/server";
import { loadJobApplications } from "@/lib/jobApplicationUtils";

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
        headers: {
          "Access-Control-Allow-Origin": "https://chat.openai.com",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers":
            "Content-Type, Authorization, openai-ephemeral-user-id, openai-conversation-id",
        },
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
      headers: {
        "Access-Control-Allow-Origin": "https://chat.openai.com",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, openai-ephemeral-user-id, openai-conversation-id",
      },
    }
  );
}
