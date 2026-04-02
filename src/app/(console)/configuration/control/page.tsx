'use client';

import { useMemo, useState } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PageHeader } from '@/components/ui/PageHeader';
import { PanelCard } from '@/components/ui/PanelCard';
import { ConfigurationModuleTabs } from '@/components/ui/ConfigurationModuleTabs';
import { ActionToolbar, FilterInput, FilterSelect, ResetFiltersButton } from '@/components/filters/ActionToolbar';
import { controlRows } from '@/features/configuration/catalog';

const defaultFilters = { target: '', status: 'all' };

export default function ControlPage() {
  const [draft, setDraft] = useState(defaultFilters);
  const [submitted, setSubmitted] = useState(defaultFilters);
  const [count, setCount] = useState<number | null>(controlRows.length);
  const rows = useMemo(() => controlRows.filter((row) => (!submitted.target || row.target.toLowerCase().includes(submitted.target.toLowerCase())) && (submitted.status === 'all' || row.status === submitted.status)), [submitted]);
  const calc = (f = draft) => controlRows.filter((row) => (!f.target || row.target.toLowerCase().includes(f.target.toLowerCase())) && (f.status === 'all' || row.status === f.status)).length;
  return <div>
    <Breadcrumbs items={[{ label: 'Home', href: '/inbox' }, { label: 'Configuration', href: '/configuration/devices' }, { label: 'Control' }]} />
    <ConfigurationModuleTabs />
    <PageHeader title="Control" description="Operational control actions mirrored from the configuration area." />
    <PanelCard title="Control actions">
      <ActionToolbar count={count} onCount={() => setCount(calc())} onSubmit={() => setSubmitted(draft)}>
        <FilterInput value={draft.target} onChange={(e)=>setDraft((c)=>({...c, target:e.target.value}))} placeholder="Target" className="w-[220px]" />
        <FilterSelect value={draft.status} onChange={(e)=>setDraft((c)=>({...c, status:e.target.value}))} className="w-[160px]"><option value="all">All states</option><option value="Idle">Idle</option><option value="Ready">Ready</option></FilterSelect>
        <ResetFiltersButton onClick={()=>{setDraft(defaultFilters); setSubmitted(defaultFilters); setCount(controlRows.length);}} />
      </ActionToolbar>
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10"><table className="min-w-full divide-y divide-white/10 text-sm"><thead className="bg-white/5 text-left text-mutedText"><tr><th className="px-4 py-3 font-medium">Action</th><th className="px-4 py-3 font-medium">Target</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Last Run</th></tr></thead><tbody className="divide-y divide-white/10">{rows.map((row)=><tr key={row.action} className="hover:bg-white/5"><td className="px-4 py-3 text-white">{row.action}</td><td className="px-4 py-3">{row.target}</td><td className="px-4 py-3">{row.status}</td><td className="px-4 py-3">{row.lastRun}</td></tr>)}</tbody></table></div>
    </PanelCard>
  </div>;
}
