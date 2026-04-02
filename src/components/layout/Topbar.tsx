'use client';

import Link from 'next/link';
import { FolderClosed, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LogoMark } from '@/components/branding/LogoMark';

export function Topbar() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/logout', {
      method: 'POST',
    });

    router.replace('/login');
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-panelBorder bg-shellTop px-5 lg:px-6">
      <div className="flex items-center">
        <LogoMark />
      </div>
      <div className="flex items-center gap-3">
        <Link href="/ohifview" prefetch={false} className="hidden items-center gap-2 rounded-xl border border-cyan-300/30 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-100 transition hover:bg-cyan-400/20 md:inline-flex">OHIF View</Link>
        <div className="hidden text-right md:block">
          <div className="text-sm font-medium text-white">SQK QMedic</div>
          <div className="text-xs text-mutedText">Quantum, CT, and MRI pipeline</div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">
          <FolderClosed size={16} />
          QMedic / 2026
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition hover:bg-white/10"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}
