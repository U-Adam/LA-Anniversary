"use client";

import { useEffect, useMemo, useState } from "react";

type Action = { label: string; url: string };
type Choice = {
  name: string;
  price: number;
  image: string;
  imagePosition?: string;
  note: string;
  group?: string;
  locked?: boolean;
  statusLabel?: string;
  statusDetail?: string;
  actions: Action[];
};

const hotels: Choice[] = [
  {
    name: "The Delphi",
    price: 402,
    image: "/assets/venues/the-delphi.jpg",
    imagePosition: "center 58%",
    note: "Two nights · Downtown Los Angeles",
    actions: [{ label: "BOOK", url: "https://www.thedelphihotel.com/" }],
  },
  {
    name: "Millennium Biltmore Los Angeles",
    price: 441,
    image: "/assets/venues/the-biltmore.webp",
    note: "Two nights · Old-Hollywood grandeur",
    actions: [
      {
        label: "BOOK",
        url: "https://www.millenniumhotels.com/en/los-angeles/millennium-biltmore-hotel-los-angeles/",
      },
    ],
  },
  {
    name: "Hollywood Franklin",
    price: 501,
    image: "/assets/venues/hollywood-franklin.webp",
    note: "Two nights · Hollywood basecamp",
    actions: [{ label: "BOOK", url: "https://www.thehollywoodfranklin.com/" }],
  },
  {
    name: "The LINE LA",
    price: 507,
    image: "/assets/venues/the-line-la.webp",
    imagePosition: "center 70%",
    note: "Two nights · Koreatown cool",
    actions: [
      { label: "BOOK", url: "https://www.thelinehotel.com/los-angeles/" },
    ],
  },
  {
    name: "Los Angeles Athletic Club",
    price: 615,
    image: "/assets/venues/los-angeles-athletic-club.jpg",
    note: "Two nights · Historic club hideout",
    actions: [{ label: "BOOK", url: "https://www.laac.com/hotel/" }],
  },
  {
    name: "Cara Hotel",
    price: 666,
    image: "/assets/venues/cara-hotel.webp",
    note: "Two nights · Courtyard romance",
    actions: [{ label: "BOOK", url: "https://www.carahotel.com/" }],
  },
  {
    name: "Palihotel Hollywood",
    price: 492,
    image: "/assets/venues/palihotel-hollywood.jpg",
    note: "Two nights · Sunset Boulevard",
    actions: [
      { label: "BOOK", url: "https://www.palisociety.com/hotels/hollywood" },
    ],
  },
];

const mainMissions: Choice[] = [
  {
    name: "Universal Studios Hollywood: General Admission",
    price: 218,
    image: "/assets/venues/universal-studios.jpeg",
    note: "Two people · General admission",
    actions: [
      {
        label: "TICKETS",
        url: "https://www.universalstudioshollywood.com/web/en/us/tickets-packages/general-admission-tickets",
      },
    ],
  },
  {
    name: "Universal Studios Hollywood: Universal Express",
    price: 378,
    image: "/assets/venues/universal-studios.jpeg",
    note: "Two people · Express access",
    actions: [
      {
        label: "TICKETS",
        url: "https://www.universalstudioshollywood.com/web/en/us/tickets-packages/universal-express",
      },
    ],
  },
  {
    name: "The Odyssey in 70mm IMAX",
    price: 70,
    image: "/assets/reference/comic-cover.webp",
    note: "Two people · Already purchased",
    locked: true,
    actions: [{ label: "MOVIE", url: "https://www.theodysseymovie.com/" }],
  },
];

const sideQuests: Choice[] = [
  {
    name: "Academy Museum of Motion Pictures",
    price: 50,
    image: "/assets/venues/academy-museum.jpg",
    note: "Two people",
    actions: [
      { label: "TICKETS", url: "https://www.academymuseum.org/en/tickets" },
    ],
  },
  {
    name: "LACMA",
    price: 50,
    image: "/assets/venues/lacma-urban-light.webp",
    note: "Two people",
    actions: [{ label: "TICKETS", url: "https://www.lacma.org/tickets" }],
  },
  {
    name: "Griffith Observatory and Griffith Park Hike",
    price: 0,
    image: "/assets/venues/griffith-observatory.jpg",
    note: "Free · Parking and transportation not included",
    actions: [
      {
        label: "INFO",
        url: "https://griffithobservatory.org/explore/griffith-park/",
      },
    ],
  },
  {
    group: "SATURDAY NIGHT",
    name: "Slice’s Mystery Box",
    price: 0,
    image: "/assets/events/slices-mystery-box.webp",
    note: "August 8 · 2 hours · Contents classified",
    locked: true,
    statusLabel: "SCHEDULED",
    statusDetail: "2 HOURS",
    actions: [],
  },
];

