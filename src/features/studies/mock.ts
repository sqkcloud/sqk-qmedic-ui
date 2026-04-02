import { StudySummary } from './types';

export const mockStudies: StudySummary[] = [
  {
    studyInstanceUID: '1.2.840.113619.2.55.3.604688435.120.1599127431.467',
    patientName: 'DOE^JANE',
    accessionNumber: 'ACC-240401-001',
    modalities: 'CT',
    studyDate: '2026-04-01',
    description: 'Abdomen CT with contrast',
    series: 6,
    instances: 1520,
  },
  {
    studyInstanceUID: '1.2.840.113619.2.55.3.604688435.120.1599127431.468',
    patientName: 'DOE^JOHN',
    accessionNumber: 'ACC-240401-002',
    modalities: 'MR',
    studyDate: '2026-04-01',
    description: 'Brain MRI follow-up',
    series: 4,
    instances: 840,
  },
];
