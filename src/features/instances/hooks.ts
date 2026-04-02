'use client';

import { useQuery } from '@tanstack/react-query';
import { listInstances } from './api';

export function useInstances(studyInstanceUID: string, seriesInstanceUID: string | null) {
  return useQuery({
    queryKey: ['instances', studyInstanceUID, seriesInstanceUID],
    queryFn: () => listInstances(studyInstanceUID, seriesInstanceUID || ''),
    enabled: !!studyInstanceUID && !!seriesInstanceUID,
  });
}
