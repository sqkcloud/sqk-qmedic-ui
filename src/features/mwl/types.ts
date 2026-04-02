export type MWLItem = {
  patientName: string;
  patientID: string;
  accessionNumber: string;
  modality: string;
  stationAET?: string;
  spsStartDate?: string;
  spsID?: string;
  studyInstanceUID?: string;
};

export type MWLQuery = {
  patientName?: string;
  patientID?: string;
  accessionNumber?: string;
  modality?: string;
  scheduledDate?: string;
  limit?: number;
  offset?: number;
};
