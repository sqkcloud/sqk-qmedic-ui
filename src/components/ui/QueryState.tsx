export function QueryState({
  isLoading,
  error,
  empty,
  children,
}: {
  isLoading: boolean;
  error?: unknown;
  empty: boolean;
  children: React.ReactNode;
}) {
  if (isLoading) {
    return <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-8 text-sm text-mutedText">Loading...</div>;
  }

  if (error) {
    const message = error instanceof Error ? error.message : 'Request failed';
    return (
      <div className="rounded-2xl border border-red-400/20 bg-red-500/5 px-4 py-8 text-sm text-red-200">
        Failed to load data. {message}
      </div>
    );
  }

  if (empty) {
    return <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-8 text-sm text-mutedText">No data found.</div>;
  }

  return <>{children}</>;
}
