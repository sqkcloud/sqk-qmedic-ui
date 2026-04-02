'use client';

import { useMemo, useState } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { MonitoringModuleTabs } from '@/components/ui/MonitoringModuleTabs';
import { PageHeader } from '@/components/ui/PageHeader';
import { PanelCard } from '@/components/ui/PanelCard';
import { MonitoringBridgePanel } from '@/components/ohif/MonitoringBridgePanel';
import { MonitoringTaskDetailDrawer } from '@/components/ohif/MonitoringTaskDetailDrawer';
import { ActionToolbar, FilterInput, FilterSelect, ResetFiltersButton } from '@/components/filters/ActionToolbar';
import { storageVerificationRows }from '@/features/monitoring/catalog';

const defaultFilters = { storageID: '', state: 'all' };

export default function Page() {
  const source = storageVerificationRows;
  const [draft, setDraft] = useState(defaultFilters);
  const [submitted, setSubmitted] = useState(defaultFilters);
  const [selectedRow, setSelectedRow] = useState<(typeof source)[number] | null>(null);
  const [count, setCount] = useState<number | null>(source.length);
  const rows = useMemo(() => source.filter((row) => (!submitted.storageID || row.storageID.toLowerCase().includes(submitted.storageID.toLowerCase())) && (submitted.state === 'all' || row.state === submitted.state)), [submitted]);
  const calc = (f = draft) => source.filter((row) => (!f.storageID || row.storageID.toLowerCase().includes(f.storageID.toLowerCase())) && (f.state === 'all' || row.state === f.state)).length;
  return <div>
    <Breadcrumbs items={[{ label: 'Home', href: '/inbox' }, { label: 'Monitoring', href: '/monitoring/storage-verification' }, { label: 'Storage Verification' }]} />
    <MonitoringModuleTabs />
    <PageHeader title="Storage Verification" description="Verification runs against archive storage backends." />
    <div className="mt-5"><MonitoringBridgePanel /></div>
    <PanelCard title="Storage Verification">
      <ActionToolbar count={count} onCount={() => setCount(calc())} onSubmit={() => setSubmitted(draft)}>
        <FilterInput value={draft.storageID} onChange={(e)=>setDraft((c)=>({...c, storageID:e.target.value}))} placeholder="Storage ID" className="w-[180px]" />
        <FilterSelect value={draft.state} onChange={(e)=>setDraft((c)=>({...c, state:e.target.value}))} className="w-[160px]"><option value="all">All states</option><option value="OK">OK</option><option value="WARNING">WARNING</option></FilterSelect>
        <ResetFiltersButton onClick={()=>{setDraft(defaultFilters); setSubmitted(defaultFilters); setSelectedRow(null); setCount(source.length);}} />
      </ActionToolbar>
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10"><table className="min-w-full divide-y divide-white/10 text-sm"><thead className="bg-white/5 text-left text-mutedText"><tr><th className="px-4 py-3 font-medium">Storage ID</th><th className="px-4 py-3 font-medium">Verified At</th><th className="px-4 py-3 font-medium">Verified Objects</th><th className="px-4 py-3 font-medium">Failed Objects</th><th className="px-4 py-3 font-medium">State</th></tr></thead><tbody className="divide-y divide-white/10">{rows.map((row)=><tr key={`${row.storageID}-${row.verifiedAt}`} onClick={() => setSelectedRow(row)} className={['cursor-pointer transition hover:bg-white/5', selectedRow === row ? 'bg-cyan-400/10' : ''].join(' ')}><td className="px-4 py-3 text-white">{row.storageID}</td><td className="px-4 py-3">{row.verifiedAt}</td><td className="px-4 py-3">{row.verifiedObjects}</td><td className="px-4 py-3">{row.failedObjects}</td><td className="px-4 py-3">{row.state}</td></tr>)}</tbody></table></div>
    </PanelCard>
    <MonitoringTaskDetailDrawer row={selectedRow as any} title="Storage verification detail" description="Verification result selected from the table and linked to workspace context." />
  </div>;
}
