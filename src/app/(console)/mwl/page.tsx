'use client';

import { useMemo, useState } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { StudyModuleTabs } from '@/components/ui/StudyModuleTabs';
import { PageHeader } from '@/components/ui/PageHeader';
import { PanelCard } from '@/components/ui/PanelCard';
import { QueryState } from '@/components/ui/QueryState';
import { ActionToolbar, FilterInput, ResetFiltersButton } from '@/components/filters/ActionToolbar';
import { formatDicomDate } from '@/features/common/format';
import { useMWLCount, useMWLItems } from '@/features/mwl/hooks';
import { MWLQuery } from '@/features/mwl/types';

const defaultFilters: MWLQuery = {
  patientName: '',
  patientID: '',
  accessionNumber: '',
  modality: '',
  scheduledDate: '',
  limit: 25,
};

export default function MWLPage() {
  const [draftFilters, setDraftFilters] = useState<MWLQuery>(defaultFilters);
  const [submittedFilters, setSubmittedFilters] = useState<MWLQuery>(defaultFilters);
  const [countValue, setCountValue] = useState<number | null>(null);

  const query = useMemo(
    () => ({
      patientName: draftFilters.patientName || undefined,
      patientID: draftFilters.patientID || undefined,
      accessionNumber: draftFilters.accessionNumber || undefined,
      modality: draftFilters.modality || undefined,
      scheduledDate: draftFilters.scheduledDate || undefined,
      limit: draftFilters.limit ?? 25,
    }),
    [draftFilters],
  );

  const activeQuery = useMemo(
    () => ({
      patientName: submittedFilters.patientName || undefined,
      patientID: submittedFilters.patientID || undefined,
      accessionNumber: submittedFilters.accessionNumber || undefined,
      modality: submittedFilters.modality || undefined,
      scheduledDate: submittedFilters.scheduledDate || undefined,
      limit: submittedFilters.limit ?? 25,
    }),
    [submittedFilters],
  );

  const mwlQuery = useMWLItems(activeQuery, true);
  const countMutation = useMWLCount();
  const rows = mwlQuery.data ?? [];

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
      <Breadcrumbs items={[{ label: 'Home', href: '/inbox' }, { label: 'MWL' }]} />
      <StudyModuleTabs />
      <PageHeader title="MWL" description="MWL-RS Scheduled Procedure Steps search with Submit / Count behavior." />
      <PanelCard title="Modality Worklist">
        <ActionToolbar
          count={countValue}
          onCount={handleCount}
          onSubmit={handleSubmit}
          isCounting={countMutation.isPending}
          isSubmitting={mwlQuery.isFetching}
        >
          <FilterInput value={draftFilters.patientName || ''} onChange={(e) => setDraftFilters((c) => ({ ...c, patientName: e.target.value }))} placeholder="Patient name" className="w-[200px]" />
          <FilterInput value={draftFilters.patientID || ''} onChange={(e) => setDraftFilters((c) => ({ ...c, patientID: e.target.value }))} placeholder="Patient ID" className="w-[160px]" />
          <FilterInput value={draftFilters.accessionNumber || ''} onChange={(e) => setDraftFilters((c) => ({ ...c, accessionNumber: e.target.value }))} placeholder="Accession" className="w-[160px]" />
          <FilterInput value={draftFilters.modality || ''} onChange={(e) => setDraftFilters((c) => ({ ...c, modality: e.target.value }))} placeholder="Modality" className="w-[120px]" />
          <FilterInput value={draftFilters.scheduledDate || ''} onChange={(e) => setDraftFilters((c) => ({ ...c, scheduledDate: e.target.value }))} placeholder="SPS start date" className="w-[160px]" />
          <ResetFiltersButton onClick={handleReset} />
        </ActionToolbar>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-mutedText">
          Showing <span className="font-medium text-white">{rows.length}</span> loaded MWL entries for the currently submitted filters.
        </div>

        <div className="mt-4">
          <QueryState isLoading={mwlQuery.isLoading} error={mwlQuery.error} empty={rows.length === 0}>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <table className="min-w-full divide-y divide-white/10 text-sm">
                <thead className="bg-white/5 text-left text-mutedText">
                  <tr>
                    <th className="px-4 py-3 font-medium">Patient</th>
                    <th className="px-4 py-3 font-medium">Patient ID</th>
                    <th className="px-4 py-3 font-medium">Accession</th>
                    <th className="px-4 py-3 font-medium">Modality</th>
                    <th className="px-4 py-3 font-medium">Station AET</th>
                    <th className="px-4 py-3 font-medium">SPS Start</th>
                    <th className="px-4 py-3 font-medium">SPS ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {rows.map((row, index) => (
                    <tr key={`${row.patientID}-${row.accessionNumber}-${index}`} className="hover:bg-white/5">
                      <td className="px-4 py-3 text-white">{row.patientName || '(no name)'}</td>
                      <td className="px-4 py-3 text-mutedText">{row.patientID || '-'}</td>
                      <td className="px-4 py-3">{row.accessionNumber || '-'}</td>
                      <td className="px-4 py-3">{row.modality || '-'}</td>
                      <td className="px-4 py-3">{row.stationAET || '-'}</td>
                      <td className="px-4 py-3">{row.spsStartDate ? formatDicomDate(row.spsStartDate) : '-'}</td>
                      <td className="px-4 py-3">{row.spsID || '-'}</td>
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
