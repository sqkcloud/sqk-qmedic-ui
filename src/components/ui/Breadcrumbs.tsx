import Link from 'next/link';

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <div className="mb-6 flex items-center gap-2 text-sm text-mutedText">
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center gap-2">
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span className="text-white">{item.label}</span>}
          {index < items.length - 1 ? <span>/</span> : null}
        </div>
      ))}
    </div>
  );
}
