'use client';

import { useMemo, useState } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { StudyModuleTabs } from '@/components/ui/StudyModuleTabs';
import { PageHeader } from '@/components/ui/PageHeader';
import { PanelCard } from '@/components/ui/PanelCard';
import { QueryState } from '@/components/ui/QueryState';
import { ActionToolbar, FilterInput, FilterSelect, ResetFiltersButton } from '@/components/filters/ActionToolbar';
import { formatDicomDate } from '@/features/common/format';
import { useMPPS, useMPPSCount } from '@/features/mpps/hooks';
import { MPPSQuery } from '@/features/mpps/types';

const defaultFilters: MPPSQuery = {
  patientName: '',
  patientID: '',
  accessionNumber: '',
  status: '',
  limit: 25,
};

export default function MPPSPage() {
  const [draftFilters, setDraftFilters] = useState<MPPSQuery>(defaultFilters);
  const [submittedFilters, setSubmittedFilters] = useState<MPPSQuery>(defaultFilters);
  const [countValue, setCountValue] = useState<number | null>(null);

  const query = useMemo(
    () => ({
      patientName: draftFilters.patientName || undefined,
      patientID: draftFilters.patientID || undefined,
      accessionNumber: draftFilters.accessionNumber || undefined,
      status: draftFilters.status || undefined,
      limit: draftFilters.limit ?? 25,
    }),
    [draftFilters],
  );

  const activeQuery = useMemo(
    () => ({
      patientName: submittedFilters.patientName || undefined,
      patientID: submittedFilters.patientID || undefined,
      accessionNumber: submittedFilters.accessionNumber || undefined,
      status: submittedFilters.status || undefined,
      limit: submittedFilters.limit ?? 25,
    }),
    [submittedFilters],
  );

  const mppsQuery = useMPPS(activeQuery, true);
  const countMutation = useMPPSCount();
  const rows = mppsQuery.data ?? [];

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
      <Breadcrumbs items={[{ label: 'Home', href: '/inbox' }, { label: 'MPPS' }]} />
      <StudyModuleTabs />
      <PageHeader title="MPPS" description="MPPS-RS performed procedure steps search with Submit / Count behavior." />
      <PanelCard title="Modality Performed Procedure Step">
        <ActionToolbar
          count={countValue}
          onCount={handleCount}
          onSubmit={handleSubmit}
          isCounting={countMutation.isPending}
          isSubmitting={mppsQuery.isFetching}
        >
          <FilterInput value={draftFilters.patientName || ''} onChange={(e) => setDraftFilters((c) => ({ ...c, patientName: e.target.value }))} placeholder="Patient name" className="w-[200px]" />
          <FilterInput value={draftFilters.patientID || ''} onChange={(e) => setDraftFilters((c) => ({ ...c, patientID: e.target.value }))} placeholder="Patient ID" className="w-[160px]" />
          <FilterInput value={draftFilters.accessionNumber || ''} onChange={(e) => setDraftFilters((c) => ({ ...c, accessionNumber: e.target.value }))} placeholder="Accession" className="w-[160px]" />
          <FilterSelect value={draftFilters.status || ''} onChange={(e) => setDraftFilters((c) => ({ ...c, status: e.target.value }))} className="w-[170px]">
            <option value="">Any status</option>
            <option value="IN PROGRESS">IN PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="DISCONTINUED">DISCONTINUED</option>
          </FilterSelect>
          <ResetFiltersButton onClick={handleReset} />
        </ActionToolbar>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-mutedText">
          Showing <span className="font-medium text-white">{rows.length}</span> loaded MPPS entries for the currently submitted filters.
        </div>

        <div className="mt-4">
          <QueryState isLoading={mppsQuery.isLoading} error={mppsQuery.error} empty={rows.length === 0}>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <table className="min-w-full divide-y divide-white/10 text-sm">
                <thead className="bg-white/5 text-left text-mutedText">
                  <tr>
                    <th className="px-4 py-3 font-medium">Patient</th>
                    <th className="px-4 py-3 font-medium">Patient ID</th>
                    <th className="px-4 py-3 font-medium">Accession</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Start Date</th>
                    <th className="px-4 py-3 font-medium">Start Time</th>
                    <th className="px-4 py-3 font-medium">MPPS UID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {rows.map((row) => (
                    <tr key={row.mppsUID} className="hover:bg-white/5">
                      <td className="px-4 py-3 text-white">{row.patientName || '(no name)'}</td>
                      <td className="px-4 py-3 text-mutedText">{row.patientID || '-'}</td>
                      <td className="px-4 py-3">{row.accessionNumber || '-'}</td>
                      <td className="px-4 py-3">{row.status || '-'}</td>
                      <td className="px-4 py-3">{row.startDate ? formatDicomDate(row.startDate) : '-'}</td>
                      <td className="px-4 py-3">{row.startTime || '-'}</td>
                      <td className="px-4 py-3 text-mutedText" title={row.mppsUID}>
                        {row.mppsUID}
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
