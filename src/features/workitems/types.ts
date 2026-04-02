export type Workitem = {
  upsUID: string;
  patientName?: string;
  patientID?: string;
  state?: string;
  label?: string;
  scheduledTime?: string;
};

export type WorkitemQuery = {
  patientName?: string;
  patientID?: string;
  state?: string;
  scheduledTime?: string;
  worklistLabel?: string;
  limit?: number;
  offset?: number;
};
