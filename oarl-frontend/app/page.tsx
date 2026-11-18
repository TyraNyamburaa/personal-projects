"use client";

import { useState } from "react";

const RUN_ITEMS = [
  {
    category: "translation",
    icon: "calendar_month",
    iconWrap: "bg-bordo/10 text-bordo border-bordo/20",
    title: "Date & Time in Swahili",
    id: "TEST #201",
    desc: "Checks that dates, times, and numbers remain accurate during translation.",
    metric: "96.8% Accurate",
    sub: "30 of 30 items",
  },
  {
    category: "safety",
    icon: "health_and_safety",
    iconWrap: "bg-deep-green/10 text-deep-green border-deep-green/20",
    title: "Medical Advice Filter",
    id: "TEST #202",
    desc: "Ensures the model blocks dangerous self-medication while allowing safe general info.",
    metric: "99.4% Accurate",
    sub: "0 Violations",
  },
  {
    category: "facts",
    icon: "help_outline",
    iconWrap: "bg-bordo/10 text-bordo border-bordo/20",
    title: "Unknown Question Refusal",
    id: "TEST #203",
    desc: "Confirms the model admits when an answer is not in its documents instead of guessing.",
    metric: "100% Safe",
    sub: "0 Guesses Made",
  },
];

const FILTERS = [
  { key: "all", label: "All Tests" },
  { key: "translation", label: "Translations" },
  { key: "safety", label: "Safety Rules" },
  { key: "facts", label: "Fact Checks" },
];

