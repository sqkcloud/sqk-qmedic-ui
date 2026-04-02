'use client';

import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Crosshair, PencilRuler, ScissorsSquare, SquareStack } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { OhifModuleTabs } from '@/components/ui/OhifModuleTabs';
import { PageHeader } from '@/components/ui/PageHeader';
import { PanelCard } from '@/components/ui/PanelCard';
import { useStudyDetail } from '@/features/studies/hooks';
import { useInstances } from '@/features/instances/hooks';
import { useOhifWorkspace } from '@/features/ohif/state';
import { hangingProtocols, segmentationTemplates } from '@/features/ohif/catalog';
import { describeProtocolPlacement, rankSeriesForProtocol } from '@/features/ohif/protocolEngine';
import { OhifToolbar } from '@/components/ohif/Toolbar';
import { LayoutPresetPicker } from '@/components/ohif/LayoutPresetPicker';
import { ViewportTile } from '@/components/ohif/ViewportTile';

export default function ViewportPageClient() {

  const params = useSearchParams();
  const workspace = useOhifWorkspace();
  const requestedStudy = params.get('study') || workspace.state.selectedStudyUID || '';
  const detailQuery = useStudyDetail(requestedStudy);
  const detail = detailQuery.data;

  useEffect(() => {
    if (requestedStudy && workspace.state.selectedStudyUID !== requestedStudy) {
      workspace.setStudySelection({ studyUID: requestedStudy, seriesUID: '', instanceUID: '' });
    }
  }, [requestedStudy, workspace]);

  const activeProtocol = hangingProtocols.find((item) => item.id === workspace.state.selectedProtocolId) || hangingProtocols[0];
  const activeViewportId = workspace.state.activeViewportId || workspace.state.viewportAssignments[0]?.tileId || 'tile-1';
  const selectedSeriesUID = workspace.state.selectedSeriesUID;
  const selectedTile = workspace.state.viewportAssignments.find((tile) => tile.tileId === activeViewportId) || workspace.state.viewportAssignments[0];
  const tileInstanceQuery = useInstances(requestedStudy, selectedTile?.seriesUID || selectedSeriesUID || null);
  const tileInstances = tileInstanceQuery.data || [];
  const selectedInstanceUID = workspace.state.selectedInstanceUID || selectedTile?.instanceUID || tileInstances[0]?.sopInstanceUID || '';
  const selectedSeries = detail?.series.find((item) => item.seriesInstanceUID === selectedSeriesUID);

  useEffect(() => {
    if (!detail?.series?.length) return;
    const assignedSeries = new Set(workspace.state.viewportAssignments.map((tile) => tile.seriesUID).filter(Boolean));
    if (assignedSeries.size > 0) return;

    const rankedIndices = rankSeriesForProtocol(detail, workspace.state.selectedProtocolId, workspace.state.viewportAssignments.length);
    workspace.state.viewportAssignments.forEach((tile, tileIndex) => {
      const picked = detail.series[rankedIndices[tileIndex] ?? tileIndex] || detail.series[tileIndex] || detail.series[0];
      if (!picked) return;
      workspace.assignSeriesToViewport(tile.tileId, {
        studyUID: requestedStudy,
        seriesUID: picked.seriesInstanceUID,
        label: `${tile.label}: ${describeProtocolPlacement(workspace.state.selectedProtocolId, tileIndex, picked)}`,
      });
    });
  }, [detail, requestedStudy, workspace]);

  useEffect(() => {
    if (!tileInstances.length || !selectedTile?.seriesUID) return;
    const exists = tileInstances.some((item) => item.sopInstanceUID === selectedTile.instanceUID);
    if (exists) return;
    workspace.assignSeriesToViewport(activeViewportId, {
      studyUID: requestedStudy,
      seriesUID: selectedTile.seriesUID,
      instanceUID: tileInstances[0].sopInstanceUID,
      label: selectedTile.label,
    });
  }, [activeViewportId, requestedStudy, selectedTile, tileInstances, workspace]);

  function applyProtocol(id: string) {
    const protocol = hangingProtocols.find((item) => item.id === id);
    const tiles = (protocol?.recommendedLayout ? (protocol.recommendedLayout === '2x2' ? 4 : protocol.recommendedLayout === '1x2' ? 2 : 1) : workspace.state.viewportAssignments.length);
    workspace.applyProtocol(id, protocol?.recommendedLayout);
    if (protocol?.defaultTool) workspace.setActiveTool(protocol.defaultTool);
    if (!detail?.series?.length) return;
    const rankedIndices = rankSeriesForProtocol(detail, id, tiles);
    new Array(tiles).fill(0).forEach((_, index) => {
      const tileId = `tile-${index + 1}`;
      const picked = detail.series[rankedIndices[index] ?? index] || detail.series[0];
      if (!picked) return;
      workspace.assignSeriesToViewport(tileId, {
        studyUID: requestedStudy,
        seriesUID: picked.seriesInstanceUID,
        label: `Viewport ${index + 1}: ${describeProtocolPlacement(id, index, picked)}`,
      });
    });
  }

  function addMeasurement() {
    if (!requestedStudy || !selectedSeriesUID || !selectedInstanceUID) return;
    workspace.addMeasurement({
      studyUID: requestedStudy,
      seriesUID: selectedSeriesUID,
      sopInstanceUID: selectedInstanceUID,
      label: `${selectedSeries?.modality || 'Series'} @ instance ${tileInstances.find((item) => item.sopInstanceUID === selectedInstanceUID)?.instanceNumber || '?'}`,
      note: `Viewport=${activeViewportId}; Tool=${workspace.state.activeTool}; Protocol=${workspace.state.selectedProtocolId}`,
    });
  }

  function addSegmentation() {
    if (!requestedStudy || !selectedSeriesUID) return;
    const template = segmentationTemplates[0];
    workspace.addSegmentation({
      studyUID: requestedStudy,
      seriesUID: selectedSeriesUID,
      sopInstanceUID: selectedInstanceUID || undefined,
      templateId: template.id,
      label: `${template.label} (${selectedSeries?.modality || 'Series'})`,
      color: template.color,
      status: 'Planned',
    });
  }

  const viewportTiles = useMemo(() => workspace.state.viewportAssignments, [workspace.state.viewportAssignments]);

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Home', href: '/inbox' }, { label: 'OHIF View', href: '/ohifview' }, { label: 'Viewport' }]} />
      <OhifModuleTabs />
      <PageHeader title="Viewport Workspace" description="Multi-tile series assignment, shared study context, toolbar selection, layout presets, and protocol-driven targeting." />

      <PanelCard title="Viewport Controls">
        <div className="grid gap-4 xl:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-4">
            <OhifToolbar activeTool={workspace.state.activeTool} onSelect={workspace.setActiveTool} />
            <div className="grid gap-3 md:grid-cols-2">
              <button type="button" onClick={() => workspace.setLinkedScrollEnabled(!workspace.state.linkedScrollEnabled)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10">
                {workspace.state.linkedScrollEnabled ? 'Disable linked scroll' : 'Enable linked scroll'}
              </button>
              <button type="button" onClick={() => workspace.setCrosshair(workspace.state.crosshair ? null : { x: 0.5, y: 0.5, sourceViewportId: activeViewportId })} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10">
                <Crosshair size={16} /> {workspace.state.crosshair ? 'Clear crosshair' : 'Center crosshair'}
              </button>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-3 text-sm font-medium text-white">Viewport layout</div>
              <LayoutPresetPicker value={workspace.state.layout} onChange={workspace.setLayout} />
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="mb-3 text-sm font-medium text-white">Protocol preset</div>
              <div className="flex flex-wrap gap-2">
                {hangingProtocols.map((protocol) => (
                  <button key={protocol.id} type="button" onClick={() => applyProtocol(protocol.id)} className={['rounded-xl border px-3 py-2 text-sm transition', workspace.state.selectedProtocolId === protocol.id ? 'border-cyan-300/30 bg-cyan-400/15 text-cyan-50' : 'border-white/10 bg-white/5 text-white hover:bg-white/10'].join(' ')}>
                    {protocol.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Study UID</div><div className="mt-2 break-all text-sm text-white">{requestedStudy || 'None'}</div></div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Active viewport</div><div className="mt-2 text-sm text-white">{activeViewportId}</div></div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Series UID</div><div className="mt-2 break-all text-sm text-white">{selectedSeriesUID || 'None'}</div></div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Instance UID</div><div className="mt-2 break-all text-sm text-white">{selectedInstanceUID || 'None'}</div></div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Linked scroll</div><div className="mt-2 text-sm text-white">{workspace.state.linkedScrollEnabled ? `Synced to instance #${workspace.state.linkedScrollInstanceNumber ?? '-'}` : 'Disabled'}</div></div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><div className="text-xs text-mutedText">Crosshair</div><div className="mt-2 text-sm text-white">{workspace.state.crosshair ? `${Math.round(workspace.state.crosshair.x * 100)}%, ${Math.round(workspace.state.crosshair.y * 100)}%` : 'Not set'}</div></div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={addMeasurement} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"><PencilRuler size={16} /> Add measurement</button>
              <button type="button" onClick={addSegmentation} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"><ScissorsSquare size={16} /> Add segmentation plan</button>
              <Link href={`/ohifview/measurements?study=${encodeURIComponent(requestedStudy)}`} prefetch={false} className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-50"><SquareStack size={16} /> Open measurement queue</Link>
            </div>
          </div>
        </div>
      </PanelCard>

      <div className="grid gap-6 xl:grid-cols-[360px,1fr,320px]">
        <PanelCard title="Series Navigator">
          <div className="mb-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-mutedText">Click a viewport first, then assign a series to that tile.</div>
          <div className="space-y-3">
            {detail?.series.map((series) => {
              const assignedTile = viewportTiles.find((tile) => tile.seriesUID === series.seriesInstanceUID);
              const active = selectedSeriesUID === series.seriesInstanceUID;
              return (
                <div key={series.seriesInstanceUID} className={['rounded-2xl border p-4 transition', active ? 'border-cyan-300/30 bg-cyan-400/10' : 'border-white/10 bg-white/5'].join(' ')}>
                  <div className="flex items-center justify-between gap-3"><div className="text-white">{series.modality || 'Series'} {series.seriesNumber ? `#${series.seriesNumber}` : ''}</div><div className="text-xs text-mutedText">{series.instances} inst</div></div>
                  <div className="mt-2 text-sm text-mutedText">{series.description || 'No description'}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button type="button" onClick={() => workspace.assignSeriesToViewport(activeViewportId, { studyUID: requestedStudy, seriesUID: series.seriesInstanceUID, label: `${activeViewportId}: ${describeProtocolPlacement(workspace.state.selectedProtocolId, Math.max(0, Number(activeViewportId.split('-')[1] || '1') - 1), series)}` })} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
                      Assign to {activeViewportId}
                    </button>
                    {assignedTile ? <span className="rounded-xl border border-cyan-300/20 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-50">Assigned to {assignedTile.tileId}</span> : null}
                  </div>
                </div>
              );
            }) || <div className="rounded-2xl border border-dashed border-white/15 px-6 py-8 text-center text-sm text-mutedText">Select a study from the launcher.</div>}
          </div>
        </PanelCard>

        <PanelCard title="Viewport Canvas">
          <div className={workspace.state.layout === '2x2' ? 'grid grid-cols-2 gap-3' : workspace.state.layout === '1x2' ? 'grid grid-cols-2 gap-3' : 'grid grid-cols-1 gap-3'}>
            {viewportTiles.map((tile) => (
              <ViewportTile key={tile.tileId} tile={tile} studyUID={requestedStudy} active={tile.tileId === activeViewportId} />
            ))}
          </div>
        </PanelCard>

        <PanelCard title="Instances">
          <div className="mb-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-mutedText">Instances shown for the active viewport's series assignment.</div>
          <div className="space-y-2 overflow-y-auto max-h-[760px] pr-1">
            {tileInstances.map((instance) => {
              const active = selectedInstanceUID === instance.sopInstanceUID;
              return (
                <button key={instance.sopInstanceUID} type="button" onClick={() => { workspace.assignSeriesToViewport(activeViewportId, { studyUID: requestedStudy, seriesUID: selectedSeriesUID || '', instanceUID: instance.sopInstanceUID, label: selectedTile?.label || activeViewportId }); workspace.syncLinkedScroll(Number(instance.instanceNumber || 0) || null); }} className={['w-full rounded-xl border px-3 py-3 text-left transition', active ? 'border-cyan-300/30 bg-cyan-400/10' : 'border-white/10 bg-white/5 hover:bg-white/10'].join(' ')}>
                  <div className="text-sm text-white">Instance {instance.instanceNumber || '-'}</div>
                  <div className="mt-1 break-all text-[11px] text-mutedText">{instance.sopInstanceUID}</div>
                </button>
              );
            })}
            {!tileInstances.length ? <div className="rounded-2xl border border-dashed border-white/15 px-6 py-8 text-center text-sm text-mutedText">No instances loaded for this series.</div> : null}
          </div>
        </PanelCard>
      </div>
    </div>
  );
}

