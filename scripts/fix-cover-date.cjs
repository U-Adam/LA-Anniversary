const fs = require("node:fs");

const pagePath = "app/page.tsx";
const cssPath = "app/globals.css";

let page = fs.readFileSync(pagePath, "utf8");
page = page.replace("AUG 8TH, 2026", "AUG 8, 2026");
page = page.replace(
  'aria-label="Anniversary date August 8th, 2026"',
  'aria-label="Anniversary date August 8, 2026"',
);
fs.writeFileSync(pagePath, page);

let css = fs.readFileSync(cssPath, "utf8");
css = css.replace(
  `.cover-date-stamp {
  position: absolute;
  z-index: 8;
  top: 8.35vw;
  right: 1.15vw;
  width: 8.45vw;
  padding: 0.28vw 0.1vw;
  background: #f1dfb4;
  border-top: 2px solid #111;
  border-bottom: 2px solid #111;
  color: #111;
  text-align: center;
  font: 900 clamp(4px, 0.85vw, 12px) / 1 Impact, Haettenschweiler,
    "Arial Narrow Bold", sans-serif;
  letter-spacing: 0.015em;
  white-space: nowrap;
  transform: rotate(0.5deg);
  pointer-events: none;
}`,
  `.cover-date-stamp {
  position: absolute;
  z-index: 8;
  top: 8.05vw;
  right: 0.72vw;
  width: 9.35vw;
  min-height: 1.75vw;
  display: grid;
  place-items: center;
  padding: 0.34vw 0.18vw 0.28vw;
  background: #f1dfb4;
  box-shadow: 0 0 0 0.22vw #f1dfb4;
  border-top: 2px solid #111;
  border-bottom: 2px solid #111;
  color: #111;
  text-align: center;
  font: 900 clamp(5px, 0.88vw, 13px) / 1 Impact, Haettenschweiler,
    "Arial Narrow Bold", sans-serif;
  letter-spacing: 0.01em;
  white-space: nowrap;
  transform: rotate(0.5deg);
  pointer-events: none;
}`,
);
fs.writeFileSync(cssPath, css);
