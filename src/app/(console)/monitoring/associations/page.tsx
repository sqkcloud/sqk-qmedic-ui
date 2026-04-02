'use client';

import { useMemo, useState } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { MonitoringModuleTabs } from '@/components/ui/MonitoringModuleTabs';
import { PageHeader } from '@/components/ui/PageHeader';
import { PanelCard } from '@/components/ui/PanelCard';
import { MonitoringBridgePanel } from '@/components/ohif/MonitoringBridgePanel';
import { MonitoringTaskDetailDrawer } from '@/components/ohif/MonitoringTaskDetailDrawer';
import { ActionToolbar, FilterInput, FilterSelect, ResetFiltersButton } from '@/components/filters/ActionToolbar';
import { associationRows }from '@/features/monitoring/catalog';

const defaultFilters = { localAET: '', remoteAET: '', status: 'all' };

export default function Page() {
  const source = associationRows;
  const [draft, setDraft] = useState(defaultFilters);
  const [submitted, setSubmitted] = useState(defaultFilters);
  const [selectedRow, setSelectedRow] = useState<(typeof source)[number] | null>(null);
  const [count, setCount] = useState<number | null>(source.length);
  const rows = useMemo(() => source.filter((row) => (!submitted.localAET || row.localAET.toLowerCase().includes(submitted.localAET.toLowerCase())) && (!submitted.remoteAET || row.remoteAET.toLowerCase().includes(submitted.remoteAET.toLowerCase())) && (submitted.status === 'all' || row.status === submitted.status)), [submitted]);
  const calc = (f = draft) => source.filter((row) => (!f.localAET || row.localAET.toLowerCase().includes(f.localAET.toLowerCase())) && (!f.remoteAET || row.remoteAET.toLowerCase().includes(f.remoteAET.toLowerCase())) && (f.status === 'all' || row.status === f.status)).length;
  return <div>
    <Breadcrumbs items={[{ label: 'Home', href: '/inbox' }, { label: 'Monitoring', href: '/monitoring/associations' }, { label: 'Open Associations' }]} />
    <MonitoringModuleTabs />
    <PageHeader title="Open Associations" description="Press refresh-style actions through submit/count behavior." />
    <div className="mt-5"><MonitoringBridgePanel /></div>
    <PanelCard title="Open Associations">
      <ActionToolbar count={count} onCount={() => setCount(calc())} onSubmit={() => setSubmitted(draft)}>
        <FilterInput value={draft.localAET} onChange={(e)=>setDraft((c)=>({...c, localAET:e.target.value}))} placeholder="Local AE Title" className="w-[180px]" />
        <FilterInput value={draft.remoteAET} onChange={(e)=>setDraft((c)=>({...c, remoteAET:e.target.value}))} placeholder="Remote AE Title" className="w-[180px]" />
        <FilterSelect value={draft.status} onChange={(e)=>setDraft((c)=>({...c, status:e.target.value}))} className="w-[140px]"><option value="all">All states</option><option value="OPEN">OPEN</option></FilterSelect>
        <ResetFiltersButton onClick={()=>{setDraft(defaultFilters); setSubmitted(defaultFilters); setSelectedRow(null); setCount(source.length);}} />
      </ActionToolbar>
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10"><table className="min-w-full divide-y divide-white/10 text-sm"><thead className="bg-white/5 text-left text-mutedText"><tr><th className="px-4 py-3 font-medium">Local AE Title</th><th className="px-4 py-3 font-medium">Remote AE Title</th><th className="px-4 py-3 font-medium">Invoked Ops.</th><th className="px-4 py-3 font-medium">Performed Ops.</th><th className="px-4 py-3 font-medium">Connection time (Server)</th><th className="px-4 py-3 font-medium">Connection time (Browser)</th><th className="px-4 py-3 font-medium">Duration</th><th className="px-4 py-3 font-medium">Status</th></tr></thead><tbody className="divide-y divide-white/10">{rows.map((row)=><tr key={`${row.localAET}-${row.remoteAET}`} onClick={() => setSelectedRow(row)} className={['cursor-pointer transition hover:bg-white/5', selectedRow === row ? 'bg-cyan-400/10' : ''].join(' ')}><td className="px-4 py-3 text-white">{row.localAET}</td><td className="px-4 py-3">{row.remoteAET}</td><td className="px-4 py-3">{row.invokedOps}</td><td className="px-4 py-3">{row.performedOps}</td><td className="px-4 py-3">{row.connectionTimeServer}</td><td className="px-4 py-3">{row.connectionTimeBrowser}</td><td className="px-4 py-3">{row.duration}</td><td className="px-4 py-3">{row.status}</td></tr>)}</tbody></table></div>
    </PanelCard>
    <MonitoringTaskDetailDrawer row={selectedRow as any} title="Association detail" description="Selected association row connected to the active OHIF workspace context." />
  </div>;
}
