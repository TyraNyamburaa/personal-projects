export default function ReportPage() {
  return (
    <div className="flex flex-col gap-8 text-text-dark">
        <div className="flex items-center justify-between border-b border-surface-border pb-3 text-xs text-text-muted">
          <div className="flex items-center gap-2 font-medium">
            <span className="text-deepgreen font-bold flex items-center gap-1"><span className="material-symbols-outlined text-sm">verified</span> Evaluations</span>
            <span className="opacity-40">/</span><span>Run Comparison #089A</span>
            <span className="bg-cream text-bordo px-2 py-0.5 rounded font-mono font-bold text-[11px]">Completed just now</span>
          </div>
          <div className="flex items-center gap-1.5 text-deepgreen font-medium"><span className="material-symbols-outlined text-sm">cloud_off</span><span>Zero internet egress | Safe local run</span></div>
        </div>

        <div className="bg-white rounded-2xl border border-surface-border p-7 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-3xl">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-2.5 py-1 rounded bg-cream text-bordo-dark font-mono text-xs font-bold tracking-wide">RUN #089A</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-text-dark tracking-tight">Swahili Translation Comparison</h1>
              <span className="text-xs font-semibold bg-cream-subtle text-text-muted px-2.5 py-1 rounded-full border border-surface-border">30 Test Cases</span>
            </div>
            <p className="text-sm sm:text-base text-text-muted">Comparing how accurately our local offline AI performs against the older rule-based system across daily, medical, and legal sentences.</p>
            <div className="flex items-center gap-2 pt-2 flex-wrap text-xs">
              <div className="flex items-center gap-2 bg-cream-light border border-surface-border px-3 py-1.5 rounded-lg text-text-muted"><span className="material-symbols-outlined text-sm text-text-muted">history</span><span>Baseline: <strong className="text-text-dark">Older Rule-based System</strong></span></div>
              <span className="font-extrabold text-bordo uppercase px-1">VS</span>
              <div className="flex items-center gap-2 bg-deepgreen text-white px-3 py-1.5 rounded-lg font-medium shadow-sm"><span className="material-symbols-outlined text-sm text-cream">psychology</span><span>New Local AI: <strong className="text-cream">Llama 3 (8B On-Device)</strong></span></div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-surface-border bg-cream-light hover:bg-cream text-text-dark text-sm font-semibold transition-all shadow-sm" type="button"><span className="material-symbols-outlined text-base">download</span><span>Export Results (CSV)</span></button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-bordo hover:bg-bordo-dark text-white text-sm font-bold transition-all shadow-sm hover:shadow" type="button"><span className="material-symbols-outlined text-base">refresh</span><span>Rerun Test</span></button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-sm flex flex-col justify-between hover:border-bordo/30 transition-colors">
            <div className="flex items-center justify-between"><span className="text-xs uppercase tracking-wider font-semibold text-text-muted">Language Quality</span><div className="w-8 h-8 rounded-lg bg-deepgreen-light text-deepgreen flex items-center justify-center"><span className="material-symbols-outlined text-lg">translate</span></div></div>
            <div className="my-4"><div className="text-3xl sm:text-4xl font-extrabold text-text-dark">94.2%</div><div className="text-xs text-text-muted mt-1">Meaning Preserved (vs 87.5% older)</div></div>
            <div className="bg-deepgreen-light text-deepgreen text-xs font-semibold px-2.5 py-1.5 rounded-lg flex items-center justify-between"><span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">trending_up</span> +6.7% vs old system</span><span className="text-deepgreen-muted font-mono font-bold">28 of 30</span></div>
          </div>
          <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-sm flex flex-col justify-between hover:border-bordo/30 transition-colors">
            <div className="flex items-center justify-between"><span className="text-xs uppercase tracking-wider font-semibold text-text-muted">Critical Accuracy</span><div className="w-8 h-8 rounded-lg bg-deepgreen-light text-deepgreen flex items-center justify-center"><span className="material-symbols-outlined text-lg">event_available</span></div></div>
            <div className="my-4"><div className="text-3xl sm:text-4xl font-extrabold text-text-dark">96.7%</div><div className="text-xs text-text-muted mt-1">Dates &amp; Numbers Correct</div></div>
            <div className="bg-deepgreen-light text-deepgreen text-xs font-semibold px-2.5 py-1.5 rounded-lg flex items-center justify-between"><span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">check_circle</span> 29 of 30 exact</span><span className="text-deepgreen-muted font-mono font-bold">Was 83.3%</span></div>
          </div>
          <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-sm flex flex-col justify-between hover:border-bordo/30 transition-colors">
            <div className="flex items-center justify-between"><span className="text-xs uppercase tracking-wider font-semibold text-text-muted">Speed</span><div className="w-8 h-8 rounded-lg bg-cream text-bordo flex items-center justify-center"><span className="material-symbols-outlined text-lg">speed</span></div></div>
            <div className="my-4"><div className="text-3xl sm:text-4xl font-extrabold text-text-dark flex items-baseline gap-1">410 <span className="text-lg font-medium text-text-muted font-mono">ms</span></div><div className="text-xs text-text-muted mt-1">Average per sentence</div></div>
            <div className="bg-cream-light border border-surface-border text-text-dark text-xs font-semibold px-2.5 py-1.5 rounded-lg flex items-center justify-between"><span>Under 500ms target</span><span className="text-deepgreen font-mono font-bold">Fast response</span></div>
          </div>
          <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-sm flex flex-col justify-between hover:border-bordo/30 transition-colors">
            <div className="flex items-center justify-between"><span className="text-xs uppercase tracking-wider font-semibold text-text-muted">Cloud Cost</span><div className="w-8 h-8 rounded-lg bg-deepgreen-light text-deepgreen flex items-center justify-center"><span className="material-symbols-outlined text-lg">lock</span></div></div>
            <div className="my-4"><div className="text-3xl sm:text-4xl font-extrabold text-text-dark">$0.00</div><div className="text-xs text-text-muted mt-1">Zero internet used</div></div>
            <div className="bg-deepgreen-light text-deepgreen text-xs font-semibold px-2.5 py-1.5 rounded-lg flex items-center justify-between"><span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">cloud_off</span> 100% Offline</span><span className="text-deepgreen-muted font-mono font-bold">$0 API fees</span></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-surface-border p-7 shadow-sm flex flex-col justify-between gap-6">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div><span className="text-xs uppercase font-bold tracking-wider text-text-muted">Benchmark Breakdown</span><h2 className="text-xl font-bold text-text-dark mt-0.5">Accuracy Across Categories</h2></div>
                <div className="flex items-center gap-4 text-xs font-semibold"><div className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded bg-deepgreen"></span><span>New Local AI</span></div><div className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded bg-bordo"></span><span>Old Rule-based</span></div></div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5"><div className="flex justify-between text-xs font-medium"><span className="text-text-dark font-semibold">1. Dates &amp; Calendar Events (10 tests)</span><div className="flex gap-3 font-mono"><span className="text-deepgreen font-bold">100%</span><span className="text-text-muted">vs</span><span className="text-bordo font-bold">70%</span></div></div><div className="space-y-1"><div className="w-full bg-cream-subtle h-2.5 rounded-full overflow-hidden flex"><div className="bg-deepgreen h-full rounded-full transition-all" style={{width:"100%"}}></div></div><div className="w-full bg-cream-subtle h-2 rounded-full overflow-hidden flex"><div className="bg-bordo h-full rounded-full transition-all" style={{width:"70%"}}></div></div></div></div>
                <div className="flex flex-col gap-1.5"><div className="flex justify-between text-xs font-medium"><span className="text-text-dark font-semibold">2. Medical &amp; Prescription Instructions (8 tests)</span><div className="flex gap-3 font-mono"><span className="text-deepgreen font-bold">100%</span><span className="text-text-muted">vs</span><span className="text-bordo font-bold">87.5%</span></div></div><div className="space-y-1"><div className="w-full bg-cream-subtle h-2.5 rounded-full overflow-hidden flex"><div className="bg-deepgreen h-full rounded-full transition-all" style={{width:"100%"}}></div></div><div className="w-full bg-cream-subtle h-2 rounded-full overflow-hidden flex"><div className="bg-bordo h-full rounded-full transition-all" style={{width:"87.5%"}}></div></div></div></div>
                <div className="flex flex-col gap-1.5"><div className="flex justify-between text-xs font-medium"><span className="text-text-dark font-semibold">3. Greetings &amp; Polite Tone (7 tests)</span><div className="flex gap-3 font-mono"><span className="text-deepgreen font-bold">85.7%</span><span className="text-text-muted">vs</span><span className="text-bordo font-bold">100%</span></div></div><div className="space-y-1"><div className="w-full bg-cream-subtle h-2.5 rounded-full overflow-hidden flex"><div className="bg-deepgreen h-full rounded-full transition-all" style={{width:"85.7%"}}></div></div><div className="w-full bg-cream-subtle h-2 rounded-full overflow-hidden flex"><div className="bg-bordo h-full rounded-full transition-all" style={{width:"100%"}}></div></div></div></div>
                <div className="flex flex-col gap-1.5"><div className="flex justify-between text-xs font-medium"><span className="text-text-dark font-semibold">4. Legal &amp; Formal Agreements (5 tests)</span><div className="flex gap-3 font-mono"><span className="text-deepgreen font-bold">100%</span><span className="text-text-muted">vs</span><span className="text-bordo font-bold">60%</span></div></div><div className="space-y-1"><div className="w-full bg-cream-subtle h-2.5 rounded-full overflow-hidden flex"><div className="bg-deepgreen h-full rounded-full transition-all" style={{width:"100%"}}></div></div><div className="w-full bg-cream-subtle h-2 rounded-full overflow-hidden flex"><div className="bg-bordo h-full rounded-full transition-all" style={{width:"60%"}}></div></div></div></div>
              </div>
            </div>
            <div className="bg-cream-light border border-surface-border rounded-xl p-3.5 text-xs text-text-dark flex items-start gap-2.5"><span className="material-symbols-outlined text-deepgreen text-base shrink-0 mt-0.5">tips_and_updates</span><span><strong>Key Takeaway:</strong> The new Local AI eliminates critical date errors and contractual omissions while running completely isolated on your premise.</span></div>
          </div>

          <div className="lg:col-span-1 bg-white rounded-2xl border border-surface-border p-7 shadow-sm flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div><span className="text-xs uppercase font-bold tracking-wider text-text-muted">Privacy &amp; Security</span><h3 className="text-xl font-bold text-text-dark mt-0.5">Why Offline Matters</h3></div>
              <div className="bg-cream-light border border-surface-border rounded-xl p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-deepgreen font-bold text-sm"><span className="material-symbols-outlined text-lg">shield</span><span>Physical Air-Gap Security</span></div>
                <p className="text-xs text-text-muted leading-relaxed">All 30 test sentences were evaluated on an on-premise workstation with no cloud connection. No confidential patient files or diplomatic schedules ever leave your room.</p>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-surface-border"><span className="text-text-muted font-medium">Node Hardware</span><span className="font-mono font-bold text-text-dark">NVIDIA RTX 4090</span></div>
                <div className="flex justify-between py-1.5 border-b border-surface-border"><span className="text-text-muted font-medium">External Requests</span><span className="font-mono font-bold text-deepgreen">0 Requests (Blocked)</span></div>
                <div className="flex justify-between py-1.5 border-b border-surface-border"><span className="text-text-muted font-medium">Model Footprint</span><span className="font-mono font-bold text-text-dark">Llama 3 | 8B 4-bit</span></div>
                <div className="flex justify-between py-1.5"><span className="text-text-muted font-medium">Pass Rate</span><span className="font-mono font-bold text-deepgreen">29 / 30 (96.7%)</span></div>
              </div>
            </div>
            <div className="bg-deepgreen text-cream rounded-xl p-3.5 text-xs flex items-center justify-between font-mono font-medium"><span>STATUS: READY FOR PRODUCTION</span><span className="material-symbols-outlined text-sm">verified</span></div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div><h2 className="text-2xl font-extrabold text-text-dark tracking-tight">Side-by-Side Test Case Inspection</h2><p className="text-sm text-text-muted">Review exact sentence outputs to verify where and why the answers differ.</p></div>
            <div className="flex items-center gap-1.5 bg-cream-subtle p-1 rounded-xl border border-surface-border overflow-x-auto text-xs font-semibold">
              <button className="px-3.5 py-1.5 rounded-lg bg-bordo text-white shadow-sm whitespace-nowrap" type="button">All 30 Cases</button>
              <button className="px-3.5 py-1.5 rounded-lg text-text-muted hover:text-text-dark hover:bg-white transition-colors whitespace-nowrap" type="button">Differences Only (6)</button>
              <button className="px-3.5 py-1.5 rounded-lg text-text-muted hover:text-text-dark hover:bg-white transition-colors whitespace-nowrap" type="button">Date Changes (1)</button>
              <button className="px-3.5 py-1.5 rounded-lg text-text-muted hover:text-text-dark hover:bg-white transition-colors whitespace-nowrap" type="button">Passed (29)</button>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-sm flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-border pb-3">
                <div className="flex items-center gap-2.5"><span className="font-mono text-xs font-bold bg-cream text-bordo px-2.5 py-0.5 rounded">CASE #01</span><span className="text-sm font-bold text-text-dark">Diplomatic Travel Schedule</span><span className="text-xs bg-deepgreen-light text-deepgreen px-2 py-0.5 rounded-full font-bold">Fixes Date Error</span></div>
                <div className="flex items-center gap-2 text-xs text-text-muted"><span>Category: <strong className="text-text-dark">Diplomatic Records</strong></span><span className="font-mono text-text-dark">380ms</span></div>
              </div>
              <div className="bg-cream-light border border-surface-border rounded-xl p-3.5"><div className="text-[11px] font-mono uppercase tracking-wider text-text-muted font-bold">Original English</div><div className="text-base font-semibold text-text-dark mt-0.5">&quot;The delegation arrives on 14 June at 9:30 AM.&quot;</div></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-bordo-light/60 border border-bordo/20 rounded-xl p-4 flex flex-col justify-between">
                  <div className="space-y-2"><div className="flex items-center justify-between"><div className="flex items-center gap-1.5 text-bordo font-bold text-xs"><span className="material-symbols-outlined text-base">close</span><span>Older Rule-based System</span></div><span className="text-[11px] bg-bordo text-white px-2 py-0.5 rounded font-bold">Wrong Date</span></div>
                  <p className="text-sm text-text-dark leading-relaxed">Ujumbe unawasili tarehe <span className="bg-bordo-subtle text-bordo px-1.5 py-0.5 rounded font-bold line-through">15 Juni</span> saa 9:30 asubuhi.</p></div>
                  <div className="mt-3 pt-2 border-t border-bordo/15 text-xs text-bordo font-medium flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">warning</span><span>Critical error: Advanced the arrival date by 24 hours.</span></div>
                </div>
                <div className="bg-deepgreen-light/70 border border-deepgreen/20 rounded-xl p-4 flex flex-col justify-between">
                  <div className="space-y-2"><div className="flex items-center justify-between"><div className="flex items-center gap-1.5 text-deepgreen font-bold text-xs"><span className="material-symbols-outlined text-base">check</span><span>New Local AI (Llama 3 8B)</span></div><span className="text-[11px] bg-deepgreen text-white px-2 py-0.5 rounded font-bold">Correct Date</span></div>
                  <p className="text-sm text-text-dark leading-relaxed">Ujumbe utawasili tarehe <span className="bg-cream text-bordo-dark font-extrabold px-1.5 py-0.5 rounded">14 Juni</span> saa tatu na nusu asubuhi.</p></div>
                  <div className="mt-3 pt-2 border-t border-deepgreen/15 text-xs text-deepgreen font-medium flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">verified</span><span>Exact date preserved with natural Swahili time phrasing.</span></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-sm flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-border pb-3">
                <div className="flex items-center gap-2.5"><span className="font-mono text-xs font-bold bg-cream text-bordo px-2.5 py-0.5 rounded">CASE #02</span><span className="text-sm font-bold text-text-dark">Prescription Instructions</span><span className="text-xs bg-deepgreen-light text-deepgreen px-2 py-0.5 rounded-full font-bold">Accurate Medical Swahili</span></div>
                <div className="flex items-center gap-2 text-xs text-text-muted"><span>Category: <strong className="text-text-dark">Medical &amp; Pharmacy</strong></span><span className="font-mono text-text-dark">420ms</span></div>
              </div>
              <div className="bg-cream-light border border-surface-border rounded-xl p-3.5"><div className="text-[11px] font-mono uppercase tracking-wider text-text-muted font-bold">Original English</div><div className="text-base font-semibold text-text-dark mt-0.5">&quot;Take 2 tablets twice daily after meals. Do not exceed 4 tablets in 24 hours.&quot;</div></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-cream-light border border-surface-border rounded-xl p-4 flex flex-col justify-between">
                  <div className="space-y-2"><div className="flex items-center justify-between"><div className="flex items-center gap-1.5 text-text-muted font-bold text-xs"><span className="material-symbols-outlined text-base">notes</span><span>Older Rule-based System</span></div><span className="text-[11px] bg-cream-subtle text-text-muted px-2 py-0.5 rounded font-semibold border border-surface-border">Literal &amp; Robotic</span></div>
                  <p className="text-sm text-text-dark leading-relaxed">Meza vidonge 2 mara 2 kwa siku baada ya chakula. Usizidi vidonge 4 kwa masaa 24.</p></div>
                  <div className="mt-3 pt-2 border-t border-surface-border text-xs text-text-muted flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">info</span><span>Word-for-word translation; understandable but stiff for patients.</span></div>
                </div>
                <div className="bg-deepgreen-light/70 border border-deepgreen/20 rounded-xl p-4 flex flex-col justify-between">
                  <div className="space-y-2"><div className="flex items-center justify-between"><div className="flex items-center gap-1.5 text-deepgreen font-bold text-xs"><span className="material-symbols-outlined text-base">check</span><span>New Local AI (Llama 3 8B)</span></div><span className="text-[11px] bg-deepgreen text-white px-2 py-0.5 rounded font-bold">Natural &amp; Fluent</span></div>
                  <p className="text-sm text-text-dark leading-relaxed"><span className="bg-cream text-bordo-dark font-extrabold px-1.5 py-0.5 rounded">Kunywa vidonge viwili mara mbili</span> kwa siku baada ya kula. Usizidishe vidonge vinne kwa masaa 24.</p></div>
                  <div className="mt-3 pt-2 border-t border-deepgreen/15 text-xs text-deepgreen font-medium flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">health_and_safety</span><span>Uses standard clinical patient phrasing common across East Africa.</span></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-sm flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-border pb-3">
                <div className="flex items-center gap-2.5"><span className="font-mono text-xs font-bold bg-cream text-bordo px-2.5 py-0.5 rounded">CASE #03</span><span className="text-sm font-bold text-text-dark">Email Greeting &amp; Courtesy</span><span className="text-xs bg-cream-subtle text-text-dark border border-surface-border px-2 py-0.5 rounded-full font-semibold">Polite Tone</span></div>
                <div className="flex items-center gap-2 text-xs text-text-muted"><span>Category: <strong className="text-text-dark">Correspondence</strong></span><span className="font-mono text-text-dark">395ms</span></div>
              </div>
              <div className="bg-cream-light border border-surface-border rounded-xl p-3.5"><div className="text-[11px] font-mono uppercase tracking-wider text-text-muted font-bold">Original English</div><div className="text-base font-semibold text-text-dark mt-0.5">&quot;Hope this email finds you well; we are following up on yesterday&apos;s discussion.&quot;</div></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-cream-light border border-surface-border rounded-xl p-4 flex flex-col justify-between">
                  <div className="space-y-2"><div className="flex items-center justify-between"><div className="flex items-center gap-1.5 text-text-muted font-bold text-xs"><span className="material-symbols-outlined text-base">notes</span><span>Older Rule-based System</span></div><span className="text-[11px] bg-cream-subtle text-text-muted px-2 py-0.5 rounded font-semibold border border-surface-border">Abrupt Tone</span></div>
                  <p className="text-sm text-text-dark leading-relaxed">Natumaini u mzima; tunafuatilia mazungumzo ya jana.</p></div>
                  <div className="mt-3 pt-2 border-t border-surface-border text-xs text-text-muted flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">info</span><span>Too abrupt for senior diplomatic or corporate exchanges.</span></div>
                </div>
                <div className="bg-deepgreen-light/70 border border-deepgreen/20 rounded-xl p-4 flex flex-col justify-between">
                  <div className="space-y-2"><div className="flex items-center justify-between"><div className="flex items-center gap-1.5 text-deepgreen font-bold text-xs"><span className="material-symbols-outlined text-base">check</span><span>New Local AI (Llama 3 8B)</span></div><span className="text-[11px] bg-cream text-bordo px-2 py-0.5 rounded font-bold">Diplomatic Tone</span></div>
                  <p className="text-sm text-text-dark leading-relaxed"><span className="bg-cream text-bordo-dark font-extrabold px-1.5 py-0.5 rounded">Ni matumaini yangu kuwa barua hii itakufikia ukiwa salama</span>; tuko hapa kuendeleza mazungumzo.</p></div>
                  <div className="mt-3 pt-2 border-t border-deepgreen/15 text-xs text-deepgreen font-medium flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">handshake</span><span>Respects professional Swahili etiquette with proper courteous warmth.</span></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-surface-border p-6 shadow-sm flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-border pb-3">
                <div className="flex items-center gap-2.5"><span className="font-mono text-xs font-bold bg-cream text-bordo px-2.5 py-0.5 rounded">CASE #04</span><span className="text-sm font-bold text-text-dark">Legal Liability Clause</span><span className="text-xs bg-bordo text-white px-2 py-0.5 rounded-full font-bold">Clause Fully Kept</span></div>
                <div className="flex items-center gap-2 text-xs text-text-muted"><span>Category: <strong className="text-text-dark">Contracts &amp; Legal</strong></span><span className="font-mono text-text-dark">445ms</span></div>
              </div>
              <div className="bg-cream-light border border-surface-border rounded-xl p-3.5"><div className="text-[11px] font-mono uppercase tracking-wider text-text-muted font-bold">Original English</div><div className="text-base font-semibold text-text-dark mt-0.5">&quot;Unless explicitly agreed in writing, neither party shall be liable for indirect loss.&quot;</div></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-bordo-light/60 border border-bordo/20 rounded-xl p-4 flex flex-col justify-between">
                  <div className="space-y-2"><div className="flex items-center justify-between"><div className="flex items-center gap-1.5 text-bordo font-bold text-xs"><span className="material-symbols-outlined text-base">close</span><span>Older Rule-based System</span></div><span className="text-[11px] bg-bordo text-white px-2 py-0.5 rounded font-bold">Missed Condition</span></div>
                  <p className="text-sm text-text-dark leading-relaxed">Hakuna upande utakaowajibika kwa hasara <span className="bg-bordo-subtle text-bordo px-1.5 py-0.5 rounded font-bold line-through">bila maandishi</span>.</p></div>
                  <div className="mt-3 pt-2 border-t border-bordo/15 text-xs text-bordo font-medium flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">warning</span><span>Omitted &quot;unless explicitly agreed&quot;, changing legal enforceability.</span></div>
                </div>
                <div className="bg-deepgreen-light/70 border border-deepgreen/20 rounded-xl p-4 flex flex-col justify-between">
                  <div className="space-y-2"><div className="flex items-center justify-between"><div className="flex items-center gap-1.5 text-deepgreen font-bold text-xs"><span className="material-symbols-outlined text-base">check</span><span>New Local AI (Llama 3 8B)</span></div><span className="text-[11px] bg-deepgreen text-white px-2 py-0.5 rounded font-bold">Full Clause Intact</span></div>
                  <p className="text-sm text-text-dark leading-relaxed"><span className="bg-cream text-bordo-dark font-extrabold px-1.5 py-0.5 rounded">Isipokuwa kama imekubaliwa wazi kwa maandishi</span>, hakuna upande utakaowajibika kwa hasara yoyote isiyo ya moja kwa moja.</p></div>
                  <div className="mt-3 pt-2 border-t border-deepgreen/15 text-xs text-deepgreen font-medium flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">gavel</span><span>Faithful legal conditions preserved without alteration.</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-4 z-40 bg-deepgreen text-white p-5 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-deepgreen-muted">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-cream text-bordo-dark flex items-center justify-center shrink-0 font-bold shadow-sm"><span className="material-symbols-outlined text-2xl">verified</span></div>
            <div><div className="flex items-center gap-2"><h3 className="text-base font-extrabold text-white">Test Complete · 29 of 30 Approved</h3><span className="bg-cream/20 text-cream px-2 py-0.5 rounded text-xs font-mono font-bold">READY</span></div><p className="text-xs text-cream/80 mt-0.5">Local AI is faster and fixes date errors. Ready for field team use.</p></div>
          </div>
          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-end">
            <button className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors flex items-center gap-1.5" type="button"><span className="material-symbols-outlined text-base">picture_as_pdf</span><span>PDF Report</span></button>
            <button className="px-5 py-2.5 rounded-xl bg-cream hover:bg-cream-subtle text-bordo-dark text-xs font-extrabold transition-all shadow-md flex items-center gap-2" type="button"><span className="material-symbols-outlined text-base">task_alt</span><span>Save &amp; Approve Run</span></button>
          </div>
        </div>

    </div>
  );
}
