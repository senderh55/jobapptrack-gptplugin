// jobApplicationInterfaces.ts
interface JobApplication {
  [key: string]: string;
}

type JobApplicationsType = JobApplication[];

export type { JobApplication, JobApplicationsType };
