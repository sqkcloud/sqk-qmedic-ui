'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { countStudies, getStudyDetail, listStudies, sizeStudies } from './api';
import { StudyQuery } from './types';

export function useStudies(query: StudyQuery = {}, enabled = true) {
  return useQuery({
    queryKey: ['studies', query],
    queryFn: () => listStudies(query),
    enabled,
  });
}

export function useStudyCount() {
  return useMutation({
    mutationFn: (query: StudyQuery) => countStudies(query),
  });
}

export function useStudySize() {
  return useMutation({
    mutationFn: (query: StudyQuery) => sizeStudies(query),
  });
}

export function useStudyDetail(studyInstanceUID: string) {
  return useQuery({
    queryKey: ['study-detail', studyInstanceUID],
    queryFn: () => getStudyDetail(studyInstanceUID),
    enabled: !!studyInstanceUID,
  });
}
