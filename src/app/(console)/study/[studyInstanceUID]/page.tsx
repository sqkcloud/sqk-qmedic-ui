import StudyDetailClient from './StudyDetailClient';

export default async function StudyDetailPage({
  params,
}: {
  params: Promise<{ studyInstanceUID: string }>;
}) {
  const { studyInstanceUID } = await params;
  return <StudyDetailClient studyInstanceUID={studyInstanceUID} />;
}
