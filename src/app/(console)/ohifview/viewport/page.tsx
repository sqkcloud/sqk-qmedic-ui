import { Suspense } from 'react';
import ViewportPageClient from './ViewportPageClient';

export default function ViewportPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0f2340] text-white">
          Loading viewport…
        </div>
      }
    >
      <ViewportPageClient />
    </Suspense>
  );
}
