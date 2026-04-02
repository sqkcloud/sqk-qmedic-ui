'use client';

import { useMemo, useState } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { StudyModuleTabs } from '@/components/ui/StudyModuleTabs';
import { PageHeader } from '@/components/ui/PageHeader';
import { PanelCard } from '@/components/ui/PanelCard';
import { QueryState } from '@/components/ui/QueryState';
import { ActionToolbar, FilterInput, FilterSelect, ResetFiltersButton } from '@/components/filters/ActionToolbar';
import { formatDicomDate } from '@/features/common/format';
import { usePatientCount, usePatients } from '@/features/patients/hooks';
import { PatientQuery } from '@/features/patients/types';

const defaultFilters: PatientQuery = {
  patientName: '',
  patientID: '',
  fuzzymatching: false,
  limit: 25,
};

export default function PatientsPage() {
  const [draftFilters, setDraftFilters] = useState<PatientQuery>(defaultFilters);
  const [submittedFilters, setSubmittedFilters] = useState<PatientQuery>(defaultFilters);
  const [countValue, setCountValue] = useState<number | null>(null);

  const query = useMemo(
    () => ({
      patientName: draftFilters.patientName || undefined,
      patientID: draftFilters.patientID || undefined,
      fuzzymatching: draftFilters.fuzzymatching,
      limit: draftFilters.limit ?? 25,
    }),
    [draftFilters],
  );

  const activeQuery = useMemo(
    () => ({
      patientName: submittedFilters.patientName || undefined,
      patientID: submittedFilters.patientID || undefined,
      fuzzymatching: submittedFilters.fuzzymatching,
      limit: submittedFilters.limit ?? 25,
    }),
    [submittedFilters],
  );

  const patientsQuery = usePatients(activeQuery, true);
  const countMutation = usePatientCount();
  const rows = patientsQuery.data ?? [];

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
      <Breadcrumbs items={[{ label: 'Home', href: '/inbox' }, { label: 'Patients' }]} />
      <StudyModuleTabs />
      <PageHeader title="Patients" description="QIDO-RS patient list with Submit / Count behavior." />
      <PanelCard title="Patient Worklist">
        <ActionToolbar
          count={countValue}
          onCount={handleCount}
          onSubmit={handleSubmit}
          isCounting={countMutation.isPending}
          isSubmitting={patientsQuery.isFetching}
        >
          <FilterInput value={draftFilters.patientName || ''} onChange={(e) => setDraftFilters((c) => ({ ...c, patientName: e.target.value }))} placeholder="Patient name" className="w-[200px]" />
          <FilterInput value={draftFilters.patientID || ''} onChange={(e) => setDraftFilters((c) => ({ ...c, patientID: e.target.value }))} placeholder="Patient ID" className="w-[160px]" />
          <FilterSelect
            value={draftFilters.fuzzymatching ? 'on' : 'off'}
            onChange={(e) => setDraftFilters((c) => ({ ...c, fuzzymatching: e.target.value === 'on' }))}
            className="w-[160px]"
          >
            <option value="off">Fuzzy matching off</option>
            <option value="on">Fuzzy matching on</option>
          </FilterSelect>
          <ResetFiltersButton onClick={handleReset} />
        </ActionToolbar>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-mutedText">
          Showing <span className="font-medium text-white">{rows.length}</span> loaded patients for the currently submitted filters.
        </div>

        <div className="mt-4">
          <QueryState isLoading={patientsQuery.isLoading} error={patientsQuery.error} empty={rows.length === 0}>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <table className="min-w-full divide-y divide-white/10 text-sm">
                <thead className="bg-white/5 text-left text-mutedText">
                  <tr>
                    <th className="px-4 py-3 font-medium">Patient</th>
                    <th className="px-4 py-3 font-medium">Patient ID</th>
                    <th className="px-4 py-3 font-medium">Birth Date</th>
                    <th className="px-4 py-3 font-medium">Sex</th>
                    <th className="px-4 py-3 font-medium">Studies</th>
                    <th className="px-4 py-3 font-medium">Series</th>
                    <th className="px-4 py-3 font-medium">Instances</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {rows.map((row) => (
                    <tr key={`${row.patientID}-${row.patientName}`} className="hover:bg-white/5">
                      <td className="px-4 py-3 text-white">{row.patientName || '(no name)'}</td>
                      <td className="px-4 py-3 text-mutedText">{row.patientID || '-'}</td>
                      <td className="px-4 py-3">{row.birthDate ? formatDicomDate(row.birthDate) : '-'}</td>
                      <td className="px-4 py-3">{row.sex || '-'}</td>
                      <td className="px-4 py-3">{row.studies ?? '-'}</td>
                      <td className="px-4 py-3">{row.series ?? '-'}</td>
                      <td className="px-4 py-3">{row.instances ?? '-'}</td>
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
