const TAG = {
  patientName: '00100010',
  patientID: '00100020',
  sopInstanceUID: '00080018',
  upsState: '00741000',
  upsLabel: '00741204',
  scheduledStartDateTime: '00404005',
  worklistLabel: '00741202',
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

export function parseWorkitem(dataset: DicomJsonRecord) {
  return {
    upsUID: valueToString(firstValue(dataset, TAG.sopInstanceUID)),
    patientName: valueToString(firstValue(dataset, TAG.patientName)) || undefined,
    patientID: valueToString(firstValue(dataset, TAG.patientID)) || undefined,
    state: valueToString(firstValue(dataset, TAG.upsState)) || undefined,
    label: valueToString(firstValue(dataset, TAG.upsLabel)) || valueToString(firstValue(dataset, TAG.worklistLabel)) || undefined,
    scheduledTime: valueToString(firstValue(dataset, TAG.scheduledStartDateTime)) || undefined,
  };
}
