'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { countWorkitems, listWorkitems } from './api';
import { WorkitemQuery } from './types';

export function useWorkitems(query: WorkitemQuery, enabled: boolean) {
  return useQuery({
    queryKey: ['workitems', query],
    queryFn: () => listWorkitems(query),
    enabled,
  });
}

export function useWorkitemCount() {
  return useMutation({
    mutationFn: (query: WorkitemQuery) => countWorkitems(query),
  });
}
