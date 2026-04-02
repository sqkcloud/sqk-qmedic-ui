'use client';

import { useMemo, useState } from 'react';
import { useInstances } from '@/features/instances/hooks';
import { useStudyDetail } from '@/features/studies/hooks';
import { StudyWorkspacePanel } from '@/components/ohif/StudyWorkspacePanel';

// Keep your existing helper imports below if your current file already uses them.
// Example:
// import { renderedFrameUrl } from '@/features/instances/utils';

type Props = {
  studyInstanceUID: string;
};

export default function StudyDetailClient({ studyInstanceUID }: Props) {
  const decodedStudyInstanceUID = decodeURIComponent(studyInstanceUID);
  const detailQuery = useStudyDetail(decodedStudyInstanceUID);
  const detail = detailQuery.data;

  const [selectedSeriesUID, setSelectedSeriesUID] = useState<string | null>(null);
  const [selectedInstanceUID, setSelectedInstanceUID] = useState<string | null>(null);

  const instancesQuery = useInstances(decodedStudyInstanceUID, selectedSeriesUID);
  const instances = instancesQuery.data ?? [];

  const previewUrl = useMemo(() => {
    if (!selectedSeriesUID || !selectedInstanceUID) return null;

    // Replace this block with the exact preview URL helper already used in your project.
    // Example:
    // return renderedFrameUrl(decodedStudyInstanceUID, selectedSeriesUID, selectedInstanceUID);

    return null;
  }, [decodedStudyInstanceUID, selectedSeriesUID, selectedInstanceUID]);

  return (
    <div className="space-y-6">
      <StudyWorkspacePanel
        studyUID={decodedStudyInstanceUID}
        seriesUID={selectedSeriesUID ?? undefined}
        instanceUID={selectedInstanceUID ?? undefined}
      />

      <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-white">
        <h1 className="text-2xl font-semibold">Study Detail</h1>
        <p className="mt-1 text-sm text-white/60">{decodedStudyInstanceUID}</p>

        <div className="mt-6 text-sm text-white/70">
          This is the Next 15 build-safe client wrapper.
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 text-sm font-medium text-white">Detail query</div>
            <pre className="overflow-auto text-xs text-white/70">
              {JSON.stringify(detail ?? null, null, 2)}
            </pre>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 text-sm font-medium text-white">Instances</div>
            <pre className="overflow-auto text-xs text-white/70">
              {JSON.stringify(instances, null, 2)}
            </pre>
          </div>
        </div>

        {previewUrl ? (
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 text-sm font-medium text-white">Preview</div>
            <img
              src={previewUrl}
              alt="Rendered preview"
              className="max-h-[480px] rounded-lg border border-white/10"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