const dinners: Choice[] = [
  {
    name: "Mother Wolf",
    price: 220,
    image: "/assets/venues/mother-wolf.jpg",
    note: "Estimated for two",
    actions: [
      { label: "RESERVE", url: "https://motherwolfla.com/" },
      { label: "MENU", url: "https://motherwolfla.com/" },
    ],
  },
  {
    name: "Cara Restaurant",
    price: 180,
    image: "/assets/venues/cara-restaurant.webp",
    note: "Estimated for two",
    actions: [
      { label: "RESERVE", url: "https://www.carahotel.com/cara-restaurant/" },
      { label: "MENU", url: "https://www.carahotel.com/cara-restaurant/" },
    ],
  },
  {
    name: "Musso & Frank Grill",
    price: 190,
    image: "/assets/venues/musso-and-frank-grill.jpg",
    note: "Estimated for two",
    actions: [
      { label: "RESERVE", url: "https://mussoandfrank.com/" },
      { label: "MENU", url: "https://mussoandfrank.com/menu/appetizers/" },
    ],
  },
  {
    name: "Yamashiro Hollywood",
    price: 190,
    image: "/assets/venues/yamashiro-hollywood.jpg",
    note: "Estimated for two",
    actions: [
      { label: "RESERVE", url: "https://yamashirohollywood.com/" },
      { label: "MENU", url: "https://yamashirohollywood.com/" },
    ],
  },
  {
    name: "Firefly",
    price: 175,
    image: "/assets/venues/firefly.jpg",
    note: "Estimated for two",
    actions: [
      {
        label: "RESERVE",
        url: "https://www.fireflystudiocity.com/reservations",
      },
      { label: "MENU", url: "https://www.fireflystudiocity.com/menu" },
    ],
  },
  {
    name: "Kismet",
    price: 150,
    image: "/assets/venues/kismet.jpg",
    note: "Estimated for two",
    actions: [
      { label: "RESERVE", url: "https://www.kismetla.com/resy" },
      { label: "MENU", url: "https://www.kismetla.com/menu" },
    ],
  },
];

const percyPicks: Choice[] = [
  {
    group: "COFFEE",
    name: "Go Get Em Tiger",
    price: 30,
    image: "/assets/venues/go-get-em-tiger.webp",
    note: "$30 for two",
    actions: [{ label: "LOCATIONS", url: "https://gget.com/pages/locations" }],
  },
  {
    group: "COFFEE",
    name: "Maru Coffee",
    price: 30,
    image: "/assets/venues/maru-coffee.webp",
    note: "$30 for two",
    actions: [
      { label: "LOCATIONS", url: "https://www.marucoffee.com/pages/locations" },
    ],
  },
  {
    group: "COFFEE",
    name: "Alfred Coffee",
    price: 30,
    image: "/assets/venues/alfred-coffee.webp",
    note: "$30 for two",
    actions: [{ label: "VISIT", url: "https://alfred.la/" }],
  },
  {
    group: "SNACKS + PASTRIES",
    name: "Voodoo Doughnut at Universal CityWalk",
    price: 20,
    image: "/assets/venues/voodoo-doughnut.webp",
    imagePosition: "center 28%",
    note: "$20 for two",
    actions: [
      {
        label: "INFO",
        url: "https://www.universalstudioshollywood.com/web/en/us/things-to-do/dining/citywalk/voodoo-doughnut",
      },
    ],
  },
  {
    group: "SNACKS + PASTRIES",
    name: "Tartine",
    price: 30,
    image: "/assets/venues/tartine.jpg",
    note: "$30 for two",
    actions: [{ label: "MENU", url: "https://tartinebakery.com/menus/" }],
  },
  {
    group: "LUNCH + CASUAL",
    name: "Grand Central Market",
    price: 60,
    image: "/assets/venues/grand-central-market.jpg",
    note: "$60 for two",
    actions: [
      {
        label: "VISIT",
        url: "https://grandcentralmarket.com/visit-the-market/",
      },
    ],
  },
  {
    group: "LUNCH + CASUAL",
    name: "Fanny’s",
    price: 70,
    image: "/assets/venues/fannys.webp",
    note: "$70 for two",
    actions: [
      { label: "RESERVE", url: "https://fannysla.com/reservations" },
      { label: "MENU", url: "https://fannysla.com/menu-1" },
    ],
  },
  {
    group: "LUNCH + CASUAL",
    name: "Little Dom’s",
    price: 80,
    image: "/assets/venues/little-doms.jpg",
    note: "$80 for two",
    actions: [
      { label: "RESERVE", url: "https://www.littledoms.com/reserve" },
      { label: "MENU", url: "https://www.littledoms.com/dinner-menu" },
    ],
  },
  {
    group: "LUNCH + CASUAL",
    name: "Rendezvous Court",
    price: 90,
    image: "/assets/venues/rendezvous-court.jpg",
    note: "$90 for two",
    actions: [
      {
        label: "VISIT",
        url: "https://www.millenniumhotels.com/en/los-angeles/millennium-biltmore-hotel-los-angeles/rendezvous-court-cafe",
      },
    ],
  },
];

