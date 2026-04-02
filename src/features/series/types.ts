export type SeriesSummary = {
  studyInstanceUID?: string;
  seriesInstanceUID: string;
  modality: string;
  seriesNumber?: string;
  description: string;
  instances: number;
};

export type SeriesQuery = {
  studyInstanceUID?: string;
  modality?: string;
  seriesDescription?: string;
  limit?: number;
  offset?: number;
};
