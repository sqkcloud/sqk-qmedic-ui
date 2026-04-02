import { Suspense } from 'react';
import MeasurementsPageClient from './MeasurementsPageClient';

export default function MeasurementsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0f2340] text-white">
          Loading measurements…
        </div>
      }
    >
      <MeasurementsPageClient />
    </Suspense>
  );
}
