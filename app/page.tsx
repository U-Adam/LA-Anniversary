"use client";

import { useEffect, useMemo, useState } from "react";

type Choice = { name: string; price: number; url: string; image: string; note: string; group?: string };

const hotels: Choice[] = [
  { name: "The Delphi", price: 210, url: "https://www.thedelphihotel.com/", image: "/assets/hotels/the-delphi.jpg", note: "Downtown drama · rooftop pool" },
  { name: "The Biltmore", price: 185, url: "https://www.millenniumhotels.com/en/los-angeles/millennium-biltmore-hotel-los-angeles/", image: "/assets/hotels/the-biltmore.jpg", note: "Old-Hollywood grandeur" },
  { name: "Hollywood Franklin", price: 150, url: "https://www.hilton.com/en/hotels/laxhfup-hilton-garden-inn-los-angeles-hollywood/", image: "/assets/hotels/hollywood-franklin.jpg", note: "Closest to the action" },
  { name: "The LINE LA", price: 230, url: "https://www.thelinehotel.com/los-angeles/", image: "/assets/hotels/the-line-la.jpg", note: "Koreatown cool" },
  { name: "Cara Hotel", price: 195, url: "https://www.carahotel.com/", image: "/assets/hotels/cara-hotel.jpg", note: "Courtyard romance" },
  { name: "Los Angeles Athletic Club", price: 175, url: "https://www.laac.com/", image: "/assets/hotels/los-angeles-athletic-club.jpg", note: "Historic club hideout" },
];

const universal: Choice[] = [
  { name: "1 Day General", price: 120, url: "https://www.universalstudioshollywood.com/web/en/us/tickets-packages", image: "/assets/food/academy-museum.jpg", note: "The classic mission" },
  { name: "Express Pass", price: 270, url: "https://www.universalstudioshollywood.com/web/en/us/tickets-packages", image: "/assets/food/firefly.jpg", note: "Skip the lines. Save the marriage." },
  { name: "VIP Experience", price: 250, url: "https://www.universalstudioshollywood.com/web/en/us/vip-experience", image: "/assets/food/yamashiro-hollywood.jpg", note: "Behind the curtain" },
];

const addons: Choice[] = [
  { name: "Studio Tour", price: 80, url: "https://www.wbstudiotour.com/", image: "/assets/food/academy-museum.jpg", note: "Backlots & movie magic" },
  { name: "Griffith Hike + Observatory", price: 45, url: "https://www.laparks.org/griffithpark/", image: "/assets/food/lacma.jpg", note: "Fern Dell → Observatory" },
  { name: "Musée & Frank", price: 95, url: "https://www.academymuseum.org/", image: "/assets/food/musso-and-frank-grill.jpg", note: "Museum, then martinis" },
];

const dinners: Choice[] = [
  { name: "Mother Wolf · Italian", price: 190, url: "https://www.motherwolfla.com/", image: "/assets/food/mother-wolf.jpg", note: "Roman firepower" },
  { name: "Musso & Frank · Steak", price: 180, url: "https://mussoandfrank.com/", image: "/assets/food/musso-and-frank-grill.jpg", note: "The old-school heavyweight" },
  { name: "Yamashiro · Sushi", price: 170, url: "https://yamashirohollywood.com/", image: "/assets/food/yamashiro-hollywood.jpg", note: "A view worthy of Issue #2" },
  { name: "Kismet · Mediterranean", price: 125, url: "https://www.kismetla.com/", image: "/assets/food/kismet.jpg", note: "Bright, strange, excellent" },
  { name: "Bacetti · Italian", price: 145, url: "https://www.bacetti.com/", image: "/assets/food/bacetti.jpg", note: "Echo Park romance" },
];

const percyPicks: Choice[] = [
  { group: "COFFEE", name: "Go Get Em Tiger", price: 18, url: "https://gget.com/", image: "/assets/food/cara.jpg", note: "Caffeine side quest" },
  { group: "COFFEE", name: "Maru Coffee", price: 18, url: "https://www.marucoffee.com/", image: "/assets/food/firefly.jpg", note: "Percy approves the foam" },
  { group: "COFFEE", name: "Alfred Coffee", price: 20, url: "https://www.alfred.la/", image: "/assets/food/yamashiro-hollywood.jpg", note: "But first, obviously" },
  { group: "LUNCH", name: "Fanny’s", price: 75, url: "https://www.fannysla.com/", image: "/assets/food/academy-museum.jpg", note: "Museum lunch with style" },
  { group: "LUNCH", name: "Little Dom’s", price: 80, url: "https://www.littledoms.com/", image: "/assets/food/bacetti.jpg", note: "Los Feliz comfort" },
  { group: "LUNCH", name: "Grand Central Market", price: 45, url: "https://grandcentralmarket.com/", image: "/assets/food/bowery-bungalow.jpg", note: "Choose your own delicious chaos" },
  { group: "TREAT", name: "Voodoo Doughnut", price: 24, url: "https://www.universalstudioshollywood.com/web/en/us/things-to-do/dining/citywalk/voodoo-doughnut", image: "/assets/food/cara.jpg", note: "Sugar power-up" },
  { group: "SNACK", name: "Tartine", price: 32, url: "https://tartinebakery.com/los-angeles", image: "/assets/food/kismet.jpg", note: "Pastry boss battle" },
  { group: "DESSERT", name: "Rendezvous Court", price: 55, url: "https://www.millenniumhotels.com/en/los-angeles/millennium-biltmore-hotel-los-angeles/dining/rendezvous-court/", image: "/assets/food/mother-wolf.jpg", note: "Tea beneath painted ceilings" },
];

