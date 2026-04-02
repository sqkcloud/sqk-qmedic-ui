'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Activity,
  ArrowRightLeft,
  Boxes,
  Brain,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Database,
  FileCog,
  FileStack,
  FolderKanban,
  GitCompareArrows,
  HardDrive,
  HeartPulse,
  Home,
  Inbox,
  Layers,
  LayoutList,
  Link2,
  Monitor,
  Network,
  Settings,
  ShieldAlert,
  User,
  Waypoints,
  Workflow,
} from 'lucide-react';

const groups = [
  {
    title: 'DATA',
    items: [
      { href: '/ohifview', label: 'OHIF View', icon: HeartPulse },
      { href: '/inbox', label: 'Inbox', icon: Inbox },
      { href: '/patients', label: 'Patients', icon: User },
      { href: '/studies', label: 'Studies', icon: Layers },
      { href: '/series', label: 'Series', icon: FileStack },
      { href: '/mwl', label: 'MWL', icon: ClipboardList },
      { href: '/mpps', label: 'MPPS', icon: ClipboardList },
      { href: '/workitems', label: 'Work Items', icon: FolderKanban },
      { href: '/compare', label: 'Compare', icon: GitCompareArrows },
    ],
  },
  {
    title: 'MONITORING',
    items: [
      { href: '/monitoring/associations', label: 'Associations', icon: Link2 },
      { href: '/monitoring/queues', label: 'Queues', icon: LayoutList },
      { href: '/monitoring/export', label: 'Export', icon: ArrowRightLeft },
      { href: '/monitoring/retrieve', label: 'Retrieve', icon: ArrowRightLeft },
      { href: '/monitoring/compare', label: 'Compare', icon: GitCompareArrows },
      { href: '/monitoring/storage-commitments', label: 'Storage commitments', icon: ShieldAlert },
      { href: '/monitoring/storage-systems', label: 'Storage systems', icon: HardDrive },
      { href: '/monitoring/storage-verification', label: 'Storage Verification', icon: Database },
      { href: '/monitoring/metrics', label: 'Metrics', icon: Activity },
    ],
  },
  {
    title: 'CONFIGURATION',
    items: [
      { href: '/configuration/devices', label: 'Devices', icon: Boxes },
      { href: '/configuration/ae-list', label: 'AE list', icon: Network },
      { href: '/configuration/web-apps', label: 'Web Apps list', icon: Monitor },
      { href: '/configuration/hl7-applications', label: 'HL7 Applications', icon: Waypoints },
      { href: '/configuration/control', label: 'Control', icon: Settings },
    ],
  },
  {
    title: 'OPERATIONS',
    items: [
      { href: '/study/1.2.840.113619.2.55.3', label: 'Study Detail', icon: Home },
      { href: '/inbox', label: 'Policy Inbox', icon: ShieldAlert },
      { href: '/studies', label: 'Knowledge', icon: Brain },
    ],
  },
  {
    title: 'MANAGE',
    items: [
      { href: '/configuration/devices', label: 'Settings', icon: Settings },
      { href: '/monitoring/queues', label: 'Workflows', icon: Workflow },
      { href: '/studies', label: 'Docs', icon: FileCog },
    ],
  },
];

export function Sidebar({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const pathname = usePathname();

  return (
    <aside
      className={[
        'hidden shrink-0 border-r border-panelBorder bg-sidebar transition-all duration-300 lg:block',
        open ? 'w-[280px]' : 'w-[76px]',
      ].join(' ')}
    >
      <div className="px-3 pb-6 pt-4">
        <div className={["mb-4 flex items-center", open ? 'justify-end' : 'justify-center'].join(' ')}>
          <button
            type="button"
            onClick={onToggle}
            aria-label={open ? 'Collapse navigation' : 'Expand navigation'}
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          >
            {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>
        {groups.map((group) => (
          <div key={group.title} className="mb-6">
            {open ? <div className="mb-2 px-3 text-[11px] font-semibold tracking-[0.15em] text-mutedText/80">{group.title}</div> : null}
            <nav className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    prefetch={false}
                    className={[
                      'flex items-center rounded-xl px-3 py-2.5 text-sm transition',
                      open ? 'gap-3' : 'justify-center',
                      active ? 'bg-white/10 text-white' : 'text-mutedText hover:bg-white/5 hover:text-white',
                    ].join(' ')}
                    title={open ? undefined : item.label}
                  >
                    <Icon size={16} />
                    {open ? <span>{item.label}</span> : null}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
}
