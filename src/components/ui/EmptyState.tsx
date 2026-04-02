export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex min-h-[120px] items-center justify-center rounded-2xl border border-dashed border-white/10 text-sm text-mutedText">
      {message}
    </div>
  );
}
