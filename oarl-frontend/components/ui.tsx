import type { ReactNode } from "react";

// ---- Top navigation bar (shared across pages) ----
export function TopNav() {
  const items = [
    { label: "Overview", href: "/" },
    { label: "Datasets", href: "/datasets" },
    { label: "Evaluations", href: "/test-library" },
    { label: "Assistant", href: "/assistant" },
  ];
  return (
    <nav className="flex items-center gap-1">
      {items.map((it) => (
        <a
          key={it.href}
          href={it.href}
          className="rounded-md px-4 py-1.5 text-sm font-semibold text-[#5b4a3a] hover:bg-cream/60"
        >
          {it.label}
        </a>
      ))}
    </nav>
  );
}

export function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-cream bg-surface p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#8a7563]">
        {label}
      </p>
      <p className="mt-1 text-3xl font-bold text-forest">{value}</p>
      {sub && <p className="mt-1 text-[13px] text-[#8a7563]">{sub}</p>}
    </div>
  );
}

export function MiniStat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-lg border border-cream bg-surface p-3 shadow-sm">
      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8a7563]">
        {label}
      </p>
      <p className="mt-0.5 text-lg font-bold text-forest">{value}</p>
      {sub && <p className="mt-0.5 text-[11px] text-[#8a7563]">{sub}</p>}
    </div>
  );
}

export function Gauge({ pct }: { pct: number }) {
  const r = 34;
  const circ = 2 * Math.PI * r;
  const filled = (pct / 100) * circ;
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="96" height="96" viewBox="0 0 80 80" aria-hidden>
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="#f5dabf"
          strokeWidth="6"
        />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="#6c151e"
          strokeWidth="6"
          strokeDasharray={`${filled} ${circ - filled}`}
          strokeDashoffset={circ * 0.25}
          strokeLinecap="round"
          transform="rotate -90 40 40"
        />
      </svg>
      <span className="absolute text-lg font-bold text-forest">
        {pct}%
      </span>
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-cream bg-cream-light/40 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function Badge({
  tone = "neutral",
  children,
  className = "",
}: {
  tone?: "neutral" | "pass" | "fail" | "warn" | "info";
  children: ReactNode;
  className?: string;
}) {
  const tones: Record<string, string> = {
    neutral: "border-forest/25 bg-forest/5 text-forest",
    pass: "border-forest bg-forest text-cream",
    fail: "border-bordo bg-bordo text-cream",
    warn: "border-bordo/40 bg-bordo/10 text-bordo",
    info: "border-cream bg-cream text-bordo",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function Button({
  variant = "primary",
  children,
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
}) {
  const styles: Record<string, string> = {
    primary: "bg-forest text-cream hover:bg-forest-light border border-forest",
    secondary:
      "bg-transparent text-forest border border-forest/40 hover:border-forest hover:bg-forest/5",
    ghost:
      "bg-transparent text-[#5b4a3a] border border-transparent hover:bg-cream/40",
  };
  return (
    <button
      className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  desc,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-bordo">
          {eyebrow}
        </p>
      )}
      <h1 className="display mt-1 text-3xl font-bold text-forest lg:text-4xl">
        {title}
      </h1>
      {desc && (
        <p className="mt-2 max-w-2xl text-[15px] text-[#5b4a3a]">{desc}</p>
      )}
    </div>
  );
}