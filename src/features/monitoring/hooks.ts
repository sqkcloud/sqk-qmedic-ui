'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { countQueueTasks, listQueueTasks } from './api';
import { QueueTaskQuery } from './types';

export function useQueueTasks(query: QueueTaskQuery, enabled = true) {
  return useQuery({
    queryKey: ['queue-tasks', query],
    queryFn: () => listQueueTasks(query),
    enabled: enabled && !!query.queueName,
  });
}

export function useQueueTaskCount() {
  return useMutation({
    mutationFn: (query: QueueTaskQuery) => countQueueTasks(query),
  });
}
