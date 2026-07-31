const fs = require("fs");

const path = "app/page.tsx";
let source = fs.readFileSync(path, "utf8");

source = source.replace(
  /const mainMissions: Choice\[] = \[[\s\S]*?\n\];\n\nconst sideQuests:/,
  `const mainMissions: Choice[] = [
  {
    name: "Universal Studios Hollywood: Buy a Day, Get a 2nd Day Free",
    price: 289.9,
    image: "/assets/venues/universal-studios.jpeg",
    note: "Friday, Aug 7 · 2 adults · first visit valid 08/07/26 · order confirmed",
    locked: true,
    statusLabel: "CONFIRMED",
    statusDetail: "$289.90 · 2 TICKETS",
    actions: [
      {
        label: "UNIVERSAL",
        url: "https://www.universalstudioshollywood.com/",
      },
    ],
  },
  {
    name: "The Odyssey in 70mm IMAX",
    price: 70,
    image: "https://coolidge.org/sites/default/files/featured_images/CT-03414.jpg",
    imagePosition: "center 36%",
    note: "Saturday, Aug 8 · 2:50 PM · TCL Chinese Theatre · purchased",
    locked: true,
    actions: [{ label: "MOVIE", url: "https://www.theodysseymovie.com/" }],
  },
];

const sideQuests:`,
);

source = source.replace(
  'const [mission, setMission] = useState<number | null>(null);',
  'const [mission, setMission] = useState<number | null>(0);',
);
source = source.replace('setMission(s.mission ?? null);', 'setMission(0);');
source = source.replace('setMission(null);', 'setMission(0);');
source = source.replace(
  '      (mission === null ? 0 : mainMissions[mission].price) +\n      70 +',
  '      mainMissions[0].price +\n      70 +',
);
source = source.replace('    (mission === null ? 0 : 40) +', '    40 +');
source = source.replace(
  '    mission === null\n      ? "Universal: TBD"\n      : `Universal: ${mainMissions[mission].name} — $${mainMissions[mission].price}`,',
  '    `Universal: ${mainMissions[0].name} — $${mainMissions[0].price.toFixed(2)} — confirmed`,',
);
source = source.replace(
  '                mission === null\n                  ? "CHOOSE TICKETS"\n                  : `${mainMissions[mission].name} · $${mainMissions[mission].price}`',
  '                `${mainMissions[0].name} · $${mainMissions[0].price.toFixed(2)} · CONFIRMED`',
);

source = source.replace(
  '  const mail = `mailto:?subject=${encodeURIComponent("Our LA Anniversary Mission")}&body=${encodeURIComponent(summary)}`;',
  String.raw`  const mail = \`mailto:?subject=\${encodeURIComponent("Our LA Anniversary Mission")}&body=\${encodeURIComponent(summary)}\`;
  const downloadCalendar = () => {
    const esc = (value: string) => value.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
    const events = [
      ["20260807T051500", "20260807T081500", "Drive to Los Angeles", "Leave San Diego for Universal Studios Hollywood", "San Diego, CA"],
      ["20260807T081500", "20260807T210000", "Universal Studios Hollywood", "Confirmed Buy a Day, Get a 2nd Day Free tickets for Adam Daniels and Aurora Zo", places["Universal Studios Hollywood"].address],
      ["20260807T212000", "20260807T220000", "Palihotel Hollywood check-in", "The King Pool View · reservation confirmed", places["Palihotel Hollywood"].address],
      ["20260808T100000", "20260808T121500", "Saturday morning adventure", "Selected museum, pool, or neighborhood plan from the itinerary", "Los Angeles, CA"],
      ["20260808T142000", "20260808T174200", "The Odyssey in 70mm IMAX", "2:50 PM screening · arrive by 2:20 PM · tickets purchased", places["TCL Chinese Theatre"].address],
      ["20260808T190000", "20260808T210000", "Slice’s Mystery Box", "Contents classified", "Los Angeles, CA"],
      ["20260809T080000", "20260809T083000", "Palihotel Hollywood check-out", "Leave bags with hotel if needed", places["Palihotel Hollywood"].address],
      ["20260809T090000", "20260809T110000", "Griffith Observatory hike", "Fern Dell to Griffith Observatory", places["Griffith Observatory and Griffith Park Hike"].address],
      ["20260809T133000", "20260809T170000", "Return to San Diego", "Collect bags and depart Los Angeles", places["Palihotel Hollywood"].address],
    ];
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
    const body = events.map(([start, end, title, description, location], index) => [
      "BEGIN:VEVENT",
      \`UID:slice-dice-percy-\${index + 1}@la-anniversary\`,
      \`DTSTAMP:\${stamp}\`,
      \`DTSTART;TZID=America/Los_Angeles:\${start}\`,
      \`DTEND;TZID=America/Los_Angeles:\${end}\`,
      \`SUMMARY:\${esc(title)}\`,
      \`DESCRIPTION:\${esc(description)}\`,
      \`LOCATION:\${esc(location)}\`,
      "END:VEVENT",
    ].join("\r\n")).join("\r\n");
    const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Slice Dice Percy//LA Anniversary//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", body, "END:VCALENDAR"].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "slice-dice-percy-la-anniversary.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };`,
);
source = source.replace(
  '              <a href={mail}>OPEN EMAIL DRAFT</a>',
  '              <a href={mail}>OPEN EMAIL DRAFT</a>\n              <button type="button" onClick={downloadCalendar}>ADD TO APPLE CALENDAR</button>',
);

fs.writeFileSync(path, source);

const cssPath = "app/globals.css";
let css = fs.readFileSync(cssPath, "utf8");
if (!css.includes(".dispatch-actions button")) {
  css += `\n.dispatch-actions button { padding:13px 17px; border:3px solid #111; background:var(--gold); color:#111; font:1000 1rem/1 Arial,sans-serif; cursor:pointer; }\n`;
  fs.writeFileSync(cssPath, css);
}

console.log("Applied confirmed Universal tickets, Odyssey widescreen still, and calendar export.");
