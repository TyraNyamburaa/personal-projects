"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Overview" },
  { href: "/datasets", label: "Datasets" },
  { href: "/test-library", label: "Evaluations" },
  { href: "/assistant", label: "Assistant" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className="min-h-screen flex flex-col bg-cream-bg text-charcoal">
      <header className="sticky top-0 left-0 w-full z-40 bg-cream-surface/95 backdrop-blur-md border-b border-border-subtle shadow-sm">
        <div className="max-w-7xl mx-auto h-20 px-6 lg:px-8 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <img
              src="/assets/oarl-logo.png"
              alt="OARL Logo"
              className="h-9 w-auto object-contain"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-base font-extrabold text-charcoal tracking-tight leading-tight">AI Test Lab</span>
              <span className="text-[11px] text-charcoal-muted font-medium truncate">Offline AI Reliability System</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1.5 bg-cream-light p-1.5 rounded-xl border border-border-subtle">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                  isActive(item.href)
                    ? "bg-bordo text-white font-semibold shadow-sm"
                    : "font-medium text-charcoal-muted hover:text-charcoal hover:bg-cream/40"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden sm:flex items-center gap-2 bg-[#E9F3F1] border border-[#C5DFDC] text-deep-green px-3 py-1.5 rounded-full">
              <span className="w-2.5 h-2.5 rounded-full bg-deep-green"></span>
              <span className="text-xs font-semibold">Offline Mode Active</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-cream border border-border-subtle flex items-center justify-center text-charcoal font-bold text-sm shadow-sm">AI</div>
          </div>
        </div>
        <nav className="flex md:hidden items-center gap-1 overflow-x-auto px-4 pb-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap px-3 py-1.5 text-xs rounded-lg ${
                isActive(item.href)
                  ? "bg-bordo text-white font-semibold"
                  : "text-charcoal-muted border border-border-subtle bg-cream-light"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
        {children}
      </main>

      <footer className="w-full bg-cream-surface border-t border-border-subtle py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-bordo text-cream flex items-center justify-center font-bold text-xs">
              <span className="material-symbols-outlined text-sm">shield</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-charcoal">AI Test Lab (OARL)</span>
              <span className="text-[11px] text-charcoal-muted">Reliable, private AI for your local devices</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-charcoal-muted font-medium flex-wrap justify-center">
            <span>Offline Verification</span><span>•</span><span>Zero Cloud Tracking</span><span>•</span><span>100% Safe</span>
          </div>
          <div className="text-xs text-charcoal-muted">© 2025 AI Test Lab · All tests run locally</div>
        </div>
      </footer>
    </div>
  );
}
