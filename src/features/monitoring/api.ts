import { apiClient, isHttpStatus } from '@/services/api/client';
import { QueueTask, QueueTaskQuery } from './types';

function normalizeTask(task: Record<string, unknown>, queueName: string): QueueTask {
  return {
    taskID: String(task.taskID ?? task.id ?? task.pk ?? ''),
    queueName,
    status: String(task.status ?? '-'),
    deviceName: String(task.dicomDeviceName ?? task.deviceName ?? '-'),
    localAET: task.localAET ? String(task.localAET) : undefined,
    remoteAET: task.remoteAET ? String(task.remoteAET) : undefined,
    studyInstanceUID: task.studyInstanceUID ? String(task.studyInstanceUID) : undefined,
    createdTime: task.createdTime ? String(task.createdTime) : undefined,
    updatedTime: task.updatedTime ? String(task.updatedTime) : undefined,
    scheduledTime: task.scheduledTime ? String(task.scheduledTime) : undefined,
  };
}

function buildQueueParams(query: QueueTaskQuery, override?: { limit?: number; offset?: number }) {
  return {
    status: query.status,
    localAET: query.localAET,
    remoteAET: query.remoteAET,
    StudyInstanceUID: query.studyInstanceUID,
    limit: override?.limit ?? query.limit ?? 25,
    offset: override?.offset ?? query.offset ?? 0,
  };
}

export async function listQueueTasks(query: QueueTaskQuery): Promise<QueueTask[]> {
  try {
    const response = await apiClient.get(`/queue/${encodeURIComponent(query.queueName)}`, {
      params: buildQueueParams(query),
    });

    return Array.isArray(response.data)
      ? response.data.map((row: Record<string, unknown>) => normalizeTask(row, query.queueName))
      : [];
  } catch (error) {
    if (isHttpStatus(error, 404)) return [];
    throw error;
  }
}

export async function countQueueTasks(query: QueueTaskQuery): Promise<number> {
  try {
    const response = await apiClient.get(`/queue/${encodeURIComponent(query.queueName)}`, {
      params: buildQueueParams(query, { limit: 500, offset: 0 }),
    });

    return Array.isArray(response.data) ? response.data.length : 0;
  } catch (error) {
    if (isHttpStatus(error, 404)) return 0;
    throw error;
  }
}
