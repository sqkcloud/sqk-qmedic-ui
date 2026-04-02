'use client';

import { PanelCard } from '@/components/ui/PanelCard';
import { StudyWorkspacePanel } from '@/components/ohif/StudyWorkspacePanel';
import { useOhifWorkspace } from '@/features/ohif/state';

export function MonitoringTaskDetailDrawer({
  row,
  title = 'Task detail',
  description = 'Selected monitoring row linked into the OHIF workspace.',
}: {
  row: Record<string, any> | null;
  title?: string;
  description?: string;
}) {
  const workspace = useOhifWorkspace();
  if (!row) return null;

  const studyUID = row.studyInstanceUID || row.studyUID || row.StudyInstanceUID || workspace.state.selectedStudyUID || '';
  const label = row.taskID
    ? `Monitoring task ${row.taskID}`
    : row.destination
      ? `Monitoring ${row.destination}`
      : row.storageID
        ? `Storage ${row.storageID}`
        : 'Monitoring bridge';

  return (
    <div className="mt-5">
      <PanelCard title={title} description={description}>
        <div className="grid gap-4 lg:grid-cols-[1fr,1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-mutedText">Raw task payload</div>
            <pre className="mt-2 max-h-[320px] overflow-auto rounded-xl border border-white/10 bg-black/40 p-3 text-xs text-mutedText">{JSON.stringify(row, null, 2)}</pre>
          </div>
          {studyUID ? (
            <StudyWorkspacePanel studyUID={studyUID} label={label} />
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 px-6 py-10 text-sm text-mutedText">
              No StudyInstanceUID available for this row. Using the active workspace study when possible.
            </div>
          )}
        </div>
      </PanelCard>
    </div>
  );
}
