const TAG = {
  studyInstanceUID: '0020000D',
  patientName: '00100010',
  patientID: '00100020',
  accessionNumber: '00080050',
  modalitiesInStudy: '00080061',
  studyDate: '00080020',
  studyDescription: '00081030',
  numberOfStudyRelatedInstances: '00201208',
  numberOfStudyRelatedSeries: '00201206',
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

export function parseStudySummary(dataset: DicomJsonRecord) {
  return {
    studyInstanceUID: valueToString(firstValue(dataset, TAG.studyInstanceUID)),
    patientName: valueToString(firstValue(dataset, TAG.patientName)),
    patientID: valueToString(firstValue(dataset, TAG.patientID)),
    accessionNumber: valueToString(firstValue(dataset, TAG.accessionNumber)),
    modalities: Array.isArray(dataset?.[TAG.modalitiesInStudy]?.Value)
      ? (dataset[TAG.modalitiesInStudy].Value as unknown[]).map(valueToString).join(', ')
      : '',
    studyDate: valueToString(firstValue(dataset, TAG.studyDate)),
    description: valueToString(firstValue(dataset, TAG.studyDescription)),
    instances: Number(valueToString(firstValue(dataset, TAG.numberOfStudyRelatedInstances)) || 0),
    series: Number(valueToString(firstValue(dataset, TAG.numberOfStudyRelatedSeries)) || 0),
  };
}

export function parseSeriesSummary(dataset: DicomJsonRecord) {
  return {
    seriesInstanceUID: valueToString(firstValue(dataset, TAG.seriesInstanceUID)),
    modality: valueToString(firstValue(dataset, TAG.modality)),
    seriesNumber: valueToString(firstValue(dataset, TAG.seriesNumber)),
    description: valueToString(firstValue(dataset, TAG.seriesDescription)),
    instances: Number(valueToString(firstValue(dataset, TAG.numberOfSeriesRelatedInstances)) || 0),
  };
}
