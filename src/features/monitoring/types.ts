export type QueueTask = {
  taskID: string;
  queueName: string;
  status: string;
  deviceName: string;
  localAET?: string;
  remoteAET?: string;
  studyInstanceUID?: string;
  createdTime?: string;
  updatedTime?: string;
  scheduledTime?: string;
};

export type QueueTaskQuery = {
  queueName: string;
  status?: string;
  localAET?: string;
  remoteAET?: string;
  studyInstanceUID?: string;
  limit?: number;
  offset?: number;
};