const quotes = [
  "“You had me at hello.”",
  "“To me, you are perfect.”",
  "“As you wish.”",
  "“You make me want to be a better man.”",
];

function PlaceImage({ item }: { item: Choice }) {
  return (
    <div className="card-image">
      <img
        src={item.image}
        alt={item.name}
        loading="eager"
        style={
          item.imagePosition
            ? { objectPosition: item.imagePosition }
            : undefined
        }
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/assets/reference/comic-cover.webp";
        }}
      />
      {item.group && <span className="pick-group">{item.group}</span>}
    </div>
  );
}

function ChoiceCard({
  item,
  selected,
  onSelect,
}: {
  item: Choice;
  selected: boolean;
  onSelect?: () => void;
}) {
  return (
    <article
      className={`mission-card ${selected ? "selected" : ""} ${item.locked ? "locked" : ""}`}
    >
      <PlaceImage item={item} />
      <div className="card-copy">
        <div className="card-info">
          <h3>{item.name}</h3>
          <p>{item.note}</p>
          <div className="card-actions">
            {item.actions.map((a) => (
              <a key={a.label} href={a.url} target="_blank" rel="noreferrer">
                {a.label} ↗
              </a>
            ))}
          </div>
        </div>
        {item.locked ? (
          <div className="purchased">
            <span>{item.statusLabel ? "★" : "✓"}</span>
            {item.statusLabel ?? "PURCHASED"}
            <br />
            <b>{item.statusDetail ?? `$${item.price}`}</b>
          </div>
        ) : (
          <button
            type="button"
            className="choose-control"
            onClick={onSelect}
            aria-pressed={selected}
          >
            <span>{selected ? "✓" : ""}</span>
            <em>CHOOSE</em>
            <b>${item.price}</b>
          </button>
        )}
      </div>
    </article>
  );
}

