export type StudySummary = {
  studyInstanceUID: string;
  patientName: string;
  patientID?: string;
  accessionNumber: string;
  modalities: string;
  studyDate: string;
  description: string;
  instances: number;
  series: number;
};

export type StudySeriesSummary = {
  seriesInstanceUID: string;
  modality: string;
  seriesNumber?: string;
  description: string;
  instances: number;
};

export type StudyDetail = {
  summary: StudySummary;
  series: StudySeriesSummary[];
};

export type StudyQuery = {
  patientName?: string;
  patientID?: string;
  accessionNumber?: string;
  studyDate?: string;
  modality?: string;
  limit?: number;
  offset?: number;
};
