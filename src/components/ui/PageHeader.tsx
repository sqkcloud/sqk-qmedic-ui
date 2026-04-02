export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-4xl font-semibold tracking-tight text-white">{title}</h1>
      <p className="mt-2 text-sm text-mutedText">{description}</p>
    </div>
  );
}