export default function Home() {
  const [hotel, setHotel] = useState<number | null>(null);
  const [mission, setMission] = useState<number | null>(null);
  const [quests, setQuests] = useState<number[]>([]);
  const [dinner, setDinner] = useState<number | null>(null);
  const [picks, setPicks] = useState<number[]>([]);
  const [taxes, setTaxes] = useState(true);
  const [effect, setEffect] = useState<"slice" | "dice" | "percy" | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("slice-dice-percy-plan");
    if (!saved) return;
    try {
      const s = JSON.parse(saved);
      setHotel(s.hotel ?? null);
      setMission(s.mission ?? null);
      setQuests(s.quests ?? []);
      setDinner(s.dinner ?? null);
      setPicks(s.picks ?? []);
      setTaxes(s.taxes ?? true);
    } catch {}
  }, []);
  useEffect(() => {
    if (!effect) return;
    const timer = setTimeout(
      () => setEffect(null),
      effect === "percy" ? 1100 : 2400,
    );
    return () => clearTimeout(timer);
  }, [effect]);

  const subtotal = useMemo(
    () =>
      (hotel === null ? 0 : hotels[hotel].price) +
      (mission === null ? 0 : mainMissions[mission].price) +
      70 +
      quests.reduce((s, i) => s + sideQuests[i].price, 0) +
      (dinner === null ? 0 : dinners[dinner].price) +
      picks.reduce((s, i) => s + percyPicks[i].price, 0),
    [hotel, mission, quests, dinner, picks],
  );
  const tax = taxes ? Math.round(subtotal * 0.095) : 0;
  const total = subtotal + tax;
  const chosenQuestIndexes = sideQuests
    .map((item, i) => ({ item, i }))
    .filter(({ item, i }) => item.locked || quests.includes(i))
    .map(({ i }) => i);
  const save = () => {
    localStorage.setItem(
      "slice-dice-percy-plan",
      JSON.stringify({ hotel, mission, quests, dinner, picks, taxes }),
    );
    alert("MISSION SAVED!");
  };
  const reset = () => {
    setHotel(null);
    setMission(null);
    setQuests([]);
    setDinner(null);
    setPicks([]);
    localStorage.removeItem("slice-dice-percy-plan");
  };
  const summary = [
    "SLICE, DICE & PERCY — LA ANNIVERSARY MISSION",
    hotel === null
      ? "Hotel: TBD"
      : `Hotel: ${hotels[hotel].name} — $${hotels[hotel].price}`,
    mission === null
      ? "Universal: TBD"
      : `Universal: ${mainMissions[mission].name} — $${mainMissions[mission].price}`,
    "The Odyssey in 70mm IMAX — $70 — purchased",
    `Side quests: ${chosenQuestIndexes.map((i) => sideQuests[i].name).join(", ")}`,
    `Dinner: ${dinner === null ? "TBD" : dinners[dinner].name}`,
    `Percy’s Picks: ${picks.length ? picks.map((i) => percyPicks[i].name).join(", ") : "None"}`,
    `Estimated total: $${total}`,
  ].join("\n");
  const mail = `mailto:?subject=${encodeURIComponent("Our LA Anniversary Mission")}&body=${encodeURIComponent(summary)}`;

  return (
    <main>
      <section className="cover" id="top">
        <header className="cover-title">
          <small>The Adventures of</small>
          <h1>
            Slice and Dice <em>...and Percy!</em>
          </h1>
          <p>(special 2nd anniversary edition)</p>
        </header>
        <div className="cover-art">
          <img
            src="/assets/reference/comic-cover.webp"
            alt="Slice, Dice and Percy with five illustrated chapter panels"
          />
          <div
            className="cover-date-stamp"
            aria-label="Anniversary date August 8th, 2026"
          >
            AUG 8TH, 2026
          </div>
          <div className="cover-shade" />
          <button
            type="button"
            className="character-hit slice-hit"
            onClick={() => setEffect("slice")}
            aria-label="Animate Slice"
          />
          <button
            type="button"
            className="character-hit dice-hit"
            onClick={() => setEffect("dice")}
            aria-label="Animate Dice"
          />
          <button
            type="button"
            className="character-hit percy-hit"
            onClick={() => setEffect("percy")}
            aria-label="Animate Percy"
          />
          {[
            "chapter-1",
            "chapter-2",
            "chapter-3",
            "chapter-4",
            "chapter-5",
          ].map((id, i) => (
            <a
              key={id}
              className="chapter-art-link"
              href={`#${id}`}
              style={{ left: `${i * 20}%` }}
              aria-label={`Jump to chapter ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {effect && (
        <div
          className={`effect effect-${effect}`}
          onClick={() => setEffect(null)}
        >
          {effect === "slice" && (
            <>
              <div className="rainbow" />
              {Array.from({ length: 14 }).map((_, i) => (
                <div
                  className={`dolphin d${(i % 2) + 1}`}
                  key={i}
                  style={{
                    animationDelay: `${i * 0.08}s`,
                    top: `${5 + (i % 6) * 14}%`,
                  }}
                >
                  🐬
                </div>
              ))}
              <strong>FULL BODY!</strong>
            </>
          )}
          {effect === "dice" && (
            <>
              <div className="dice-storm">
                {Array.from({ length: 18 }).map((_, i) => (
                  <i key={i}>⚄</i>
                ))}
              </div>
              <strong>
                {quotes[Math.floor(Math.random() * quotes.length)]}
              </strong>
            </>
          )}
          {effect === "percy" && (
            <>
              <strong>THINK FAST!</strong>
              <div
                className="percy-charge"
                role="img"
                aria-label="Percy charges toward the screen"
              />
              <b>WHUMP!</b>
            </>
          )}
        </div>
      )}

      <div className="story-shell">
        <section className="chapter" id="chapter-1">
          <header>
            <div>
              <p>CHAPTER 1 · HOTELS — TWO NIGHTS</p>
              <h2>SECRET LAIRS</h2>
            </div>
          </header>
          <div className="card-grid">
            {hotels.map((x, i) => (
              <ChoiceCard
                key={x.name}
                item={x}
                selected={hotel === i}
                onSelect={() => setHotel(hotel === i ? null : i)}
              />
            ))}
          </div>
        </section>
        <section className="chapter chapter-red" id="chapter-2">
          <header>
            <div>
              <p>CHAPTER 2 · TWO PEOPLE</p>
              <h2>MAIN MISSIONS</h2>
            </div>
          </header>
          <div className="card-grid">
            {mainMissions.map((x, i) => (
              <ChoiceCard
                key={x.name}
                item={x}
                selected={x.locked || mission === i}
                onSelect={() =>
                  !x.locked && setMission(mission === i ? null : i)
                }
              />
            ))}
          </div>
        </section>
        <section className="chapter" id="chapter-3">
          <header>
            <div>
              <p>CHAPTER 3 · TWO PEOPLE</p>
              <h2>SIDE QUESTS</h2>
            </div>
          </header>
          <div className="card-grid three">
            {sideQuests.map((x, i) => (
              <ChoiceCard
                key={x.name}
                item={x}
                selected={x.locked || quests.includes(i)}
                onSelect={() =>
                  !x.locked &&
                  setQuests(
                    quests.includes(i)
                      ? quests.filter((n) => n !== i)
                      : [...quests, i],
                  )
                }
              />
            ))}
          </div>
        </section>
        <section className="chapter chapter-red" id="chapter-4">
          <header>
            <div>
              <p>CHAPTER 4 · ESTIMATED FOR TWO</p>
              <h2>DINNER DUEL</h2>
            </div>
          </header>
          <div className="card-grid">
            {dinners.map((x, i) => (
              <ChoiceCard
                key={x.name}
                item={x}
                selected={dinner === i}
                onSelect={() => setDinner(dinner === i ? null : i)}
              />
            ))}
          </div>
        </section>
        <section className="chapter" id="chapter-5">
          <header>
            <div>
              <p>CHAPTER 5 · COFFEE · SNACKS · PASTRIES · LUNCH</p>
              <h2>PERCY’S PICKS</h2>
            </div>
          </header>
          <div className="percy-callout">
            <div className="percy-portrait" role="img" aria-label="Percy" />
            <p>
              He has no money. He has no driver’s license. He has{" "}
              <b>excellent snack instincts.</b>
            </p>
          </div>
          <div className="card-grid">
            {percyPicks.map((x, i) => (
              <ChoiceCard
                key={x.name}
                item={x}
                selected={picks.includes(i)}
                onSelect={() =>
                  setPicks(
                    picks.includes(i)
                      ? picks.filter((n) => n !== i)
                      : [...picks, i],
                  )
                }
              />
            ))}
          </div>
        </section>

        <section className="mission-board" id="mission-board">
          <div className="board-title">
            <span>FINAL CHAPTER</span>
            <h2>MISSION BOARD</h2>
            <p>YOUR ADVENTURE, ASSEMBLED.</p>
          </div>
          <div className="ledger">
            <Line
              label="Hotel"
              value={
                hotel === null
                  ? "CHOOSE A LAIR"
                  : `${hotels[hotel].name} · $${hotels[hotel].price}`
              }
            />
            <Line
              label="Universal"
              value={
                mission === null
                  ? "CHOOSE TICKETS"
                  : `${mainMissions[mission].name} · $${mainMissions[mission].price}`
              }
            />
            <Line label="Odyssey" value="70mm IMAX · $70 · PURCHASED" />
            <Line
              label="Side quests"
              value={`${chosenQuestIndexes.map((i) => sideQuests[i].name).join(" + ")} · $${chosenQuestIndexes.reduce((s, i) => s + sideQuests[i].price, 0)}`}
            />
            <Line
              label="Dinner"
              value={
                dinner === null
                  ? "THE DUEL AWAITS"
                  : `${dinners[dinner].name} · $${dinners[dinner].price}`
              }
            />
            <Line
              label="Percy’s Picks"
              value={
                picks.length
                  ? `${picks.length} SELECTED · $${picks.reduce((s, i) => s + percyPicks[i].price, 0)}`
                  : "THE BEAR AWAITS"
              }
            />
            <label className="tax-line">
              <input
                type="checkbox"
                checked={taxes}
                onChange={(e) => setTaxes(e.target.checked)}
              />
              <span>Estimate taxes &amp; fees</span>
              <b>${tax}</b>
            </label>
            <div className="total">
              <span>RUNNING TOTAL</span>
              <strong>${total}</strong>
            </div>
            <div className="board-actions">
              <button onClick={save}>SAVE ITINERARY</button>
              <a href={mail}>EMAIL ITINERARY</a>
              <button onClick={reset} className="danger">
                RESET
              </button>
            </div>
          </div>
        </section>
      </div>
      <footer>
        <div>SLICE ★ DICE ★ PERCY</div>
        <p>
          LOS ANGELES · ISSUE #2 · LOVE, LAUGHTER &amp; EXTREMELY QUESTIONABLE
          PLANNING
        </p>
        <a href="#top">BACK TO COVER ↑</a>
      </footer>
    </main>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="line">
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}