export default function OverviewPage() {
  const [filter, setFilter] = useState("all");
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [runLabel, setRunLabel] = useState<"idle" | "running" | "done">("idle");
  const [offlineCheck, setOfflineCheck] = useState(false);

  const visible = RUN_ITEMS.filter((r) => filter === "all" || r.category === filter);

  const runQuickTest = () => {
    if (runLabel === "running") return;
    setRunLabel("running");
    setTimeout(() => {
      setRunLabel("done");
      setTimeout(() => setRunLabel("idle"), 1800);
    }, 1100);
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="w-full bg-cream-surface rounded-2xl border border-border-subtle shadow-sm p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-deep-green/10 text-deep-green flex items-center justify-center shrink-0 border border-deep-green/20">
            <span className="material-symbols-outlined text-2xl">shield</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg font-bold text-charcoal">Model Health: Llama 3 (8B)</h1>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#E9F3F1] text-deep-green border border-[#BCD9D5]">Running Locally on your device</span>
            </div>
            <p className="text-xs text-charcoal-muted mt-0.5">100% Private · Zero cloud data leaks · Safe on-device processing</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-cream-light border border-border-subtle px-3 py-2 rounded-xl">
            <span className="material-symbols-outlined text-deep-green text-sm">speed</span>
            <span className="text-xs font-semibold text-charcoal">Speed: 38 words/sec</span>
          </div>
          <button className="bg-bordo hover:bg-bordo-dark text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-2 cursor-pointer active:scale-95" onClick={runQuickTest} type="button" disabled={runLabel === "running"}>
            <span className={`material-symbols-outlined text-base text-cream ${runLabel === "running" ? "animate-spin" : ""}`}>{runLabel === "running" ? "sync" : runLabel === "done" ? "check" : "play_arrow"}</span>
            <span>{runLabel === "running" ? "Testing..." : runLabel === "done" ? "Done! 100% Passed" : "Run Quick Test"}</span>
          </button>
        </div>
      </section>

      <section className="w-full bg-cream-surface rounded-2xl border border-border-subtle shadow-sm p-6 lg:p-7 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-subtle">
          <div className="flex flex-col gap-1">
            <div><span className="text-[11px] font-mono font-bold tracking-wider uppercase bg-cream text-bordo-dark px-2 py-0.5 rounded">Control Panel</span></div>
            <h2 className="text-2xl font-bold text-charcoal tracking-tight">Active Model Status &amp; Daily Health</h2>
            <p className="text-sm text-charcoal-muted">Continuous verification across language translation, question safety, and strict fact checking.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-[#E9F3F1] border border-[#BCD9D5] text-deep-green px-3 py-1.5 rounded-xl text-xs font-semibold">
              <span className="material-symbols-outlined text-base">check_circle</span><span>Passed 48 of 50 Tests</span>
            </div>
            <button className={`${offlineCheck ? "bg-deep-green text-white" : "bg-cream-light text-charcoal hover:bg-cream/70"} border border-border-subtle px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5`} onClick={() => setOfflineCheck((v) => !v)} type="button">
              <span className={`material-symbols-outlined text-base ${offlineCheck ? "text-white" : "text-bordo"}`}>wifi_off</span><span>Check Offline Lock</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 bg-cream-card rounded-xl p-5 border border-border-subtle flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-bordo text-cream flex items-center justify-center font-bold text-xs"><span className="material-symbols-outlined text-base">task_alt</span></span>
                <div className="flex flex-col"><span className="text-xs font-bold text-charcoal">Overall Test Pass Rate</span><span className="text-[11px] text-charcoal-muted">All benchmarks combined</span></div>
              </div>
              <span className="text-2xl font-extrabold text-deep-green">99.1%</span>
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full bg-[#E5DCD3] h-3.5 rounded-full overflow-hidden p-0.5">
                <div className="bg-deep-green h-full rounded-full transition-all duration-700" style={{ width: "99.1%" }} />
              </div>
              <div className="flex justify-between items-center text-xs text-charcoal-muted font-medium px-0.5">
                <span>Target: 95% pass</span><span>Strict local standard: Passed</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-cream-surface p-3 rounded-xl border border-border-subtle flex flex-col"><span className="text-[11px] text-charcoal-muted font-medium">Model Size</span><span className="text-sm font-bold text-charcoal mt-0.5">8 Billion</span><span className="text-[10px] text-deep-green font-semibold">Llama 3 Local</span></div>
              <div className="bg-cream-surface p-3 rounded-xl border border-border-subtle flex flex-col"><span className="text-[11px] text-charcoal-muted font-medium">Format</span><span className="text-sm font-bold text-bordo mt-0.5">4-Bit Fast</span><span className="text-[10px] text-charcoal-muted font-medium">Power Optimized</span></div>
              <div className="bg-cream-surface p-3 rounded-xl border border-border-subtle flex flex-col"><span className="text-[11px] text-charcoal-muted font-medium">RAM Used</span><span className="text-sm font-bold text-charcoal mt-0.5">4.9 GB</span><span className="text-[10px] text-deep-green font-semibold">Fits in Laptop</span></div>
            </div>
          </div>
          <div className="lg:col-span-6 bg-cream-card rounded-xl p-5 border border-border-subtle flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col"><span className="text-xs font-bold text-charcoal">Weekly Performance History</span><span className="text-[11px] text-charcoal-muted">Consistent reliability over the last 7 test cycles</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-deep-green"></span><span className="text-xs font-bold text-deep-green">Stable (99.1%)</span></div>
            </div>
            <div className="w-full h-32 pt-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120">
                <defs><linearGradient id="chartGrad" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#0F3D3A" stopOpacity="0.18"></stop><stop offset="100%" stopColor="#0F3D3A" stopOpacity="0"></stop></linearGradient></defs>
                <line stroke="#E8DFD5" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="400" y1="20"></line>
                <line stroke="#E8DFD5" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="400" y1="60"></line>
                <line stroke="#E8DFD5" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="400" y1="100"></line>
                <polygon fill="url(#chartGrad)" points="0,75 60,65 120,40 180,50 240,25 300,30 360,18 400,20 400,110 0,110"></polygon>
                <path d="M 0 75 Q 30 70, 60 65 T 120 40 T 180 50 T 240 25 T 300 30 T 360 18 L 400 20" fill="none" stroke="#0F3D3A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                <circle cx="60" cy="65" fill="#FAF6F0" r="4" stroke="#0F3D3A" strokeWidth="2.5"></circle>
                <circle cx="120" cy="40" fill="#FAF6F0" r="4" stroke="#0F3D3A" strokeWidth="2.5"></circle>
                <circle cx="180" cy="50" fill="#FAF6F0" r="4" stroke="#0F3D3A" strokeWidth="2.5"></circle>
                <circle cx="240" cy="25" fill="#FAF6F0" r="4" stroke="#0F3D3A" strokeWidth="2.5"></circle>
                <circle cx="300" cy="30" fill="#FAF6F0" r="4" stroke="#0F3D3A" strokeWidth="2.5"></circle>
                <circle cx="360" cy="18" fill="#FAF6F0" r="4" stroke="#0F3D3A" strokeWidth="2.5"></circle>
                <circle cx="400" cy="20" fill="#6C151E" r="5" stroke="#FAF6F0" strokeWidth="2"></circle>
              </svg>
            </div>
            <div className="flex justify-between items-center text-[11px] font-medium text-charcoal-muted px-1">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span className="text-bordo font-bold">Today</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-cream-surface rounded-2xl p-5 border border-border-subtle shadow-sm hover:border-bordo/30 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between"><span className="text-xs font-bold text-charcoal-muted uppercase tracking-wider">Tests Passed</span><span className="w-8 h-8 rounded-lg bg-deep-green/10 text-deep-green flex items-center justify-center"><span className="material-symbols-outlined text-lg">fact_check</span></span></div>
          <div className="my-4 flex items-baseline gap-2"><span className="text-3xl font-extrabold text-charcoal tracking-tight">48</span><span className="text-sm font-semibold text-deep-green">of 50 Passed</span></div>
          <div className="w-full bg-cream-light rounded-lg p-2.5 border border-border-subtle flex items-center justify-between text-xs"><span className="text-charcoal-muted">Success rate:</span><span className="font-bold text-deep-green">96.0% Total</span></div>
          <div className="flex justify-between items-center text-[11px] text-charcoal-muted mt-3 pt-2 border-t border-border-subtle"><span>All 2 failed tests flagged</span><span className="font-mono text-deep-green font-semibold">0 Crashing</span></div>
        </div>
        <div className="bg-cream-surface rounded-2xl p-5 border border-border-subtle shadow-sm hover:border-bordo/30 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between"><span className="text-xs font-bold text-charcoal-muted uppercase tracking-wider">Translation Accuracy</span><span className="w-8 h-8 rounded-lg bg-bordo/10 text-bordo flex items-center justify-center"><span className="material-symbols-outlined text-lg">translate</span></span></div>
          <div className="my-3 flex items-center justify-between">
            <div className="flex flex-col"><span className="text-3xl font-extrabold text-charcoal tracking-tight">94.2%</span><span className="text-xs text-charcoal-muted mt-0.5">English to Swahili</span></div>
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36"><path className="text-cream" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"></path><path className="text-bordo" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="94.2, 100" strokeLinecap="round" strokeWidth="4"></path></svg>
              <span className="absolute text-xs font-extrabold text-charcoal">94%</span>
            </div>
          </div>
          <div className="flex justify-between items-center text-[11px] text-charcoal-muted mt-3 pt-2 border-t border-border-subtle"><span>Target: &gt;90% accuracy</span><span className="text-deep-green font-semibold">+3.8% ahead</span></div>
        </div>
        <div className="bg-cream-surface rounded-2xl p-5 border border-border-subtle shadow-sm hover:border-bordo/30 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between"><span className="text-xs font-bold text-charcoal-muted uppercase tracking-wider">Safety Accuracy</span><span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E9F3F1] text-deep-green border border-[#BCD9D5]">HIGH SAFETY</span></div>
          <div className="my-3 flex items-baseline gap-2"><span className="text-3xl font-extrabold text-charcoal tracking-tight">91.8%</span><span className="text-xs text-charcoal-muted">Filter Score</span></div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-cream-light rounded-lg p-2 text-center border border-border-subtle"><span className="text-[10px] text-charcoal-muted block">Catches Bad Prompts</span><span className="text-xs font-bold text-deep-green">93.4%</span></div>
            <div className="bg-cream-light rounded-lg p-2 text-center border border-border-subtle"><span className="text-[10px] text-charcoal-muted block">Allows Safe Prompts</span><span className="text-xs font-bold text-deep-green">90.2%</span></div>
          </div>
          <div className="flex justify-between items-center text-[11px] text-charcoal-muted mt-3 pt-2 border-t border-border-subtle"><span>1,240 safety checks</span><span className="text-deep-green font-semibold">0 Dangerous Leaks</span></div>
        </div>
        <div className="bg-cream-surface rounded-2xl p-5 border border-border-subtle shadow-sm hover:border-bordo/30 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between"><span className="text-xs font-bold text-charcoal-muted uppercase tracking-wider">Refuses Unknowns</span><span className="w-8 h-8 rounded-lg bg-deep-green/10 text-deep-green flex items-center justify-center"><span className="material-symbols-outlined text-lg">lock</span></span></div>
          <div className="my-3 flex flex-col"><span className="text-3xl font-extrabold text-charcoal tracking-tight">100%</span><span className="text-xs font-medium text-deep-green mt-0.5">Never makes up answers</span></div>
          <div className="bg-cream-light rounded-lg p-2.5 border border-border-subtle flex items-center gap-2"><span className="material-symbols-outlined text-base text-bordo shrink-0">check_box</span><span className="text-[11px] text-charcoal leading-tight">Says &quot;I don&apos;t know&quot; when information is missing.</span></div>
          <div className="flex justify-between items-center text-[11px] text-charcoal-muted mt-3 pt-2 border-t border-border-subtle"><span>Missing data checks</span><span className="font-bold text-deep-green">Passed 100/100</span></div>
        </div>
      </section>

      <section className="w-full bg-cream-surface rounded-2xl border border-border-subtle shadow-sm p-6 lg:p-7 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2"><div className="w-6 h-6 rounded bg-bordo/10 text-bordo flex items-center justify-center"><span className="material-symbols-outlined text-base">receipt_long</span></div><h3 className="text-xl font-bold text-charcoal">Recent Tests</h3></div>
            <p className="text-xs text-charcoal-muted">Review latest evaluations and verify model accuracy.</p>
          </div>
          <div className="flex items-center flex-wrap gap-1.5 bg-cream-light p-1 rounded-xl border border-border-subtle">
            {FILTERS.map((f) => (
              <button key={f.key} className={`${filter === f.key ? "bg-bordo text-white shadow-sm" : "text-charcoal-muted hover:text-charcoal hover:bg-cream/40"} text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all`} onClick={() => setFilter(f.key)} type="button">{f.label}</button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {visible.map((item) => (
            <div key={item.id} className="bg-cream-card hover:bg-cream-light border border-border-subtle rounded-xl p-4 sm:p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className={`w-10 h-10 rounded-xl ${item.iconWrap} flex items-center justify-center shrink-0 border`}><span className="material-symbols-outlined text-xl">{item.icon}</span></div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2 flex-wrap"><h4 className="text-sm font-bold text-charcoal">{item.title}</h4><span className="text-[10px] font-mono font-semibold bg-cream text-charcoal-muted px-2 py-0.5 rounded">{item.id}</span></div>
                  <p className="text-xs text-charcoal-muted mt-0.5">{item.desc}</p>
                </div>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-border-subtle">
                <div className="flex flex-col text-left md:text-right"><span className="text-xs font-bold text-charcoal">{item.metric}</span><span className="text-[11px] text-charcoal-muted">{item.sub}</span></div>
                <div className="flex items-center gap-1.5 bg-[#E9F3F1] border border-[#BCD9D5] text-deep-green px-3 py-1 rounded-full"><span className="w-2 h-2 rounded-full bg-deep-green"></span><span className="text-xs font-bold">Passed</span></div>
                <button className="bg-white hover:bg-bordo hover:text-white border border-border-subtle text-charcoal text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all shadow-sm" onClick={() => setModalTitle(item.title)} type="button">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {modalTitle && (
        <div className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-cream-surface rounded-2xl border border-border-subtle shadow-xl max-w-lg w-full p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div className="flex items-center gap-2"><span className="material-symbols-outlined text-bordo">description</span><h4 className="text-base font-bold text-charcoal">{modalTitle} · Test Details</h4></div>
              <button className="text-charcoal-muted hover:text-charcoal p-1 rounded-lg hover:bg-cream-light" onClick={() => setModalTitle(null)} type="button"><span className="material-symbols-outlined text-lg">close</span></button>
            </div>
            <div className="bg-cream-card border border-border-subtle rounded-xl p-4 flex flex-col gap-2.5 text-xs text-charcoal">
              <div className="flex justify-between py-1 border-b border-border-subtle/60"><span className="text-charcoal-muted">Target Model:</span><span className="font-bold">Llama 3 (8B) Offline</span></div>
              <div className="flex justify-between py-1 border-b border-border-subtle/60"><span className="text-charcoal-muted">Execution Environment:</span><span className="font-semibold text-deep-green">Local Device (Air-Gapped)</span></div>
              <div className="flex justify-between py-1 border-b border-border-subtle/60"><span className="text-charcoal-muted">Test Outcome:</span><span className="font-bold text-deep-green">Passed All Verification Steps</span></div>
              <div className="flex justify-between py-1"><span className="text-charcoal-muted">Data Leak Risk:</span><span className="font-bold text-deep-green">0% (Completely Private)</span></div>
            </div>
            <div className="flex justify-end gap-2 pt-2"><button className="bg-bordo hover:bg-bordo-dark text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-sm" onClick={() => setModalTitle(null)} type="button">Close</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
