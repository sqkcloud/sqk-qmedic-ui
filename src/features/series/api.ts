import { apiClient, getArchiveAet, isHttpStatus } from '@/services/api/client';
import { parseSeriesSummary } from './dicomweb';
import { SeriesQuery, SeriesSummary } from './types';

function buildParams(query: SeriesQuery = {}, override?: { limit?: number; offset?: number }) {
  const params: Record<string, string | number> = {
    includefield: 'all',
    limit: override?.limit ?? query.limit ?? 25,
    offset: override?.offset ?? query.offset ?? 0,
  };

  if (query.studyInstanceUID) params.StudyInstanceUID = query.studyInstanceUID;
  if (query.modality) params.Modality = query.modality;
  if (query.seriesDescription) params.SeriesDescription = query.seriesDescription;

  return params;
}

export async function listSeries(query: SeriesQuery = {}): Promise<SeriesSummary[]> {
  const aet = getArchiveAet();
  try {
    const response = await apiClient.get(`/aets/${encodeURIComponent(aet)}/rs/series`, {
    params: buildParams(query),
  });

      return Array.isArray(response.data) ? response.data.map(parseSeriesSummary) : [];
  } catch (error) {
    if (isHttpStatus(error, 404)) return [];
    throw error;
  }
}

export async function countSeries(query: SeriesQuery = {}): Promise<number> {
  const aet = getArchiveAet();
  try {
    const response = await apiClient.get(`/aets/${encodeURIComponent(aet)}/rs/series/count`, {
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
