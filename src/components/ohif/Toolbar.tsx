'use client';

import type { LucideIcon } from 'lucide-react';
import { Brush, Contrast, Move, Ruler, ScanSearch, SquareStack, ZoomIn } from 'lucide-react';
import type { OhifToolbarTool } from '@/features/ohif/types';
const tools: Array<{ id: OhifToolbarTool; label: string; icon: LucideIcon }> = [
  { id: 'windowLevel', label: 'WL', icon: Contrast },
  { id: 'zoom', label: 'Zoom', icon: ZoomIn },
  { id: 'pan', label: 'Pan', icon: Move },
  { id: 'stackScroll', label: 'Scroll', icon: SquareStack },
  { id: 'length', label: 'Measure', icon: Ruler },
  { id: 'segmentation', label: 'Segment', icon: Brush },
  { id: 'invert', label: 'Invert', icon: ScanSearch },
];

export function OhifToolbar({ activeTool, onSelect }: { activeTool: OhifToolbarTool; onSelect: (tool: OhifToolbarTool) => void }) {
  return (
    <div className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
      {tools.map((tool) => {
        const Icon = tool.icon;
        const active = activeTool === tool.id;
        return (
          <button
            key={tool.id}
            type="button"
            onClick={() => onSelect(tool.id)}
            className={[
              'inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition',
              active ? 'border-cyan-300/30 bg-cyan-400/15 text-cyan-50' : 'border-white/10 bg-white/5 text-white hover:bg-white/10',
            ].join(' ')}
          >
            <Icon size={16} />
            {tool.label}
          </button>
        );
      })}
    </div>
  );
}
