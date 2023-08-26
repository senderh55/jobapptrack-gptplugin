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

  const applications: JobApplication[] = [];

  const stream = fs
    .createReadStream(process.env.CSV_FILE_PATH)
    .pipe(csvParser());

  for await (const row of stream) {
    applications.push(row);
  }

  return applications;
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

export { loadApplicationsFromCSV, updateCSVFile, addJobApplicationToCSV };
