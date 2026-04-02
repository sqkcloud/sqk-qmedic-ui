'use client';

import { useMemo, useState } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PageHeader } from '@/components/ui/PageHeader';
import { PanelCard } from '@/components/ui/PanelCard';
import { ConfigurationModuleTabs } from '@/components/ui/ConfigurationModuleTabs';
import { ActionToolbar, FilterInput, ResetFiltersButton } from '@/components/filters/ActionToolbar';
import { webAppRows } from '@/features/configuration/catalog';

const defaultFilters = { applicationName: '', aet: '' };

export default function WebAppsPage() {
  const [draft, setDraft] = useState(defaultFilters);
  const [submitted, setSubmitted] = useState(defaultFilters);
  const [count, setCount] = useState<number | null>(webAppRows.length);
  const rows = useMemo(() => webAppRows.filter((row) => (!submitted.applicationName || row.applicationName.toLowerCase().includes(submitted.applicationName.toLowerCase())) && (!submitted.aet || row.aet.toLowerCase().includes(submitted.aet.toLowerCase()))), [submitted]);
  const calc = (f = draft) => webAppRows.filter((row) => (!f.applicationName || row.applicationName.toLowerCase().includes(f.applicationName.toLowerCase())) && (!f.aet || row.aet.toLowerCase().includes(f.aet.toLowerCase()))).length;
  return <div>
    <Breadcrumbs items={[{ label: 'Home', href: '/inbox' }, { label: 'Configuration', href: '/configuration/devices' }, { label: 'Web Apps list' }]} />
    <ConfigurationModuleTabs />
    <PageHeader title="Web Apps list" description="Configured UI and service endpoints." />
    <PanelCard title="Web Apps list">
      <ActionToolbar count={count} onCount={() => setCount(calc())} onSubmit={() => setSubmitted(draft)}>
        <FilterInput value={draft.applicationName} onChange={(e)=>setDraft((c)=>({...c, applicationName:e.target.value}))} placeholder="Application name" className="w-[220px]" />
        <FilterInput value={draft.aet} onChange={(e)=>setDraft((c)=>({...c, aet:e.target.value}))} placeholder="AET" className="w-[180px]" />
        <ResetFiltersButton onClick={()=>{setDraft(defaultFilters); setSubmitted(defaultFilters); setCount(webAppRows.length);}} />
      </ActionToolbar>
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10"><table className="min-w-full divide-y divide-white/10 text-sm"><thead className="bg-white/5 text-left text-mutedText"><tr><th className="px-4 py-3 font-medium">Application</th><th className="px-4 py-3 font-medium">Service Path</th><th className="px-4 py-3 font-medium">AET</th><th className="px-4 py-3 font-medium">Cluster</th><th className="px-4 py-3 font-medium">Keycloak Client</th></tr></thead><tbody className="divide-y divide-white/10">{rows.map((row)=><tr key={row.applicationName} className="hover:bg-white/5"><td className="px-4 py-3 text-white">{row.applicationName}</td><td className="px-4 py-3">{row.servicePath}</td><td className="px-4 py-3">{row.aet}</td><td className="px-4 py-3">{row.applicationCluster}</td><td className="px-4 py-3">{row.keycloakClient}</td></tr>)}</tbody></table></div>
    </PanelCard>
  </div>;
}
