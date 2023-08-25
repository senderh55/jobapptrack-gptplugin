import {
  JobApplication,
  JobApplicationsType,
} from "./jobApplicationInterfaces";
import { loadApplicationsFromCSV, updateCSVFile } from "./csvUtils";

let jobApplications: JobApplicationsType = [];
// FIXME
async function loadJobApplications() {
  try {
    jobApplications = await loadApplicationsFromCSV();
  } catch (error) {
    console.error("Error loading job applications:", error);
    throw error;
  }
}

async function createJobApplication(application: JobApplication) {
  jobApplications.push(application);
  await updateCSVFile(jobApplications);
}

function editJobApplication(application: JobApplication) {
  const index = jobApplications.findIndex(
    (item) => item.applicationId === application.applicationId
  );
  if (index !== -1) {
    jobApplications[index] = application;
    updateCSVFile(jobApplications);
  }
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

export {
  loadJobApplications,
  createJobApplication,
  editJobApplication,
  deleteJobApplication,
};
