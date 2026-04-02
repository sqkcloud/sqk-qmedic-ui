import { hangingProtocols, ProtocolTileRole } from './catalog';
import type { StudyDetail, StudySeriesSummary } from '@/features/studies/types';

function normalize(text?: string | null) {
  return (text || '').toUpperCase();
}

function includesAny(text: string, keywords: string[] = []) {
  return keywords.some((keyword) => text.includes(keyword));
}

function roleForIndex(protocolId: string, index: number): ProtocolTileRole {
  const protocol =
    hangingProtocols.find((item) => item.id === protocolId) ?? hangingProtocols[0];

  const roles = protocol.tileRoles as ProtocolTileRole[];
  return roles[index] ?? roles[0];
}

function exclusionPenalty(description: string, roleKeywords: Record<ProtocolTileRole, string[]>, role: ProtocolTileRole) {
  if (includesAny(description, roleKeywords.localizer || [])) return 20;
  if (role !== 'secondary' && includesAny(description, roleKeywords.secondary || [])) return 1.5;
  return 0;
}

export function scoreSeriesForRole(series: StudySeriesSummary, protocolId: string, role: ProtocolTileRole) {
  const protocol = hangingProtocols.find((item) => item.id === protocolId) || hangingProtocols[0];
  const description = normalize(series.description);
  const seriesNumber = Number(series.seriesNumber || 999);
  const instances = Number(series.instances || 0);
  const preferredModality = protocol.preferredModalities?.includes(series.modality || '') ? 10 : 0;
  const globalKeyword = includesAny(description, protocol.descriptionKeywords || []) ? 4 : 0;
  const roleKeyword = includesAny(description, protocol.roleKeywords?.[role] || []) ? 8 : 0;
  const thinSliceBonus = instances > 120 ? 2.5 : instances > 60 ? 1.5 : 0;
  const seriesOrderBonus = Math.max(0, 3 - Math.min(seriesNumber, 3)) * 0.5;
  const localizerPenalty = exclusionPenalty(description, protocol.roleKeywords as Record<ProtocolTileRole, string[]>, role);
  const secondaryPenalty = role === 'mpr' && !includesAny(description, protocol.roleKeywords?.mpr || []) && includesAny(description, protocol.roleKeywords?.axial || []) ? 1 : 0;
  return preferredModality + globalKeyword + roleKeyword + thinSliceBonus + seriesOrderBonus - localizerPenalty - secondaryPenalty;
}

export function rankSeriesForProtocol(detail: StudyDetail, protocolId: string, tileCount: number) {
  const used = new Set<number>();
  const rankedIndices: number[] = [];

  for (let index = 0; index < tileCount; index++) {
    const role = roleForIndex(protocolId, index);
    const ranked = detail.series
      .map((series, seriesIndex) => ({ index: seriesIndex, score: scoreSeriesForRole(series, protocolId, role) }))
      .sort((a, b) => b.score - a.score);

    const choice = ranked.find((item) => !used.has(item.index)) || ranked[0];
    if (choice) {
      used.add(choice.index);
      rankedIndices.push(choice.index);
    }
  }

  return rankedIndices;
}

export function describeProtocolPlacement(protocolId: string, tileIndex: number, series: StudySeriesSummary) {
  const role = roleForIndex(protocolId, tileIndex);
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);
  return `${roleLabel}: ${series.modality || 'Series'}${series.seriesNumber ? ` #${series.seriesNumber}` : ''}`;
}
