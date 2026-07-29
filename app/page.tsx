"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Map as LeafletMap } from "leaflet";

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

type Place = {
  address: string;
  lat: number;
  lng: number;
};

const places: Record<string, Place> = {
  "The Delphi": { address: "550 S Flower St, Los Angeles, CA 90071", lat: 34.0503, lng: -118.2571 },
  "Millennium Biltmore Los Angeles": { address: "506 S Grand Ave, Los Angeles, CA 90071", lat: 34.0498, lng: -118.2542 },
  "Hollywood Franklin": { address: "6141 Franklin Ave, Los Angeles, CA 90028", lat: 34.1053, lng: -118.3234 },
  "The LINE LA": { address: "3515 Wilshire Blvd, Los Angeles, CA 90010", lat: 34.0619, lng: -118.3009 },
  "Los Angeles Athletic Club": { address: "431 W 7th St, Los Angeles, CA 90014", lat: 34.0469, lng: -118.2553 },
  "Cara Hotel": { address: "1730 N Western Ave, Los Angeles, CA 90027", lat: 34.1022, lng: -118.3090 },
  "Palihotel Hollywood": { address: "7023 Sunset Blvd, Los Angeles, CA 90028", lat: 34.0982, lng: -118.3430 },
  "Universal Studios Hollywood": { address: "100 Universal City Plaza, Universal City, CA 91608", lat: 34.1381, lng: -118.3534 },
  "TCL Chinese Theatre": { address: "6925 Hollywood Blvd, Hollywood, CA 90028", lat: 34.1020, lng: -118.3409 },
  "Academy Museum of Motion Pictures": { address: "6067 Wilshire Blvd, Los Angeles, CA 90036", lat: 34.0634, lng: -118.3609 },
  LACMA: { address: "5905 Wilshire Blvd, Los Angeles, CA 90036", lat: 34.0638, lng: -118.3592 },
  "Griffith Observatory and Griffith Park Hike": { address: "2800 E Observatory Rd, Los Angeles, CA 90027", lat: 34.1184, lng: -118.3004 },
  "Mother Wolf": { address: "1545 Wilcox Ave, Los Angeles, CA 90028", lat: 34.0994, lng: -118.3311 },
  "Cara Restaurant": { address: "1730 N Western Ave, Los Angeles, CA 90027", lat: 34.1022, lng: -118.3090 },
  "Musso & Frank Grill": { address: "6667 Hollywood Blvd, Los Angeles, CA 90028", lat: 34.1016, lng: -118.3354 },
  "Yamashiro Hollywood": { address: "1999 N Sycamore Ave, Los Angeles, CA 90068", lat: 34.1054, lng: -118.3421 },
  Firefly: { address: "11720 Ventura Blvd, Studio City, CA 91604", lat: 34.1433, lng: -118.3884 },
  Kismet: { address: "4648 Hollywood Blvd, Los Angeles, CA 90027", lat: 34.1016, lng: -118.2911 },
  "Go Get Em Tiger": { address: "230 N Larchmont Blvd, Los Angeles, CA 90004", lat: 34.0754, lng: -118.3233 },
  "Maru Coffee": { address: "1936 Hillhurst Ave, Los Angeles, CA 90027", lat: 34.1066, lng: -118.2875 },
  "Alfred Coffee": { address: "3515 Wilshire Blvd, Los Angeles, CA 90010", lat: 34.0619, lng: -118.3009 },
  "Voodoo Doughnut at Universal CityWalk": { address: "100 Universal City Plaza, Universal City, CA 91608", lat: 34.1366, lng: -118.3530 },
  Tartine: { address: "1925 Arizona Ave, Santa Monica, CA 90404", lat: 34.0310, lng: -118.4650 },
  "Grand Central Market": { address: "317 S Broadway, Los Angeles, CA 90013", lat: 34.0507, lng: -118.2488 },
  "Fanny’s": { address: "6067 Wilshire Blvd, Los Angeles, CA 90036", lat: 34.0634, lng: -118.3609 },
  "Little Dom’s": { address: "2128 Hillhurst Ave, Los Angeles, CA 90027", lat: 34.1093, lng: -118.2876 },
  "Rendezvous Court": { address: "506 S Grand Ave, Los Angeles, CA 90071", lat: 34.0498, lng: -118.2542 },
};

const hotelParking = [110, 110, 0, 143, 0, 0, 80];
const verifiedOn = "Verified July 29, 2026";

