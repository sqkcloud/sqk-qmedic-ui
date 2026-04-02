export function LogoMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center overflow-hidden rounded-xl border border-white/10 bg-white/5 px-2 py-1.5">
      <img
        src="/sqk-logo-white.svg"
        alt="SQK"
        className={compact ? 'h-9 w-auto max-w-[160px] object-contain' : 'h-12 w-auto max-w-[240px] object-contain'}
      />
    </div>
  );
}
