'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { countMWLItems, listMWLItems } from './api';
import { MWLQuery } from './types';

export function useMWLItems(query: MWLQuery, enabled: boolean) {
  return useQuery({
    queryKey: ['mwlitems', query],
    queryFn: () => listMWLItems(query),
    enabled,
  });
}

export function useMWLCount() {
  return useMutation({
    mutationFn: (query: MWLQuery) => countMWLItems(query),
  });
}
