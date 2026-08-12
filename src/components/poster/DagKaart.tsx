import type { Dag, Hap } from "@/data/schema";

function Blokjes({ aantal }: { aantal: 1 | 2 }) {
  return (
    <span className="inline-flex items-center gap-[2px] align-middle" aria-label={`${aantal} ijsblokje${aantal > 1 ? "s" : ""}`}>
      {Array.from({ length: aantal }).map((_, i) => (
        <span
          key={i}
          className="block h-2 w-2 rounded-[3px] border border-sky-foreground/40 bg-sky"
        />
      ))}
    </span>
  );
}

function HapRegel({ hap, index, tweeHapjes }: { hap: Hap; index: number; tweeHapjes: boolean }) {
  const label = tweeHapjes ? (index === 0 ? "Fruit" : "Groente") : "Hapje";

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </span>
        <Blokjes aantal={hap.blokjes} />
      </div>
      <p className="text-[13px] font-medium leading-tight text-foreground">
        {hap.item}
        {hap.fresh ? <span className="text-brand">*</span> : null}
      </p>
      {hap.allergen ? (
        <p
          className={`inline-flex items-center gap-1 rounded-full px-2 py-[2px] text-[10px] font-semibold ${
            hap.allergen === "pinda"
              ? "bg-brand text-brand-foreground"
              : "bg-sun text-sun-foreground"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
          {hap.allergenAmount}
        </p>
      ) : null}
    </div>
  );
}

export function DagKaart({ dag }: { dag: Dag }) {
  const tweeHapjes = dag.hapjes.length > 1;
  const heeftAllergeen = dag.hapjes.some((h) => h.allergen);

  return (
    <div
      className={`avoid-break flex flex-col rounded-xl border bg-card p-3 ${
        heeftAllergeen ? "border-brand/40 shadow-[0_1px_0_0_var(--brand)]" : "border-border"
      }`}
    >
      <span className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
        {dag.dag}
      </span>
      <div className="flex flex-1 flex-col gap-2.5">
        {dag.hapjes.map((hap, i) => (
          <HapRegel key={i} hap={hap} index={i} tweeHapjes={tweeHapjes} />
        ))}
      </div>
    </div>
  );
}
