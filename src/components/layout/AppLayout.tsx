'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-shell text-primaryText">
      <Topbar />
      <div className="flex min-h-[calc(100vh-72px)]">
        <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen((value) => !value)} />
        <main className="flex-1 px-6 py-6 lg:px-8">
          <div className="mx-auto max-w-[1360px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