const quotes = [
  "“You had me at hello.”",
  "“To me, you are perfect.”",
  "“As you wish.”",
  "“I’m also just a girl, standing in front of a boy…”",
  "“You make me want to be a better man.”",
];

const chapterLinks = [
  ["chapter-1", "1 · Secret Lairs"],
  ["chapter-2", "2 · Main Missions"],
  ["chapter-3", "3 · Side Quests"],
  ["chapter-4", "4 · Dinner Duel"],
  ["chapter-5", "5 · Percy’s Picks"],
  ["mission-board", "Final · Mission Board"],
];

function PlaceImage({ item }: { item: Choice }) {
  return (
    <div className="card-image">
      <img
        src={item.image}
        alt={item.name}
        loading="eager"
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = "/assets/reference/comic-cover.webp";
        }}
      />
      {item.group && <span className="pick-group">{item.group}</span>}
    </div>
  );
}

function ChoiceCard({ item, selected, onSelect }: { item: Choice; selected: boolean; onSelect: () => void }) {
  return (
    <article className={`mission-card ${selected ? "selected" : ""}`}>
      <PlaceImage item={item} />
      <div className="card-copy">
        <div>
          <h3>{item.name}</h3>
          <p>{item.note}</p>
          <a className="place-link" href={item.url} target="_blank" rel="noreferrer">DETAILS ↗</a>
        </div>
        <button className="check" onClick={onSelect} aria-pressed={selected}><span>{selected ? "✓" : ""}</span>${item.price}</button>
      </div>
    </article>
  );
}

