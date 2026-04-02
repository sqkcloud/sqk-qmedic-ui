export type OhifLayoutPreset = '1x1' | '1x2' | '2x2';
export type OhifToolbarTool = 'windowLevel' | 'zoom' | 'pan' | 'stackScroll' | 'length' | 'segmentation' | 'invert';

export type MeasurementItem = {
  id: string;
  studyUID: string;
  seriesUID: string;
  sopInstanceUID: string;
  label: string;
  note?: string;
  createdAt: string;
  status: 'Draft' | 'Reviewed';
};

export type SegmentationItem = {
  id: string;
  studyUID: string;
  seriesUID: string;
  sopInstanceUID?: string;
  templateId: string;
  label: string;
  color: string;
  status: 'Planned' | 'Draft' | 'Reviewed';
  createdAt: string;
};

export type ViewportTileState = {
  tileId: string;
  seriesUID: string;
  instanceUID: string;
  label: string;
};

export type CrosshairState = {
  x: number;
  y: number;
  sourceViewportId: string;
  updatedAt: string;
};

export type OhifWorkspaceState = {
  selectedStudyUID: string;
  selectedSeriesUID: string;
  selectedInstanceUID: string;
  selectedProtocolId: string;
  layout: OhifLayoutPreset;
  activeTool: OhifToolbarTool;
  activeViewportId: string;
  viewportAssignments: ViewportTileState[];
  measurements: MeasurementItem[];
  segmentations: SegmentationItem[];
  linkedScrollEnabled: boolean;
  linkedScrollInstanceNumber: number | null;
  crosshair: CrosshairState | null;
  updatedAt: string;
};
