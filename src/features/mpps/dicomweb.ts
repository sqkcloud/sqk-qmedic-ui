const TAG = {
  patientName: '00100010',
  patientID: '00100020',
  accessionNumber: '00080050',
  sopInstanceUID: '00080018',
  performedProcedureStepStatus: '00400252',
  performedProcedureStepStartDate: '00400244',
  performedProcedureStepStartTime: '00400245',
} as const;

type DicomJsonRecord = Record<string, { Value?: unknown[] }>;

function firstValue(dataset: DicomJsonRecord, tag: string) {
  return dataset?.[tag]?.Value?.[0];
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

export function parseMPPSItem(dataset: DicomJsonRecord) {
  return {
    patientName: valueToString(firstValue(dataset, TAG.patientName)),
    patientID: valueToString(firstValue(dataset, TAG.patientID)),
    accessionNumber: valueToString(firstValue(dataset, TAG.accessionNumber)) || undefined,
    mppsUID: valueToString(firstValue(dataset, TAG.sopInstanceUID)),
    status: valueToString(firstValue(dataset, TAG.performedProcedureStepStatus)) || undefined,
    startDate: valueToString(firstValue(dataset, TAG.performedProcedureStepStartDate)) || undefined,
    startTime: valueToString(firstValue(dataset, TAG.performedProcedureStepStartTime)) || undefined,
  };
}
