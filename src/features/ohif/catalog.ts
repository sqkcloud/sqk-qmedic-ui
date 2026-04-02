import type { OhifLayoutPreset, OhifToolbarTool } from './types';

export type ProtocolTileRole = 'axial' | 'coronal' | 'sagittal' | 'mpr' | 'localizer' | 'secondary';

export const hangingProtocols = [
  {
    id: 'ct-axial-first',
    name: 'CT Axial First',
    description: 'Prioritize axial CT series and keep a single diagnostic viewport prominent.',
    rules: ['Modality = CT', 'Series description contains AXIAL', 'Sort by study date desc'],
    preferredModalities: ['CT'],
    descriptionKeywords: ['AXIAL', 'CHEST', 'HEAD'],
    roleKeywords: {
      axial: ['AX', 'AXIAL'],
      localizer: ['LOC', 'LOCALIZER', 'SCOUT'],
      secondary: ['COR', 'SAG', 'MPR'],
    } as Record<ProtocolTileRole, string[]>,
    tileRoles: ['axial'],
    recommendedLayout: '1x1' as OhifLayoutPreset,
    defaultTool: 'windowLevel' as OhifToolbarTool,
  },
  {
    id: 'ct-mpr',
    name: 'CT MPR Review',
    description: 'Prepare primary axial plus coronal/sagittal reformats for fast review.',
    rules: ['Modality = CT', 'At least 3 related series', 'Prefer thin slice series'],
    preferredModalities: ['CT'],
    descriptionKeywords: ['COR', 'SAG', 'MPR', 'AX'],
    roleKeywords: {
      axial: ['AX', 'AXIAL'],
      coronal: ['COR', 'CORONAL'],
      sagittal: ['SAG', 'SAGITTAL'],
      mpr: ['MPR', 'REFORMAT'],
      localizer: ['LOC', 'LOCALIZER', 'SCOUT'],
      secondary: ['MPR'],
    } as Record<ProtocolTileRole, string[]>,
    tileRoles: ['axial', 'coronal', 'sagittal', 'mpr'],
    recommendedLayout: '2x2' as OhifLayoutPreset,
    defaultTool: 'stackScroll' as OhifToolbarTool,
  },
  {
    id: 'mr-compare',
    name: 'MR Compare',
    description: 'Compare baseline and follow-up MR studies with synchronized navigation.',
    rules: ['Modality = MR', 'Group by patient + accession', 'Enable linked scrolling'],
    preferredModalities: ['MR'],
    descriptionKeywords: ['T1', 'T2', 'FLAIR'],
    roleKeywords: {
      axial: ['AX', 'AXIAL'],
      coronal: ['COR', 'CORONAL'],
      sagittal: ['SAG', 'SAGITTAL'],
      mpr: ['MPR'],
      localizer: ['LOC', 'LOCALIZER', 'SCOUT'],
      secondary: ['T1', 'T2', 'FLAIR'],
    } as Record<ProtocolTileRole, string[]>,
    tileRoles: ['secondary', 'secondary'],
    recommendedLayout: '1x2' as OhifLayoutPreset,
    defaultTool: 'pan' as OhifToolbarTool,
  },
];

export const segmentationTemplates = [
  { id: 'lung', label: 'Lung lesion', color: 'Amber', status: 'Draft' },
  { id: 'liver', label: 'Liver mass', color: 'Emerald', status: 'Approved' },
  { id: 'spine', label: 'Spine ROI', color: 'Blue', status: 'Draft' },
];
