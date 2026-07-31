import fs from 'node:fs';

const pagePath = 'app/page.tsx';
let page = fs.readFileSync(pagePath, 'utf8');
page = page.replace('imagePosition: "center 28%",\n    note: "Saturday, Aug 8', 'imagePosition: "center center",\n    note: "Saturday, Aug 8');
const oldDolphins = `              <div className="rainbow" />
              <img className="real-dolphin dolphin-one" src="/assets/events/dolphin-swim.png" alt="" />
              <img className="real-dolphin dolphin-two" src="/assets/events/dolphin-rise.png" alt="" />
              <img className="real-dolphin dolphin-jump" src="/assets/events/dolphin-jump.png" alt="" />
              <strong>FULL BODY!</strong>`;
const newDolphins = `              <div className="ocean-light" />
              <div className="dolphin-school" aria-hidden="true">
                <img className="real-dolphin pod-one" src="/assets/events/dolphin-swim.png" alt="" />
                <img className="real-dolphin pod-two" src="/assets/events/dolphin-swim.png" alt="" />
                <img className="real-dolphin pod-three" src="/assets/events/dolphin-rise.png" alt="" />
                <img className="real-dolphin pod-four" src="/assets/events/dolphin-swim.png" alt="" />
                <img className="real-dolphin pod-five" src="/assets/events/dolphin-rise.png" alt="" />
                <img className="real-dolphin pod-six" src="/assets/events/dolphin-swim.png" alt="" />
                <img className="real-dolphin dolphin-jump" src="/assets/events/dolphin-jump.png" alt="" />
              </div>
              <strong className="full-body-reveal">FULL BODY!</strong>`;
if (page.includes(oldDolphins)) page = page.replace(oldDolphins, newDolphins);
fs.writeFileSync(pagePath, page);

const cssPath = 'app/globals.css';
let css = fs.readFileSync(cssPath, 'utf8');
const stampStart = css.indexOf('.cover-date-stamp {');
const stampEnd = css.indexOf('\n.cover-shade', stampStart);
if (stampStart !== -1 && stampEnd !== -1) {
  css = css.slice(0, stampStart) + `.cover-date-stamp {
  position: absolute;
  z-index: 8;
  top: 8.05vw;
  right: 1.28vw;
  width: 8.05vw;
  padding: 0;
  background: transparent;
  border: 0;
  color: #17120e;
  text-align: center;
  font: 900 clamp(4px, 0.72vw, 11px) / 1 "Arial Narrow", Impact, sans-serif;
  letter-spacing: -0.015em;
  white-space: nowrap;
  transform: rotate(-0.15deg);
  text-shadow: 0 0 0.35px #17120e;
  mix-blend-mode: multiply;
  pointer-events: none;
}` + css.slice(stampEnd);
}
const dolphinStart = css.indexOf('.real-dolphin {');
const dolphinEnd = css.indexOf('\n.dice-storm', dolphinStart);
if (dolphinStart !== -1 && dolphinEnd !== -1) {
  css = css.slice(0, dolphinStart) + `.effect-slice { background:linear-gradient(#73c5ee 0 48%,#087da9 49% 67%,#043f65 100%); }
.ocean-light { position:absolute; inset:47% 0 auto; height:20%; z-index:1; background:linear-gradient(180deg,rgba(255,255,255,.7),rgba(43,179,219,.25) 22%,transparent 70%); filter:blur(2px); }
.dolphin-school { position:absolute; inset:0; z-index:2; }
.real-dolphin { position:absolute; width:clamp(105px,16vw,245px); height:auto; filter:drop-shadow(0 11px 9px rgba(0,0,0,.3)); animation:pod-pass 2.45s linear both; }
.pod-one{top:50%;animation-delay:0s}.pod-two{top:59%;width:clamp(90px,13vw,205px);animation-delay:.12s}.pod-three{top:42%;width:clamp(115px,17vw,260px);animation-delay:.2s}.pod-four{top:67%;width:clamp(82px,12vw,185px);animation-delay:.34s}.pod-five{top:54%;width:clamp(95px,14vw,215px);animation-delay:.46s}.pod-six{top:73%;width:clamp(70px,10vw,155px);animation-delay:.58s}
.dolphin-jump { bottom:-8%; width:clamp(145px,22vw,340px); animation:school-breach 2.3s .48s cubic-bezier(.38,.03,.45,.98) both; }
.full-body-reveal { opacity:0; animation:full-body-arrive .45s 1.9s cubic-bezier(.2,.9,.25,1.2) both!important; }
@keyframes pod-pass { from{left:-28%;transform:translateY(2vh) rotate(-3deg);opacity:.25} 10%{opacity:1} to{left:112%;transform:translateY(-4vh) rotate(2deg);opacity:1} }
@keyframes school-breach { 0%{left:-22%;transform:translateY(34vh) rotate(-28deg);opacity:0} 15%{opacity:1} 48%{left:43%;transform:translateY(-35vh) rotate(3deg)} 72%{left:67%;transform:translateY(-8vh) rotate(24deg)} 100%{left:108%;transform:translateY(34vh) rotate(38deg);opacity:1} }
@keyframes full-body-arrive { from{opacity:0;transform:scale(.15) rotate(-8deg)} 75%{opacity:1;transform:scale(1.14) rotate(2deg)} to{opacity:1;transform:scale(1) rotate(0)} }` + css.slice(dolphinEnd);
}
if (!css.includes('img[alt="The Odyssey in 70mm IMAX"]')) css += `
.card-image img[alt="The Odyssey in 70mm IMAX"]{object-fit:contain!important;object-position:center!important;padding:8px;background:#090806}
.card-image img[alt^="Universal Studios Hollywood"]{object-position:center 38%!important;transform:scale(1.08)}
`;
fs.writeFileSync(cssPath, css);
