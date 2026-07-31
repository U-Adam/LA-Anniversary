const fs = require("node:fs");

const pagePath = "app/page.tsx";
const cssPath = "app/globals.css";

let page = fs.readFileSync(pagePath, "utf8");
page = page
  .replaceAll("AUG 8TH, 2026", "AUG 8, 2026")
  .replaceAll("August 8th, 2026", "August 8, 2026");
fs.writeFileSync(pagePath, page);

let css = fs.readFileSync(cssPath, "utf8");
const marker = "/* canonical-cover-date-fix */";
const override = `

${marker}
/* Fully masks the date printed in the source cover art. */
.cover-date-stamp {
  top: 7.72vw;
  right: 0.34vw;
  width: 10.35vw;
  min-height: 2.2vw;
  display: grid;
  place-items: center;
  padding: 0.42vw 0.28vw 0.32vw;
  background: #f1dfb4;
  border: 0;
  box-shadow: 0 0 0 0.34vw #f1dfb4;
  color: #111;
  font: 900 clamp(6px, 0.9vw, 14px) / 1 Impact, Haettenschweiler,
    "Arial Narrow Bold", sans-serif;
  letter-spacing: 0.01em;
  white-space: nowrap;
  transform: rotate(0.5deg);
}

@media (max-width: 760px) {
  .cover-date-stamp {
    top: 58px;
    right: 2px;
    width: 78px;
    min-height: 18px;
    padding: 4px 3px 3px;
    box-shadow: 0 0 0 3px #f1dfb4;
    font-size: 8px;
  }
}
`;

if (css.includes(marker)) {
  css = css.slice(0, css.indexOf(marker)).trimEnd() + override;
} else {
  css += override;
}
fs.writeFileSync(cssPath, css);
