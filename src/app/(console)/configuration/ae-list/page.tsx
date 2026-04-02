'use client';

import { useMemo, useState } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PageHeader } from '@/components/ui/PageHeader';
import { PanelCard } from '@/components/ui/PanelCard';
import { ConfigurationModuleTabs } from '@/components/ui/ConfigurationModuleTabs';
import { ActionToolbar, FilterInput, ResetFiltersButton } from '@/components/filters/ActionToolbar';
import { aeRows } from '@/features/configuration/catalog';

const defaultFilters = { aeTitle: '', host: '' };

export default function AeListPage() {
  const [draft, setDraft] = useState(defaultFilters);
  const [submitted, setSubmitted] = useState(defaultFilters);
  const [count, setCount] = useState<number | null>(aeRows.length);
  const rows = useMemo(() => aeRows.filter((row) => (!submitted.aeTitle || row.aeTitle.toLowerCase().includes(submitted.aeTitle.toLowerCase())) && (!submitted.host || row.host.toLowerCase().includes(submitted.host.toLowerCase()))), [submitted]);
  const calc = (f = draft) => aeRows.filter((row) => (!f.aeTitle || row.aeTitle.toLowerCase().includes(f.aeTitle.toLowerCase())) && (!f.host || row.host.toLowerCase().includes(f.host.toLowerCase()))).length;
  return <div>
    <Breadcrumbs items={[{ label: 'Home', href: '/inbox' }, { label: 'Configuration', href: '/configuration/devices' }, { label: 'AE list' }]} />
    <ConfigurationModuleTabs />
    <PageHeader title="AE list" description="Application entities configured for the archive." />
    <PanelCard title="AE list">
      <ActionToolbar count={count} onCount={() => setCount(calc())} onSubmit={() => setSubmitted(draft)}>
        <FilterInput value={draft.aeTitle} onChange={(e)=>setDraft((c)=>({...c, aeTitle:e.target.value}))} placeholder="AE title" className="w-[220px]" />
        <FilterInput value={draft.host} onChange={(e)=>setDraft((c)=>({...c, host:e.target.value}))} placeholder="Host" className="w-[220px]" />
        <ResetFiltersButton onClick={()=>{setDraft(defaultFilters); setSubmitted(defaultFilters); setCount(aeRows.length);}} />
      </ActionToolbar>
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead className="bg-white/5 text-left text-mutedText"><tr><th className="px-4 py-3 font-medium">AE title</th><th className="px-4 py-3 font-medium">Description</th><th className="px-4 py-3 font-medium">Host</th><th className="px-4 py-3 font-medium">Port</th><th className="px-4 py-3 font-medium">Installed</th></tr></thead>
          <tbody className="divide-y divide-white/10">{rows.map((row)=><tr key={row.aeTitle} className="hover:bg-white/5"><td className="px-4 py-3 text-white">{row.aeTitle}</td><td className="px-4 py-3">{row.description}</td><td className="px-4 py-3">{row.host}</td><td className="px-4 py-3">{row.port}</td><td className="px-4 py-3">{String(row.installed)}</td></tr>)}</tbody>
        </table>
      </div>
    </PanelCard>
  </div>;
}
