import { apiClient, getArchiveAet, isHttpStatus } from '@/services/api/client';
import { parseSeriesSummary, parseStudySummary } from './dicomweb';
import { StudyDetail, StudyQuery, StudySummary } from './types';

function buildStudyParams(query: StudyQuery = {}, override?: { limit?: number; offset?: number }) {
  const params: Record<string, string | number> = {
    includefield: 'all',
    limit: override?.limit ?? query.limit ?? 25,
    offset: override?.offset ?? query.offset ?? 0,
  };

  if (query.patientName) params.PatientName = query.patientName;
  if (query.patientID) params.PatientID = query.patientID;
  if (query.accessionNumber) params.AccessionNumber = query.accessionNumber;
  if (query.studyDate) params.StudyDate = query.studyDate;
  if (query.modality) params.ModalitiesInStudy = query.modality;

  return params;
}

export async function listStudies(query: StudyQuery = {}): Promise<StudySummary[]> {
  const aet = getArchiveAet();

  try {
    const response = await apiClient.get(`/aets/${encodeURIComponent(aet)}/rs/studies`, {
      params: buildStudyParams(query),
    });

    return Array.isArray(response.data) ? response.data.map(parseStudySummary) : [];
  } catch (error) {
    if (isHttpStatus(error, 404)) return [];
    throw error;
  }
}

export async function countStudies(query: StudyQuery = {}): Promise<number> {
  const aet = getArchiveAet();

  try {
    const response = await apiClient.get(`/aets/${encodeURIComponent(aet)}/rs/studies/count`, {
      params: buildStudyParams(query, { limit: 0, offset: 0 }),
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

export async function sizeStudies(query: StudyQuery = {}): Promise<number> {
  const aet = getArchiveAet();

  try {
    const response = await apiClient.get(`/aets/${encodeURIComponent(aet)}/rs/studies/size`, {
      params: buildStudyParams(query, { limit: 0, offset: 0 }),
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

export async function getStudy(studyInstanceUID: string): Promise<StudySummary | null> {
  const aet = getArchiveAet();

  try {
    const response = await apiClient.get(`/aets/${encodeURIComponent(aet)}/rs/studies`, {
      params: {
        StudyInstanceUID: studyInstanceUID,
        includefield: 'all',
        limit: 1,
      },
    });

    if (!Array.isArray(response.data) || response.data.length === 0) {
      return null;
    }

    return parseStudySummary(response.data[0]);
  } catch (error) {
    if (isHttpStatus(error, 404)) return null;
    throw error;
  }
}

export async function listStudySeries(studyInstanceUID: string) {
  const aet = getArchiveAet();

  try {
    const response = await apiClient.get(
      `/aets/${encodeURIComponent(aet)}/rs/studies/${encodeURIComponent(studyInstanceUID)}/series`,
      {
        params: {
          includefield: 'all',
        },
      },
    );

    return Array.isArray(response.data) ? response.data.map(parseSeriesSummary) : [];
  } catch (error) {
    if (isHttpStatus(error, 404)) return [];
    throw error;
  }
}

export async function getStudyDetail(studyInstanceUID: string): Promise<StudyDetail | null> {
  const [summary, series] = await Promise.all([getStudy(studyInstanceUID), listStudySeries(studyInstanceUID)]);

  if (!summary) return null;
  return { summary, series };
}
