'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Layers3 } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { OhifModuleTabs } from '@/components/ui/OhifModuleTabs';
import { PageHeader } from '@/components/ui/PageHeader';
import { PanelCard } from '@/components/ui/PanelCard';
import { segmentationTemplates } from '@/features/ohif/catalog';
import { useOhifWorkspace } from '@/features/ohif/state';

export default function SegmentationsPageClient() {
  const params = useSearchParams();
  const workspace = useOhifWorkspace();
  const studyUID = params.get('study') || workspace.state.selectedStudyUID || '';
  const [selected, setSelected] = useState(segmentationTemplates[0]?.id || '');

  useEffect(() => {
    if (studyUID && workspace.state.selectedStudyUID !== studyUID) {
      workspace.setStudySelection({ studyUID });
    }
  }, [studyUID, workspace]);

  const selectedTemplate = segmentationTemplates.find((t) => t.id === selected) || segmentationTemplates[0];
  const related = useMemo(
    () => workspace.state.segmentations.filter((item) => !studyUID || item.studyUID === studyUID),
    [studyUID, workspace.state.segmentations],
  );

  function queueSegmentation() {
    if (!studyUID || !workspace.state.selectedSeriesUID) return;
    workspace.addSegmentation({
      studyUID,
      seriesUID: workspace.state.selectedSeriesUID,
      sopInstanceUID: workspace.state.selectedInstanceUID || undefined,
      templateId: selectedTemplate.id,
      label: selectedTemplate.label,
      color: selectedTemplate.color,
      status: 'Draft',
    });
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Home', href: '/inbox' }, { label: 'OHIF View', href: '/ohifview' }, { label: 'Segmentations' }]} />
      <OhifModuleTabs />
      <PageHeader title="Segmentations Workspace" description="Segmentation plans are now tied to the shared study, series, and instance context." />
      <div className="grid gap-6 xl:grid-cols-[380px,1fr]">
        <PanelCard title="Templates">
          <div className="space-y-3">
            {segmentationTemplates.map((template) => (
              <button key={template.id} type="button" onClick={() => setSelected(template.id)} className={['w-full rounded-2xl border p-4 text-left transition', selected === template.id ? 'border-cyan-300/30 bg-cyan-400/10' : 'border-white/10 bg-white/5 hover:bg-white/10'].join(' ')}>
                <div className="flex items-center justify-between"><div className="text-base font-semibold text-white">{template.label}</div><div className="text-xs text-mutedText">{template.status}</div></div>
                <div className="mt-2 text-sm text-mutedText">Suggested color: {template.color}</div>
              </button>
            ))}
          </div>
        </PanelCard>
        <PanelCard title="Selected Segmentation Plan">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Study UID</div><div className="mt-2 break-all text-sm text-white">{studyUID || 'No study selected'}</div></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Series UID</div><div className="mt-2 break-all text-sm text-white">{workspace.state.selectedSeriesUID || 'No series selected'}</div></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Instance UID</div><div className="mt-2 break-all text-sm text-white">{workspace.state.selectedInstanceUID || 'No instance selected'}</div></div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={queueSegmentation} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"><Layers3 size={16} /> Queue segmentation</button>
          </div>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-mutedText"><tr><th className="px-4 py-3">Label</th><th className="px-4 py-3">Series</th><th className="px-4 py-3">Color</th><th className="px-4 py-3">Status</th></tr></thead>
              <tbody>
                {related.map((item) => (
                  <tr key={item.id} className="border-t border-white/5"><td className="px-4 py-3 text-white">{item.label}</td><td className="px-4 py-3 break-all text-mutedText">{item.seriesUID}</td><td className="px-4 py-3 text-mutedText">{item.color}</td><td className="px-4 py-3 text-white">{item.status}</td></tr>
                ))}
                {!related.length ? <tr><td colSpan={4} className="px-4 py-8 text-center text-mutedText">No segmentation plan queued yet.</td></tr> : null}
              </tbody>
            </table>
          </div>
        </PanelCard>
      </div>
    </div>
  );
}
