const fs = require('fs');

const pagePath = 'app/page.tsx';
let page = fs.readFileSync(pagePath, 'utf8');
const realisticBlock = `              <div className="rainbow" />
              <img className="real-dolphin dolphin-one" src="/assets/events/dolphin-swim.png" alt="" />
              <img className="real-dolphin dolphin-two" src="/assets/events/dolphin-rise.png" alt="" />
              <img className="real-dolphin dolphin-jump" src="/assets/events/dolphin-jump.png" alt="" />
              <strong>FULL BODY!</strong>`;
const originalGag = `              <div className="rainbow" />
              <div className="dolphin-swarm" aria-hidden="true">
                {Array.from({ length: 14 }).map((_, i) => (
                  <span key={i} style={{ "--dolphin-index": i } as React.CSSProperties}>🐬</span>
                ))}
              </div>
              <strong>FULL BODY!</strong>`;
if (page.includes(realisticBlock)) {
  page = page.replace(realisticBlock, originalGag);
  fs.writeFileSync(pagePath, page);
}

const cssPath = 'app/globals.css';
let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('/* ORIGINAL_DOLPHIN_GAG_V2 */')) {
  css += `

/* ORIGINAL_DOLPHIN_GAG_V2 */
.dolphin-swarm {
  position: absolute;
  inset: 0;
  z-index: 2;
  overflow: hidden;
  pointer-events: none;
}
.dolphin-swarm span {
  --i: var(--dolphin-index);
  position: absolute;
  left: -20vw;
  top: calc(6% + (var(--i) * 6.25%));
  font-size: clamp(58px, 9vw, 145px);
  line-height: 1;
  filter: drop-shadow(0 10px 5px rgba(0,0,0,.34));
  animation: original-dolphin-gag 1.9s cubic-bezier(.2,.65,.3,1) both;
  animation-delay: calc(var(--i) * 60ms);
}
.dolphin-swarm span:nth-child(3n) { font-size: clamp(44px, 7vw, 108px); }
.dolphin-swarm span:nth-child(4n) { top: calc(76% - (var(--i) * 3.4%)); }
.dolphin-swarm span:nth-child(even) { animation-duration: 2.08s; }
.effect-slice > strong { animation-delay: 1.05s; }
@keyframes original-dolphin-gag {
  0% { left: -22vw; opacity: 0; transform: translateY(6vh) rotate(-20deg) scale(.72); }
  12% { opacity: 1; }
  55% { transform: translateY(-4vh) rotate(5deg) scale(1.06); }
  100% { left: 112vw; opacity: 1; transform: translateY(2vh) rotate(18deg) scale(.88); }
}
`;
  fs.writeFileSync(cssPath, css);
}
