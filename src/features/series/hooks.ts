'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { countSeries, listSeries } from './api';
import { SeriesQuery } from './types';

export function useSeries(query: SeriesQuery, enabled: boolean) {
  return useQuery({
    queryKey: ['series', query],
    queryFn: () => listSeries(query),
    enabled,
  });
}

export function useSeriesCount() {
  return useMutation({
    mutationFn: (query: SeriesQuery) => countSeries(query),
  });
}
