import { Database, Loader2, RefreshCcw, Search, Sigma } from 'lucide-react';

export function ActionToolbar({
  count,
  countLabel = '0',
  onCount,
  onSubmit,
  onSize,
  sizeLabel,
  isCounting,
  isSubmitting,
  isSizing,
  children,
}: {
  count?: number | null;
  countLabel?: string;
  onCount: () => void;
  onSubmit: () => void;
  onSize?: () => void;
  sizeLabel?: string;
  isCounting?: boolean;
  isSubmitting?: boolean;
  isSizing?: boolean;
  children: React.ReactNode;
}) {
  const resolvedCount = typeof count === 'number' ? count.toLocaleString() : countLabel;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">{children}</div>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3">
        <div className="flex items-center gap-2 text-sm text-mutedText">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white">Count {resolvedCount}</span>
          <span>Apply the current filters, then load the matching rows.</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onCount}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            {isCounting ? <Loader2 size={16} className="animate-spin" /> : <Sigma size={16} />}
            COUNT
          </button>
          {onSize ? (
            <button
              type="button"
              onClick={onSize}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              {isSizing ? <Loader2 size={16} className="animate-spin" /> : <Database size={16} />}
              SIZE{sizeLabel ? ` ${sizeLabel}` : ''}
            </button>
          ) : null}
          <button
            type="button"
            onClick={onSubmit}
            className="inline-flex items-center gap-2 rounded-xl bg-shellTop px-4 py-2 text-sm font-medium text-white transition hover:brightness-110"
          >
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}

export function FilterInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        'min-w-[120px] rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-mutedText',
        props.className || '',
      ].join(' ')}
    />
  );
}

export function FilterSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={[
        'min-w-[120px] rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none',
        props.className || '',
      ].join(' ')}
    />
  );
}

export function ResetFiltersButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-4 py-2 text-sm text-mutedText transition hover:bg-white/5 hover:text-white"
    >
      <RefreshCcw size={16} />
      RESET
    </button>
  );
}
