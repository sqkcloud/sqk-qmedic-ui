export type DeviceRow = {
  name: string;
  department: string;
  description: string;
  manufacturer: string;
  model: string;
  primaryType: string;
  stationName: string;
  installed: boolean;
};

export type AeRow = {
  aeTitle: string;
  description: string;
  host: string;
  port: number;
  installed: boolean;
};

export type WebAppRow = {
  applicationName: string;
  servicePath: string;
  aet: string;
  applicationCluster: string;
  keycloakClient: string;
};

export type Hl7Row = {
  applicationName: string;
  facility: string;
  host: string;
  port: number;
  acceptedSendingApplications: string;
};

export type ControlRow = {
  action: string;
  target: string;
  status: string;
  lastRun: string;
};

export const deviceRows: DeviceRow[] = [
  { name: 'dcm4chee-arc', department: 'Radiology', description: 'Archive core', manufacturer: 'dcm4che.org', model: 'dcm4chee-arc', primaryType: 'ARCHIVE', stationName: 'ARC01', installed: true },
  { name: 'keycloak', department: 'Security', description: 'OIDC provider', manufacturer: 'Keycloak', model: '26.x', primaryType: 'AUTH', stationName: 'AUTH01', installed: true },
  { name: 'logstash', department: 'Observability', description: 'Log collector', manufacturer: 'Elastic', model: '8.x', primaryType: 'LOG', stationName: 'LOG01', installed: true },
  { name: 'scheduledstation', department: 'Workflow', description: 'Scheduling station', manufacturer: 'SQK', model: 'QM-WS', primaryType: 'WORKSTATION', stationName: 'MWL01', installed: true },
  { name: 'storescp', department: 'Ingress', description: 'Store SCP node', manufacturer: 'dcm4che.org', model: 'storescp', primaryType: 'ARCHIVE', stationName: 'INGEST01', installed: true },
  { name: 'stowrsd', department: 'DICOMweb', description: 'STOW-RS node', manufacturer: 'dcm4che.org', model: 'stowrsd', primaryType: 'ARCHIVE', stationName: 'WEB01', installed: true },
];

export const aeRows: AeRow[] = [
  { aeTitle: 'DCM4CHEE', description: 'Primary archive AE', host: 'archive.internal', port: 11112, installed: true },
  { aeTitle: 'STORESCP', description: 'Ingress storage AE', host: 'storescp.internal', port: 11113, installed: true },
  { aeTitle: 'STGCMTSCU', description: 'Storage commitment', host: 'stgcmt.internal', port: 11114, installed: true },
  { aeTitle: 'OHIF_VIEWER', description: 'Viewer integration', host: 'viewer.internal', port: 80, installed: true },
];

export const webAppRows: WebAppRow[] = [
  { applicationName: 'arc-ui2', servicePath: '/dcm4chee-arc/ui2', aet: 'DCM4CHEE', applicationCluster: 'archive-ui', keycloakClient: 'dcm4chee-ui' },
  { applicationName: 'ohif', servicePath: '/ohif', aet: 'DCM4CHEE', applicationCluster: 'viewer', keycloakClient: 'ohif-ui' },
  { applicationName: 'qmedic-console', servicePath: '/console', aet: 'DCM4CHEE', applicationCluster: 'sqk', keycloakClient: 'sqk-ui' },
];

export const hl7Rows: Hl7Row[] = [
  { applicationName: 'hl7-inbound', facility: 'SQK-RAD', host: 'hl7.internal', port: 2575, acceptedSendingApplications: 'RIS|EMR' },
  { applicationName: 'hl7-outbound', facility: 'SQK-RAD', host: 'hl7-out.internal', port: 2576, acceptedSendingApplications: 'DCM4CHEE' },
];

export const controlRows: ControlRow[] = [
  { action: 'Purge expired studies', target: 'Archive', status: 'Idle', lastRun: '2026-03-31 23:40' },
  { action: 'Reschedule failed exports', target: 'ExportQueue', status: 'Ready', lastRun: '2026-03-31 22:10' },
  { action: 'Verify storage systems', target: 'Storage', status: 'Ready', lastRun: '2026-03-31 20:05' },
  { action: 'Refresh Keycloak cache', target: 'Auth', status: 'Idle', lastRun: '2026-03-31 19:45' },
];
