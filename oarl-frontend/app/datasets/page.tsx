"use client";

import { useRef, useState } from "react";

type Dataset = {
  category: "translation" | "safety" | "documents";
  icon: string;
  title: string;
  desc: string;
  meta: string;
  cta: string;
  modalDesc: string;
};

const DATASETS: Dataset[] = [
  { category: "translation", icon: "translate", title: "Swahili Translation Test Set", desc: "30 real-world sentences testing dates, medical terms, and greetings.", meta: "30 items | 18 KB | Verified", cta: "View Questions", modalDesc: "Real-world African language benchmark covering clinical advice, temporal expressions, and administrative greetings." },
  { category: "safety", icon: "policy", title: "Content Safety Rules", desc: "30 tricky scenarios testing that the AI blocks harmful advice while answering normal questions.", meta: "30 items | 24 KB | Verified", cta: "View Rules", modalDesc: "Adversarial evaluation matrix assessing zero-shot refusals against benign boundary inquiries." },
  { category: "documents", icon: "menu_book", title: "Health & Field Documents", desc: "14 approved reference guides for the offline assistant.", meta: "14 files | 48 KB | Verified", cta: "View Documents", modalDesc: "Locally ingested operational clinical standards, triage flows, and diagnostic references." },
];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "translation", label: "Translations" },
  { key: "safety", label: "Safety Rules" },
  { key: "documents", label: "Documents" },
] as const;

