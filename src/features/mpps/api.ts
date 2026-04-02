import { apiClient, getArchiveAet, isHttpStatus } from '@/services/api/client';
import { parseMPPSItem } from './dicomweb';
import { MPPSItem, MPPSQuery } from './types';

function buildParams(query: MPPSQuery = {}, override?: { limit?: number; offset?: number }) {
  const params: Record<string, string | number> = {
    includefield: 'all',
    limit: override?.limit ?? query.limit ?? 25,
    offset: override?.offset ?? query.offset ?? 0,
  };

  if (query.patientName) params.PatientName = query.patientName;
  if (query.patientID) params.PatientID = query.patientID;
  if (query.accessionNumber) params.AccessionNumber = query.accessionNumber;
  if (query.status) params.PerformedProcedureStepStatus = query.status;

  return params;
}

export async function listMPPS(query: MPPSQuery = {}): Promise<MPPSItem[]> {
  const aet = getArchiveAet();

  try {
    const response = await apiClient.get(`/aets/${encodeURIComponent(aet)}/rs/mpps`, {
      params: buildParams(query),
    });

    return Array.isArray(response.data) ? response.data.map(parseMPPSItem) : [];
  } catch (error) {
    if (isHttpStatus(error, 404)) return [];
    throw error;
  }
}

export async function countMPPS(query: MPPSQuery = {}): Promise<number> {
  const aet = getArchiveAet();

  try {
    const response = await apiClient.get(`/aets/${encodeURIComponent(aet)}/rs/mpps/count`, {
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
