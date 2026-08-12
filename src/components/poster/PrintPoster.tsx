import type { Week } from "@/data/schema";
import { weken } from "@/data/schema";
import { GolfLijn } from "./Golf";

/**
 * Compacte print-poster: alles op 1 pagina A3 staand.
 * Alleen de schema's + vinkvakjes, geen basisregels.
 */

function Blokjes({ aantal }: { aantal: 1 | 2 }) {
  return (
    <span className="inline-flex gap-[1px]">
      {Array.from({ length: aantal }).map((_, i) => (
        <span
          key={i}
          className="block h-[5px] w-[5px] rounded-[1.5px] border border-sky-foreground/50 bg-sky"
        />
      ))}
    </span>
  );
}

function DagCel({ week, dag }: { week: Week; dag: Week["dagen"][number] }) {
  const twee = dag.hapjes.length > 1;
  const allergeen = dag.hapjes.find((h) => h.allergen);

  return (
    <div className="flex flex-col justify-between rounded-[4px] border border-brand/25 bg-white px-[4px] py-[3px]">
      <div className="flex items-center justify-between">
        <span className="text-[6px] font-bold uppercase tracking-[0.1em] text-brand">
          {dag.dag}
        </span>
        <span className="block h-[8px] w-[8px] rounded-[2px] border-[1.2px] border-brand/60 bg-white" />
      </div>
      <div className="mt-[2px] space-y-[1px]">
        {dag.hapjes.map((hap, i) => (
          <div key={i} className="flex items-start justify-between gap-[3px]">
            <span className="text-[7px] font-medium leading-[1.15] text-foreground">
              {twee ? (
                <span className="text-[5.5px] uppercase tracking-[0.08em] text-muted-foreground">
                  {i === 0 ? "F " : "G "}
                </span>
              ) : null}
              {hap.item}
              {hap.fresh ? <span className="text-brand">*</span> : null}
            </span>
            <span className="mt-[1px] shrink-0">
              <Blokjes aantal={hap.blokjes} />
            </span>
          </div>
        ))}
      </div>
      {allergeen ? (
        <span
          className={`mt-[2px] block rounded-[6px] px-[3px] py-[1px] text-center text-[5.5px] font-bold leading-tight ${
            allergeen.allergen === "pinda"
              ? "bg-brand text-brand-foreground"
              : "bg-sun text-sun-foreground"
          }`}
        >
          {allergeen.allergenAmount}
        </span>
      ) : (
        <span className="mt-[2px] block h-[8px]" />
      )}
    </div>
  );
}

function WeekRij({ week }: { week: Week }) {
  return (
    <div className="flex items-stretch gap-[4px]">
      <div className="flex w-[70px] shrink-0 flex-col justify-center rounded-[5px] bg-brand px-[6px] py-[4px] text-brand-foreground">
        <span className="font-display text-[11px] leading-none">Week {week.nummer}</span>
        <span className="mt-[2px] text-[6px] font-semibold uppercase leading-tight tracking-[0.08em]">
          {week.thema}
        </span>
        <span className="mt-[1px] text-[5.5px] leading-tight opacity-85">{week.ondertitel}</span>
      </div>
      <div className="grid flex-1 grid-cols-7 gap-[4px]">
        {week.dagen.map((dag) => (
          <DagCel key={dag.dag} week={week} dag={dag} />
        ))}
      </div>
    </div>
  );
}

export function PrintPoster() {
  return (
    <div className="print-sheet bg-background">
      <div className="flex h-full flex-col">
        <header className="relative overflow-hidden rounded-[8px] bg-brand px-[12px] pb-[2px] pt-[10px] text-brand-foreground">
          <div className="flex items-center gap-[10px]">
            <img
              src="/favicon.svg"
              alt="Culi Mama"
              className="h-[34px] w-[34px] rounded-full bg-brand-foreground p-[3px]"
            />
            <div>
              <p className="font-display text-[8px] lowercase tracking-[0.3em]">culi mama</p>
              <h1 className="font-display text-[24px] leading-[1]">
                Eerste hapjes — <span className="text-sun">8 weken</span>
              </h1>
            </div>
            <p className="ml-auto text-right text-[7px] font-semibold leading-tight">
              4–6 maanden · vink elke dag af
              <br />
              <span className="opacity-80">1 ijsblokje ≈ 15 g</span>
            </p>
          </div>
          <svg viewBox="0 0 1200 30" preserveAspectRatio="none" className="mt-[6px] block h-[10px] w-full" aria-hidden="true">
            <path
              d="M0,15 C100,30 200,0 300,10 C400,22 500,28 600,17 C700,7 800,0 900,9 C1000,20 1100,26 1200,14 L1200,30 L0,30 Z"
              fill="var(--background)"
            />
          </svg>
        </header>

        <div className="mt-[6px] flex flex-1 flex-col justify-between gap-[5px]">
          {weken.map((week) => (
            <div key={week.nummer} className="flex-1">
              <WeekRij week={week} />
            </div>
          ))}
        </div>

        <div className="mt-[6px] overflow-hidden rounded-[6px] border border-brand/30 bg-sun/50">
          <GolfLijn kleur="var(--brand)" />
          <div className="flex flex-wrap items-center gap-x-[10px] gap-y-[2px] px-[8px] py-[4px] text-[6.5px]">
            <span className="font-display text-[9px] leading-none text-brand">Legenda</span>
            <span className="inline-flex items-center gap-[3px]">
              <Blokjes aantal={1} /> 1 ijsblokje (±15 g)
            </span>
            <span className="inline-flex items-center gap-[3px]">
              <Blokjes aantal={2} /> 2 ijsblokjes
            </span>
            <span className="inline-flex items-center gap-[3px]">
              <span className="h-[6px] w-[6px] rounded-full bg-brand" /> pinda
            </span>
            <span className="inline-flex items-center gap-[3px]">
              <span className="h-[6px] w-[6px] rounded-full bg-sun" /> ei
            </span>
            <span className="inline-flex items-center gap-[3px]">
              <span className="h-[8px] w-[8px] rounded-[2px] border-[1.2px] border-brand/60" /> afvinken
            </span>
            <span>F = fruit · G = groente · * vers prakken</span>
            <span className="ml-auto font-medium lowercase tracking-[0.15em] text-brand">
              culi mama · @culi.mama
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
