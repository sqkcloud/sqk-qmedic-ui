import { apiClient, getArchiveAet, isHttpStatus } from '@/services/api/client';
import { parsePatientSummary } from './dicomweb';
import { PatientQuery, PatientSummary } from './types';

function buildParams(query: PatientQuery = {}, override?: { limit?: number; offset?: number }) {
  const params: Record<string, string | number | boolean> = {
    includefield: 'all',
    limit: override?.limit ?? query.limit ?? 25,
    offset: override?.offset ?? query.offset ?? 0,
  };

  if (query.patientName) params.PatientName = query.patientName;
  if (query.patientID) params.PatientID = query.patientID;
  if (typeof query.fuzzymatching === 'boolean') params.fuzzymatching = query.fuzzymatching;

  return params;
}

export async function listPatients(query: PatientQuery = {}): Promise<PatientSummary[]> {
  const aet = getArchiveAet();
  try {
    const response = await apiClient.get(`/aets/${encodeURIComponent(aet)}/rs/patients`, {
    params: buildParams(query),
  });

      return Array.isArray(response.data) ? response.data.map(parsePatientSummary) : [];
  } catch (error) {
    if (isHttpStatus(error, 404)) return [];
    throw error;
  }
}

export async function countPatients(query: PatientQuery = {}): Promise<number> {
  const aet = getArchiveAet();
  try {
    const response = await apiClient.get(`/aets/${encodeURIComponent(aet)}/rs/patients/count`, {
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
