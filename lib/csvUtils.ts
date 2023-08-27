import fs from "fs";
import csvParser from "csv-parser";
import { createObjectCsvWriter } from "csv-writer";
import {
  JobApplication,
  JobApplicationsType,
} from "./jobApplicationInterfaces";

async function loadApplicationsFromCSV(): Promise<JobApplication[]> {
  if (!process.env.CSV_FILE_PATH) {
    throw new Error("CSV file path not defined");
  }
  const path = process.env.CSV_FILE_PATH;
  return new Promise((resolve, reject) => {
    const applications: JobApplication[] = [];

    const stream = fs
      .createReadStream(path)
      .pipe(csvParser())
      .on("data", (row) => {
        applications.push(row);
      })
      .on("end", () => {
        resolve(applications);
      })
      .on("error", (error) => {
        reject(error);
      });
    return applications;
  });
}

async function updateCSVFile(applications: JobApplicationsType): Promise<void> {
  if (!process.env.CSV_FILE_PATH) {
    throw new Error("CSV file path not defined");
  }

  const csvWriter = createObjectCsvWriter({
    path: process.env.CSV_FILE_PATH,
    header: [
      { id: "company", title: "Company" },
      { id: "jobTitle", title: "Job Title" },
      { id: "applicationDate", title: "Date of Application" },
      { id: "contactPerson", title: "Contact Person" },
      { id: "status", title: "Status" },
      { id: "notes", title: "Notes" },
    ],
  });

  const csvData = applications.map((application: JobApplication) => {
    return {
      company: application.Company,
      jobTitle: application["Job Title"],
      applicationDate: application["Date of Application"],
      contactPerson: application["Contact Person"] || "Not provided",
      status: application.Status,
      notes: application.Notes,
    };
  });

  await csvWriter.writeRecords(csvData);
  console.log("CSV file updated");
}
async function addJobApplicationToCSV(
  jobApplicationString: string
): Promise<void> {
  const applications = await loadApplicationsFromCSV();
  const parsedApplication: JobApplication = {};
  const lines = jobApplicationString.split("\n");
  for (const line of lines) {
    const [key, value] = line.split(":").map((str) => str.trim());
    if (key && value) {
      parsedApplication[key] = value;
    }
  }
  applications.push(parsedApplication);
  await updateCSVFile(applications);
}

async function deleteJobApplicationByCompany(
  companyName: string
): Promise<void> {
  try {
    const applications = await loadApplicationsFromCSV();
    const filteredApplications = applications.filter(
      (application) => application.Company !== companyName
    );
    await updateCSVFile(filteredApplications);
    console.log(`Job applications for '${companyName}' deleted successfully`);
  } catch (error) {
    throw error;
  }
}

export {
  loadApplicationsFromCSV,
  updateCSVFile,
  addJobApplicationToCSV,
  deleteJobApplicationByCompany,
};
