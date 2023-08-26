import {
  JobApplication,
  JobApplicationsType,
} from "./jobApplicationInterfaces";
import {
  loadApplicationsFromCSV,
  updateCSVFile,
  addJobApplicationToCSV,
} from "./csvUtils";

let jobApplications: JobApplicationsType = [];

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

function deleteJobApplication(application: JobApplication) {
  const index = jobApplications.findIndex(
    (item) => item.applicationId === application.applicationId
  );
  if (index !== -1) {
    jobApplications.splice(index, 1);
    updateCSVFile(jobApplications);
  }
}

export { loadJobApplications, createJobApplication, deleteJobApplication };
