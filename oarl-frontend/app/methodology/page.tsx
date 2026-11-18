import { Card, SectionTitle } from "@/components/ui";

const SECTIONS = [
  {
    title: "Metric definitions",
    body: "Every metric shown in the UI is defined here before it is computed: ordinal 1–5 dimension scores for translation (meaning, key entities, numeric/date fidelity, clarity); precision, recall, F1 and confusion-matrix counts for moderation; source support, completeness and correct-abstention rates for the assistant. Aggregates are descriptive and sample size is shown beside every number.",
  },
  {
    title: "Dataset provenance & data cards",
    body: "Each dataset version carries a data card: source, licensing, language metadata, human-review status and content hash. Only synthetic or public/licensed examples are used; private conversations and sensitive personal data are excluded.",
  },
  {
    title: "Policy taxonomy",
    body: "Moderation labels follow the documented policy taxonomy recorded in the dataset card before scoring. The positive class and label mapping are declared up front; false positives and false negatives are reported individually rather than hidden inside aggregates.",
  },
  {
    title: "Abstention policy",
    body: "The assistant abstains when retrieval returns nothing (no_evidence) or falls below the configured threshold (below_threshold). An answer failing citation validation is converted to an abstention. An explicit abstention is always preferred over an unsupported answer.",
  },
  {
    title: "Limitations & known risks",
    body: "Small test sets do not generalise. Model output is nondeterministic and replay may differ. Reference translations were reviewed by a limited reviewer pool. Local model choice depends on a hardware check. Emergency-adjacent content is deliberately excluded from the v1 knowledge pack.",
  },
];

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <SectionTitle
        eyebrow="Documentation"
        title="Methodology & Data Cards"
        desc="Definitions, provenance, scoring rubric and limitations. Every metric in the interface traces back to a definition on this page."
      />
      <div className="space-y-4">
        {SECTIONS.map((s) => (
          <Card key={s.title} className="p-6">
            <h2 className="font-semibold text-forest">{s.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{s.body}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}