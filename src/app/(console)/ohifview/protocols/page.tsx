import { Suspense } from 'react';
import ProtocolsPageClient from './ProtocolsPageClient';

export default function ProtocolsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0f2340] text-white">
          Loading protocols…
        </div>
      }
    >
      <ProtocolsPageClient />
    </Suspense>
  );
}
