import { Suspense } from 'react';
import SegmentationsPageClient from './SegmentationsPageClient';

export default function SegmentationsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0f2340] text-white">
          Loading segmentations…
        </div>
      }
    >
      <SegmentationsPageClient />
    </Suspense>
  );
}
