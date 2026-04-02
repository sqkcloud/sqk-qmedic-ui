export type MPPSItem = {
  patientName: string;
  patientID: string;
  accessionNumber?: string;
  mppsUID: string;
  status?: string;
  startDate?: string;
  startTime?: string;
};

export type MPPSQuery = {
  patientName?: string;
  patientID?: string;
  accessionNumber?: string;
  status?: string;
  limit?: number;
  offset?: number;
};
