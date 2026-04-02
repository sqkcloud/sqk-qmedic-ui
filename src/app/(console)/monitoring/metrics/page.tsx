'use client';

import { useMemo, useState } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { MonitoringModuleTabs } from '@/components/ui/MonitoringModuleTabs';
import { PageHeader } from '@/components/ui/PageHeader';
import { PanelCard } from '@/components/ui/PanelCard';
import { MonitoringBridgePanel } from '@/components/ohif/MonitoringBridgePanel';
import { MonitoringTaskDetailDrawer } from '@/components/ohif/MonitoringTaskDetailDrawer';
import { ActionToolbar, FilterInput, ResetFiltersButton } from '@/components/filters/ActionToolbar';
import { metricRows } from '@/features/monitoring/catalog';

const defaultFilters = { name: '' };

export default function MetricsPage() {
  const [draft, setDraft] = useState(defaultFilters);
  const [submitted, setSubmitted] = useState(defaultFilters);
  const [selectedRow, setSelectedRow] = useState<(typeof metricRows)[number] | null>(null);
  const [count, setCount] = useState<number | null>(metricRows.length);
  const rows = useMemo(() => metricRows.filter((row) => !submitted.name || row.name.toLowerCase().includes(submitted.name.toLowerCase())), [submitted]);
  const calc = (f = draft) => metricRows.filter((row) => !f.name || row.name.toLowerCase().includes(f.name.toLowerCase())).length;
  return <div><Breadcrumbs items={[{ label: 'Home', href: '/inbox' }, { label: 'Monitoring', href: '/monitoring/metrics' }, { label: 'Metrics' }]} /><MonitoringModuleTabs /><PageHeader title="Metrics" description="Key archive metrics in the monitoring area." /><div className="mt-5"><MonitoringBridgePanel /></div><PanelCard title="Metrics"><ActionToolbar count={count} onCount={() => setCount(calc())} onSubmit={() => setSubmitted(draft)}><FilterInput value={draft.name} onChange={(e)=>setDraft({ name:e.target.value })} placeholder="Metric name" className="w-[220px]" /><ResetFiltersButton onClick={()=>{setDraft(defaultFilters); setSubmitted(defaultFilters); setSelectedRow(null); setCount(metricRows.length);}} /></ActionToolbar><div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{rows.map((row)=><button type="button" key={row.name} onClick={() => setSelectedRow(row)} className={["rounded-2xl border bg-white/[0.03] p-4 text-left transition", selectedRow?.name === row.name ? 'border-cyan-300/30 ring-1 ring-cyan-300/20' : 'border-white/10 hover:bg-white/10'].join(' ')}><div className="text-sm text-mutedText">{row.name}</div><div className="mt-3 text-3xl font-semibold text-white">{row.value}<span className="ml-2 text-base text-mutedText">{row.unit}</span></div><div className="mt-2 text-xs text-mutedText">Updated {row.updatedAt}</div></button>)}</div></PanelCard><MonitoringTaskDetailDrawer row={selectedRow as any} title="Metric detail" description="Selected metric linked to the active OHIF workspace context." /></div>;
}
