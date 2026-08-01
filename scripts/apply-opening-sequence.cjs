const fs = require("node:fs");

const pagePath = "app/page.tsx";
let page = fs.readFileSync(pagePath, "utf8");

if (!page.includes('import OpeningSequence from "./OpeningSequence";')) {
  page = page.replace(
    'import type { Map as LeafletMap } from "leaflet";',
    'import type { Map as LeafletMap } from "leaflet";\nimport OpeningSequence from "./OpeningSequence";',
  );
}

if (!page.includes("<OpeningSequence />")) {
  page = page.replace("    <main>\n", "    <main>\n      <OpeningSequence />\n");
}

fs.writeFileSync(pagePath, page);
console.log("Opening sequence is wired into app/page.tsx");
