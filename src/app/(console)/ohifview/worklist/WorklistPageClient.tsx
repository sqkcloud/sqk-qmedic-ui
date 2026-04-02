'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { OhifModuleTabs } from '@/components/ui/OhifModuleTabs';
import { PageHeader } from '@/components/ui/PageHeader';
import { PanelCard } from '@/components/ui/PanelCard';
import { useStudyDetail } from '@/features/studies/hooks';
import { useOhifWorkspace } from '@/features/ohif/state';

export default function WorklistPageClient() {
  const params = useSearchParams();
  const stateStudyUID = useOhifWorkspace().state.selectedStudyUID;
  const studyUID = params.get('study') || stateStudyUID || '';
  const detailQuery = useStudyDetail(studyUID);
  const detail = detailQuery.data;
  const { state: workspace, setStudySelection } = useOhifWorkspace();

  useEffect(() => {
    if (studyUID && workspace.selectedStudyUID !== studyUID) {
      setStudySelection({ studyUID, seriesUID: '', instanceUID: '' });
    }
  }, [setStudySelection, studyUID, workspace.selectedStudyUID]);

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Home', href: '/inbox' }, { label: 'OHIF View', href: '/ohifview' }, { label: 'Worklist' }]} />
      <OhifModuleTabs />
      <PageHeader title="OHIF Worklist" description="Use the shared workspace state to route one selected case across viewport, measurements, segmentations, and protocol setup." />

      <PanelCard title="Current Case">
        {!studyUID ? (
          <div className="rounded-2xl border border-dashed border-white/15 px-6 py-8 text-sm text-mutedText">Choose a study from the launcher first.</div>
        ) : detail ? (
          <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Patient</div><div className="mt-2 text-lg font-semibold text-white">{detail.summary.patientName || '-'}</div></div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Study UID</div><div className="mt-2 break-all text-sm text-white">{detail.summary.studyInstanceUID}</div></div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Series</div><div className="mt-2 text-lg font-semibold text-white">{detail.summary.series}</div></div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Instances</div><div className="mt-2 text-lg font-semibold text-white">{detail.summary.instances}</div></div>
            </div>
            <div className="grid gap-4 lg:grid-cols-4">
              {[
                { href: `/ohifview/viewport?study=${encodeURIComponent(studyUID)}`, title: 'Viewport', desc: 'Series/instance browsing and live toolbar/layout control.' },
                { href: `/ohifview/measurements?study=${encodeURIComponent(studyUID)}`, title: 'Measurements', desc: 'Measurement list synced to the active study/series/instance.' },
                { href: `/ohifview/segmentations?study=${encodeURIComponent(studyUID)}`, title: 'Segmentations', desc: 'Plan and review segmentations attached to the same case.' },
                { href: `/ohifview/protocols?study=${encodeURIComponent(studyUID)}`, title: 'Protocols', desc: 'Apply a hanging protocol preset before opening the viewport.' },
              ].map((item) => (
                <Link key={item.href} href={item.href} prefetch={false} className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-base font-semibold text-white">{item.title}</div>
                      <div className="mt-2 text-sm text-mutedText">{item.desc}</div>
                    </div>
                    <ArrowRight className="text-cyan-200" size={18} />
                  </div>
                </Link>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Protocol</div><div className="mt-2 text-white">{workspace.selectedProtocolId || 'None'}</div></div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Layout</div><div className="mt-2 text-white">{workspace.layout}</div></div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Active tool</div><div className="mt-2 text-white">{workspace.activeTool}</div></div>
            </div>
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-4 text-sm text-cyan-50">
              <div className="mb-2 flex items-center gap-2 font-medium"><CheckCircle2 size={16} /> Workflow handoff ready</div>
              <div>Selection state is shared, so choosing a series in the viewport immediately affects measurement and segmentation pages.</div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={`/ohifview?study=${encodeURIComponent(studyUID)}`} prefetch={false} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10">Back to launcher</Link>
              <Link href={`/study/${encodeURIComponent(studyUID)}`} prefetch={false} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10">Study detail</Link>
              <Link href={studyUID ? `${process.env.NEXT_PUBLIC_OHIF_VIEWER_URL || 'http://localhost:3001/'}?configUrl=${encodeURIComponent(process.env.NEXT_PUBLIC_OHIF_CONFIG_URL || 'http://localhost:3000/config/dicomweb-server.js')}&StudyInstanceUIDs=${encodeURIComponent(studyUID)}` : '#'} prefetch={false} target="_blank" className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-50 transition hover:bg-cyan-400/20"><ExternalLink size={14} /> Open external viewer</Link>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 px-6 py-8 text-sm text-mutedText">Loading selected study…</div>
        )}
      </PanelCard>
    </div>
  );
}
