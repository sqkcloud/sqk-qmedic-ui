'use client';

import { useMemo, useState } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PageHeader } from '@/components/ui/PageHeader';
import { PanelCard } from '@/components/ui/PanelCard';
import { ConfigurationModuleTabs } from '@/components/ui/ConfigurationModuleTabs';
import { ActionToolbar, FilterInput, FilterSelect, ResetFiltersButton } from '@/components/filters/ActionToolbar';
import { deviceRows } from '@/features/configuration/catalog';

const defaultFilters = { name: '', primaryType: '', installed: 'all' };

export default function DevicesPage() {
  const [draftFilters, setDraftFilters] = useState(defaultFilters);
  const [submittedFilters, setSubmittedFilters] = useState(defaultFilters);
  const [countValue, setCountValue] = useState<number | null>(deviceRows.length);

  const filteredRows = useMemo(() => deviceRows.filter((row) => {
    const matchesName = !submittedFilters.name || row.name.toLowerCase().includes(submittedFilters.name.toLowerCase());
    const matchesType = !submittedFilters.primaryType || row.primaryType.toLowerCase().includes(submittedFilters.primaryType.toLowerCase());
    const matchesInstalled = submittedFilters.installed === 'all' || String(row.installed) === submittedFilters.installed;
    return matchesName && matchesType && matchesInstalled;
  }), [submittedFilters]);

  function calc(filters = draftFilters) {
    return deviceRows.filter((row) => {
      const matchesName = !filters.name || row.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchesType = !filters.primaryType || row.primaryType.toLowerCase().includes(filters.primaryType.toLowerCase());
      const matchesInstalled = filters.installed === 'all' || String(row.installed) === filters.installed;
      return matchesName && matchesType && matchesInstalled;
    }).length;
  }

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Home', href: '/inbox' }, { label: 'Configuration', href: '/configuration/devices' }, { label: 'Devices' }]} />
      <ConfigurationModuleTabs />
      <PageHeader title="Devices" description="Device inventory with search, count, and submit behavior." />
      <PanelCard title="Devices">
        <ActionToolbar count={countValue} onCount={() => setCountValue(calc())} onSubmit={() => setSubmittedFilters(draftFilters)}>
          <FilterInput value={draftFilters.name} onChange={(e) => setDraftFilters((c) => ({ ...c, name: e.target.value }))} placeholder="Search device" className="w-[220px]" />
          <FilterInput value={draftFilters.primaryType} onChange={(e) => setDraftFilters((c) => ({ ...c, primaryType: e.target.value }))} placeholder="Primary device type" className="w-[200px]" />
          <FilterSelect value={draftFilters.installed} onChange={(e) => setDraftFilters((c) => ({ ...c, installed: e.target.value }))} className="w-[160px]">
            <option value="all">All install states</option>
            <option value="true">Installed</option>
            <option value="false">Not installed</option>
          </FilterSelect>
          <ResetFiltersButton onClick={() => { setDraftFilters(defaultFilters); setSubmittedFilters(defaultFilters); setCountValue(deviceRows.length); }} />
        </ActionToolbar>
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
          <table className="min-w-full divide-y divide-white/10 text-sm">
            <thead className="bg-white/5 text-left text-mutedText">
              <tr>
                <th className="px-4 py-3 font-medium">Device Name</th>
                <th className="px-4 py-3 font-medium">Department Name</th>
                <th className="px-4 py-3 font-medium">Device Description</th>
                <th className="px-4 py-3 font-medium">Manufacturer</th>
                <th className="px-4 py-3 font-medium">Model Name</th>
                <th className="px-4 py-3 font-medium">Primary Device Type</th>
                <th className="px-4 py-3 font-medium">Station Name</th>
                <th className="px-4 py-3 font-medium">Installed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredRows.map((row) => (
                <tr key={row.name} className="hover:bg-white/5">
                  <td className="px-4 py-3 text-white">{row.name}</td>
                  <td className="px-4 py-3">{row.department}</td>
                  <td className="px-4 py-3">{row.description}</td>
                  <td className="px-4 py-3">{row.manufacturer}</td>
                  <td className="px-4 py-3">{row.model}</td>
                  <td className="px-4 py-3">{row.primaryType}</td>
                  <td className="px-4 py-3">{row.stationName}</td>
                  <td className="px-4 py-3">{String(row.installed)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PanelCard>
    </div>
  );
}