export default function Home() {
  const [hotel, setHotel] = useState<number | null>(null);
  const [uni, setUni] = useState<number | null>(null);
  const [addOn, setAddOn] = useState<number[]>([]);
  const [dinner, setDinner] = useState<number | null>(null);
  const [picks, setPicks] = useState<number[]>([]);
  const [taxes, setTaxes] = useState(true);
  const [effect, setEffect] = useState<"slice" | "dice" | "percy" | null>(null);
  const movie = 70;

  useEffect(() => {
    const saved = localStorage.getItem("slice-dice-percy-plan");
    if (!saved) return;
    try {
      const s = JSON.parse(saved);
      setHotel(s.hotel ?? null);
      setUni(s.uni ?? null);
      setAddOn(s.addOn ?? []);
      setDinner(s.dinner ?? null);
      setPicks(s.picks ?? []);
      setTaxes(s.taxes ?? true);
    } catch {}
  }, []);

  useEffect(() => {
    if (!effect) return;
    const timer = setTimeout(() => setEffect(null), effect === "percy" ? 1100 : 2400);
    return () => clearTimeout(timer);
  }, [effect]);

  const subtotal = useMemo(() =>
    (hotel === null ? 0 : hotels[hotel].price) +
    (uni === null ? 0 : universal[uni].price) + movie +
    addOn.reduce((sum, i) => sum + addons[i].price, 0) +
    (dinner === null ? 0 : dinners[dinner].price) +
    picks.reduce((sum, i) => sum + percyPicks[i].price, 0),
  [hotel, uni, addOn, dinner, picks]);
  const tax = taxes ? Math.round(subtotal * .095) : 0;
  const total = subtotal + tax;

  const save = () => {
    localStorage.setItem("slice-dice-percy-plan", JSON.stringify({ hotel, uni, addOn, dinner, picks, taxes }));
    alert("MISSION SAVED!");
  };
  const reset = () => {
    setHotel(null); setUni(null); setAddOn([]); setDinner(null); setPicks([]);
    localStorage.removeItem("slice-dice-percy-plan");
  };
  const summary = [
    "SLICE, DICE & PERCY — LA ANNIVERSARY MISSION",
    hotel === null ? "Hotel: TBD" : `Hotel: ${hotels[hotel].name} — $${hotels[hotel].price}`,
    uni === null ? "Universal: TBD" : `Universal: ${universal[uni].name} — $${universal[uni].price}`,
    `The Odyssey · 70mm IMAX — $${movie}`,
    `Add-ons: ${addOn.length ? addOn.map(i => addons[i].name).join(", ") : "None"}`,
    `Dinner: ${dinner === null ? "TBD" : dinners[dinner].name}`,
    `Percy’s Picks: ${picks.length ? picks.map(i => percyPicks[i].name).join(", ") : "None"}`,
    `Estimated total: $${total}`,
  ].join("\n");
  const mail = `mailto:?subject=${encodeURIComponent("Our LA Anniversary Mission")}&body=${encodeURIComponent(summary)}`;

  return (
    <main>
      <section className="cover" id="top">
        <img src="/assets/reference/comic-cover.webp" alt="Slice, Dice and Percy overlooking Los Angeles at sunset" />
        <div className="cover-shade" />
        <div className="issue-burst">SPECIAL<br />2ND ANNIVERSARY<br />EDITION!</div>
        <div className="cover-title"><small>LOS ANGELES PRESENTS</small><h1>SLICE, DICE<br /><em>&amp; PERCY</em></h1><p>THE ANNIVERSARY ADVENTURE</p></div>
        <button className="character-hit slice-hit" onClick={() => setEffect("slice")} aria-label="Slice" />
        <button className="character-hit dice-hit" onClick={() => setEffect("dice")} aria-label="Dice" />
        <button className="character-hit percy-hit" onClick={() => setEffect("percy")} aria-label="Percy" />
        <a className="start-ribbon" href="#chapter-1">OPEN THE ISSUE ↓</a>
      </section>

      {effect && <div className={`effect effect-${effect}`} onClick={() => setEffect(null)}>
        {effect === "slice" && <><div className="rainbow" />{Array.from({ length: 14 }).map((_, i) => <div className={`dolphin d${i % 2 + 1}`} key={i} style={{ animationDelay: `${i * .08}s`, top: `${5 + (i % 6) * 14}%` }}>🐬</div>)}<strong>FULL BODY!</strong></>}
        {effect === "dice" && <><div className="dice-storm">{Array.from({ length: 18 }).map((_, i) => <i key={i}>⚄</i>)}</div><strong>{quotes[Math.floor(Math.random() * quotes.length)]}</strong></>}
        {effect === "percy" && <><strong>THINK FAST!</strong><div className="percy-charge">🧸</div><b>WHUMP!</b></>}
      </div>}

      <nav aria-label="Chapter navigation" style={{ position: "sticky", top: 0, zIndex: 20, display: "flex", gap: 8, overflowX: "auto", padding: "12px 18px", background: "#16110e", borderBottom: "5px solid #f7b51e" }}>
        {chapterLinks.map(([id, label]) => <a key={id} href={`#${id}`} style={{ flex: "0 0 auto", color: "#16110e", background: "#f7b51e", border: "3px solid white", padding: "8px 12px", textDecoration: "none", boxShadow: "3px 3px 0 #d8332a" }}>{label}</a>)}
      </nav>

      <div className="story-shell">
        <section className="chapter" id="chapter-1">
          <header><a href="#chapter-1" style={{ display: "flex", alignItems: "center", background: "#f7b51e", padding: "18px 24px", borderRight: "7px solid #16110e", color: "inherit", textDecoration: "none", whiteSpace: "nowrap" }}>CHAPTER 1</a><div><p>SECRET LAIRS</p><h2>WHERE SHALL OUR HEROES REST?</h2></div></header>
          <div className="card-grid">{hotels.map((x, i) => <ChoiceCard key={x.name} item={x} selected={hotel === i} onSelect={() => setHotel(hotel === i ? null : i)} />)}</div>
        </section>

        <section className="chapter chapter-red" id="chapter-2">
          <header><a href="#chapter-2" style={{ display: "flex", alignItems: "center", background: "#d8332a", color: "white", padding: "18px 24px", borderRight: "7px solid #16110e", textDecoration: "none", whiteSpace: "nowrap" }}>CHAPTER 2</a><div><p>MAIN MISSIONS</p><h2>THE BIG ONES. NO SKIPPING.</h2></div></header>
          <div className="mission-splash"><div><b>FRIDAY · AUG 7</b><h3>UNIVERSAL<br />STUDIOS</h3><p>Choose your power level.</p></div><div className="uni-options">{universal.map((x, i) => <button key={x.name} onClick={() => setUni(uni === i ? null : i)} className={uni === i ? "active" : ""}><span>{uni === i ? "✓" : ""}</span><b>{x.name}</b><em>${x.price}</em></button>)}</div></div>
          <div className="odyssey-panel"><div className="odyssey-art">70<span>MM</span></div><div><b>SATURDAY · AUG 8 · 2:50 PM</b><h3>THE ODYSSEY</h3><p>70mm IMAX · TCL Chinese Theatre</p><a href="https://www.tclchinesetheatres.com/" target="_blank" rel="noreferrer">MISSION LOCKED · $70 ↗</a></div></div>
        </section>

        <section className="chapter" id="chapter-3">
          <header><a href="#chapter-3" style={{ display: "flex", alignItems: "center", background: "#f7b51e", padding: "18px 24px", borderRight: "7px solid #16110e", color: "inherit", textDecoration: "none", whiteSpace: "nowrap" }}>CHAPTER 3</a><div><p>SIDE QUESTS</p><h2>HOW DEEP DOES THE SIDE QUEST GO?</h2></div></header>
          <div className="card-grid three">{addons.map((x, i) => <ChoiceCard key={x.name} item={x} selected={addOn.includes(i)} onSelect={() => setAddOn(addOn.includes(i) ? addOn.filter(n => n !== i) : [...addOn, i])} />)}</div>
        </section>

        <section className="chapter chapter-red" id="chapter-4">
          <header><a href="#chapter-4" style={{ display: "flex", alignItems: "center", background: "#d8332a", color: "white", padding: "18px 24px", borderRight: "7px solid #16110e", textDecoration: "none", whiteSpace: "nowrap" }}>CHAPTER 4</a><div><p>DINNER DUEL</p><h2>TONIGHT’S BATTLE. YOU DECIDE.</h2></div></header>
          <div className="card-grid">{dinners.map((x, i) => <ChoiceCard key={x.name} item={x} selected={dinner === i} onSelect={() => setDinner(dinner === i ? null : i)} />)}</div>
        </section>

        <section className="chapter" id="chapter-5">
          <header><a href="#chapter-5" style={{ display: "flex", alignItems: "center", background: "#f7b51e", padding: "18px 24px", borderRight: "7px solid #16110e", color: "inherit", textDecoration: "none", whiteSpace: "nowrap" }}>CHAPTER 5</a><div><p>TREATS · COFFEE · SNACKS · LUNCH</p><h2>PERCY’S PICKS</h2></div></header>
          <div className="percy-callout"><div className="percy-portrait" role="img" aria-label="Percy" /><p>He has no money. He has no driver’s license. He has <b>excellent snack instincts.</b></p></div>
          <div className="card-grid">{percyPicks.map((x, i) => <ChoiceCard key={x.name} item={x} selected={picks.includes(i)} onSelect={() => setPicks(picks.includes(i) ? picks.filter(n => n !== i) : [...picks, i])} />)}</div>
        </section>

        <section className="mission-board" id="mission-board">
          <div className="board-title"><span>FINAL CHAPTER</span><h2>MISSION BOARD</h2><p>YOUR ADVENTURE, ASSEMBLED.</p></div>
          <div className="ledger">
            <Line label="Hotel" value={hotel === null ? "CHOOSE A LAIR" : `${hotels[hotel].name} · $${hotels[hotel].price}`} />
            <Line label="Universal" value={uni === null ? "CHOOSE TICKETS" : `${universal[uni].name} · $${universal[uni].price}`} />
            <Line label="Odyssey" value={`70mm IMAX · $${movie}`} />
            <Line label="Add-ons" value={addOn.length ? `${addOn.map(i => addons[i].name).join(" + ")} · $${addOn.reduce((s, i) => s + addons[i].price, 0)}` : "NONE YET"} />
            <Line label="Dinner" value={dinner === null ? "THE DUEL AWAITS" : `${dinners[dinner].name} · $${dinners[dinner].price}`} />
            <Line label="Percy’s Picks" value={picks.length ? `${picks.length} SELECTED · $${picks.reduce((s, i) => s + percyPicks[i].price, 0)}` : "THE BEAR AWAITS"} />
            <label className="tax-line"><input type="checkbox" checked={taxes} onChange={e => setTaxes(e.target.checked)} /><span>Estimate taxes &amp; fees</span><b>${tax}</b></label>
            <div className="total"><span>RUNNING TOTAL</span><strong>${total}</strong></div>
            <div className="board-actions"><button onClick={save}>SAVE ITINERARY</button><a href={mail}>EMAIL ITINERARY</a><button onClick={reset} className="danger">RESET</button></div>
          </div>
        </section>
      </div>
      <footer><div>SLICE ★ DICE ★ PERCY</div><p>LOS ANGELES · ISSUE #2 · LOVE, LAUGHTER &amp; EXTREMELY QUESTIONABLE PLANNING</p><a href="#top">BACK TO COVER ↑</a></footer>
    </main>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return <div className="line"><span>{label}</span><b>{value}</b></div>;
}
