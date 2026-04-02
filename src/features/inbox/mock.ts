export type RecentChange = {
  id: string;
  level: 'significant' | 'warning' | 'info';
  parameter: string;
  studyUID: string;
  delta: string;
  at: string;
};

export const degradationTrends: string[] = [];
export const policyViolations: string[] = [];
export const recentChanges: RecentChange[] = [
  {
    id: 'chg-1',
    level: 'significant',
    parameter: 'Storage Verification Delay',
    studyUID: '1.2.840.113619.2.55.3.604688435.120.1599127431.467',
    delta: '+12%',
    at: '2026-04-01 09:42',
  },
  {
    id: 'chg-2',
    level: 'warning',
    parameter: 'Queue Backlog',
    studyUID: '1.2.840.113619.2.55.3.604688435.120.1599127431.468',
    delta: '+6 jobs',
    at: '2026-04-01 08:11',
  },
];
