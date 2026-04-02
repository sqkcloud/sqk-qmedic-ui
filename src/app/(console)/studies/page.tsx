'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { StudyModuleTabs } from '@/components/ui/StudyModuleTabs';
import { PageHeader } from '@/components/ui/PageHeader';
import { PanelCard } from '@/components/ui/PanelCard';
import { QueryState } from '@/components/ui/QueryState';
import { ActionToolbar, FilterInput, ResetFiltersButton } from '@/components/filters/ActionToolbar';
import { formatBytes, formatDicomDate } from '@/features/common/format';
import { useStudies, useStudyCount, useStudySize, useStudyDetail } from '@/features/studies/hooks';
import { StudyQuery } from '@/features/studies/types';
import { StudyWorkspacePanel } from '@/components/ohif/StudyWorkspacePanel';

const defaultFilters: StudyQuery = {
  patientName: '',
  patientID: '',
  accessionNumber: '',
  studyDate: '',
  modality: '',
  limit: 25,
};

export default function StudiesPage() {
  const [draftFilters, setDraftFilters] = useState<StudyQuery>(defaultFilters);
  const [submittedFilters, setSubmittedFilters] = useState<StudyQuery>(defaultFilters);
  const [countValue, setCountValue] = useState<number | null>(null);
  const [sizeValue, setSizeValue] = useState<number | null>(null);
  const [selectedStudyUID, setSelectedStudyUID] = useState<string>('');

  const query = useMemo(
    () => ({
      patientName: draftFilters.patientName || undefined,
      patientID: draftFilters.patientID || undefined,
      accessionNumber: draftFilters.accessionNumber || undefined,
      studyDate: draftFilters.studyDate || undefined,
      modality: draftFilters.modality || undefined,
      limit: draftFilters.limit ?? 25,
    }),
    [draftFilters],
  );

  const activeQuery = useMemo(
    () => ({
      patientName: submittedFilters.patientName || undefined,
      patientID: submittedFilters.patientID || undefined,
      accessionNumber: submittedFilters.accessionNumber || undefined,
      studyDate: submittedFilters.studyDate || undefined,
      modality: submittedFilters.modality || undefined,
      limit: submittedFilters.limit ?? 25,
    }),
    [submittedFilters],
  );

  const studiesQuery = useStudies(activeQuery, true);
  const studyCount = useStudyCount();
  const studySize = useStudySize();
  const rows = studiesQuery.data ?? [];
  const selectedDetail = useStudyDetail(selectedStudyUID);
  const selected = selectedDetail.data;

  function setField<K extends keyof StudyQuery>(field: K, value: StudyQuery[K]) {
    setDraftFilters((current) => ({ ...current, [field]: value }));
  }

  async function handleCount() {
    const result = await studyCount.mutateAsync(query);
    setCountValue(result);
  }

  async function handleSize() {
    const result = await studySize.mutateAsync(query);
    setSizeValue(result);
  }

  function handleSubmit() {
    setSubmittedFilters(draftFilters);
  }

  function handleReset() {
    setDraftFilters(defaultFilters);
    setSubmittedFilters(defaultFilters);
    setCountValue(null);
    setSizeValue(null);
  }

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Home', href: '/inbox' }, { label: 'Studies' }]} />
      <StudyModuleTabs />
      <PageHeader title="Studies" description="QIDO-RS-backed study worklist for the React/Next migration." />
      <PanelCard title="Study Worklist">
        <ActionToolbar
          count={countValue}
          onCount={handleCount}
          onSubmit={handleSubmit}
          onSize={handleSize}
          sizeLabel={sizeValue != null ? formatBytes(sizeValue) : undefined}
          isCounting={studyCount.isPending}
          isSubmitting={studiesQuery.isFetching}
          isSizing={studySize.isPending}
        >
          <FilterInput value={draftFilters.patientName || ''} onChange={(e) => setField('patientName', e.target.value)} placeholder="Patient name" />
          <FilterInput value={draftFilters.patientID || ''} onChange={(e) => setField('patientID', e.target.value)} placeholder="Patient ID" className="w-[140px]" />
          <FilterInput value={draftFilters.accessionNumber || ''} onChange={(e) => setField('accessionNumber', e.target.value)} placeholder="Accession" className="w-[140px]" />
          <FilterInput value={draftFilters.studyDate || ''} onChange={(e) => setField('studyDate', e.target.value)} placeholder="Study date" className="w-[140px]" />
          <FilterInput value={draftFilters.modality || ''} onChange={(e) => setField('modality', e.target.value)} placeholder="Modality" className="w-[120px]" />
          <ResetFiltersButton onClick={handleReset} />
        </ActionToolbar>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-mutedText">
          Showing <span className="font-medium text-white">{rows.length}</span> loaded rows for the currently submitted filters.
        </div>

        <div className="mt-4">
          <QueryState isLoading={studiesQuery.isLoading} error={studiesQuery.error} empty={rows.length === 0}>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <table className="min-w-full divide-y divide-white/10 text-sm">
                <thead className="bg-white/5 text-left text-mutedText">
                  <tr>
                    <th className="px-4 py-3 font-medium">Patient</th>
                    <th className="px-4 py-3 font-medium">Patient ID</th>
                    <th className="px-4 py-3 font-medium">Accession</th>
                    <th className="px-4 py-3 font-medium">Modalities</th>
                    <th className="px-4 py-3 font-medium">Study Date</th>
                    <th className="px-4 py-3 font-medium">Description</th>
                    <th className="px-4 py-3 font-medium">Series</th>
                    <th className="px-4 py-3 font-medium">Instances</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {rows.map((study) => (
                    <tr
                      key={study.studyInstanceUID}
                      className={['hover:bg-white/5 cursor-pointer', selectedStudyUID === study.studyInstanceUID ? 'bg-white/5' : ''].join(' ')}
                      onClick={() => setSelectedStudyUID(study.studyInstanceUID)}
                    >
                      <td className="px-4 py-3 text-white">
                        <Link
                          className="underline-offset-4 hover:underline"
                          href={`/study/${encodeURIComponent(study.studyInstanceUID)}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {study.patientName || '(no name)'}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-mutedText">{study.patientID || '-'}</td>
                      <td className="px-4 py-3 text-mutedText">{study.accessionNumber || '-'}</td>
                      <td className="px-4 py-3">{study.modalities || '-'}</td>
                      <td className="px-4 py-3">{formatDicomDate(study.studyDate)}</td>
                      <td className="px-4 py-3">{study.description || '-'}</td>
                      <td className="px-4 py-3">{study.series}</td>
                      <td className="px-4 py-3">{study.instances}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </QueryState>
        </div>

        <div className="mt-5">
          {selectedStudyUID ? (
            <PanelCard title="Selected Study (row selection)">
              <QueryState isLoading={selectedDetail.isLoading} error={selectedDetail.error} empty={!selected}>
                {selected ? (
                  <div className="space-y-4">
                    <div className="grid gap-3 md:grid-cols-3">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Patient</div><div className="mt-2 text-white">{selected.summary.patientName || '-'}</div></div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Modalities</div><div className="mt-2 text-white">{selected.summary.modalities || '-'}</div></div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Description</div><div className="mt-2 text-white">{selected.summary.description || '-'}</div></div>
                    </div>
                    <StudyWorkspacePanel
                      studyUID={selectedStudyUID}
                      seriesUID={selected.series[0]?.seriesInstanceUID}
                      label={`Studies table selection: ${selected.summary.patientName || ''}`}
                    />
                  </div>
                ) : null}
              </QueryState>
            </PanelCard>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 px-6 py-8 text-sm text-mutedText">Click a study row to open the OHIF bridge panel and sync it into the viewport workflow.</div>
          )}
        </div>
      </PanelCard>
    </div>
  );
}
