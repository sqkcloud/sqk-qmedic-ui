export type PatientSummary = {
  patientID: string;
  patientName: string;
  birthDate?: string;
  sex?: string;
  studies?: number;
  series?: number;
  instances?: number;
};

export type PatientQuery = {
  patientName?: string;
  patientID?: string;
  fuzzymatching?: boolean;
  limit?: number;
  offset?: number;
};
