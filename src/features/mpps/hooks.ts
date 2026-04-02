'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { countMPPS, listMPPS } from './api';
import { MPPSQuery } from './types';

export function useMPPS(query: MPPSQuery, enabled: boolean) {
  return useQuery({
    queryKey: ['mpps', query],
    queryFn: () => listMPPS(query),
    enabled,
  });
}

export function useMPPSCount() {
  return useMutation({
    mutationFn: (query: MPPSQuery) => countMPPS(query),
  });
}