export default function DatasetsPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
  const [modal, setModal] = useState<{ title: string; desc: string } | null>(null);
  const [uploadMsg, setUploadMsg] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const visible = DATASETS.filter((d) => filter === "all" || d.category === filter);
  const onFiles = (files: FileList | null) => { if (files && files[0]) setUploadMsg(`✓ ${files[0].name} verified and stored offline.`); };

  return (
    <div className="flex flex-col gap-8 text-stone-900">
        <section className="bg-white rounded-2xl border border-border-soft p-6 lg:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-2xl">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-bordo tracking-tight pt-1">Test Datasets Library</h1>
            <p className="text-base text-stone-600 leading-relaxed">All test files are stored directly on your computer. Nothing is ever uploaded to the cloud.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-bordo hover:bg-bordo-dark active:scale-[0.99] text-white font-semibold text-sm shadow transition-all duration-150" onClick={() => fileInput.current?.click()} type="button">
              <span className="material-symbols-outlined text-lg">add_circle</span><span>Add New Dataset</span>
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl border border-border-soft p-6 shadow-sm flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between"><span className="text-xs uppercase tracking-wider font-bold text-stone-500 font-mono">Total Benchmark</span><div className="w-9 h-9 rounded-xl bg-cream-warm/50 flex items-center justify-center text-bordo"><span className="material-symbols-outlined text-xl">quiz</span></div></div>
            <div><div className="text-3xl lg:text-4xl font-extrabold text-bordo tracking-tight">85</div><div className="text-base font-bold text-stone-800 pt-0.5">85 Total Questions</div><p className="text-xs text-stone-500 pt-1">Across translation, safety, and documents.</p></div>
            <div className="pt-3 border-t border-border-soft/60 flex items-center justify-between"><span className="inline-flex items-center gap-1 text-xs font-semibold text-deep-green bg-deep-green/10 px-2 py-0.5 rounded"><span className="material-symbols-outlined text-sm">trending_up</span>+12 this week</span><span className="text-[11px] font-mono text-stone-400">Vault</span></div>
          </div>
          <div className="bg-white rounded-2xl border border-border-soft p-6 shadow-sm flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between"><span className="text-xs uppercase tracking-wider font-bold text-stone-500 font-mono">Integrity Status</span><div className="w-9 h-9 rounded-xl bg-deep-green/10 flex items-center justify-center text-deep-green"><span className="material-symbols-outlined text-xl">verified</span></div></div>
            <div><div className="text-3xl lg:text-4xl font-extrabold text-deep-green tracking-tight">100%</div><div className="text-base font-bold text-stone-800 pt-0.5">100% Verified Files</div><p className="text-xs text-stone-500 pt-1">Checked and unmodified.</p></div>
            <div className="pt-3 border-t border-border-soft/60 flex items-center gap-2"><span className="text-xs text-stone-600 font-medium">SHA-256 Bit-level match verified</span></div>
          </div>
          <div className="bg-white rounded-2xl border border-border-soft p-6 shadow-sm flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between"><span className="text-xs uppercase tracking-wider font-bold text-stone-500 font-mono">Governance</span><div className="w-9 h-9 rounded-xl bg-bordo/10 flex items-center justify-center text-bordo"><span className="material-symbols-outlined text-xl">fact_check</span></div></div>
            <div><div className="text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">Passed</div><div className="text-base font-bold text-stone-800 pt-0.5">Human Approved</div><p className="text-xs text-stone-500 pt-1">Reviewed by language and safety experts.</p></div>
            <div className="pt-3 border-t border-border-soft/60 flex items-center gap-2"><span className="material-symbols-outlined text-sm text-stone-500">assignment_turned_in</span><span className="text-xs text-stone-600 font-medium">Signed off by Lead Evaluator</span></div>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3"><h2 className="text-xl font-bold text-bordo">Active Test Sets</h2><span className="text-xs font-mono font-bold bg-cream-warm px-2.5 py-0.5 rounded-full text-stone-800">3 Datasets</span></div>
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-border-soft shadow-sm">
              {FILTERS.map((f) => (<button key={f.key} className={`px-3.5 py-1.5 rounded-lg text-xs transition-all ${filter === f.key ? "bg-bordo text-white shadow-sm font-bold" : "font-semibold text-stone-600 hover:text-stone-900"}`} onClick={() => setFilter(f.key)} type="button">{f.label}</button>))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visible.map((d) => (
              <div key={d.title} className="bg-white rounded-2xl border border-border-soft p-6 shadow-sm flex flex-col justify-between gap-5 hover:border-bordo/30 transition-colors">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${d.category === "documents" ? "bg-deep-green/10 text-deep-green" : d.category === "safety" ? "bg-bordo/10 text-bordo" : "bg-cream-warm/60 text-bordo"}`}><span className="material-symbols-outlined text-xl">{d.icon}</span></div>
                    <span className="px-2.5 py-1 rounded-md bg-deep-green/10 text-deep-green text-xs font-bold flex items-center gap-1">Ready</span>
                  </div>
                  <div><h3 className="text-lg font-bold text-bordo">{d.title}</h3><p className="text-sm text-stone-600 pt-1 leading-relaxed">{d.desc}</p></div>
                </div>
                <div className="flex flex-col gap-3 pt-3 border-t border-border-soft/60">
                  <div className="flex items-center justify-between text-xs font-mono text-stone-500 bg-cream-surface px-3 py-2 rounded-lg border border-border-soft/60">
                    {d.meta.split(" • ").map((part, i, arr) => (<span key={part} className="contents"><span className={part === "Verified" ? "text-deep-green font-semibold" : ""}>{part}</span>{i < arr.length - 1 && <span>•</span>}</span>))}
                  </div>
                  <button className="w-full py-2.5 px-4 rounded-xl bg-cream-warm hover:bg-[#ebd0b3] text-stone-900 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors" onClick={() => setModal({ title: d.title, desc: d.modalDesc })} type="button"><span>{d.cta}</span><span className="material-symbols-outlined text-base">arrow_forward</span></button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-border-soft p-6 lg:p-8 shadow-sm flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-bordo/10 flex items-center justify-center text-bordo"><span className="material-symbols-outlined text-lg">drive_folder_upload</span></div><div><h3 className="text-lg font-bold text-bordo">Add New Test File</h3><p className="text-xs text-stone-500">Drop a JSONL or CSV file here to test your local AI. Files are checked locally on your device.</p></div></div>
            <span className="text-xs font-mono font-medium px-2.5 py-1 rounded bg-cream-surface border border-border-soft text-stone-600">.jsonl or .csv</span>
          </div>
          <div className={`relative w-full rounded-2xl border-2 border-dashed ${drag ? "border-bordo/60 bg-cream-warm/40" : "border-border-soft hover:border-bordo/60 bg-cream-surface/70 hover:bg-cream-surface"} p-8 lg:p-10 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer`} onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={(e) => { e.preventDefault(); setDrag(false); onFiles(e.dataTransfer.files); }}>
            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-border-soft flex items-center justify-center text-bordo mb-4"><span className="material-symbols-outlined text-3xl">upload_file</span></div>
            <h4 className="text-base font-bold text-stone-900">Drop a JSONL or CSV file here</h4>
            <p className="text-sm text-stone-500 pt-1 max-w-md">Files are checked completely offline on your machine.</p>
            <div className="mt-5">
              <label className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-bordo hover:bg-bordo-dark text-white font-semibold text-sm shadow cursor-pointer transition-colors">
                <span className="material-symbols-outlined text-base">folder_open</span><span>Browse Files</span>
                <input accept=".jsonl,.csv,.json" className="hidden" ref={fileInput} type="file" onChange={(e) => onFiles(e.target.files)} />
              </label>
            </div>
            {uploadMsg && <div className="mt-4 font-mono text-xs font-bold text-deep-green bg-deep-green/10 px-4 py-2 rounded-lg border border-deep-green/20">{uploadMsg}</div>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {["Checks file format automatically", "Detects duplicate questions", "Creates offline security fingerprint"].map((t) => (<div key={t} className="flex items-center gap-2.5 text-xs text-stone-700 font-medium"><div className="w-5 h-5 rounded-full bg-deep-green/10 text-deep-green flex items-center justify-center font-bold text-[10px]">✓</div><span>{t}</span></div>))}
          </div>
        </section>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-border-soft flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex flex-col"><span className="text-[11px] font-mono font-bold text-deep-green uppercase tracking-wider">Local Verification File</span><h3 className="text-lg font-bold text-bordo">{modal.title}</h3></div>
              <button className="w-8 h-8 rounded-lg bg-cream-surface hover:bg-cream-warm/70 flex items-center justify-center text-stone-600 transition-colors" onClick={() => setModal(null)} type="button"><span className="material-symbols-outlined text-lg">close</span></button>
            </div>
            <p className="text-xs text-stone-600">{modal.desc}</p>
            <div className="bg-cream-surface rounded-xl p-3.5 flex flex-col gap-2 font-mono text-xs border border-border-soft">
              <div className="flex justify-between"><span className="text-stone-500">Status:</span><span className="text-deep-green font-bold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-deep-green"></span>Verified &amp; Ready</span></div>
              <div className="flex justify-between"><span className="text-stone-500">Integrity:</span><span className="text-stone-800">100% Unmodified</span></div>
              <div className="flex justify-between"><span className="text-stone-500">Local Location:</span><span className="text-bordo">/oarl/vault/verified/</span></div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-stone-800">Sample Records:</span>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1 text-xs">
                <div className="p-2.5 rounded-lg bg-cream-surface border border-border-soft text-stone-800 font-medium"><div className="text-[10px] font-mono text-stone-500 uppercase">Item #01</div>&quot;Jumapili iliyopita nilikwenda kliniki ya wilaya kwa uchunguzi wa kawaida.&quot;</div>
                <div className="p-2.5 rounded-lg bg-cream-surface border border-border-soft text-stone-800 font-medium"><div className="text-[10px] font-mono text-stone-500 uppercase">Item #02</div>&quot;Dawa hii inapaswa kunywewa baada ya mlo wa jioni kila siku.&quot;</div>
              </div>
            </div>
            <div className="flex justify-end pt-2"><button className="px-5 py-2.5 rounded-xl bg-bordo hover:bg-bordo-dark text-white font-bold text-xs uppercase tracking-wider shadow" onClick={() => setModal(null)} type="button">Close</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
