'use client';

import { useEffect, useMemo, useState } from 'react';
import type { MeasurementItem, OhifLayoutPreset, OhifToolbarTool, OhifWorkspaceState, SegmentationItem, ViewportTileState } from './types';

const STORAGE_KEY = 'sqk_ohif_workspace_v4';

function layoutTileCount(layout: OhifLayoutPreset) {
  return layout === '2x2' ? 4 : layout === '1x2' ? 2 : 1;
}

function buildDefaultTiles(layout: OhifLayoutPreset, existing: ViewportTileState[] = []): ViewportTileState[] {
  const count = layoutTileCount(layout);
  return new Array(count).fill(0).map((_, index) => {
    const tileId = `tile-${index + 1}`;
    const current = existing.find((item) => item.tileId === tileId);
    return current || { tileId, seriesUID: '', instanceUID: '', label: `Viewport ${index + 1}` };
  });
}

const defaultState: OhifWorkspaceState = {
  selectedStudyUID: '',
  selectedSeriesUID: '',
  selectedInstanceUID: '',
  selectedProtocolId: 'ct-axial-first',
  layout: '1x1',
  activeTool: 'stackScroll',
  activeViewportId: 'tile-1',
  viewportAssignments: buildDefaultTiles('1x1'),
  measurements: [],
  segmentations: [],
  linkedScrollEnabled: true,
  linkedScrollInstanceNumber: null,
  crosshair: null,
  updatedAt: '',
};

function normalizeState(raw: Partial<OhifWorkspaceState> | null | undefined): OhifWorkspaceState {
  const next = { ...defaultState, ...(raw || {}) } as OhifWorkspaceState;
  next.viewportAssignments = buildDefaultTiles(next.layout, next.viewportAssignments || []);
  if (!next.activeViewportId || !next.viewportAssignments.some((item) => item.tileId === next.activeViewportId)) {
    next.activeViewportId = next.viewportAssignments[0]?.tileId || 'tile-1';
  }
  return next;
}

function readState(): OhifWorkspaceState {
  if (typeof window === 'undefined') return defaultState;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return normalizeState(JSON.parse(raw));
  } catch {
    return defaultState;
  }
}

function writeState(next: OhifWorkspaceState) {
  if (typeof window === 'undefined') return;
  const normalized = normalizeState(next);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  window.dispatchEvent(new CustomEvent('sqk-ohif-workspace', { detail: normalized }));
}

