'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/ohifview', label: 'Launcher' },
  { href: '/ohifview/worklist', label: 'Worklist' },
  { href: '/ohifview/viewport', label: 'Viewport' },
  { href: '/ohifview/measurements', label: 'Measurements' },
  { href: '/ohifview/segmentations', label: 'Segmentations' },
  { href: '/ohifview/protocols', label: 'Protocols' },
];

export function OhifModuleTabs() {
  const pathname = usePathname();

  return (
    <div className="mb-5">
      <div className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-2">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className={[
                'rounded-xl px-4 py-2 text-sm transition',
                active ? 'bg-white/10 text-white' : 'text-mutedText hover:bg-white/5 hover:text-white',
              ].join(' ')}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
