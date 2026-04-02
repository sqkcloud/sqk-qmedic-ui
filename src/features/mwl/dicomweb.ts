const TAG = {
  patientName: '00100010',
  patientID: '00100020',
  accessionNumber: '00080050',
  studyInstanceUID: '0020000D',
  scheduledProcedureStepSequence: '00400100',
  scheduledStationAETitle: '00400001',
  scheduledProcedureStepStartDate: '00400002',
  scheduledProcedureStepID: '00400009',
  modality: '00080060',
} as const;

type DicomJsonRecord = Record<string, { Value?: unknown[] }>;

type DicomSeqItem = Record<string, { Value?: unknown[] }>;

function firstValue(dataset: DicomJsonRecord, tag: string) {
  return dataset?.[tag]?.Value?.[0];
}

function firstSeqItem(dataset: DicomJsonRecord, tag: string): DicomSeqItem | null {
  const value = dataset?.[tag]?.Value?.[0];
  if (value && typeof value === 'object') return value as DicomSeqItem;
  return null;
}

function valueToString(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (typeof value === 'object' && value && 'Alphabetic' in (value as Record<string, unknown>)) {
    return String((value as { Alphabetic?: string }).Alphabetic || '');
  }
  return String(value);
}

export function parseMWLItem(dataset: DicomJsonRecord) {
  const sps = firstSeqItem(dataset, TAG.scheduledProcedureStepSequence);

  const modality = sps ? valueToString(sps?.[TAG.modality]?.Value?.[0]) : '';
  const stationAET = sps ? valueToString(sps?.[TAG.scheduledStationAETitle]?.Value?.[0]) : '';
  const spsStartDate = sps ? valueToString(sps?.[TAG.scheduledProcedureStepStartDate]?.Value?.[0]) : '';
  const spsID = sps ? valueToString(sps?.[TAG.scheduledProcedureStepID]?.Value?.[0]) : '';

  return {
    patientName: valueToString(firstValue(dataset, TAG.patientName)),
    patientID: valueToString(firstValue(dataset, TAG.patientID)),
    accessionNumber: valueToString(firstValue(dataset, TAG.accessionNumber)),
    studyInstanceUID: valueToString(firstValue(dataset, TAG.studyInstanceUID)) || undefined,
    modality,
    stationAET: stationAET || undefined,
    spsStartDate: spsStartDate || undefined,
    spsID: spsID || undefined,
  };
}
