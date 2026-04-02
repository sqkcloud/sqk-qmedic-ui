'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ExternalLink, RotateCcw } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { OhifModuleTabs } from '@/components/ui/OhifModuleTabs';
import { PageHeader } from '@/components/ui/PageHeader';
import { PanelCard } from '@/components/ui/PanelCard';
import { useOhifWorkspace } from '@/features/ohif/state';

/**
 * We reverse-proxy OHIF on /viewer -> http://localhost:3001 in proxy.conf.js.
 * So from the console UI we should always use a *relative* URL.
 */
const VIEWER_BASENAME = process.env.NEXT_PUBLIC_OHIF_VIEWER_URL || '/viewer/';

function normalizePath(input: string) {
  const v = (input || '').trim();
  if (!v) return '/viewer/';
  if (/^https?:\/\//i.test(v)) return v.endsWith('/') ? v : `${v}/`;
  const withLeading = v.startsWith('/') ? v : `/${v}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

function buildStudyUrl(base: string, studyUID?: string) {
  const b = normalizePath(base);
  if (!studyUID) return b;
  const url = new URL(b, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
  url.searchParams.set('StudyInstanceUIDs', studyUID);
  // Keep pathname relative when base is relative.
  if (!/^https?:\/\//i.test(b)) return `${url.pathname}${url.search}`;
  return url.toString();
}

export default function OhifViewLanding() {
  const { state } = useOhifWorkspace();
  const [frameKey, setFrameKey] = useState(0);

  const viewerBase = useMemo(() => normalizePath(VIEWER_BASENAME), []);
  const studyUID = state.selectedStudyUID || '';

  const iframeSrc = useMemo(() => {
    // Default: show OHIF study list (entry point) just like the native OHIF app.
    // If user already selected a StudyInstanceUID in our console, deep-link into it.
    return buildStudyUrl(viewerBase, studyUID || undefined);
  }, [viewerBase, studyUID]);

  const openInNewTab = iframeSrc || viewerBase;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Home', href: '/inbox' }, { label: 'OHIF View' }]} />
      <OhifModuleTabs />
      <PageHeader
        title="OHIF View"
        description="Runs the real OHIF Viewer inside the console. The console proxies /viewer/* to the OHIF app on port 3001 and preserves the /viewer basename so OHIF routes and assets resolve correctly. Select a study in the console to deep-link; otherwise you'll see OHIF's Study List entry point."
      />

      <PanelCard
        title="OHIF (proxied)"
        right={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFrameKey((k) => k + 1)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white transition hover:bg-white/10"
              title="Reload embedded viewer"
            >
              <RotateCcw size={14} /> Reload
            </button>
            <Link
              href={openInNewTab}
              target="_blank"
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white transition hover:bg-white/10"
              title="Open OHIF in new tab"
            >
              <ExternalLink size={14} /> New tab
            </Link>
          </div>
        }
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-xs text-mutedText">
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            Proxy path: <span className="text-white">{viewerBase}</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            Selected StudyInstanceUID: <span className="text-white">{studyUID || 'none (Study List mode)'}</span>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
          <iframe
            key={frameKey}
            title="OHIF Viewer"
            src={iframeSrc}
            className="h-[820px] w-full"
          />
        </div>

        <div className="mt-3 text-xs text-mutedText">
          Tip: You can keep using our console screens (Studies / Monitoring / Compare) to set the current workspace study selection.
          This page will deep-link the embedded OHIF instance using <span className="text-white">StudyInstanceUIDs</span> when available.
        </div>
      </PanelCard>
    </div>
  );
}
