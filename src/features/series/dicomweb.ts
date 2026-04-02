const TAG = {
  studyInstanceUID: '0020000D',
  seriesInstanceUID: '0020000E',
  modality: '00080060',
  seriesNumber: '00200011',
  seriesDescription: '0008103E',
  numberOfSeriesRelatedInstances: '00201209',
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

export function parseSeriesSummary(dataset: DicomJsonRecord) {
  return {
    studyInstanceUID: valueToString(firstValue(dataset, TAG.studyInstanceUID)) || undefined,
    seriesInstanceUID: valueToString(firstValue(dataset, TAG.seriesInstanceUID)),
    modality: valueToString(firstValue(dataset, TAG.modality)),
    seriesNumber: valueToString(firstValue(dataset, TAG.seriesNumber)) || undefined,
    description: valueToString(firstValue(dataset, TAG.seriesDescription)),
    instances: Number(valueToString(firstValue(dataset, TAG.numberOfSeriesRelatedInstances)) || 0),
  };
}
