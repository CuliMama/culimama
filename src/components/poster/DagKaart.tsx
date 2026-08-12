import type { Dag, Hap } from "@/data/schema";
import { allergeenId, dagItemIds, hapId } from "@/data/schema";

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

function VinkKnop({
  checked,
  onToggle,
  label,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onToggle}
      className={`print-vinkvak flex h-4 w-4 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
        checked
          ? "border-brand bg-brand text-brand-foreground"
          : "border-brand/40 bg-background hover:border-brand"
      }`}
    >
      <svg viewBox="0 0 16 16" className="h-3 w-3" aria-hidden="true">
        <path
          d="M3 8.5 L6.5 12 L13 4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={checked ? 1 : 0}
        />
      </svg>
    </button>
  );
}

function HapRegel({
  hap,
  index,
  tweeHapjes,
  hapChecked,
  allergeenChecked,
  onToggleHap,
  onToggleAllergeen,
}: {
  hap: Hap;
  index: number;
  tweeHapjes: boolean;
  hapChecked: boolean;
  allergeenChecked: boolean;
  onToggleHap: () => void;
  onToggleAllergeen: () => void;
}) {
  const label = tweeHapjes ? (index === 0 ? "Fruit" : "Groente") : "Hapje";

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </span>
        <Blokjes aantal={hap.blokjes} />
      </div>
      <div className="flex items-center justify-between gap-2">
        <p className={`text-[13px] font-medium leading-tight text-foreground ${hapChecked ? "opacity-60 line-through" : ""}`}>
          {hap.item}
          {hap.fresh ? <span className="text-brand">*</span> : null}
        </p>
        <VinkKnop checked={hapChecked} onToggle={onToggleHap} label={`${label} "${hap.item}" afvinken`} />
      </div>
      {hap.allergen ? (
        <div className="flex items-center justify-between gap-2">
          <p
            className={`inline-flex items-center gap-1 rounded-full px-2 py-[2px] text-[10px] font-semibold ${
              hap.allergen === "pinda"
                ? "bg-brand text-brand-foreground"
                : "bg-sun text-sun-foreground"
            } ${allergeenChecked ? "opacity-60" : ""}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
            {hap.allergenAmount}
          </p>
          <VinkKnop
            checked={allergeenChecked}
            onToggle={onToggleAllergeen}
            label={`${hap.allergen} ${hap.allergenAmount ?? ""} afvinken`}
          />
        </div>
      ) : null}
    </div>
  );
}

export function DagKaart({
  dag,
  weekNummer,
  done,
  onToggle,
}: {
  dag: Dag;
  weekNummer: number;
  done: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const tweeHapjes = dag.hapjes.length > 1;
  const heeftAllergeen = dag.hapjes.some((h) => h.allergen);

  const alleIds = dagItemIds(weekNummer, dag);
  const alleAfgevinkt = alleIds.length > 0 && alleIds.every((id) => done[id]);

  return (
    <div
      className={`avoid-break relative flex flex-col rounded-xl border p-3 transition-colors ${
        alleAfgevinkt
          ? "border-brand bg-sun/40"
          : heeftAllergeen
            ? "border-brand/40 bg-card"
            : "border-border bg-card"
      }`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
          {dag.dag}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2.5">
        {dag.hapjes.map((hap, i) => {
          const hId = hapId(weekNummer, dag.dag, i);
          const aId = allergeenId(weekNummer, dag.dag, i);
          return (
            <HapRegel
              key={i}
              hap={hap}
              index={i}
              tweeHapjes={tweeHapjes}
              hapChecked={Boolean(done[hId])}
              allergeenChecked={Boolean(done[aId])}
              onToggleHap={() => onToggle(hId)}
              onToggleAllergeen={() => onToggle(aId)}
            />
          );
        })}
      </div>
    </div>
  );
}
