'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCheck, ClipboardPenLine } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { OhifModuleTabs } from '@/components/ui/OhifModuleTabs';
import { PageHeader } from '@/components/ui/PageHeader';
import { PanelCard } from '@/components/ui/PanelCard';
import { useStudyDetail } from '@/features/studies/hooks';
import { useOhifWorkspace } from '@/features/ohif/state';

export default function MeasurementsPageClient() {
  const params = useSearchParams();
  const workspace = useOhifWorkspace();
  const studyUID = params.get('study') || workspace.state.selectedStudyUID || '';
  const detailQuery = useStudyDetail(studyUID);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (studyUID && workspace.state.selectedStudyUID !== studyUID) {
      workspace.setStudySelection({ studyUID });
    }
  }, [studyUID, workspace]);

  const relatedMeasurements = useMemo(
    () => workspace.state.measurements.filter((item) => !studyUID || item.studyUID === studyUID),
    [studyUID, workspace.state.measurements],
  );

  const activeMeasurement = relatedMeasurements.find((item) => item.sopInstanceUID === workspace.state.selectedInstanceUID) || relatedMeasurements[0];

  useEffect(() => {
    if (activeMeasurement) {
      setNotes(activeMeasurement.note || '');
    }
  }, [activeMeasurement]);

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Home', href: '/inbox' }, { label: 'OHIF View', href: '/ohifview' }, { label: 'Measurements' }]} />
      <OhifModuleTabs />
      <PageHeader title="Measurements Workspace" description="Measurements are now tied to the active study, series, and instance selection from the shared viewport workspace." />
      <div className="grid gap-6 xl:grid-cols-[1fr,360px]">
        <PanelCard title="Measurement Queue">
          <div className="mb-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Study</div><div className="mt-2 break-all text-sm text-white">{studyUID || 'None selected'}</div></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Series</div><div className="mt-2 break-all text-sm text-white">{workspace.state.selectedSeriesUID || 'None selected'}</div></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Instance</div><div className="mt-2 break-all text-sm text-white">{workspace.state.selectedInstanceUID || 'None selected'}</div></div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-mutedText"><tr><th className="px-4 py-3">Label</th><th className="px-4 py-3">Series</th><th className="px-4 py-3">Instance</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Action</th></tr></thead>
              <tbody>
                {relatedMeasurements.map((item) => (
                  <tr key={item.id} className={[ 'border-t border-white/5', item.id === activeMeasurement?.id ? 'bg-white/5' : '' ].join(' ')}>
                    <td className="px-4 py-3 text-white">{item.label}</td>
                    <td className="px-4 py-3 break-all text-mutedText">{item.seriesUID}</td>
                    <td className="px-4 py-3 break-all text-mutedText">{item.sopInstanceUID}</td>
                    <td className="px-4 py-3"><span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white">{item.status}</span></td>
                    <td className="px-4 py-3">
                      <button type="button" onClick={() => { workspace.setStudySelection({ studyUID: item.studyUID, seriesUID: item.seriesUID, instanceUID: item.sopInstanceUID }); workspace.updateMeasurementStatus(item.id, 'Reviewed'); }} className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white transition hover:bg-white/10"><CheckCheck size={14} /> Sync + review</button>
                    </td>
                  </tr>
                ))}
                {!relatedMeasurements.length ? <tr><td colSpan={5} className="px-4 py-8 text-center text-mutedText">Add measurements from the viewport page first.</td></tr> : null}
              </tbody>
            </table>
          </div>
        </PanelCard>
        <PanelCard title="Reader Notes">
          <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-mutedText">Current study detail loaded: <span className="text-white">{detailQuery.data?.summary.patientName || 'No case'}</span></div>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Enter notes for measurements, findings, or follow-up actions." className="h-[320px] w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white outline-none" />
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => activeMeasurement && workspace.updateMeasurementStatus(activeMeasurement.id, 'Reviewed')} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"><ClipboardPenLine size={16} /> Mark reviewed</button>
          </div>
        </PanelCard>
      </div>
    </div>
  );
}



