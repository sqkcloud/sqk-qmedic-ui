'use client';

import { useMemo, useState } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { StudyModuleTabs } from '@/components/ui/StudyModuleTabs';
import { PageHeader } from '@/components/ui/PageHeader';
import { PanelCard } from '@/components/ui/PanelCard';
import { QueryState } from '@/components/ui/QueryState';
import { ActionToolbar, FilterInput, ResetFiltersButton } from '@/components/filters/ActionToolbar';
import { truncateMiddle } from '@/features/common/format';
import { useSeries, useSeriesCount } from '@/features/series/hooks';
import { SeriesQuery } from '@/features/series/types';

const defaultFilters: SeriesQuery = {
  studyInstanceUID: '',
  modality: '',
  seriesDescription: '',
  limit: 25,
};

export default function SeriesPage() {
  const [draftFilters, setDraftFilters] = useState<SeriesQuery>(defaultFilters);
  const [submittedFilters, setSubmittedFilters] = useState<SeriesQuery>(defaultFilters);
  const [countValue, setCountValue] = useState<number | null>(null);

  const query = useMemo(
    () => ({
      studyInstanceUID: draftFilters.studyInstanceUID || undefined,
      modality: draftFilters.modality || undefined,
      seriesDescription: draftFilters.seriesDescription || undefined,
      limit: draftFilters.limit ?? 25,
    }),
    [draftFilters],
  );

  const activeQuery = useMemo(
    () => ({
      studyInstanceUID: submittedFilters.studyInstanceUID || undefined,
      modality: submittedFilters.modality || undefined,
      seriesDescription: submittedFilters.seriesDescription || undefined,
      limit: submittedFilters.limit ?? 25,
    }),
    [submittedFilters],
  );

  const seriesQuery = useSeries(activeQuery, true);
  const countMutation = useSeriesCount();
  const rows = seriesQuery.data ?? [];

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
      <Breadcrumbs items={[{ label: 'Home', href: '/inbox' }, { label: 'Series' }]} />
      <StudyModuleTabs />
      <PageHeader title="Series" description="QIDO-RS series search with Submit / Count behavior." />
      <PanelCard title="Series Worklist">
        <ActionToolbar
          count={countValue}
          onCount={handleCount}
          onSubmit={handleSubmit}
          isCounting={countMutation.isPending}
          isSubmitting={seriesQuery.isFetching}
        >
          <FilterInput value={draftFilters.studyInstanceUID || ''} onChange={(e) => setDraftFilters((c) => ({ ...c, studyInstanceUID: e.target.value }))} placeholder="Study Instance UID" className="w-[260px]" />
          <FilterInput value={draftFilters.modality || ''} onChange={(e) => setDraftFilters((c) => ({ ...c, modality: e.target.value }))} placeholder="Modality" className="w-[120px]" />
          <FilterInput value={draftFilters.seriesDescription || ''} onChange={(e) => setDraftFilters((c) => ({ ...c, seriesDescription: e.target.value }))} placeholder="Series description" className="w-[220px]" />
          <ResetFiltersButton onClick={handleReset} />
        </ActionToolbar>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-mutedText">
          Showing <span className="font-medium text-white">{rows.length}</span> loaded series for the currently submitted filters.
        </div>

        <div className="mt-4">
          <QueryState isLoading={seriesQuery.isLoading} error={seriesQuery.error} empty={rows.length === 0}>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <table className="min-w-full divide-y divide-white/10 text-sm">
                <thead className="bg-white/5 text-left text-mutedText">
                  <tr>
                    <th className="px-4 py-3 font-medium">Series #</th>
                    <th className="px-4 py-3 font-medium">Modality</th>
                    <th className="px-4 py-3 font-medium">Description</th>
                    <th className="px-4 py-3 font-medium">Instances</th>
                    <th className="px-4 py-3 font-medium">Study UID</th>
                    <th className="px-4 py-3 font-medium">Series UID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {rows.map((row) => (
                    <tr key={row.seriesInstanceUID} className="hover:bg-white/5">
                      <td className="px-4 py-3 text-white">{row.seriesNumber || '-'}</td>
                      <td className="px-4 py-3">{row.modality || '-'}</td>
                      <td className="px-4 py-3">{row.description || '-'}</td>
                      <td className="px-4 py-3">{row.instances}</td>
                      <td className="px-4 py-3 text-mutedText" title={row.studyInstanceUID}>
                        {truncateMiddle(row.studyInstanceUID || '-')}
                      </td>
                      <td className="px-4 py-3 text-mutedText" title={row.seriesInstanceUID}>
                        {truncateMiddle(row.seriesInstanceUID)}
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
