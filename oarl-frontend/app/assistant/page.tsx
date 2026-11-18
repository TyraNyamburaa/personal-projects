"use client";

import { useState } from "react";

export default function AssistantPage() {
  const [activeScenario, setActiveScenario] = useState(1);
  const [strictness, setStrictness] = useState(1);
  const [citationHeader, setCitationHeader] = useState("Source Excerpt: [Water Guide, Section 3.2]");
  const [citationText, setCitationText] = useState('"Add 2 drops of standard 5.25%-6.0% household sodium hypochlorite per 1 liter of clear liquid. Stir thoroughly and inspect for slight residual chlorine scent."');

  const selectScenario = (num: number) => {
    setActiveScenario(num);
    if (num === 1) {
      setCitationHeader("Source Excerpt: [Water Guide, Section 3.2]");
      setCitationText('"Add 2 drops of standard 5.25%-6.0% household sodium hypochlorite per 1 liter of clear liquid. Stir thoroughly and inspect for slight residual chlorine scent."');
    } else if (num === 2) {
      setCitationHeader("Source Excerpt: [Field Standards, Appendix C]");
      setCitationText("All temporary sleeping bivouacs must be partitioned with a continuous safety clearzone of at least 6.50 meters from combustible bulk supply storage.");
    } else {
      setCitationHeader("Source Excerpt: [Water Guide, Section 3.2]");
      setCitationText('"Add 2 drops of standard 5.25%-6.0% household sodium hypochlorite per 1 liter of clear liquid. Stir thoroughly and inspect for slight residual chlorine scent."');
    }
  };

  const showCitation = (id: string) => {
    if (id === "cite-1") {
      setCitationHeader("Source Excerpt: [Water Guide, Section 3.2]");
      setCitationText('"Add 2 drops of standard 5.25%-6.0% household sodium hypochlorite per 1 liter of clear liquid. Stir thoroughly and inspect for slight residual chlorine scent."');
    } else if (id === "cite-2") {
      setCitationHeader("Source Excerpt: [Water Guide, Section 3.4]");
      setCitationText('"If the water is cloudy, filter it through a clean cloth first, then use 4 drops per Liter."');
    } else if (id === "cite-3") {
      setCitationHeader("Source Excerpt: [Water Guide, Section 4.1]");
      setCitationText('"Mix well and let it sit covered for at least 30 minutes. It should have a slight chlorine smell."');
    }
  };

  const rigorLabel = strictness === 0 ? "Normal" : strictness === 1 ? "Strict Mode" : "Only Direct Quotes";
  const scenarioBtn = (num: number, active: string, inactive: string) =>
    `w-full text-left rounded-xl p-4 transition-all duration-200 flex flex-col gap-1.5 shadow-xs cursor-pointer ${activeScenario === num ? active : inactive}`;

  return (
    <div className="flex flex-col gap-6 text-text-main">
            <div className="w-full bg-white rounded-xl p-5 border border-cream-border shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-deep-green-subtle border border-deep-green/20 flex items-center justify-center text-deep-green"><span className="material-symbols-outlined text-2xl font-bold">verified_user</span></div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2.5"><h1 className="text-lg font-bold text-text-main">Document Assistant</h1><span className="text-[11px] font-bold bg-deep-green text-white px-2.5 py-0.5 rounded-full tracking-wide">100% PRIVATE</span></div>
                  <p className="text-sm text-text-muted mt-0.5">Search and ask questions from your local approved files. Completely private.</p>
                </div>
              </div>
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex flex-col text-right"><span className="text-[11px] uppercase tracking-wider font-semibold text-text-muted">Local Storage</span><span className="text-sm font-bold text-text-main">14 Documents loaded</span></div>
                <div className="h-8 w-px bg-cream-border hidden sm:block"></div>
                <div className="flex flex-col text-right"><span className="text-[11px] uppercase tracking-wider font-semibold text-text-muted">Response Time</span><span className="text-sm font-bold text-deep-green">Search Speed: Instant (24ms)</span></div>
                <div className="h-8 w-px bg-cream-border hidden sm:block"></div>
                <div className="flex items-center gap-2 bg-deep-green-subtle text-deep-green px-3 py-1.5 rounded-lg border border-deep-green/20"><span className="material-symbols-outlined text-lg">check_circle</span><span className="text-xs font-bold">Accuracy: 100% grounded in text</span></div>
              </div>
            </div>

            <div className="w-full bg-white rounded-xl p-6 border border-cream-border shadow-sm flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5 flex-1 min-w-0">
                <div className="relative shrink-0 w-20 h-20 rounded-2xl bg-cream-muted border-2 border-cream-border flex items-center justify-center">
                  <div className="w-14 h-14 rounded-xl bg-white border border-cream-border shadow-xs flex flex-col items-center justify-center text-bordo gap-1"><span className="material-symbols-outlined text-2xl">description</span><span className="text-[9px] font-mono font-bold tracking-tight bg-bordo-subtle text-bordo px-1 rounded">LOCAL</span></div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-deep-green text-white flex items-center justify-center shadow"><span className="material-symbols-outlined text-sm font-bold">lock</span></div>
                </div>
                <div className="flex flex-col gap-1.5 min-w-0">
                  <div className="flex items-center gap-2"><h2 className="text-xl font-bold text-text-main">Direct-to-Document Question Answering</h2></div>
                  <p className="text-sm text-text-muted max-w-2xl leading-relaxed">The assistant answers questions using only your approved offline documents. When information is missing, it admits it does not know rather than making up answers.</p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-xs font-semibold bg-cream-muted text-text-main px-3 py-1 rounded-full border border-cream-border flex items-center gap-1.5">Private Local Search</span>
                    <span className="text-xs font-semibold bg-cream-muted text-text-main px-3 py-1 rounded-full border border-cream-border flex items-center gap-1.5">Zero Guesswork</span>
                    <span className="text-xs font-semibold bg-cream-muted text-text-main px-3 py-1 rounded-full border border-cream-border">Exact Source Sentences</span>
                    <span className="text-xs font-bold bg-cream-tint/50 text-bordo px-3 py-1 rounded-full border border-cream-tint">No Cloud Needed</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 shrink-0 w-full lg:w-auto">
                <div className="bg-cream-surface rounded-xl p-3.5 border border-cream-border flex flex-col justify-center min-w-[150px]"><span className="text-[11px] uppercase tracking-wider font-semibold text-text-muted">Direct Citations</span><span className="text-lg font-bold text-deep-green mt-0.5">100% Verifiable</span><span className="text-xs text-text-muted">Section matched</span></div>
                <div className="bg-cream-surface rounded-xl p-3.5 border border-cream-border flex flex-col justify-center min-w-[150px]"><span className="text-[11px] uppercase tracking-wider font-semibold text-text-muted">Index Search</span><span className="text-lg font-bold text-bordo mt-0.5">24 ms</span><span className="text-xs text-text-muted">Offline memory</span></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="bg-white rounded-xl p-5 border border-cream-border shadow-sm flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-cream-border pb-3">
                    <div className="flex items-center gap-2"><span className="material-symbols-outlined text-bordo text-xl">help_outline</span><h3 className="font-bold text-base text-text-main">Sample Questions</h3></div>
                    <span className="text-[11px] font-bold bg-cream-muted text-text-muted px-2 py-0.5 rounded uppercase tracking-wider">Click to Test</span>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed">Pick a question to test how the assistant quotes approved files or safely declines when facts are missing.</p>
                  <div className="flex flex-col gap-3">
                    <button className={scenarioBtn(1, "bg-cream-surface border-2 border-bordo", "bg-white hover:bg-cream-surface border border-cream-border")} onClick={() => selectScenario(1)} type="button">
                      <div className="flex items-center justify-between"><span className="text-[10px] font-bold bg-bordo text-white px-2 py-0.5 rounded tracking-wide uppercase">Found in Water Guide</span><span className="text-xs font-bold text-deep-green flex items-center gap-1"><span className="material-symbols-outlined text-sm font-bold">check</span> In Files</span></div>
                      <div className="font-bold text-sm text-text-main">&quot;How much bleach is needed to purify drinking water?&quot;</div>
                      <div className="flex items-center gap-1.5 text-xs text-deep-green font-semibold pt-1"><span className="material-symbols-outlined text-base">verified</span><span>Exact recipe in Water Purification Guide §3</span></div>
                    </button>
                    <button className={scenarioBtn(2, "bg-cream-surface border-2 border-bordo", "bg-white hover:bg-cream-surface border border-cream-border")} onClick={() => selectScenario(2)} type="button">
                      <div className="flex items-center justify-between"><span className="text-[10px] font-bold bg-cream-muted text-text-main px-2 py-0.5 rounded tracking-wide uppercase">Found in Shelter Standards</span><span className="text-xs font-bold text-deep-green flex items-center gap-1"><span className="material-symbols-outlined text-sm font-bold">check</span> In Files</span></div>
                      <div className="font-bold text-sm text-text-main">&quot;What is the tent spacing for field shelters?&quot;</div>
                      <div className="flex items-center gap-1.5 text-xs text-text-muted pt-1"><span className="material-symbols-outlined text-base text-text-muted">folder</span><span>Found in Field Shelter Logistics Guide §App. C</span></div>
                    </button>
                    <button className={scenarioBtn(3, "bg-bordo-subtle/40 border-2 border-bordo", "bg-white hover:bg-cream-surface border border-cream-border")} onClick={() => selectScenario(3)} type="button">
                      <div className="flex items-center justify-between"><span className="text-[10px] font-bold bg-bordo-subtle text-bordo px-2 py-0.5 rounded tracking-wide uppercase">Declined: Safe Refusal</span><span className="text-xs font-bold text-bordo flex items-center gap-1"><span className="material-symbols-outlined text-sm font-bold">block</span> Not in Docs</span></div>
                      <div className="font-bold text-sm text-text-main">&quot;What is the antibiotic dose for a child?&quot;</div>
                      <div className="flex items-center gap-1.5 text-xs text-bordo font-medium pt-1"><span className="material-symbols-outlined text-base text-bordo">shield</span><span>Declined: Not in your documents, safe refusal</span></div>
                    </button>
                  </div>
                  <div className="bg-cream-surface rounded-xl p-4 border border-cream-border flex flex-col gap-2.5 mt-1">
                    <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="material-symbols-outlined text-deep-green text-lg">tune</span><span className="text-xs font-bold text-text-main uppercase tracking-wider">Strictness Control</span></div><span className="text-xs font-bold font-mono bg-deep-green text-white px-2 py-0.5 rounded">{rigorLabel}</span></div>
                    <input className="w-full accent-bordo cursor-pointer h-2 bg-cream-border rounded-lg appearance-none" max={2} min={0} onChange={(e) => setStrictness(Number(e.target.value))} step={1} type="range" value={strictness} />
                    <div className="flex justify-between text-[11px] font-medium text-text-muted"><span>Normal</span><span className="text-deep-green font-bold">Strict (Recommended)</span><span>Strict (Only direct quotes)</span></div>
                  </div>
                  <button className="w-full bg-bordo hover:bg-bordo-dark text-white py-3.5 px-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] cursor-pointer" type="button"><span className="material-symbols-outlined text-xl">send</span><span>Ask Assistant</span></button>
                </div>

                <div className="bg-white rounded-xl p-5 border border-cream-border shadow-sm flex flex-col gap-3">
                  <div className="flex items-center justify-between border-b border-cream-border pb-3">
                    <div className="flex items-center gap-2"><span className="material-symbols-outlined text-text-muted text-lg">folder_shared</span><h4 className="font-bold text-sm text-text-main">Approved Offline Documents</h4></div>
                    <span className="text-[11px] text-deep-green font-bold flex items-center gap-1"><span className="material-symbols-outlined text-sm font-bold">check_circle</span>14 Verified</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="p-2.5 bg-cream-surface rounded-lg border border-cream-border flex items-center justify-between text-xs"><div className="flex items-center gap-2 font-medium text-text-main"><span className="material-symbols-outlined text-bordo text-base">description</span><span>Water_Purification_Guide.md</span></div><span className="font-mono text-text-muted bg-white px-2 py-0.5 rounded border border-cream-border">32 KB</span></div>
                    <div className="p-2.5 bg-cream-surface rounded-lg border border-cream-border flex items-center justify-between text-xs"><div className="flex items-center gap-2 font-medium text-text-main"><span className="material-symbols-outlined text-deep-green text-base">description</span><span>Field_Shelter_Standards.pdf</span></div><span className="font-mono text-text-muted bg-white px-2 py-0.5 rounded border border-cream-border">412 KB</span></div>
                    <div className="p-2.5 bg-cream-surface rounded-lg border border-cream-border flex items-center justify-between text-xs"><div className="flex items-center gap-2 font-medium text-text-main"><span className="material-symbols-outlined text-text-muted text-base">description</span><span>Emergency_Food_Storage.md</span></div><span className="font-mono text-text-muted bg-white px-2 py-0.5 rounded border border-cream-border">94 KB</span></div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="bg-white rounded-xl p-6 border border-cream-border shadow-sm flex flex-col gap-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cream-border pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-bordo-subtle text-bordo flex items-center justify-center"><span className="material-symbols-outlined text-2xl font-bold">chat_bubble</span></div>
                      <div><h3 className="font-bold text-lg text-text-main">{activeScenario === 3 ? "Question Safely Declined" : "Assistant Answer"}</h3><p className="text-xs text-text-muted">{activeScenario === 3 ? "Refusal Triggered: Safe Abstention Enforced" : "Grounded directly in your approved offline files"}</p></div>
                    </div>
                    <div className="flex items-center gap-2"><span className="text-xs bg-deep-green text-white px-3 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-xs"><span className="material-symbols-outlined text-sm font-bold">verified</span>100% VERIFIED</span><span className="text-xs bg-cream-surface text-text-muted px-2.5 py-1 rounded-md font-mono border border-cream-border">24ms latency</span></div>
                  </div>

                  {activeScenario === 1 && (
                    <div className="flex flex-col gap-4">
                      <div className="bg-cream-surface rounded-xl p-4 border border-cream-border flex flex-col gap-1.5">
                        <div className="flex items-center justify-between"><span className="text-[11px] font-bold uppercase tracking-wider text-bordo bg-bordo-subtle px-2.5 py-0.5 rounded">Exact Steps From Your Document</span><span className="text-xs text-text-muted">Water Purification Guide · Section 3</span></div>
                        <p className="text-base font-semibold text-text-main mt-1">To safely purify clear drinking water in an emergency using standard unscented household bleach (5.25% - 6.0% sodium hypochlorite):</p>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start gap-3.5 p-4 bg-cream-surface rounded-xl border border-cream-border"><div className="w-7 h-7 rounded-lg bg-bordo text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">1</div><div className="flex flex-col gap-1.5 w-full"><p className="text-sm font-medium text-text-main leading-relaxed">Add <strong>2 drops</strong> of bleach per <strong>1 Liter</strong> of clear water (or 8 drops per gallon). <button className="inline-flex items-center gap-1 text-xs bg-deep-green-subtle text-deep-green border border-deep-green/30 hover:bg-deep-green hover:text-white px-2.5 py-0.5 rounded-full ml-1 font-bold transition-all cursor-pointer" onClick={() => showCitation("cite-1")} type="button"><span className="material-symbols-outlined text-xs">menu_book</span>[Water Guide, Section 3.2]</button></p><div className="text-[11px] text-deep-green font-mono font-semibold flex items-center gap-1"><span className="material-symbols-outlined text-xs">check</span> Direct word-for-word text match</div></div></div>
                        <div className="flex items-start gap-3.5 p-4 bg-cream-surface rounded-xl border border-cream-border"><div className="w-7 h-7 rounded-lg bg-bordo text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">2</div><div className="flex flex-col gap-1.5 w-full"><p className="text-sm font-medium text-text-main leading-relaxed">If water is cloudy or murky, filter it through a clean cloth first, then double the dose to <strong>4 drops per Liter</strong>. <button className="inline-flex items-center gap-1 text-xs bg-deep-green-subtle text-deep-green border border-deep-green/30 hover:bg-deep-green hover:text-white px-2.5 py-0.5 rounded-full ml-1 font-bold transition-all cursor-pointer" onClick={() => showCitation("cite-2")} type="button"><span className="material-symbols-outlined text-xs">menu_book</span>[Water Guide, Section 3.4]</button></p><div className="text-[11px] text-deep-green font-mono font-semibold flex items-center gap-1"><span className="material-symbols-outlined text-xs">check</span> Exact specification verified</div></div></div>
                        <div className="flex items-start gap-3.5 p-4 bg-cream-surface rounded-xl border border-cream-border"><div className="w-7 h-7 rounded-lg bg-bordo text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">3</div><div className="flex flex-col gap-1.5 w-full"><p className="text-sm font-medium text-text-main leading-relaxed">Stir thoroughly and let the water stand covered for at least <strong>30 minutes</strong>. It should have a faint chlorine scent. <button className="inline-flex items-center gap-1 text-xs bg-deep-green-subtle text-deep-green border border-deep-green/30 hover:bg-deep-green hover:text-white px-2.5 py-0.5 rounded-full ml-1 font-bold transition-all cursor-pointer" onClick={() => showCitation("cite-3")} type="button"><span className="material-symbols-outlined text-xs">menu_book</span>[Water Guide, Section 4.1]</button></p><div className="text-[11px] text-deep-green font-mono font-semibold flex items-center gap-1"><span className="material-symbols-outlined text-xs">check</span> Safety dwell time confirmed</div></div></div>
                      </div>
                    </div>
                  )}
                  {activeScenario === 2 && (
                    <div className="flex flex-col gap-4">
                      <div className="bg-cream-surface rounded-xl p-4 border border-cream-border flex flex-col gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-bordo bg-bordo-subtle px-2.5 py-0.5 rounded w-fit">Field Shelter Standard §App. C</span>
                        <p className="text-base font-semibold text-text-main leading-relaxed">Emergency sleeping tents must have a clear separation distance of at least <strong>6.50 meters</strong> from any bulk supply storage or combustible materials.</p>
                        <div className="pt-2"><button className="inline-flex items-center gap-1.5 text-xs bg-deep-green-subtle text-deep-green border border-deep-green/30 px-3 py-1 rounded-full font-bold" type="button"><span className="material-symbols-outlined text-sm">menu_book</span>[Field Standards, Appendix C · Logistics Zone Regulations]</button></div>
                      </div>
                    </div>
                  )}
                  {activeScenario === 3 && (
                    <div className="flex flex-col gap-4">
                      <div className="bg-bordo-subtle/80 border border-bordo/30 rounded-xl p-5 flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-bordo"><span className="material-symbols-outlined text-2xl font-bold">shield_with_heart</span><h4 className="font-bold text-base">Question Safely Declined</h4></div>
                        <p className="text-sm text-text-main leading-relaxed">I cannot answer this question because your offline documents do not contain medical dosage guides. To prevent dangerous mistakes, the assistant never guesses medical information.</p>
                        <div className="p-3 bg-white rounded-lg border border-bordo/20 font-mono text-xs text-bordo flex items-center justify-between"><span>STATUS: DECLINED (MISSING_LOCAL_SOURCE)</span><span className="font-bold">Confidence: 0.00 (Unverified)</span></div>
                      </div>
                    </div>
                  )}
                  {activeScenario !== 3 && (
                    <div className="bg-cream-tint/30 border border-cream-tint rounded-xl p-4 flex flex-col gap-2">
                      <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="material-symbols-outlined text-deep-green text-base font-bold">format_quote</span><span className="text-xs font-bold text-text-main uppercase tracking-wide">{citationHeader}</span></div><span className="text-[10px] font-bold bg-deep-green text-white px-2 py-0.5 rounded font-mono">VERIFIED EXCERPT</span></div>
                      <blockquote className="text-xs text-text-main italic pl-3 border-l-2 border-bordo bg-white/80 p-2.5 rounded"><span>{citationText}</span></blockquote>
                    </div>
                  )}
                </div>

                <div className="w-full bg-white rounded-xl p-5 border border-cream-border shadow-sm flex flex-col gap-3">
                  <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="material-symbols-outlined text-deep-green text-xl font-bold">verified</span><h4 className="font-bold text-sm text-text-main">Fact Check: 100% matched to your files (No guessing or making up answers)</h4></div><span className="text-xs font-bold text-deep-green bg-deep-green-subtle px-2.5 py-0.5 rounded-full border border-deep-green/20">Checked &amp; Safe</span></div>
                  <p className="text-xs text-text-muted leading-relaxed">Every single response is cross-checked against your offline index. If an answer cannot be proven with a direct citation, it will not be displayed.</p>
                  <div className="w-full bg-cream-surface rounded-xl p-3.5 border border-cream-border flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs"><span className="font-bold text-text-main">Direct Text Alignment</span><span className="text-deep-green font-bold font-mono">100% Grounded</span></div>
                    <div className="w-full h-2.5 bg-cream-border rounded-full overflow-hidden flex"><div className="h-full bg-deep-green w-full rounded-full"></div></div>
                    <div className="flex items-center justify-between text-[11px] text-text-muted pt-0.5"><span className="flex items-center gap-1 font-medium">Zero speculation</span><span>Answers match source documents word-for-word</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="bg-white rounded-xl p-5 border border-cream-border shadow-sm flex items-start gap-4"><div className="w-11 h-11 rounded-xl bg-deep-green-subtle text-deep-green flex items-center justify-center shrink-0 border border-deep-green/20"><span className="material-symbols-outlined text-2xl font-bold">lock</span></div><div className="flex flex-col gap-1"><h5 className="text-sm font-bold text-text-main">Private: Stays on your machine</h5><p className="text-xs text-text-muted leading-relaxed">Zero network requests. Your documents and queries never leave this hardware.</p></div></div>
              <div className="bg-white rounded-xl p-5 border border-cream-border shadow-sm flex items-start gap-4"><div className="w-11 h-11 rounded-xl bg-bordo-subtle text-bordo flex items-center justify-center shrink-0 border border-bordo/20"><span className="material-symbols-outlined text-2xl font-bold">check</span></div><div className="flex flex-col gap-1"><h5 className="text-sm font-bold text-text-main">Strict: Answers only what&apos;s written</h5><p className="text-xs text-text-muted leading-relaxed">If a detail is missing from your files, the assistant safely says &quot;I do not know&quot;.</p></div></div>
              <div className="bg-white rounded-xl p-5 border border-cream-border shadow-sm flex items-start gap-4"><div className="w-11 h-11 rounded-xl bg-cream-tint/50 text-bordo flex items-center justify-center shrink-0 border border-cream-tint"><span className="material-symbols-outlined text-2xl font-bold">bolt</span></div><div className="flex flex-col gap-1"><h5 className="text-sm font-bold text-text-main">Fast: Runs on your device</h5><p className="text-xs text-text-muted leading-relaxed">Instant local vector indexing delivers cited answers in under 25 milliseconds.</p></div></div>
            </div>
    </div>
  );
}
