import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { basisregels, opbouw, weken } from "@/data/schema";
import { WeekBlok } from "@/components/poster/WeekBlok";
import { Golf, GolfLijn } from "@/components/poster/Golf";
import { useAfvinken } from "@/hooks/useAfvinken";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eerste hapjes: 8-weken mealplanner | Culi Mama" },
      {
        name: "description",
        content:
          "Vink dag voor dag af welk babyhapje, hoeveel ijsblokjes en welk allergeen aan de beurt is. Digitale checklist + printbare A3-poster voor baby's van 4-6 maanden.",
      },
      { property: "og:title", content: "Eerste hapjes: 8-weken mealplanner | Culi Mama" },
      {
        property: "og:description",
        content:
          "Digitale checklist en printbare A3-poster met per dag het hapje, de portiegrootte en de allergeenopbouw van pinda en ei.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function OpbouwKaart({ data, kleur }: { data: typeof opbouw.pinda; kleur: "brand" | "sun" }) {
  return (
    <div className="avoid-break rounded-2xl border border-border bg-card p-4">
      <div className="mb-2 flex items-center gap-2">
        <span
          className={`h-3 w-3 rounded-full ${kleur === "brand" ? "bg-brand" : "bg-sun"}`}
        />
        <h3 className="font-display text-base font-semibold">{data.titel}</h3>
      </div>
      <dl className="divide-y divide-border">
        {data.rijen.map(([dag, hoeveelheid]) => (
          <div key={dag} className="flex items-baseline justify-between gap-3 py-1.5">
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {dag}
            </dt>
            <dd className="text-right text-[13px] font-medium">{hoeveelheid}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-2 text-[11px] leading-snug text-muted-foreground">{data.sub}</p>
    </div>
  );
}

type Formaat = "A3" | "A2" | "A4";

function Index() {
  const { done, toggle, reset } = useAfvinken();
  const [formaat, setFormaat] = useState<Formaat>("A3");

  const totaal = weken.reduce((n, w) => n + w.dagen.length, 0);
  const af = weken.reduce(
    (n, w) => n + w.dagen.filter((d) => done[`w${w.nummer}-${d.dag}`]).length,
    0,
  );
  const percentage = Math.round((af / totaal) * 100);

  return (
    <main className="min-h-screen bg-background px-4 py-8 print:p-0">
      <style>{`@page { size: ${formaat} portrait; margin: 10mm; }`}</style>

      <div className="poster mx-auto w-full max-w-[1400px]">
        <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="max-w-md text-sm text-muted-foreground">
            Vink hieronder digitaal af wat je baby al gehad heeft — of print de poster en zet er
            met de hand vinkjes in.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
              {(["A4", "A3", "A2"] as Formaat[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormaat(f)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    formaat === f ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <button
              onClick={reset}
              className="rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              Vinkjes wissen
            </button>
            <button
              onClick={() => window.print()}
              className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
            >
              Print poster ({formaat})
            </button>
          </div>
        </div>

        <header className="avoid-break mb-5 overflow-hidden rounded-3xl bg-brand text-brand-foreground">
          <div className="flex flex-wrap items-end justify-between gap-4 px-6 pb-2 pt-7">
            <div className="flex items-center gap-4">
              <img
                src="/favicon.svg"
                alt="Culi Mama logo"
                className="h-16 w-16 shrink-0 rounded-full bg-brand-foreground p-1.5"
              />
              <div>
                <p className="font-display text-sm font-medium lowercase tracking-[0.35em]">
                  culi mama
                </p>
                <h1 className="mt-2 font-display text-4xl font-bold leading-[1.05] sm:text-5xl">
                  Eerste hapjes
                  <span className="block text-sun">8-weken mealplanner</span>
                </h1>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-brand-foreground/15 px-3 py-1.5 text-xs font-semibold">
                4-6 maanden
              </span>
              <span className="rounded-full bg-sun px-3 py-1.5 text-xs font-semibold text-sun-foreground">
                pinda &amp; ei veilig introduceren
              </span>
              <span className="rounded-full bg-sky px-3 py-1.5 text-xs font-semibold text-sky-foreground">
                afvinken per dag
              </span>
            </div>
          </div>
          <Golf kleur="var(--background)" hoogte={34} />
        </header>

        <div className="no-print avoid-break mb-5 flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4">
          <div className="min-w-[180px]">
            <p className="font-display text-lg font-semibold leading-none">
              {af} van {totaal} dagen afgevinkt
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Je voortgang wordt bewaard op dit apparaat.
            </p>
          </div>
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-brand transition-[width] duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="font-display text-xl font-bold text-brand">{percentage}%</span>
        </div>

        <div className="avoid-break mb-5 grid gap-3 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div className="rounded-2xl border border-border bg-card p-4">
            <h2 className="font-display text-base font-semibold">Basisregels</h2>
            <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {basisregels.map((regel) => (
                <li
                  key={regel}
                  className="flex gap-2 text-[11.5px] leading-snug text-muted-foreground"
                >
                  <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {regel}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-3 text-[11px]">
              <span className="font-semibold uppercase tracking-wide">Legenda</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-flex gap-[2px]">
                  <span className="block h-2 w-2 rounded-[3px] border border-sky-foreground/40 bg-sky" />
                </span>
                1 ijsblokje (±15 g)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-flex gap-[2px]">
                  <span className="block h-2 w-2 rounded-[3px] border border-sky-foreground/40 bg-sky" />
                  <span className="block h-2 w-2 rounded-[3px] border border-sky-foreground/40 bg-sky" />
                </span>
                2 ijsblokjes
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-brand" /> pinda
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-sun" /> ei
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-[4px] border-2 border-brand/50" /> afvinken
              </span>
              <span className="text-muted-foreground">* vers prakken</span>
            </div>
          </div>

          <OpbouwKaart data={opbouw.pinda} kleur="brand" />
          <OpbouwKaart data={opbouw.ei} kleur="sun" />
        </div>

        <div className="grid gap-3">
          {weken.map((week) => (
            <WeekBlok key={week.nummer} week={week} done={done} onToggle={toggle} />
          ))}
        </div>

        <footer className="avoid-break mt-5 overflow-hidden rounded-2xl border border-brand/30 bg-sun/40">
          <GolfLijn kleur="var(--brand)" />
          <div className="px-5 py-4">
            <p className="text-[11.5px] leading-snug text-foreground">
              <strong>Let op:</strong> bij een reactie (huiduitslag, zwelling, overgeven) stop je
              direct en bel je de huisarts — verder introduceren alleen in overleg met een arts. Bij
              eczeem of allergie in de familie eerst overleggen met consultatiebureau of huisarts.
              Dit schema is een richting, geen verplichting.
            </p>
            <p className="mt-2 text-[11px] font-medium lowercase tracking-[0.2em] text-brand">
              culi mama · @culi.mama
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
