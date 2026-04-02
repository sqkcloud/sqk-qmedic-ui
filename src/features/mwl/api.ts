import { apiClient, getArchiveAet, isHttpStatus } from '@/services/api/client';
import { parseMWLItem } from './dicomweb';
import { MWLItem, MWLQuery } from './types';

function buildParams(query: MWLQuery = {}, override?: { limit?: number; offset?: number }) {
  const params: Record<string, string | number> = {
    includefield: 'all',
    limit: override?.limit ?? query.limit ?? 25,
    offset: override?.offset ?? query.offset ?? 0,
  };

  if (query.patientName) params.PatientName = query.patientName;
  if (query.patientID) params.PatientID = query.patientID;
  if (query.accessionNumber) params.AccessionNumber = query.accessionNumber;
  if (query.modality) params.Modality = query.modality;
  if (query.scheduledDate) params.ScheduledProcedureStepStartDate = query.scheduledDate;

  return params;
}

export async function listMWLItems(query: MWLQuery = {}): Promise<MWLItem[]> {
  const aet = getArchiveAet();
  try {
    const response = await apiClient.get(`/aets/${encodeURIComponent(aet)}/rs/mwlitems`, {
    params: buildParams(query),
  });

      return Array.isArray(response.data) ? response.data.map(parseMWLItem) : [];
  } catch (error) {
    if (isHttpStatus(error, 404)) return [];
    throw error;
  }
}

export async function countMWLItems(query: MWLQuery = {}): Promise<number> {
  const aet = getArchiveAet();
  try {
    const response = await apiClient.get(`/aets/${encodeURIComponent(aet)}/rs/mwlitems/count`, {
    params: buildParams(query, { limit: 0, offset: 0 }),
  });

    const value = response.data;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return Number(value) || 0;
    return 0;
  } catch (error) {
    if (isHttpStatus(error, 404)) return 0;
    throw error;
  }
}
