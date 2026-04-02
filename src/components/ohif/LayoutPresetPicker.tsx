'use client';

import type { OhifLayoutPreset } from '@/features/ohif/types';

const items: Array<{ id: OhifLayoutPreset; label: string; hint: string }> = [
  { id: '1x1', label: '1×1', hint: 'Focused read' },
  { id: '1x2', label: '1×2', hint: 'Primary + compare' },
  { id: '2x2', label: '2×2', hint: 'Multi-series review' },
];

export function LayoutPresetPicker({ value, onChange }: { value: OhifLayoutPreset; onChange: (layout: OhifLayoutPreset) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChange(item.id)}
          className={[
            'rounded-xl border px-3 py-2 text-sm transition',
            value === item.id ? 'border-cyan-300/30 bg-cyan-400/15 text-cyan-50' : 'border-white/10 bg-white/5 text-white hover:bg-white/10',
          ].join(' ')}
        >
          <div className="font-medium">{item.label}</div>
          <div className="text-[11px] text-mutedText">{item.hint}</div>
        </button>
      ))}
    </div>
  );
}
