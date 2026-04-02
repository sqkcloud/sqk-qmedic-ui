import { apiClient, getArchiveAet, isHttpStatus } from '@/services/api/client';
import { parseWorkitem } from './dicomweb';
import { Workitem, WorkitemQuery } from './types';

function buildParams(query: WorkitemQuery = {}, override?: { limit?: number; offset?: number }) {
  const params: Record<string, string | number> = {
    includefield: 'all',
    limit: override?.limit ?? query.limit ?? 25,
    offset: override?.offset ?? query.offset ?? 0,
  };

  if (query.patientName) params.PatientName = query.patientName;
  if (query.patientID) params.PatientID = query.patientID;
  if (query.state) params.UPSState = query.state;
  if (query.scheduledTime) params.upsScheduledTime = query.scheduledTime;
  if (query.worklistLabel) params.WorklistLabel = query.worklistLabel;

  return params;
}

export async function listWorkitems(query: WorkitemQuery = {}): Promise<Workitem[]> {
  const aet = getArchiveAet();
  try {
    const response = await apiClient.get(`/aets/${encodeURIComponent(aet)}/rs/workitems`, {
    params: buildParams(query),
  });

      return Array.isArray(response.data) ? response.data.map(parseWorkitem) : [];
  } catch (error) {
    if (isHttpStatus(error, 404)) return [];
    throw error;
  }
}

export async function countWorkitems(query: WorkitemQuery = {}): Promise<number> {
  const aet = getArchiveAet();
  try {
    const response = await apiClient.get(`/aets/${encodeURIComponent(aet)}/rs/workitems/count`, {
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
