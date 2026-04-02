'use client';

import { useMemo, useState } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PageHeader } from '@/components/ui/PageHeader';
import { PanelCard } from '@/components/ui/PanelCard';
import { ConfigurationModuleTabs } from '@/components/ui/ConfigurationModuleTabs';
import { ActionToolbar, FilterInput, ResetFiltersButton } from '@/components/filters/ActionToolbar';
import { hl7Rows } from '@/features/configuration/catalog';

const defaultFilters = { applicationName: '', facility: '' };

export default function Hl7ApplicationsPage() {
  const [draft, setDraft] = useState(defaultFilters);
  const [submitted, setSubmitted] = useState(defaultFilters);
  const [count, setCount] = useState<number | null>(hl7Rows.length);
  const rows = useMemo(() => hl7Rows.filter((row) => (!submitted.applicationName || row.applicationName.toLowerCase().includes(submitted.applicationName.toLowerCase())) && (!submitted.facility || row.facility.toLowerCase().includes(submitted.facility.toLowerCase()))), [submitted]);
  const calc = (f = draft) => hl7Rows.filter((row) => (!f.applicationName || row.applicationName.toLowerCase().includes(f.applicationName.toLowerCase())) && (!f.facility || row.facility.toLowerCase().includes(f.facility.toLowerCase()))).length;
  return <div>
    <Breadcrumbs items={[{ label: 'Home', href: '/inbox' }, { label: 'Configuration', href: '/configuration/devices' }, { label: 'HL7 Applications' }]} />
    <ConfigurationModuleTabs />
    <PageHeader title="HL7 Applications" description="HL7 endpoints and accepted sending applications." />
    <PanelCard title="HL7 Applications">
      <ActionToolbar count={count} onCount={() => setCount(calc())} onSubmit={() => setSubmitted(draft)}>
        <FilterInput value={draft.applicationName} onChange={(e)=>setDraft((c)=>({...c, applicationName:e.target.value}))} placeholder="Application name" className="w-[220px]" />
        <FilterInput value={draft.facility} onChange={(e)=>setDraft((c)=>({...c, facility:e.target.value}))} placeholder="Facility" className="w-[180px]" />
        <ResetFiltersButton onClick={()=>{setDraft(defaultFilters); setSubmitted(defaultFilters); setCount(hl7Rows.length);}} />
      </ActionToolbar>
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10"><table className="min-w-full divide-y divide-white/10 text-sm"><thead className="bg-white/5 text-left text-mutedText"><tr><th className="px-4 py-3 font-medium">Application</th><th className="px-4 py-3 font-medium">Facility</th><th className="px-4 py-3 font-medium">Host</th><th className="px-4 py-3 font-medium">Port</th><th className="px-4 py-3 font-medium">Accepted Sending Applications</th></tr></thead><tbody className="divide-y divide-white/10">{rows.map((row)=><tr key={row.applicationName} className="hover:bg-white/5"><td className="px-4 py-3 text-white">{row.applicationName}</td><td className="px-4 py-3">{row.facility}</td><td className="px-4 py-3">{row.host}</td><td className="px-4 py-3">{row.port}</td><td className="px-4 py-3">{row.acceptedSendingApplications}</td></tr>)}</tbody></table></div>
    </PanelCard>
  </div>;
}