const hotels: Choice[] = [
  {
    name: "The Delphi",
    price: 395,
    image: "/assets/venues/the-delphi.jpg",
    imagePosition: "center 58%",
    note: `Aug 7–9 · 2 adults · taxes/fees included · ${verifiedOn}`,
    actions: [{ label: "BOOK", url: "https://www.thedelphihotel.com/" }],
  },
  {
    name: "Millennium Biltmore Los Angeles",
    price: 441,
    image: "/assets/venues/the-biltmore.webp",
    note: `Aug 7–9 · 2 adults · taxes/fees included · ${verifiedOn}`,
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
    note: `Aug 7–9 · 2 adults · taxes/fees included · ${verifiedOn}`,
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
    note: "Friday, Aug 7 · 2 adults · date-selected checkout required",
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
    note: "Friday, Aug 7 · 2 adults · date-selected checkout required",
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
    image: "/assets/events/the-odyssey-official-poster.jpg",
    imagePosition: "center 28%",
    note: "Saturday, Aug 8 · 2:50 PM · TCL Chinese Theatre · purchased",
    locked: true,
    actions: [{ label: "MOVIE", url: "https://www.theodysseymovie.com/" }],
  },
];

const sideQuests: Choice[] = [
  {
    name: "Academy Museum of Motion Pictures",
    price: 50,
    image: "/assets/venues/academy-museum.jpg",
    note: `Two adults · $25 each · ${verifiedOn}`,
    actions: [
      { label: "TICKETS", url: "https://www.academymuseum.org/en/tickets" },
    ],
  },
  {
    name: "LACMA",
    price: 60,
    image: "/assets/venues/lacma-urban-light.webp",
    note: `Two non-LA County adults · $30 each · ${verifiedOn}`,
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

function MissionMap({ stops }: { stops: { name: string; subtitle: string }[] }) {
  const mapNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapNode.current || !stops.length) return;
    let map: LeafletMap | undefined;
    void import("leaflet").then((L) => {
      if (!mapNode.current) return;
      map = L.map(mapNode.current, { scrollWheelZoom: false });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);
      const bounds: [number, number][] = [];
      stops.forEach((stop, index) => {
        const place = places[stop.name];
        if (!place) return;
        bounds.push([place.lat, place.lng]);
        L.circleMarker([place.lat, place.lng], {
          radius: 10,
          color: "#111",
          weight: 3,
          fillColor: "#efb321",
          fillOpacity: 1,
        })
          .addTo(map!)
          .bindPopup(`<b>${index + 1}. ${stop.name}</b><br>${stop.subtitle}<br>${place.address}`);
      });
      if (bounds.length === 1) map.setView(bounds[0], 13);
      else map.fitBounds(bounds, { padding: [28, 28] });
    });
    return () => {
      map?.remove();
    };
  }, [stops]);

  return <div className="mission-map" ref={mapNode} aria-label="Interactive map of the selected itinerary" />;
}

