const TAG = {
  sopInstanceUID: '00080018',
  sopClassUID: '00080016',
  instanceNumber: '00200013',
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

export function parseInstanceSummary(dataset: DicomJsonRecord) {
  return {
    sopInstanceUID: valueToString(firstValue(dataset, TAG.sopInstanceUID)),
    sopClassUID: valueToString(firstValue(dataset, TAG.sopClassUID)) || undefined,
    instanceNumber: valueToString(firstValue(dataset, TAG.instanceNumber)) || undefined,
  };
}
