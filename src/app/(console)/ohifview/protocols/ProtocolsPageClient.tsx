'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowRightCircle } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { OhifModuleTabs } from '@/components/ui/OhifModuleTabs';
import { PageHeader } from '@/components/ui/PageHeader';
import { PanelCard } from '@/components/ui/PanelCard';
import { hangingProtocols } from '@/features/ohif/catalog';
import { useOhifWorkspace } from '@/features/ohif/state';

export default function ProtocolsPageClient() {
  const params = useSearchParams();
  const workspace = useOhifWorkspace();
  const studyUID = params.get('study') || workspace.state.selectedStudyUID || '';
  const [selected, setSelected] = useState(workspace.state.selectedProtocolId || hangingProtocols[0]?.id || '');

  useEffect(() => {
    if (studyUID && workspace.state.selectedStudyUID !== studyUID) {
      workspace.setStudySelection({ studyUID });
    }
  }, [studyUID, workspace]);

  useEffect(() => {
    if (workspace.state.selectedProtocolId) setSelected(workspace.state.selectedProtocolId);
  }, [workspace.state.selectedProtocolId]);

  function applySelected() {
    const protocol = hangingProtocols.find((item) => item.id === selected);
    if (!protocol) return;
    workspace.applyProtocol(protocol.id, protocol.recommendedLayout);
    workspace.setActiveTool(protocol.defaultTool);
  }

  const active = hangingProtocols.find((item) => item.id === selected);

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Home', href: '/inbox' }, { label: 'OHIF View', href: '/ohifview' }, { label: 'Protocols' }]} />
      <OhifModuleTabs />
      <PageHeader title="Protocol Presets" description="Apply hanging protocol presets that directly influence viewport layout and active toolbar mode." />
      <div className="grid gap-6 xl:grid-cols-[420px,1fr]">
        <PanelCard title="Preset Library">
          <div className="space-y-3">
            {hangingProtocols.map((protocol) => (
              <button key={protocol.id} type="button" onClick={() => setSelected(protocol.id)} className={['w-full rounded-2xl border p-4 text-left transition', selected === protocol.id ? 'border-cyan-300/30 bg-cyan-400/10' : 'border-white/10 bg-white/5 hover:bg-white/10'].join(' ')}>
                <div className="text-base font-semibold text-white">{protocol.name}</div>
                <div className="mt-2 text-sm text-mutedText">{protocol.description}</div>
              </button>
            ))}
          </div>
        </PanelCard>
        <PanelCard title="Selected Preset Rules">
          <div className="mb-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Recommended layout</div><div className="mt-2 text-white">{active?.recommendedLayout || '-'}</div></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Default tool</div><div className="mt-2 text-white">{active?.defaultTool || '-'}</div></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Selected study</div><div className="mt-2 break-all text-sm text-white">{studyUID || 'No study selected'}</div></div>
          </div>
          <div className="space-y-3">
            {(active?.rules || []).map((rule) => (
              <div key={rule} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">{rule}</div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={applySelected} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10">Apply preset</button>
            <Link href={`/ohifview/viewport${studyUID ? `?study=${encodeURIComponent(studyUID)}` : ''}`} prefetch={false} className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-50"><ArrowRightCircle size={16} /> Open viewport with preset</Link>
          </div>
        </PanelCard>
      </div>
    </div>
  );
}
