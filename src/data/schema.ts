export type Allergen = "pinda" | "ei";

export type Hap = {
  /** Hoofdomschrijving van het hapje, bv. "Bloemkool + venkel" */
  item: string;
  /** Portie in ijsblokjes */
  blokjes: 1 | 2;
  /** Allergeen dat deze dag wordt aangeboden */
  allergen?: Allergen;
  /** Hoeveelheid allergeen, bv. "½ tl pindakaas" */
  allergenAmount?: string;
  /** Sterretje-notitie, bv. vers prakken */
  fresh?: boolean;
};

export type Dag = {
  dag: string;
  hapjes: Hap[];
};

export type Week = {
  nummer: number;
  thema: string;
  ondertitel: string;
  labels: string[];
  dagen: Dag[];
  notes: string[];
};

const DAGEN = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"] as const;

function week1of2(items: string[]): Dag[] {
  return DAGEN.map((dag, i) => ({
    dag,
    hapjes: [{ item: items[i] ?? "", blokjes: 1 as const }],
  }));
}

export const weken: Week[] = [
  {
    nummer: 1,
    thema: "Wennen",
    ondertitel: "1 hapje per dag",
    labels: ["Wortel", "Courgette", "Pastinaak"],
    dagen: week1of2([
      "Wortel",
      "Courgette",
      "Pastinaak",
      "Wortel",
      "Courgette",
      "Pastinaak",
      "Wortel",
    ]),
    notes: [
      "Start met 1 ijsblokje (±15 g) per hapje. Eet je baby dit makkelijk op? Ga door naar 2.",
    ],
  },
  {
    nummer: 2,
    thema: "Wennen",
    ondertitel: "1 hapje per dag",
    labels: ["Broccoli", "Wortel", "Pastinaak"],
    dagen: week1of2([
      "Broccoli",
      "Wortel",
      "Pastinaak",
      "Broccoli",
      "Wortel",
      "Broccoli",
      "Pastinaak",
    ]),
    notes: ["Afwisselen mag: een smaak hoeft niet dagen achter elkaar."],
  },
  {
    nummer: 3,
    thema: "Pinda-introductie",
    ondertitel: "1 hapje per dag",
    labels: ["Bloemkool", "Zoete aardappel", "Courgette"],
    dagen: [
      {
        dag: "Ma",
        hapjes: [
          {
            item: "Bloemkool",
            blokjes: 1,
            allergen: "pinda",
            allergenAmount: "½ tl pindakaas",
          },
        ],
      },
      {
        dag: "Di",
        hapjes: [
          {
            item: "Zoete aardappel",
            blokjes: 1,
            allergen: "pinda",
            allergenAmount: "1 tl pindakaas",
          },
        ],
      },
      {
        dag: "Wo",
        hapjes: [
          {
            item: "Courgette",
            blokjes: 1,
            allergen: "pinda",
            allergenAmount: "3 tl pindakaas",
          },
        ],
      },
      { dag: "Do", hapjes: [{ item: "Zoete aardappel", blokjes: 1 }] },
      { dag: "Vr", hapjes: [{ item: "Courgette", blokjes: 1 }] },
      { dag: "Za", hapjes: [{ item: "Bloemkool", blokjes: 1 }] },
      { dag: "Zo", hapjes: [{ item: "Zoete aardappel", blokjes: 1 }] },
    ],
    notes: [
      "Ma–wo zijn de officiële opbouwdagen: achter elkaar, geen pauze.",
      "Bij een reactie: stop direct en bel de huisarts. Verder introduceren alleen in overleg met een arts.",
    ],
  },
  {
    nummer: 4,
    thema: "Pinda vasthouden + start 2 hapjes",
    ondertitel: "2 hapjes per dag",
    labels: ["Fruit: peer, appel, avocado", "Groente: venkel, doperwten, snijbonen"],
    dagen: [
      {
        dag: "Ma",
        hapjes: [
          { item: "Peer", blokjes: 1 },
          {
            item: "Venkel",
            blokjes: 1,
            allergen: "pinda",
            allergenAmount: "1 tl pindakaas",
          },
        ],
      },
      {
        dag: "Di",
        hapjes: [
          { item: "Appel", blokjes: 1 },
          { item: "Doperwten", blokjes: 1 },
        ],
      },
      {
        dag: "Wo",
        hapjes: [
          { item: "Peer", blokjes: 1 },
          {
            item: "Snijbonen",
            blokjes: 1,
            allergen: "pinda",
            allergenAmount: "1 tl pindakaas",
          },
        ],
      },
      {
        dag: "Do",
        hapjes: [
          { item: "Avocado", blokjes: 1 },
          { item: "Venkel", blokjes: 1 },
        ],
      },
      {
        dag: "Vr",
        hapjes: [
          { item: "Peer", blokjes: 1 },
          {
            item: "Doperwten",
            blokjes: 1,
            allergen: "pinda",
            allergenAmount: "1 tl pindakaas",
          },
        ],
      },
      {
        dag: "Za",
        hapjes: [
          { item: "Appel", blokjes: 1 },
          { item: "Snijbonen", blokjes: 1 },
        ],
      },
      {
        dag: "Zo",
        hapjes: [
          { item: "Peer", blokjes: 1 },
          { item: "Venkel", blokjes: 1 },
        ],
      },
    ],
    notes: ["Pinda 3x deze week = exact het minimum van 3 theelepels."],
  },
  {
    nummer: 5,
    thema: "Ei-introductie",
    ondertitel: "2 hapjes per dag",
    labels: ["Fruit: appel, avocado, banaan", "Groente: bloemkool, zoete aardappel, courgette"],
    dagen: [
      {
        dag: "Ma",
        hapjes: [
          { item: "Appel", blokjes: 1 },
          { item: "Bloemkool", blokjes: 1, allergen: "ei", allergenAmount: "1 tl ei" },
        ],
      },
      {
        dag: "Di",
        hapjes: [
          {
            item: "Avocado",
            blokjes: 1,
            allergen: "pinda",
            allergenAmount: "1 tl pindakaas",
          },
          {
            item: "Zoete aardappel",
            blokjes: 1,
            allergen: "ei",
            allergenAmount: "1 el ei",
          },
        ],
      },
      {
        dag: "Wo",
        hapjes: [
          { item: "Banaan", blokjes: 1, fresh: true },
          { item: "Courgette", blokjes: 1, allergen: "ei", allergenAmount: "2 el ei" },
        ],
      },
      {
        dag: "Do",
        hapjes: [
          {
            item: "Banaan",
            blokjes: 1,
            fresh: true,
            allergen: "pinda",
            allergenAmount: "1 tl pindakaas",
          },
          { item: "Bloemkool", blokjes: 1 },
        ],
      },
      {
        dag: "Vr",
        hapjes: [
          { item: "Avocado", blokjes: 1 },
          { item: "Zoete aardappel", blokjes: 1 },
        ],
      },
      {
        dag: "Za",
        hapjes: [
          {
            item: "Appel",
            blokjes: 1,
            fresh: true,
            allergen: "pinda",
            allergenAmount: "1 tl pindakaas",
          },
          { item: "Courgette", blokjes: 1 },
        ],
      },
      {
        dag: "Zo",
        hapjes: [
          { item: "Peer", blokjes: 1 },
          { item: "Bloemkool", blokjes: 1 },
        ],
      },
    ],
    notes: [
      "Ma–wo = de officiële ei-opbouw: achter elkaar, geen pauze.",
      "Pinda en ei nooit op dezelfde dag introduceren.",
      "* Vers prakken vlak voor het hapje.",
    ],
  },
  {
    nummer: 6,
    thema: "Ei vasthouden + groente naar 2 blokjes",
    ondertitel: "2 hapjes per dag",
    labels: ["Fruit: 1 blokje", "Groente: 2 blokjes"],
    dagen: [
      {
        dag: "Ma",
        hapjes: [
          {
            item: "Appel",
            blokjes: 1,
            allergen: "pinda",
            allergenAmount: "1 tl pindakaas",
          },
          { item: "Venkel", blokjes: 2, allergen: "ei", allergenAmount: "¼ ei" },
        ],
      },
      {
        dag: "Di",
        hapjes: [
          { item: "Banaan", blokjes: 1, fresh: true },
          { item: "Doperwten", blokjes: 2 },
        ],
      },
      {
        dag: "Wo",
        hapjes: [
          {
            item: "Banaan",
            blokjes: 1,
            fresh: true,
            allergen: "pinda",
            allergenAmount: "1 tl pindakaas",
          },
          { item: "Wortel", blokjes: 2, allergen: "ei", allergenAmount: "¼ ei" },
        ],
      },
      {
        dag: "Do",
        hapjes: [
          { item: "Avocado", blokjes: 1 },
          { item: "Venkel", blokjes: 2 },
        ],
      },
      {
        dag: "Vr",
        hapjes: [
          {
            item: "Appel",
            blokjes: 1,
            fresh: true,
            allergen: "pinda",
            allergenAmount: "1 tl pindakaas",
          },
          { item: "Doperwten", blokjes: 2 },
        ],
      },
      {
        dag: "Za",
        hapjes: [
          { item: "Peer", blokjes: 1 },
          { item: "Wortel", blokjes: 2 },
        ],
      },
      {
        dag: "Zo",
        hapjes: [
          { item: "Appel", blokjes: 1 },
          { item: "Venkel", blokjes: 2 },
        ],
      },
    ],
    notes: [
      "2x ¼ ei deze week = samen het halve-ei-minimum. Pinda 3x.",
      "Eet je baby de 2 ijsblokjes nog niet op? Ga gewoon terug naar 1.",
      "* Vers prakken vlak voor het hapje.",
    ],
  },
  {
    nummer: 7,
    thema: "Mengen van 2 smaken + fruit naar 2 blokjes",
    ondertitel: "2 hapjes per dag",
    labels: ["Fruit: 2 blokjes", "Groente: 2 blokjes, 2 smaken"],
    dagen: [
      {
        dag: "Ma",
        hapjes: [
          {
            item: "Appel",
            blokjes: 2,
            allergen: "pinda",
            allergenAmount: "1 tl pindakaas",
          },
          { item: "Bloemkool + venkel", blokjes: 2 },
        ],
      },
      {
        dag: "Di",
        hapjes: [
          { item: "Avocado", blokjes: 2 },
          { item: "Zoete aardappel + snijbonen", blokjes: 2 },
        ],
      },
      {
        dag: "Wo",
        hapjes: [
          { item: "Banaan", blokjes: 2, fresh: true },
          {
            item: "Courgette + wortel",
            blokjes: 2,
            allergen: "ei",
            allergenAmount: "¼ ei",
          },
        ],
      },
      {
        dag: "Do",
        hapjes: [
          { item: "Banaan", blokjes: 2, fresh: true },
          { item: "Bloemkool + broccoli", blokjes: 2 },
        ],
      },
      {
        dag: "Vr",
        hapjes: [
          {
            item: "Avocado",
            blokjes: 2,
            allergen: "pinda",
            allergenAmount: "1 tl pindakaas",
          },
          { item: "Zoete aardappel + venkel", blokjes: 2 },
        ],
      },
      {
        dag: "Za",
        hapjes: [
          { item: "Mango", blokjes: 2 },
          {
            item: "Pastinaak + snijbonen",
            blokjes: 2,
            allergen: "ei",
            allergenAmount: "¼ ei",
          },
        ],
      },
      {
        dag: "Zo",
        hapjes: [
          { item: "Appel", blokjes: 2 },
          {
            item: "Bloemkool + wortel",
            blokjes: 2,
            allergen: "pinda",
            allergenAmount: "1 tl pindakaas",
          },
        ],
      },
    ],
    notes: [
      "Pinda 2x + ei 2x deze week — samen ruim boven beide minimums.",
      "* Vers prakken vlak voor het hapje.",
    ],
  },
  {
    nummer: 8,
    thema: "Mengen van 2-3 smaken + extra fruitvariatie",
    ondertitel: "2 hapjes per dag, beide 2 blokjes",
    labels: ["Fruit: + kiwi & mango", "Groente: oplopend naar 3 smaken"],
    dagen: [
      {
        dag: "Ma",
        hapjes: [
          {
            item: "Peer",
            blokjes: 2,
            allergen: "pinda",
            allergenAmount: "1 tl pindakaas",
          },
          {
            item: "Bloemkool + doperwten + wortel",
            blokjes: 2,
            allergen: "ei",
            allergenAmount: "¼ ei",
          },
        ],
      },
      {
        dag: "Di",
        hapjes: [
          { item: "Kiwi", blokjes: 2, fresh: true },
          { item: "Zoete aardappel + snijbonen + broccoli", blokjes: 2 },
        ],
      },
      {
        dag: "Wo",
        hapjes: [
          {
            item: "Avocado",
            blokjes: 2,
            allergen: "pinda",
            allergenAmount: "1 tl pindakaas",
          },
          { item: "Courgette + pastinaak + wortel", blokjes: 2 },
        ],
      },
      {
        dag: "Do",
        hapjes: [
          { item: "Mango", blokjes: 2 },
          {
            item: "Venkel + doperwten + broccoli",
            blokjes: 2,
            allergen: "ei",
            allergenAmount: "¼ ei",
          },
        ],
      },
      {
        dag: "Vr",
        hapjes: [
          { item: "Banaan", blokjes: 2, fresh: true },
          { item: "Zoete aardappel + courgette", blokjes: 2 },
        ],
      },
      {
        dag: "Za",
        hapjes: [
          {
            item: "Mango",
            blokjes: 2,
            allergen: "pinda",
            allergenAmount: "1 tl pindakaas",
          },
          { item: "Bloemkool + venkel + wortel", blokjes: 2 },
        ],
      },
      {
        dag: "Zo",
        hapjes: [
          { item: "Kiwi", blokjes: 2, fresh: true },
          { item: "Snijbonen + broccoli + courgette", blokjes: 2 },
        ],
      },
    ],
    notes: [
      "Ei 2x ¼ + pinda 3x — beide minimums ruim gehaald. Vanaf hier komen ei en pinda het hele jaar wekelijks terug.",
      "* Kiwi en banaan vers prakken, niet invriezen. Mango prep je wel mee.",
    ],
  },
];

