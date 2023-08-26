import {
  JobApplication,
  JobApplicationsType,
} from "./jobApplicationInterfaces";
import {
  loadApplicationsFromCSV,
  deleteJobApplicationByCompany,
  addJobApplicationToCSV,
} from "./csvUtils";

let jobApplications: JobApplicationsType = [];

function extractCompanyName(application: JobApplication): string | null {
  const match = application.jobApplication.match(/Company: (.+?)(\n|$)/);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}

async function loadJobApplications() {
  try {
    jobApplications = await loadApplicationsFromCSV();
  } catch (error) {
    console.error("Error loading job applications:", error);
    throw error;
  }
}

async function createJobApplication(application: JobApplication) {
  await addJobApplicationToCSV(application["jobApplication"].trim());
}

async function deleteJobApplication(application: JobApplication) {
  const companyName = extractCompanyName(application);
  if (companyName) {
    await deleteJobApplicationByCompany(companyName);
  } else {
    console.log("Company name not found");
  }
}

async function editJobApplication(application: JobApplication) {
  const companyName = extractCompanyName(application);
  if (companyName) {
    await deleteJobApplicationByCompany(companyName);
    await addJobApplicationToCSV(application["jobApplication"].trim());
  } else {
    console.log("Company name not found");
  }
}

export {
  loadJobApplications,
  createJobApplication,
  deleteJobApplication,
  editJobApplication,
};
