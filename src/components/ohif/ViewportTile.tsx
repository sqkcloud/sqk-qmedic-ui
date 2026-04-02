'use client';

import type { MouseEvent } from 'react';
import { useEffect } from 'react';
import { useInstances } from '@/features/instances/hooks';
import { renderedFrameUrl } from '@/features/instances/api';
import { useOhifWorkspace } from '@/features/ohif/state';
import type { ViewportTileState } from '@/features/ohif/types';

export function ViewportTile({
  tile,
  studyUID,
  active,
}: {
  tile: ViewportTileState;
  studyUID: string;
  active: boolean;
}) {
  const workspace = useOhifWorkspace();
  const instancesQuery = useInstances(studyUID, tile.seriesUID || null);
  const instances = instancesQuery.data || [];

  useEffect(() => {
    if (!active || !studyUID || !tile.seriesUID || !instances.length) return;
    if (tile.instanceUID && instances.some((item) => item.sopInstanceUID === tile.instanceUID)) return;
    workspace.assignSeriesToViewport(tile.tileId, {
      studyUID,
      seriesUID: tile.seriesUID,
      instanceUID: instances[0].sopInstanceUID,
      label: tile.label,
    });
  }, [active, instances, studyUID, tile.instanceUID, tile.label, tile.seriesUID, tile.tileId, workspace]);

  useEffect(() => {
    if (!workspace.state.linkedScrollEnabled || workspace.state.linkedScrollInstanceNumber == null) return;
    if (!tile.seriesUID || !instances.length) return;
    const matched = instances.find((item) => Number(item.instanceNumber || 0) === workspace.state.linkedScrollInstanceNumber) || instances[Math.min(instances.length - 1, Math.max(0, workspace.state.linkedScrollInstanceNumber - 1))];
    if (!matched || matched.sopInstanceUID === tile.instanceUID) return;
    workspace.assignSeriesToViewport(tile.tileId, {
      studyUID,
      seriesUID: tile.seriesUID,
      instanceUID: matched.sopInstanceUID,
      label: tile.label,
    });
  }, [instances, studyUID, tile.instanceUID, tile.label, tile.seriesUID, tile.tileId, workspace]);

  const effectiveInstanceUID = tile.instanceUID || instances[0]?.sopInstanceUID || '';
  const previewUrl = studyUID && tile.seriesUID && effectiveInstanceUID ? renderedFrameUrl(studyUID, tile.seriesUID, effectiveInstanceUID) : '';
  const instanceLabel = instances.find((item) => item.sopInstanceUID === effectiveInstanceUID)?.instanceNumber || '-';

  function handleViewportClick(event: MouseEvent<HTMLButtonElement>) {
    workspace.setActiveViewport(tile.tileId);
    workspace.setStudySelection({ studyUID, seriesUID: tile.seriesUID, instanceUID: effectiveInstanceUID });
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / Math.max(1, rect.width)));
    const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / Math.max(1, rect.height)));
    workspace.setCrosshair({ x, y, sourceViewportId: tile.tileId });
  }

  return (
    <button
      type="button"
      onClick={handleViewportClick}
      className={[
        'relative rounded-2xl border bg-black/60 p-2 text-left transition',
        active ? 'border-cyan-300/40 ring-1 ring-cyan-300/20' : 'border-white/10 hover:border-white/20',
      ].join(' ')}
    >
      {previewUrl ? (
        <div className="relative">
          <img src={previewUrl} alt="Rendered DICOM preview" className="h-[280px] w-full rounded-xl object-contain" />
          {workspace.state.crosshair ? (
            <>
              <div className="pointer-events-none absolute inset-y-0 w-px bg-cyan-300/60" style={{ left: `${workspace.state.crosshair.x * 100}%` }} />
              <div className="pointer-events-none absolute inset-x-0 h-px bg-cyan-300/60" style={{ top: `${workspace.state.crosshair.y * 100}%` }} />
            </>
          ) : null}
        </div>
      ) : (
        <div className="grid h-[280px] place-items-center rounded-xl border border-dashed border-white/15 text-sm text-mutedText">
          Assign a series to this viewport.
        </div>
      )}
      <div className="mt-2 flex items-center justify-between text-xs text-mutedText">
        <span>{tile.label}</span>
        <span>{tile.seriesUID ? `Inst ${instanceLabel}` : 'Empty'}</span>
      </div>
      <div className="mt-1 flex items-center justify-between text-[11px] text-mutedText">
        <span>{workspace.state.crosshair?.sourceViewportId === tile.tileId ? 'Crosshair source' : workspace.state.crosshair ? 'Crosshair synced' : 'Crosshair idle'}</span>
        <span>{workspace.state.linkedScrollEnabled ? 'Linked scroll on' : 'Linked scroll off'}</span>
      </div>
    </button>
  );
}
