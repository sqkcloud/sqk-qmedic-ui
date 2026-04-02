'use client';

import { useMemo, useState } from 'react';
import { AlertTriangle, Diff, PencilRuler, StickyNote } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { StudyModuleTabs } from '@/components/ui/StudyModuleTabs';
import { PageHeader } from '@/components/ui/PageHeader';
import { PanelCard } from '@/components/ui/PanelCard';
import { ActionToolbar, FilterInput, ResetFiltersButton } from '@/components/filters/ActionToolbar';
import { QueryState } from '@/components/ui/QueryState';
import { truncateMiddle } from '@/features/common/format';
import { useStudyDetail } from '@/features/studies/hooks';
import { useInstances } from '@/features/instances/hooks';
import { StudyWorkspacePanel } from '@/components/ohif/StudyWorkspacePanel';
import { useOhifWorkspace } from '@/features/ohif/state';

function normalizeText(value: string | null | undefined) {
  return (value || '').trim().toUpperCase();
}

type DiffRow = {
  key: string;
  left: string;
  right: string;
  severity: 'same' | 'different' | 'left-only' | 'right-only';
};

export default function ComparePage() {
  const [draftLeft, setDraftLeft] = useState('');
  const [draftRight, setDraftRight] = useState('');
  const [leftUID, setLeftUID] = useState('');
  const [rightUID, setRightUID] = useState('');
  const [countValue, setCountValue] = useState<number | null>(null);

  const left = useStudyDetail(leftUID);
  const right = useStudyDetail(rightUID);
  const workspace = useOhifWorkspace();

  const leftPrimarySeries = left.data?.series[0]?.seriesInstanceUID || null;
  const rightPrimarySeries = right.data?.series[0]?.seriesInstanceUID || null;
  const leftInstances = useInstances(leftUID, leftPrimarySeries);
  const rightInstances = useInstances(rightUID, rightPrimarySeries);

  const leftPrimaryInstance = leftInstances.data?.[0]?.sopInstanceUID || '';
  const rightPrimaryInstance = rightInstances.data?.[0]?.sopInstanceUID || '';

  const isLoading = left.isLoading || right.isLoading;
  const error = left.error || right.error;

  const summary = useMemo(() => {
    if (!left.data || !right.data) return null;
    return {
      leftSeries: left.data.series.length,
      rightSeries: right.data.series.length,
      leftInstances: left.data.summary.instances,
      rightInstances: right.data.summary.instances,
      leftModalities: normalizeText(left.data.summary.modalities),
      rightModalities: normalizeText(right.data.summary.modalities),
    };
  }, [left.data, right.data]);

  const diffs = useMemo(() => {
    if (!left.data || !right.data) return [] as DiffRow[];

    const leftDesc = normalizeText(left.data.summary.description);
    const rightDesc = normalizeText(right.data.summary.description);

    const leftSeriesDescriptions = new Set(left.data.series.map((s) => normalizeText(s.description)).filter(Boolean));
    const rightSeriesDescriptions = new Set(right.data.series.map((s) => normalizeText(s.description)).filter(Boolean));

    const leftOnly = [...leftSeriesDescriptions].filter((value) => !rightSeriesDescriptions.has(value)).slice(0, 8);
    const rightOnly = [...rightSeriesDescriptions].filter((value) => !leftSeriesDescriptions.has(value)).slice(0, 8);

    return [
      { key: 'Patient', left: left.data.summary.patientName || '-', right: right.data.summary.patientName || '-', severity: normalizeText(left.data.summary.patientName) === normalizeText(right.data.summary.patientName) ? 'same' : 'different' },
      { key: 'Modalities', left: left.data.summary.modalities || '-', right: right.data.summary.modalities || '-', severity: normalizeText(left.data.summary.modalities) === normalizeText(right.data.summary.modalities) ? 'same' : 'different' },
      { key: 'Study description', left: left.data.summary.description || '-', right: right.data.summary.description || '-', severity: leftDesc === rightDesc ? 'same' : 'different' },
      { key: 'Series count', left: String(left.data.series.length), right: String(right.data.series.length), severity: left.data.series.length === right.data.series.length ? 'same' : 'different' },
      { key: 'Instance count', left: String(left.data.summary.instances), right: String(right.data.summary.instances), severity: left.data.summary.instances === right.data.summary.instances ? 'same' : 'different' },
      { key: 'Series descriptions only on LEFT', left: leftOnly.join(' • ') || '-', right: '-', severity: leftOnly.length ? 'left-only' : 'same' },
      { key: 'Series descriptions only on RIGHT', left: '-', right: rightOnly.join(' • ') || '-', severity: rightOnly.length ? 'right-only' : 'same' },
      { key: 'Primary instance ready', left: leftPrimaryInstance ? 'Yes' : 'No', right: rightPrimaryInstance ? 'Yes' : 'No', severity: leftPrimaryInstance && rightPrimaryInstance ? 'same' : 'different' },
    ];
  }, [left.data, right.data, leftPrimaryInstance, rightPrimaryInstance]);

  function handleSubmit() {
    setLeftUID(draftLeft.trim());
    setRightUID(draftRight.trim());
  }

  function handleCount() {
    if (!left.data || !right.data) {
      setCountValue(0);
      return;
    }
    setCountValue(left.data.series.length + right.data.series.length);
  }

  function handleReset() {
    setDraftLeft('');
    setDraftRight('');
    setLeftUID('');
    setRightUID('');
    setCountValue(null);
  }

  function queueDiffNotes() {
    if (!left.data || !right.data) return;
    const leftSeries = left.data.series[0];
    const rightSeries = right.data.series[0];

    if (leftSeries) {
      workspace.addSegmentation({
        studyUID: leftUID,
        seriesUID: leftSeries.seriesInstanceUID,
        sopInstanceUID: leftPrimaryInstance || undefined,
        templateId: 'compare-diff',
        label: `Compare diff note: ${rightUID}`,
        color: 'Cyan',
        status: 'Draft',
      });
    }

    if (rightSeries) {
      workspace.addSegmentation({
        studyUID: rightUID,
        seriesUID: rightSeries.seriesInstanceUID,
        sopInstanceUID: rightPrimaryInstance || undefined,
        templateId: 'compare-diff',
        label: `Compare diff note: ${leftUID}`,
        color: 'Cyan',
        status: 'Draft',
      });
    }
  }

  function createBridgeMeasurements() {
    if (leftPrimarySeries && leftPrimaryInstance) {
      workspace.addMeasurement({
        studyUID: leftUID,
        seriesUID: leftPrimarySeries,
        sopInstanceUID: leftPrimaryInstance,
        label: `Compare baseline ↔ ${truncateMiddle(rightUID)}`,
        note: `Generated from Compare diff result against ${rightUID}`,
      });
    }
    if (rightPrimarySeries && rightPrimaryInstance) {
      workspace.addMeasurement({
        studyUID: rightUID,
        seriesUID: rightPrimarySeries,
        sopInstanceUID: rightPrimaryInstance,
        label: `Compare follow-up ↔ ${truncateMiddle(leftUID)}`,
        note: `Generated from Compare diff result against ${leftUID}`,
      });
    }
  }

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Home', href: '/inbox' }, { label: 'Compare' }]} />
      <StudyModuleTabs />
      <PageHeader title="Compare" description="Compare studies and push findings into the shared OHIF measurement/segmentation workspace." />
      <PanelCard title="Compare Studies">
        <ActionToolbar count={countValue} onCount={handleCount} onSubmit={handleSubmit}>
          <FilterInput value={draftLeft} onChange={(e) => setDraftLeft(e.target.value)} placeholder="Left Study Instance UID" className="w-[360px]" />
          <FilterInput value={draftRight} onChange={(e) => setDraftRight(e.target.value)} placeholder="Right Study Instance UID" className="w-[360px]" />
          <ResetFiltersButton onClick={handleReset} />
        </ActionToolbar>

        {summary ? (
          <div className="mt-4 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-mutedText md:grid-cols-4">
            <div>
              <div className="text-xs uppercase tracking-[0.15em]">Series</div>
              <div className="mt-1 text-lg font-semibold text-white">{summary.leftSeries} vs {summary.rightSeries}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.15em]">Instances</div>
              <div className="mt-1 text-lg font-semibold text-white">{summary.leftInstances} vs {summary.rightInstances}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.15em]">Modalities</div>
              <div className="mt-1 text-white">{summary.leftModalities || '-'} / {summary.rightModalities || '-'}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.15em]">Left UID</div>
              <div className="mt-1 text-white">{truncateMiddle(leftUID || '-')}</div>
            </div>
          </div>
        ) : null}

        <div className="mt-4">
          <QueryState isLoading={isLoading} error={error} empty={!leftUID || !rightUID || !left.data || !right.data}>
            <div className="grid gap-5 lg:grid-cols-2">
              <PanelCard title="Left study">
                <div className="space-y-3 text-sm">
                  <div className="text-mutedText">{left.data?.summary.patientName}</div>
                  <div className="text-white">{left.data?.summary.description}</div>
                  <div className="text-mutedText">Series: {left.data?.series.length}</div>
                  <div className="text-mutedText">Primary instance ready: {leftPrimaryInstance ? 'Yes' : 'No'}</div>
                </div>
              </PanelCard>
              <PanelCard title="Right study">
                <div className="space-y-3 text-sm">
                  <div className="text-mutedText">{right.data?.summary.patientName}</div>
                  <div className="text-white">{right.data?.summary.description}</div>
                  <div className="text-mutedText">Series: {right.data?.series.length}</div>
                  <div className="text-mutedText">Primary instance ready: {rightPrimaryInstance ? 'Yes' : 'No'}</div>
                </div>
              </PanelCard>
            </div>

            <PanelCard title="Compare diff results" className="mt-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm text-mutedText"><Diff size={16} /> Diff rows are computed from study summary + series descriptions.</div>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={createBridgeMeasurements} disabled={!leftPrimaryInstance && !rightPrimaryInstance} className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-50 hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-40"><PencilRuler size={16} /> Create bridge measurements</button>
                  <button type="button" onClick={queueDiffNotes} className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-50 hover:bg-cyan-400/20"><StickyNote size={16} /> Queue diff notes</button>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-mutedText"><tr><th className="px-4 py-3">Field</th><th className="px-4 py-3">Left</th><th className="px-4 py-3">Right</th></tr></thead>
                  <tbody>
                    {diffs.map((row) => (
                      <tr key={row.key} className={["border-t border-white/5", row.severity === 'different' ? 'bg-amber-500/5' : row.severity === 'left-only' || row.severity === 'right-only' ? 'bg-cyan-500/5' : ''].join(' ')}>
                        <td className="px-4 py-3 text-white">{row.key}</td>
                        <td className="px-4 py-3 text-mutedText">{row.left}</td>
                        <td className="px-4 py-3 text-mutedText">{row.right}</td>
                      </tr>
                    ))}
                    {!diffs.length ? <tr><td colSpan={3} className="px-4 py-8 text-center text-mutedText">No diffs yet.</td></tr> : null}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex items-start gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-mutedText">
                <AlertTriangle size={18} className="mt-0.5 text-amber-200" />
                <div>Diff results can now create real measurement records when the primary instance for each study is available; otherwise the review can still be queued as segmentation notes.</div>
              </div>
            </PanelCard>

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              {left.data ? <StudyWorkspacePanel studyUID={leftUID} seriesUID={leftPrimarySeries || undefined} instanceUID={leftPrimaryInstance || undefined} label="Left compare bridge" /> : null}
              {right.data ? <StudyWorkspacePanel studyUID={rightUID} seriesUID={rightPrimarySeries || undefined} instanceUID={rightPrimaryInstance || undefined} label="Right compare bridge" /> : null}
            </div>
          </QueryState>
        </div>
      </PanelCard>
    </div>
  );
}