export default function Home() {
  const [hotel, setHotel] = useState<number | null>(null);
  const [mission, setMission] = useState<number | null>(null);
  const [quests, setQuests] = useState<number[]>([]);
  const [dinner, setDinner] = useState<number | null>(null);
  const [picks, setPicks] = useState<number[]>([]);
  const [taxes, setTaxes] = useState(true);
  const [effect, setEffect] = useState<"slice" | "dice" | "percy" | null>(null);
  const [dispatchOpen, setDispatchOpen] = useState(false);

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
  const tripExtras =
    (mission === null ? 0 : 40) +
    (hotel === null ? 0 : hotelParking[hotel]) +
    (quests.includes(0) ? 10 : 0) +
    (quests.includes(1) ? 24 : 0) +
    55;
  const tax = taxes ? tripExtras : 0;
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
  const itineraryStops = [
    ...(hotel === null ? [] : [{ name: hotels[hotel].name, subtitle: "Hotel · Aug 7–9" }]),
    { name: "Universal Studios Hollywood", subtitle: "Friday · 9:00 AM–9:00 PM" },
    ...(picks.length ? [{ name: percyPicks[picks[0]].name, subtitle: "Saturday · 8:30 AM" }] : []),
    ...chosenQuestIndexes
      .filter((i) => !sideQuests[i].locked)
      .map((i) => ({ name: sideQuests[i].name, subtitle: "Saturday · 10:00 AM" })),
    { name: "TCL Chinese Theatre", subtitle: "Saturday · 2:50 PM · arrive 2:20 PM" },
    ...(dinner === null ? [] : [{ name: dinners[dinner].name, subtitle: "Saturday · 7:30 PM" }]),
    { name: "Griffith Observatory and Griffith Park Hike", subtitle: "Sunday · 9:00 AM" },
  ];
  const detailedItinerary = [
    "FRIDAY · AUGUST 7",
    "5:15 AM — Leave San Diego",
    "8:15 AM — Arrive and park at Universal Studios Hollywood",
    "9:00 AM–9:00 PM — Universal Studios Hollywood",
    "9:20 PM — Drive to hotel and check in",
    "",
    "SATURDAY · AUGUST 8",
    picks.length ? `8:30 AM — ${percyPicks[picks[0]].name}` : "8:30 AM — Coffee near the hotel",
    quests.includes(0)
      ? "10:00 AM–12:15 PM — Academy Museum of Motion Pictures"
      : quests.includes(1)
        ? "10:00 AM–12:15 PM — LACMA"
        : "10:00 AM–12:15 PM — Open morning / pool / neighborhood",
    "12:20 PM — Lunch and drive to Hollywood",
    "2:20 PM — Arrive at TCL Chinese Theatre",
    "2:50 PM — The Odyssey in 70mm IMAX (purchased)",
    dinner === null ? "7:30 PM — Anniversary dinner (choose a restaurant)" : `7:30 PM — Anniversary dinner at ${dinners[dinner].name}`,
    "9:45–11:45 PM — Slice’s Mystery Box",
    "",
    "SUNDAY · AUGUST 9",
    "8:00 AM — Check out / leave bags with hotel",
    "9:00–11:00 AM — Fern Dell to Griffith Observatory hike",
    picks.length > 1 ? `11:30 AM — ${percyPicks[picks[1]].name}` : "11:30 AM — Brunch",
    "1:30 PM — Collect bags and depart Los Angeles",
  ];
  const summary = [
    "SLICE, DICE & PERCY — LA ANNIVERSARY MISSION",
    "August 7–9, 2026 · Two adults",
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
    taxes ? `Known parking + estimated gas: $${tax}` : "Parking and gas excluded",
    `Planning total: $${total}`,
    "",
    ...detailedItinerary,
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
              <img className="real-dolphin dolphin-one" src="/assets/events/dolphin-swim.png" alt="" />
              <img className="real-dolphin dolphin-two" src="/assets/events/dolphin-rise.png" alt="" />
              <img className="real-dolphin dolphin-jump" src="/assets/events/dolphin-jump.png" alt="" />
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
              <strong className="think-fast">THINK FAST!</strong>
              <div
                className="percy-charge"
                role="img"
                aria-label="Percy charges toward the screen"
              />
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
              <span>Include known parking + $55 estimated gas</span>
              <b>${tax}</b>
            </label>
            <div className="total">
              <span>RUNNING TOTAL</span>
              <strong>${total}</strong>
            </div>
            <div className="board-actions">
              <button onClick={save}>SAVE ITINERARY</button>
              <button onClick={() => setDispatchOpen(true)}>EMAIL ITINERARY</button>
              <button onClick={reset} className="danger">
                RESET
              </button>
            </div>
          </div>
        </section>
      </div>
      {dispatchOpen && (
        <div className="dispatch-backdrop" role="presentation" onMouseDown={() => setDispatchOpen(false)}>
          <section
            className="dispatch"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dispatch-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="dispatch-close" onClick={() => setDispatchOpen(false)} aria-label="Close itinerary">×</button>
            <div className="dispatch-heading">
              <span>MISSION DISPATCH · AUGUST 7–9, 2026</span>
              <h2 id="dispatch-title">YOUR WEEKEND, MAPPED.</h2>
              <p>The route updates from the hotel, museum, dinner and snack choices on the Mission Board.</p>
            </div>
            <MissionMap stops={itineraryStops} />
            <div className="dispatch-grid">
              {["FRIDAY · AUGUST 7", "SATURDAY · AUGUST 8", "SUNDAY · AUGUST 9"].map((day, dayIndex) => {
                const start = detailedItinerary.indexOf(day);
                const next = dayIndex === 2 ? detailedItinerary.length : detailedItinerary.indexOf(["SATURDAY · AUGUST 8", "SUNDAY · AUGUST 9"][dayIndex]);
                return (
                  <article key={day}>
                    <h3>{day}</h3>
                    {detailedItinerary.slice(start + 1, next).filter(Boolean).map((line) => <p key={line}>{line}</p>)}
                  </article>
                );
              })}
            </div>
            <div className="dispatch-cost">
              <span>PLANNING TOTAL FOR TWO</span>
              <strong>${total}</strong>
              <small>Hotel totals include listed taxes/fees. Restaurant and snack totals are menu-based estimates; Universal’s Aug. 7 price must be confirmed in its date-selected checkout.</small>
            </div>
            <div className="dispatch-actions">
              <a href={mail}>OPEN EMAIL DRAFT</a>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.google.com/maps/dir/${itineraryStops.map((stop) => encodeURIComponent(places[stop.name]?.address ?? stop.name)).join("/")}`}
              >
                OPEN TURN-BY-TURN MAP ↗
              </a>
            </div>
          </section>
        </div>
      )}
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
