export type AssociationRow = {
  localAET: string;
  remoteAET: string;
  invokedOps: number;
  performedOps: number;
  connectionTimeServer: string;
  connectionTimeBrowser: string;
  duration: string;
  status: string;
};

export type QueueRow = {
  queueName: string;
  status: string;
  deviceName: string;
  localAET: string;
  remoteAET: string;
  taskID: string;
  studyInstanceUID: string;
  updatedTime: string;
  createdTime: string;
};

export type TransferRow = {
  studyInstanceUID: string;
  patientID: string;
  destination: string;
  state: string;
  updatedAt: string;
};

export type StorageSystemRow = {
  storageID: string;
  path: string;
  availability: string;
  capacity: string;
  used: string;
};

export type StorageVerificationRow = {
  storageID: string;
  verifiedAt: string;
  verifiedObjects: number;
  failedObjects: number;
  state: string;
};

export type MetricRow = {
  name: string;
  value: string;
  unit: string;
  updatedAt: string;
};

export const associationRows: AssociationRow[] = [
  { localAET: 'DCM4CHEE', remoteAET: 'STORESCU01', invokedOps: 2, performedOps: 14, connectionTimeServer: '2026-04-01 11:20:10', connectionTimeBrowser: '11:20:10', duration: '00:12:08.221', status: 'OPEN' },
  { localAET: 'DCM4CHEE', remoteAET: 'OHIF_VIEWER', invokedOps: 0, performedOps: 7, connectionTimeServer: '2026-04-01 11:24:52', connectionTimeBrowser: '11:24:52', duration: '00:07:41.102', status: 'OPEN' },
];

export const exportRows: TransferRow[] = [
  { studyInstanceUID: '1.2.840.10008.1.1001', patientID: 'C021', destination: 'PACS_DR', state: 'SCHEDULED', updatedAt: '2026-04-01 11:10' },
  { studyInstanceUID: '1.2.840.10008.1.1002', patientID: 'C052', destination: 'RESEARCH_NODE', state: 'COMPLETED', updatedAt: '2026-04-01 10:44' },
];

export const retrieveRows: TransferRow[] = [
  { studyInstanceUID: '1.2.840.10008.1.2001', patientID: 'C130', destination: 'EXT_ARCHIVE', state: 'RUNNING', updatedAt: '2026-04-01 11:16' },
  { studyInstanceUID: '1.2.840.10008.1.2002', patientID: 'C081', destination: 'VNA_A', state: 'FAILED', updatedAt: '2026-04-01 10:51' },
];

export const compareRows: TransferRow[] = [
  { studyInstanceUID: '1.2.840.10008.1.3001', patientID: 'C004', destination: 'mirror-archive', state: 'MATCH', updatedAt: '2026-04-01 11:03' },
  { studyInstanceUID: '1.2.840.10008.1.3002', patientID: 'C067', destination: 'mirror-archive', state: 'MISMATCH', updatedAt: '2026-04-01 10:38' },
];

export const storageCommitmentRows: TransferRow[] = [
  { studyInstanceUID: '1.2.840.10008.1.4001', patientID: 'C095', destination: 'STGCMTSCU', state: 'PENDING', updatedAt: '2026-04-01 11:18' },
  { studyInstanceUID: '1.2.840.10008.1.4002', patientID: 'C099', destination: 'STGCMTSCU', state: 'SUCCESS', updatedAt: '2026-04-01 10:22' },
];

export const storageSystemRows: StorageSystemRow[] = [
  { storageID: 'fs1', path: '/srv/archive/fs1', availability: 'ONLINE', capacity: '50 TB', used: '18.4 TB' },
  { storageID: 'fs2', path: '/srv/archive/fs2', availability: 'ONLINE', capacity: '100 TB', used: '71.2 TB' },
  { storageID: 'glacier-tier', path: 's3://sqk-archive-glacier', availability: 'NEARLINE', capacity: 'Unlimited', used: '12.1 TB' },
];

export const storageVerificationRows: StorageVerificationRow[] = [
  { storageID: 'fs1', verifiedAt: '2026-04-01 09:15', verifiedObjects: 5400, failedObjects: 0, state: 'OK' },
  { storageID: 'fs2', verifiedAt: '2026-04-01 09:18', verifiedObjects: 7200, failedObjects: 2, state: 'WARNING' },
];

export const metricRows: MetricRow[] = [
  { name: 'Archive disk usage', value: '89.6', unit: '%', updatedAt: '2026-04-01 11:30' },
  { name: 'Inbound associations', value: '2', unit: 'open', updatedAt: '2026-04-01 11:30' },
  { name: 'Queued export tasks', value: '3', unit: 'tasks', updatedAt: '2026-04-01 11:30' },
  { name: 'Failed retrievals (24h)', value: '1', unit: 'tasks', updatedAt: '2026-04-01 11:30' },
];