export const basisregels: string[] = [
  "Baby hoeft het hapje niet op te eten — het zijn oefenhapjes, geen maaltijden.",
  "Een smaak mag tot 15 keer nodig hebben. Niet 15 dagen achter elkaar: blijf gewoon variëren.",
  "Begin met 1 ijsblokje (±15 g) per hapje en ga naar 2 zodra je baby het makkelijk opeet.",
  "Pinda en ei nooit op dezelfde dag introduceren.",
  "Kinderen onder de 4 jaar nooit hele pinda's of noten — alleen pindakaas of fijngemalen.",
  "Bij eczeem of allergie in de familie: eerst overleggen met consultatiebureau of huisarts.",
];

export const opbouw = {
  pinda: {
    titel: "Opbouw pinda",
    sub: "100% pindakaas, geen stukjes, suiker of zout. Mengen door fruit of groente.",
    rijen: [
      ["Dag 1", "½ theelepel"],
      ["Dag 2", "1 theelepel"],
      ["Dag 3", "3 theelepels"],
      ["Daarna", "min. 3 tl per week, blijvend"],
    ],
  },
  ei: {
    titel: "Opbouw ei",
    sub: "Goed gaar (roerei of hardgekookt). Mengen door groente of fruit.",
    rijen: [
      ["Dag 1", "1 theelepel ei"],
      ["Dag 2", "1 eetlepel ei"],
      ["Dag 3", "2 eetlepels ei"],
      ["Daarna", "min. ½ ei per week tot 1 jaar"],
    ],
  },
};
