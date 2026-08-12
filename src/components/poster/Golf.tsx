/**
 * Golvende scheidingen — herkenbaar element uit de Culi Mama huisstijl.
 */
export function Golf({
  className = "",
  kleur = "var(--brand)",
  flip = false,
  hoogte = 40,
}: {
  className?: string;
  kleur?: string;
  flip?: boolean;
  hoogte?: number;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 60"
      preserveAspectRatio="none"
      style={{ height: hoogte, width: "100%", display: "block", transform: flip ? "scaleY(-1)" : undefined }}
      aria-hidden="true"
    >
      <path
        d="M0,30 C100,60 200,0 300,20 C400,40 500,55 600,35 C700,15 800,0 900,18 C1000,36 1100,50 1200,28 L1200,60 L0,60 Z"
        fill={kleur}
      />
    </svg>
  );
}

export function GolfLijn({ className = "", kleur = "var(--brand)" }: { className?: string; kleur?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 16"
      preserveAspectRatio="none"
      style={{ height: 12, width: "100%", display: "block" }}
      aria-hidden="true"
    >
      <path
        d="M0,8 C75,16 150,0 225,8 C300,16 375,0 450,8 C525,16 600,0 675,8 C750,16 825,0 900,8 C975,16 1050,0 1125,8 C1162,12 1181,10 1200,8"
        fill="none"
        stroke={kleur}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
