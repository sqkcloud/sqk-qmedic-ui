'use client';

import Link from 'next/link';
import { Layers3, PencilRuler, Route } from 'lucide-react';
import { PanelCard } from '@/components/ui/PanelCard';
import { useOhifWorkspace } from '@/features/ohif/state';

export function StudyWorkspacePanel({
  studyUID,
  seriesUID,
  instanceUID,
  label,
}: {
  studyUID: string;
  seriesUID?: string | null;
  instanceUID?: string | null;
  label?: string;
}) {
  const workspace = useOhifWorkspace();

  const relatedMeasurements = workspace.state.measurements.filter((item) => item.studyUID === studyUID && (!seriesUID || item.seriesUID === seriesUID));
  const relatedSegmentations = workspace.state.segmentations.filter((item) => item.studyUID === studyUID && (!seriesUID || item.seriesUID === seriesUID));

  function syncToViewport() {
    workspace.setStudySelection({ studyUID, seriesUID: seriesUID || '', instanceUID: instanceUID || '' });
  }

  function addMeasurement() {
    if (!studyUID || !seriesUID || !instanceUID) return;
    workspace.addMeasurement({
      studyUID,
      seriesUID,
      sopInstanceUID: instanceUID,
      label: label || 'Study detail measurement',
      note: 'Created from study detail / compare / monitoring bridge',
    });
  }

  function addSegmentation() {
    if (!studyUID || !seriesUID) return;
    workspace.addSegmentation({
      studyUID,
      seriesUID,
      sopInstanceUID: instanceUID || undefined,
      templateId: 'bridge',
      label: label || 'Bridge segmentation',
      color: 'Cyan',
      status: 'Draft',
    });
  }

  return (
    <PanelCard title="OHIF Workspace Bridge">
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs text-mutedText">Measurements</div>
          <div className="mt-2 text-2xl font-semibold text-white">{relatedMeasurements.length}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs text-mutedText">Segmentations</div>
          <div className="mt-2 text-2xl font-semibold text-white">{relatedSegmentations.length}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="text-xs text-mutedText">Viewport target</div>
          <div className="mt-2 text-sm text-white">{workspace.state.activeViewportId}</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={syncToViewport} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10">
          <Route size={16} /> Sync to viewport
        </button>
        <button type="button" onClick={addMeasurement} disabled={!seriesUID || !instanceUID} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40">
          <PencilRuler size={16} /> Add measurement
        </button>
        <button type="button" onClick={addSegmentation} disabled={!seriesUID} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40">
          <Layers3 size={16} /> Add segmentation
        </button>
        <Link href={`/ohifview/viewport?study=${encodeURIComponent(studyUID)}`} prefetch={false} className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-50">
          Open viewport
        </Link>
      </div>
    </PanelCard>
  );
}
