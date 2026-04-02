'use client';

import { useMemo, useState } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { MonitoringModuleTabs } from '@/components/ui/MonitoringModuleTabs';
import { PageHeader } from '@/components/ui/PageHeader';
import { PanelCard } from '@/components/ui/PanelCard';
import { MonitoringBridgePanel } from '@/components/ohif/MonitoringBridgePanel';
import { MonitoringTaskDetailDrawer } from '@/components/ohif/MonitoringTaskDetailDrawer';
import { ActionToolbar, FilterInput, FilterSelect, ResetFiltersButton } from '@/components/filters/ActionToolbar';
import { retrieveRows } from '@/features/monitoring/catalog';

const defaultFilters = { patientID: '', destination: '', state: 'all' };

export default function RetrievePage() {
  const [draft, setDraft] = useState(defaultFilters);
  const [submitted, setSubmitted] = useState(defaultFilters);
  const [count, setCount] = useState<number | null>(retrieveRows.length);
  const [selectedRow, setSelectedRow] = useState<(typeof retrieveRows)[number] | null>(null);

  const rows = useMemo(() => retrieveRows.filter((row) => (!submitted.patientID || row.patientID.toLowerCase().includes(submitted.patientID.toLowerCase())) && (!submitted.destination || row.destination.toLowerCase().includes(submitted.destination.toLowerCase())) && (submitted.state === 'all' || row.state === submitted.state)), [submitted]);
  const calc = (f = draft) => retrieveRows.filter((row) => (!f.patientID || row.patientID.toLowerCase().includes(f.patientID.toLowerCase())) && (!f.destination || row.destination.toLowerCase().includes(f.destination.toLowerCase())) && (f.state === 'all' || row.state === f.state)).length;

  return <div><Breadcrumbs items={[{ label: 'Home', href: '/inbox' }, { label: 'Monitoring', href: '/monitoring/retrieve' }, { label: 'Retrieve' }]} /><MonitoringModuleTabs /><PageHeader title="Retrieve" description="Monitor external retrieves and retry candidates." /><div className="mt-5"><MonitoringBridgePanel studyUIDs={rows.map((row) => row.studyInstanceUID)} /></div><PanelCard title="Retrieve tasks"><ActionToolbar count={count} onCount={() => setCount(calc())} onSubmit={() => setSubmitted(draft)}><FilterInput value={draft.patientID} onChange={(e)=>setDraft((c)=>({...c, patientID:e.target.value}))} placeholder="Patient ID" className="w-[180px]" /><FilterInput value={draft.destination} onChange={(e)=>setDraft((c)=>({...c, destination:e.target.value}))} placeholder="Source / destination" className="w-[200px]" /><FilterSelect value={draft.state} onChange={(e)=>setDraft((c)=>({...c, state:e.target.value}))} className="w-[160px]"><option value="all">All states</option><option value="RUNNING">RUNNING</option><option value="FAILED">FAILED</option></FilterSelect><ResetFiltersButton onClick={()=>{setDraft(defaultFilters); setSubmitted(defaultFilters); setCount(retrieveRows.length); setSelectedRow(null);}} /></ActionToolbar><div className="mt-4 overflow-hidden rounded-2xl border border-white/10"><table className="min-w-full divide-y divide-white/10 text-sm"><thead className="bg-white/5 text-left text-mutedText"><tr><th className="px-4 py-3 font-medium">Study UID</th><th className="px-4 py-3 font-medium">Patient ID</th><th className="px-4 py-3 font-medium">Endpoint</th><th className="px-4 py-3 font-medium">State</th><th className="px-4 py-3 font-medium">Updated</th></tr></thead><tbody className="divide-y divide-white/10">{rows.map((row)=><tr key={row.studyInstanceUID} onClick={()=>setSelectedRow(row)} className={["hover:bg-white/5 cursor-pointer", selectedRow?.studyInstanceUID === row.studyInstanceUID ? 'bg-white/5' : ''].join(' ')}><td className="px-4 py-3 text-white">{row.studyInstanceUID}</td><td className="px-4 py-3">{row.patientID}</td><td className="px-4 py-3">{row.destination}</td><td className="px-4 py-3">{row.state}</td><td className="px-4 py-3">{row.updatedAt}</td></tr>)}</tbody></table></div>{selectedRow ? <MonitoringTaskDetailDrawer row={selectedRow} title="Retrieve task detail" description="Selected retrieve row can be synced into the OHIF workspace." /> : null}</PanelCard></div>;
}
