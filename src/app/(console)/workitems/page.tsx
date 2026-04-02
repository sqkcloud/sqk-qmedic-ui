'use client';

import { useMemo, useState } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { StudyModuleTabs } from '@/components/ui/StudyModuleTabs';
import { PageHeader } from '@/components/ui/PageHeader';
import { PanelCard } from '@/components/ui/PanelCard';
import { QueryState } from '@/components/ui/QueryState';
import { ActionToolbar, FilterInput, FilterSelect, ResetFiltersButton } from '@/components/filters/ActionToolbar';
import { truncateMiddle } from '@/features/common/format';
import { useWorkitemCount, useWorkitems } from '@/features/workitems/hooks';
import { WorkitemQuery } from '@/features/workitems/types';

const defaultFilters: WorkitemQuery = {
  patientName: '',
  patientID: '',
  state: '',
  scheduledTime: '',
  worklistLabel: '',
  limit: 25,
};

export default function WorkitemsPage() {
  const [draftFilters, setDraftFilters] = useState<WorkitemQuery>(defaultFilters);
  const [submittedFilters, setSubmittedFilters] = useState<WorkitemQuery>(defaultFilters);
  const [countValue, setCountValue] = useState<number | null>(null);

  const query = useMemo(
    () => ({
      patientName: draftFilters.patientName || undefined,
      patientID: draftFilters.patientID || undefined,
      state: draftFilters.state || undefined,
      scheduledTime: draftFilters.scheduledTime || undefined,
      worklistLabel: draftFilters.worklistLabel || undefined,
      limit: draftFilters.limit ?? 25,
    }),
    [draftFilters],
  );

  const activeQuery = useMemo(
    () => ({
      patientName: submittedFilters.patientName || undefined,
      patientID: submittedFilters.patientID || undefined,
      state: submittedFilters.state || undefined,
      scheduledTime: submittedFilters.scheduledTime || undefined,
      worklistLabel: submittedFilters.worklistLabel || undefined,
      limit: submittedFilters.limit ?? 25,
    }),
    [submittedFilters],
  );

  const workitemsQuery = useWorkitems(activeQuery, true);
  const countMutation = useWorkitemCount();
  const rows = workitemsQuery.data ?? [];

  async function handleCount() {
    const result = await countMutation.mutateAsync(query);
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
      <Breadcrumbs items={[{ label: 'Home', href: '/inbox' }, { label: 'Work Items' }]} />
      <StudyModuleTabs />
      <PageHeader title="Work Items" description="UPS-RS workitems search with Submit / Count behavior." />
      <PanelCard title="Unified Procedure Step Worklist">
        <ActionToolbar
          count={countValue}
          onCount={handleCount}
          onSubmit={handleSubmit}
          isCounting={countMutation.isPending}
          isSubmitting={workitemsQuery.isFetching}
        >
          <FilterInput value={draftFilters.patientName || ''} onChange={(e) => setDraftFilters((c) => ({ ...c, patientName: e.target.value }))} placeholder="Patient name" className="w-[200px]" />
          <FilterInput value={draftFilters.patientID || ''} onChange={(e) => setDraftFilters((c) => ({ ...c, patientID: e.target.value }))} placeholder="Patient ID" className="w-[160px]" />
          <FilterSelect value={draftFilters.state || ''} onChange={(e) => setDraftFilters((c) => ({ ...c, state: e.target.value }))} className="w-[160px]">
            <option value="">Any state</option>
            <option value="SCHEDULED">SCHEDULED</option>
            <option value="IN PROGRESS">IN PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELED">CANCELED</option>
          </FilterSelect>
          <FilterInput value={draftFilters.worklistLabel || ''} onChange={(e) => setDraftFilters((c) => ({ ...c, worklistLabel: e.target.value }))} placeholder="Worklist label" className="w-[160px]" />
          <FilterInput value={draftFilters.scheduledTime || ''} onChange={(e) => setDraftFilters((c) => ({ ...c, scheduledTime: e.target.value }))} placeholder="Scheduled time" className="w-[160px]" />
          <ResetFiltersButton onClick={handleReset} />
        </ActionToolbar>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-mutedText">
          Showing <span className="font-medium text-white">{rows.length}</span> loaded workitems for the currently submitted filters.
        </div>

        <div className="mt-4">
          <QueryState isLoading={workitemsQuery.isLoading} error={workitemsQuery.error} empty={rows.length === 0}>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <table className="min-w-full divide-y divide-white/10 text-sm">
                <thead className="bg-white/5 text-left text-mutedText">
                  <tr>
                    <th className="px-4 py-3 font-medium">State</th>
                    <th className="px-4 py-3 font-medium">Label</th>
                    <th className="px-4 py-3 font-medium">Patient</th>
                    <th className="px-4 py-3 font-medium">Patient ID</th>
                    <th className="px-4 py-3 font-medium">Scheduled</th>
                    <th className="px-4 py-3 font-medium">UPS UID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {rows.map((row) => (
                    <tr key={row.upsUID} className="hover:bg-white/5">
                      <td className="px-4 py-3 text-white">{row.state || '-'}</td>
                      <td className="px-4 py-3">{row.label || '-'}</td>
                      <td className="px-4 py-3">{row.patientName || '-'}</td>
                      <td className="px-4 py-3 text-mutedText">{row.patientID || '-'}</td>
                      <td className="px-4 py-3">{row.scheduledTime || '-'}</td>
                      <td className="px-4 py-3 text-mutedText" title={row.upsUID}>
                        {truncateMiddle(row.upsUID)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </QueryState>
        </div>
      </PanelCard>
    </div>
  );
}
