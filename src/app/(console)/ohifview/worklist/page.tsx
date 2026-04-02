import { Suspense } from 'react';
import WorklistPageClient from './WorklistPageClient';

export default function WorklistPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0f2340] text-white">
          Loading worklist…
        </div>
      }
    >
      <WorklistPageClient />
    </Suspense>
  );
}
