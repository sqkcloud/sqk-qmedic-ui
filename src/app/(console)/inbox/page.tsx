'use client';

import { useMemo, useState } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { EmptyState } from '@/components/ui/EmptyState';
import { PageHeader } from '@/components/ui/PageHeader';
import { PanelCard } from '@/components/ui/PanelCard';
import { ActionToolbar, FilterInput, FilterSelect, ResetFiltersButton } from '@/components/filters/ActionToolbar';
import { degradationTrends, policyViolations, recentChanges } from '@/features/inbox/mock';

const defaultFilters = {
  level: 'all',
  search: '',
  window: '48h',
};

export default function InboxPage() {
  const [draftFilters, setDraftFilters] = useState(defaultFilters);
  const [submittedFilters, setSubmittedFilters] = useState(defaultFilters);
  const [countValue, setCountValue] = useState<number | null>(recentChanges.length);

  const filteredChanges = useMemo(() => {
    return recentChanges.filter((item) => {
      const matchesLevel = submittedFilters.level === 'all' || item.level === submittedFilters.level;
      const term = submittedFilters.search.trim().toLowerCase();
      const matchesSearch = !term || [item.parameter, item.studyUID, item.delta, item.at].some((field) => field.toLowerCase().includes(term));
      return matchesLevel && matchesSearch;
    });
  }, [submittedFilters]);

  function countMatches(filters = draftFilters) {
    return recentChanges.filter((item) => {
      const matchesLevel = filters.level === 'all' || item.level === filters.level;
      const term = filters.search.trim().toLowerCase();
      const matchesSearch = !term || [item.parameter, item.studyUID, item.delta, item.at].some((field) => field.toLowerCase().includes(term));
      return matchesLevel && matchesSearch;
    }).length;
  }

  function handleCount() {
    setCountValue(countMatches());
  }

  function handleSubmit() {
    setSubmittedFilters(draftFilters);
  }

  function handleReset() {
    setDraftFilters(defaultFilters);
    setSubmittedFilters(defaultFilters);
    setCountValue(recentChanges.length);
  }

  return (
    <div>
      <Breadcrumbs items={[{ label: 'Home', href: '/inbox' }, { label: 'Inbox' }]} />
      <PageHeader
        title="Inbox"
        description="Review recent archive changes and take next actions across studies, queues, and policy checks."
      />

      <div className="space-y-5">
        <PanelCard title="Degradation Trends">
          {degradationTrends.length === 0 ? <EmptyState message="No degradation trends detected." /> : null}
        </PanelCard>

        <PanelCard title={`Policy Violations ${policyViolations.length ? `(${policyViolations.length})` : ''}`}>
          {policyViolations.length === 0 ? <EmptyState message="No current policy violations." /> : null}
        </PanelCard>

        <PanelCard title="Recent Changes">
          <ActionToolbar count={countValue} onCount={handleCount} onSubmit={handleSubmit}>
            <FilterSelect value={draftFilters.level} onChange={(e) => setDraftFilters((current) => ({ ...current, level: e.target.value }))} className="w-[140px]">
              <option value="all">all</option>
              <option value="significant">significant</option>
              <option value="warning">warning</option>
              <option value="info">info</option>
            </FilterSelect>
            <FilterInput value={draftFilters.search} onChange={(e) => setDraftFilters((current) => ({ ...current, search: e.target.value }))} placeholder="search param / uid / delta" className="w-[260px]" />
            <FilterSelect value={draftFilters.window} onChange={(e) => setDraftFilters((current) => ({ ...current, window: e.target.value }))} className="w-[120px]">
              <option value="24h">24h</option>
              <option value="48h">48h</option>
              <option value="7d">7d</option>
            </FilterSelect>
            <ResetFiltersButton onClick={handleReset} />
          </ActionToolbar>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-mutedText">
            Showing <span className="font-medium text-white">{filteredChanges.length}</span> loaded changes for the currently submitted filters.
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
            <table className="min-w-full divide-y divide-white/10 text-sm">
              <thead className="bg-white/5 text-left text-mutedText">
                <tr>
                  <th className="px-4 py-3 font-medium">Level</th>
                  <th className="px-4 py-3 font-medium">Parameter</th>
                  <th className="px-4 py-3 font-medium">Study UID</th>
                  <th className="px-4 py-3 font-medium">Delta</th>
                  <th className="px-4 py-3 font-medium">Detected At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-panel">
                {filteredChanges.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5">
                    <td className="px-4 py-3 capitalize text-white">{item.level}</td>
                    <td className="px-4 py-3">{item.parameter}</td>
                    <td className="px-4 py-3 text-mutedText">{item.studyUID}</td>
                    <td className="px-4 py-3 text-white">{item.delta}</td>
                    <td className="px-4 py-3 text-mutedText">{item.at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PanelCard>
      </div>
    </div>
  );
}
