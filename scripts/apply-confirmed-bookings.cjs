const fs = require("fs");

const path = "app/page.tsx";
let source = fs.readFileSync(path, "utf8");

source = source.replace(
  /const hotelParking = \[[^\]]*\];/,
  "const hotelParking = [80];",
);

source = source.replace(
  /const hotels: Choice\[] = \[[\s\S]*?\n\];\n\nconst mainMissions:/,
  `const hotels: Choice[] = [
  {
    name: "Palihotel Hollywood",
    price: 492,
    image: "/assets/venues/palihotel-hollywood.jpg",
    note: "Aug 7–9 · The King Pool View · reservation confirmed",
    locked: true,
    statusLabel: "CONFIRMED",
    statusDetail: "KING POOL VIEW",
    actions: [
      { label: "HOTEL", url: "https://www.palisociety.com/hotels/hollywood" },
    ],
  },
];

const mainMissions:`,
);

source = source.replace(
  'note: "August 8 · 2 hours · Contents classified",',
  'note: "August 8 · 7:00–9:00 PM · Contents classified",',
);
source = source.replace(
  'statusDetail: "2 HOURS",',
  'statusDetail: "7:00–9:00 PM",',
);

source = source.replace(
  'const [hotel, setHotel] = useState<number | null>(null);',
  'const [hotel, setHotel] = useState<number | null>(0);',
);
source = source.replace(
  'setHotel(s.hotel ?? null);',
  'setHotel(0);',
);
source = source.replace(
  'setHotel(null);',
  'setHotel(0);',
);

source = source.replace(
  /\n\s*\(dinner === null \? 0 : dinners\[dinner\]\.price\) \+/,
  "",
);
source = source.replace(
  '    [hotel, mission, quests, dinner, picks],',
  '    [hotel, mission, quests, picks],',
);
source = source.replace(
  /\n\s*\.\.\.\(dinner === null \? \[\] : \[\{ name: dinners\[dinner\]\.name, subtitle: "Saturday · 7:30 PM" \}\]\),/,
  "",
);
source = source.replace(
  /\n\s*dinner === null \? "7:30 PM — Anniversary dinner \(choose a restaurant\)" : `7:30 PM — Anniversary dinner at \$\{dinners\[dinner\]\.name\}`,/,
  "",
);
source = source.replace(
  '    "9:45–11:45 PM — Slice’s Mystery Box",',
  '    "7:00–9:00 PM — Slice’s Mystery Box",',
);
source = source.replace(
  /\n\s*`Dinner: \$\{dinner === null \? "TBD" : dinners\[dinner\]\.name\}`,/,
  "",
);

source = source.replace(
  /\n\s*<section className="chapter chapter-red" id="chapter-4">[\s\S]*?<\/section>\n\s*<section className="chapter" id="chapter-5">/,
  '\n        <section className="chapter" id="chapter-5">',
);

source = source.replace(
  /\n\s*<Line\n\s*label="Dinner"[\s\S]*?<\/Line>/,
  "",
);

source = source.replace(
  "The route updates from the hotel, museum, dinner and snack choices on the Mission Board.",
  "The route updates from the confirmed hotel, museum and snack choices on the Mission Board.",
);
source = source.replace(
  "Restaurant and snack totals are menu-based estimates;",
  "Snack totals are menu-based estimates;",
);

fs.writeFileSync(path, source);
console.log("Applied confirmed Palihotel booking and updated Mystery Box schedule.");
