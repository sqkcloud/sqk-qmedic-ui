'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { countPatients, listPatients } from './api';
import { PatientQuery } from './types';

export function usePatients(query: PatientQuery, enabled: boolean) {
  return useQuery({
    queryKey: ['patients', query],
    queryFn: () => listPatients(query),
    enabled,
  });
}

export function usePatientCount() {
  return useMutation({
    mutationFn: (query: PatientQuery) => countPatients(query),
  });
}