export function useOhifWorkspace() {
  const [state, setState] = useState<OhifWorkspaceState>(defaultState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const current = readState();
    setState(current);
    setReady(true);

    const onStorage = () => setState(readState());
    window.addEventListener('storage', onStorage);
    window.addEventListener('sqk-ohif-workspace', onStorage as EventListener);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('sqk-ohif-workspace', onStorage as EventListener);
    };
  }, []);

  const api = useMemo(() => ({
    setStudySelection: (payload: { studyUID?: string; seriesUID?: string; instanceUID?: string }) => {
      const activeViewportId = state.activeViewportId || state.viewportAssignments[0]?.tileId || 'tile-1';
      const nextTiles = state.viewportAssignments.map((tile) =>
        tile.tileId === activeViewportId
          ? {
              ...tile,
              seriesUID: payload.seriesUID ?? tile.seriesUID,
              instanceUID: payload.instanceUID ?? tile.instanceUID,
            }
          : tile,
      );
      const next = normalizeState({
        ...state,
        selectedStudyUID: payload.studyUID ?? state.selectedStudyUID,
        selectedSeriesUID: payload.seriesUID ?? state.selectedSeriesUID,
        selectedInstanceUID: payload.instanceUID ?? state.selectedInstanceUID,
        viewportAssignments: nextTiles,
        updatedAt: new Date().toISOString(),
      });
      writeState(next);
      setState(next);
    },
    setLayout: (layout: OhifLayoutPreset) => {
      const next = normalizeState({ ...state, layout, viewportAssignments: buildDefaultTiles(layout, state.viewportAssignments), updatedAt: new Date().toISOString() });
      writeState(next);
      setState(next);
    },
    setActiveTool: (activeTool: OhifToolbarTool) => {
      const next = normalizeState({ ...state, activeTool, updatedAt: new Date().toISOString() });
      writeState(next);
      setState(next);
    },
    setActiveViewport: (viewportId: string) => {
      const next = normalizeState({ ...state, activeViewportId: viewportId, updatedAt: new Date().toISOString() });
      writeState(next);
      setState(next);
    },
    assignSeriesToViewport: (viewportId: string, payload: { seriesUID: string; instanceUID?: string; label?: string; studyUID?: string }) => {
      const nextTiles = state.viewportAssignments.map((tile) =>
        tile.tileId === viewportId
          ? {
              ...tile,
              seriesUID: payload.seriesUID,
              instanceUID: payload.instanceUID ?? tile.instanceUID,
              label: payload.label ?? tile.label,
            }
          : tile,
      );
      const next = normalizeState({
        ...state,
        activeViewportId: viewportId,
        selectedStudyUID: payload.studyUID ?? state.selectedStudyUID,
        selectedSeriesUID: payload.seriesUID,
        selectedInstanceUID: payload.instanceUID ?? state.selectedInstanceUID,
        viewportAssignments: nextTiles,
        updatedAt: new Date().toISOString(),
      });
      writeState(next);
      setState(next);
    },
    applyProtocol: (protocolId: string, layout?: OhifLayoutPreset) => {
      const nextLayout = layout ?? state.layout;
      const next = normalizeState({ ...state, selectedProtocolId: protocolId, layout: nextLayout, viewportAssignments: buildDefaultTiles(nextLayout, state.viewportAssignments), updatedAt: new Date().toISOString() });
      writeState(next);
      setState(next);
    },
    addMeasurement: (payload: Omit<MeasurementItem, 'id' | 'createdAt' | 'status'> & { status?: MeasurementItem['status'] }) => {
      const item: MeasurementItem = {
        ...payload,
        id: `m-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        createdAt: new Date().toISOString(),
        status: payload.status ?? 'Draft',
      };
      const next = normalizeState({ ...state, measurements: [item, ...state.measurements], updatedAt: new Date().toISOString() });
      writeState(next);
      setState(next);
      return item;
    },
    updateMeasurementStatus: (id: string, status: MeasurementItem['status']) => {
      const next = normalizeState({
        ...state,
        measurements: state.measurements.map((item) => (item.id === id ? { ...item, status } : item)),
        updatedAt: new Date().toISOString(),
      });
      writeState(next);
      setState(next);
    },
    addSegmentation: (payload: Omit<SegmentationItem, 'id' | 'createdAt' >) => {
      const item: SegmentationItem = {
        ...payload,
        id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        createdAt: new Date().toISOString(),
      };
      const next = normalizeState({ ...state, segmentations: [item, ...state.segmentations], updatedAt: new Date().toISOString() });
      writeState(next);
      setState(next);
      return item;
    },
    setLinkedScrollEnabled: (enabled: boolean) => {
      const next = normalizeState({ ...state, linkedScrollEnabled: enabled, updatedAt: new Date().toISOString() });
      writeState(next);
      setState(next);
    },
    syncLinkedScroll: (instanceNumber: number | null) => {
      const next = normalizeState({ ...state, linkedScrollInstanceNumber: instanceNumber, updatedAt: new Date().toISOString() });
      writeState(next);
      setState(next);
    },
    setCrosshair: (payload: { x: number; y: number; sourceViewportId: string } | null) => {
      const next = normalizeState({
        ...state,
        crosshair: payload ? { ...payload, updatedAt: new Date().toISOString() } : null,
        updatedAt: new Date().toISOString(),
      });
      writeState(next);
      setState(next);
    },
  }), [state]);

  return { state, ready, ...api };
}
