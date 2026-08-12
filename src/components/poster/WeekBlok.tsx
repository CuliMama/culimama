import type { Week } from "@/data/schema";
import { DagKaart } from "./DagKaart";
import { GolfLijn } from "./Golf";

export function WeekBlok({
  week,
  done,
  onToggle,
}: {
  week: Week;
  done: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const totaal = week.dagen.length;
  const af = week.dagen.filter((d) => done[`w${week.nummer}-${d.dag}`]).length;

  return (
    <section className="avoid-break overflow-hidden rounded-2xl border border-border bg-muted/40">
      <GolfLijn className="opacity-70" kleur="var(--brand)" />
      <div className="p-4 pt-3">
        <header className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="rounded-full bg-brand px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-foreground">
            Week {week.nummer}
          </span>
          <h3 className="font-display text-lg font-semibold leading-none text-foreground">
            {week.thema}
          </h3>
          <span className="text-xs text-muted-foreground">{week.ondertitel}</span>
          <div className="ml-auto flex flex-wrap items-center gap-1.5">
            {week.labels.map((label) => (
              <span
                key={label}
                className="rounded-full bg-sky px-2.5 py-1 text-[10px] font-medium text-sky-foreground"
              >
                {label}
              </span>
            ))}
            <span className="no-print rounded-full border border-brand/30 px-2.5 py-1 text-[10px] font-semibold text-brand">
              {af}/{totaal} afgevinkt
            </span>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {week.dagen.map((dag) => {
            const id = `w${week.nummer}-${dag.dag}`;
            return (
              <DagKaart
                key={dag.dag}
                dag={dag}
                id={id}
                checked={Boolean(done[id])}
                onToggle={onToggle}
              />
            );
          })}
        </div>

        {week.notes.length > 0 ? (
          <ul className="mt-3 space-y-1">
            {week.notes.map((note) => (
              <li key={note} className="text-[11px] leading-snug text-muted-foreground">
                {note}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
