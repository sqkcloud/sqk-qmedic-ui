import { apiClient, getArchiveAet } from '@/services/api/client';
import { parseInstanceSummary } from './dicomweb';
import { InstanceSummary } from './types';

export async function listInstances(studyInstanceUID: string, seriesInstanceUID: string): Promise<InstanceSummary[]> {
  const aet = getArchiveAet();
  const response = await apiClient.get(
    `/aets/${encodeURIComponent(aet)}/rs/studies/${encodeURIComponent(studyInstanceUID)}/series/${encodeURIComponent(seriesInstanceUID)}/instances`,
    {
      params: { includefield: 'all', limit: 100 },
    },
  );

  return Array.isArray(response.data) ? response.data.map(parseInstanceSummary) : [];
}

export function renderedFrameUrl(studyInstanceUID: string, seriesInstanceUID: string, sopInstanceUID: string) {
  const aet = getArchiveAet();
  return `/api/dcm4chee/aets/${encodeURIComponent(aet)}/rs/studies/${encodeURIComponent(studyInstanceUID)}/series/${encodeURIComponent(
    seriesInstanceUID,
  )}/instances/${encodeURIComponent(sopInstanceUID)}/frames/1/rendered`;
}
