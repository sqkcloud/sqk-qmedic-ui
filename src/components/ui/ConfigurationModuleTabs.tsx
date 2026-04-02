'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/configuration/devices', label: 'Devices' },
  { href: '/configuration/ae-list', label: 'AE list' },
  { href: '/configuration/web-apps', label: 'Web Apps list' },
  { href: '/configuration/hl7-applications', label: 'HL7 Applications' },
  { href: '/configuration/control', label: 'Control' },
];

export function ConfigurationModuleTabs() {
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
