'use client';

import { useMemo, useState } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PageHeader } from '@/components/ui/PageHeader';
import { MonitoringModuleTabs } from '@/components/ui/MonitoringModuleTabs';
import { PanelCard } from '@/components/ui/PanelCard';
import { MonitoringTaskDetailDrawer } from '@/components/ohif/MonitoringTaskDetailDrawer';
import { MonitoringBridgePanel } from '@/components/ohif/MonitoringBridgePanel';
import { QueryState } from '@/components/ui/QueryState';
import { ActionToolbar, FilterInput, ResetFiltersButton } from '@/components/filters/ActionToolbar';
import { truncateMiddle } from '@/features/common/format';
import { useQueueTaskCount, useQueueTasks } from '@/features/monitoring/hooks';
import { QueueTaskQuery } from '@/features/monitoring/types';

const defaultQueue = process.env.NEXT_PUBLIC_DCM4CHEE_QUEUE || 'StgCmtSCU';
const defaultFilters: QueueTaskQuery = {
  queueName: defaultQueue,
  status: '',
  localAET: '',
  remoteAET: '',
  studyInstanceUID: '',
  limit: 25,
};

export default function MonitoringQueuesPage() {
  const [draftFilters, setDraftFilters] = useState<QueueTaskQuery>(defaultFilters);
  const [submittedFilters, setSubmittedFilters] = useState<QueueTaskQuery>(defaultFilters);
  const [countValue, setCountValue] = useState<number | null>(null);
  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  const query = useMemo(
    () => ({
      queueName: draftFilters.queueName,
      status: draftFilters.status || undefined,
      localAET: draftFilters.localAET || undefined,
      remoteAET: draftFilters.remoteAET || undefined,
      studyInstanceUID: draftFilters.studyInstanceUID || undefined,
      limit: draftFilters.limit ?? 25,
    }),
    [draftFilters],
  );

  const activeQuery = useMemo(
    () => ({
      queueName: submittedFilters.queueName,
      status: submittedFilters.status || undefined,
      localAET: submittedFilters.localAET || undefined,
      remoteAET: submittedFilters.remoteAET || undefined,
      studyInstanceUID: submittedFilters.studyInstanceUID || undefined,
      limit: submittedFilters.limit ?? 25,
    }),
    [submittedFilters],
  );

  const queueQuery = useQueueTasks(activeQuery, true);
  const queueCount = useQueueTaskCount();
  const rows = queueQuery.data ?? [];

  function setField<K extends keyof QueueTaskQuery>(field: K, value: QueueTaskQuery[K]) {
    setDraftFilters((current) => ({ ...current, [field]: value }));
  }

  async function handleCount() {
    const result = await queueCount.mutateAsync(query);
    setCountValue(result);
  }

  function handleSubmit() {
    setSubmittedFilters(draftFilters);
  }

  function handleReset() {
    setDraftFilters(defaultFilters);
    setSubmittedFilters(defaultFilters);
    setCountValue(null);
  }

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Home', href: '/inbox' }, { label: 'Monitoring', href: '/monitoring/associations' }, { label: 'Queues' }]} />
      <MonitoringModuleTabs />
      <PageHeader title="Queues" description="Queue tasks loaded from dcm4chee monitor endpoints." />
      <div className="mt-5">
        <MonitoringBridgePanel
          studyUIDs={rows
            .map((row) => row.studyInstanceUID)
            .filter((uid): uid is string => typeof uid === 'string' && uid.length > 0)}
        />
      </div>      
      <PanelCard title="Archive Queue Tasks">
        <ActionToolbar
          count={countValue}
          onCount={handleCount}
          onSubmit={handleSubmit}
          isCounting={queueCount.isPending}
          isSubmitting={queueQuery.isFetching}
        >
          <FilterInput value={draftFilters.queueName} onChange={(e) => setField('queueName', e.target.value)} placeholder="Queue name" className="w-[150px]" />
          <FilterInput value={draftFilters.status || ''} onChange={(e) => setField('status', e.target.value)} placeholder="Status" className="w-[120px]" />
          <FilterInput value={draftFilters.localAET || ''} onChange={(e) => setField('localAET', e.target.value)} placeholder="Local AET" className="w-[120px]" />
          <FilterInput value={draftFilters.remoteAET || ''} onChange={(e) => setField('remoteAET', e.target.value)} placeholder="Remote AET" className="w-[120px]" />
          <FilterInput value={draftFilters.studyInstanceUID || ''} onChange={(e) => setField('studyInstanceUID', e.target.value)} placeholder="Study Instance UID" className="w-[220px]" />
          <ResetFiltersButton onClick={handleReset} />
        </ActionToolbar>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-mutedText">
          Showing <span className="font-medium text-white">{rows.length}</span> loaded tasks for the currently submitted filters.
        </div>

        <div className="mt-4">
          <QueryState isLoading={queueQuery.isLoading} error={queueQuery.error} empty={rows.length === 0}>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <table className="min-w-full divide-y divide-white/10 text-sm">
                <thead className="bg-white/5 text-left text-mutedText">
                  <tr>
                    <th className="px-4 py-3 font-medium">Task ID</th>
                    <th className="px-4 py-3 font-medium">Queue</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Device</th>
                    <th className="px-4 py-3 font-medium">Local AET</th>
                    <th className="px-4 py-3 font-medium">Remote AET</th>
                    <th className="px-4 py-3 font-medium">Study UID</th>
                    <th className="px-4 py-3 font-medium">Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {rows.map((row) => (
                    <tr key={`${row.queueName}-${row.taskID}`} onClick={() => setSelectedRow(row)} className={["hover:bg-white/5 cursor-pointer", selectedRow?.taskID === row.taskID ? 'bg-white/5' : ''].join(' ')}>
                      <td className="px-4 py-3 text-white">{row.taskID || '-'}</td>
                      <td className="px-4 py-3">{row.queueName}</td>
                      <td className="px-4 py-3">{row.status}</td>
                      <td className="px-4 py-3">{row.deviceName}</td>
                      <td className="px-4 py-3">{row.localAET || '-'}</td>
                      <td className="px-4 py-3">{row.remoteAET || '-'}</td>
                      <td className="px-4 py-3 text-mutedText" title={row.studyInstanceUID}>
                        {truncateMiddle(row.studyInstanceUID || '-')}
                      </td>
                      <td className="px-4 py-3 text-mutedText">{row.updatedTime || row.createdTime || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </QueryState>
        </div>


      {selectedRow ? <MonitoringTaskDetailDrawer row={selectedRow} title="Task detail" description="Monitoring row selection now links into the OHIF workspace." /> : null}

      </PanelCard>
    </div>
  );
}
