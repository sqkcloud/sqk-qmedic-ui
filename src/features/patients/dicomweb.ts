const TAG = {
  patientName: '00100010',
  patientID: '00100020',
  patientBirthDate: '00100030',
  patientSex: '00100040',
  numberOfPatientRelatedStudies: '00201200',
  numberOfPatientRelatedSeries: '00201202',
  numberOfPatientRelatedInstances: '00201204',
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

function valueToNumber(value: unknown): number | undefined {
  const n = Number(valueToString(value));
  return Number.isFinite(n) ? n : undefined;
}

export function parsePatientSummary(dataset: DicomJsonRecord) {
  return {
    patientID: valueToString(firstValue(dataset, TAG.patientID)),
    patientName: valueToString(firstValue(dataset, TAG.patientName)),
    birthDate: valueToString(firstValue(dataset, TAG.patientBirthDate)) || undefined,
    sex: valueToString(firstValue(dataset, TAG.patientSex)) || undefined,
    studies: valueToNumber(firstValue(dataset, TAG.numberOfPatientRelatedStudies)),
    series: valueToNumber(firstValue(dataset, TAG.numberOfPatientRelatedSeries)),
    instances: valueToNumber(firstValue(dataset, TAG.numberOfPatientRelatedInstances)),
  };
}
