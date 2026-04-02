'use client';

import Link from 'next/link';
import { BarChart3 } from 'lucide-react';
import { PanelCard } from '@/components/ui/PanelCard';
import { useOhifWorkspace } from '@/features/ohif/state';

export function MonitoringBridgePanel({ studyUIDs = [] }: { studyUIDs?: string[] }) {
  const workspace = useOhifWorkspace();
  const set = new Set(studyUIDs.filter(Boolean));

  const relatedMeasurements = workspace.state.measurements.filter((item) => set.size === 0 || set.has(item.studyUID));
  const relatedSegmentations = workspace.state.segmentations.filter((item) => set.size === 0 || set.has(item.studyUID));

  return (
    <PanelCard title="OHIF Monitoring Link">
      <div className="grid gap-3 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Tracked studies</div><div className="mt-2 text-2xl font-semibold text-white">{set.size || workspace.state.selectedStudyUID ? Math.max(set.size, 1) : 0}</div></div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Measurements</div><div className="mt-2 text-2xl font-semibold text-white">{relatedMeasurements.length}</div></div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Segmentations</div><div className="mt-2 text-2xl font-semibold text-white">{relatedSegmentations.length}</div></div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Active viewport</div><div className="mt-2 text-sm text-white">{workspace.state.activeViewportId}</div></div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <Link href={`/ohifview/measurements${workspace.state.selectedStudyUID ? `?study=${encodeURIComponent(workspace.state.selectedStudyUID)}` : ''}`} prefetch={false} className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-cyan-50">
          <BarChart3 size={16} /> Open measurement queue
        </Link>
        <Link href={`/ohifview/segmentations${workspace.state.selectedStudyUID ? `?study=${encodeURIComponent(workspace.state.selectedStudyUID)}` : ''}`} prefetch={false} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white hover:bg-white/10">
          Open segmentation queue
        </Link>
      </div>
    </PanelCard>
  );
}
