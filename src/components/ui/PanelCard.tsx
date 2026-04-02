import { ReactNode } from 'react';

export function PanelCard({
  title,
  right,
  description,
  className = '',
  children,
}: {
  title: string;
  right?: ReactNode;
  description?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={[
        'panel p-5',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          {description ? <p className="mt-1 text-sm text-mutedText">{description}</p> : null}
        </div>
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
      {children}
    </section>
  );
}
