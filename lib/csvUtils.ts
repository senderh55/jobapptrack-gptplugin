import fs from "fs";
import { promisify } from "util";
import { JobApplicationsType } from "./jobApplicationInterfaces";

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function loadApplicationsFromCSV(): Promise<JobApplicationsType> {
  try {
    if (!process.env.CSV_FILE_PATH) {
      throw new Error("CSV file path not defined");
    }
    const csvData = await readFile(process.env.CSV_FILE_PATH, "utf-8");
    const applicationIds = csvData.split("\n").map((line) => line.trim());
    const applications: JobApplicationsType = applicationIds.map((id) => ({
      applicationId: id,
    }));
    return applications;
  } catch (error) {
    console.error("Error loading CSV:", error);
    throw error;
  }
}

async function updateCSVFile(applications: JobApplicationsType): Promise<void> {
  try {
    if (!process.env.CSV_FILE_PATH) {
      throw new Error("CSV file path not defined");
    }
    const applicationIds = applications.map((app) => app.applicationId);
    const csvData = applicationIds.join("\n");
    await writeFile(process.env.CSV_FILE_PATH, csvData, "utf-8");
  } catch (error) {
    console.error("Error updating CSV:", error);
    throw error;
  }
}

export { loadApplicationsFromCSV, updateCSVFile };
