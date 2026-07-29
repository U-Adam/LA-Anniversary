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
if (!css.includes('/* ORIGINAL_DOLPHIN_GAG_V3 */')) {
  css += `

/* ORIGINAL_DOLPHIN_GAG_V3 */
.effect-slice {
  background: transparent;
  align-items: start;
}
.effect-slice .rainbow {
  display: none;
}
.dolphin-swarm {
  position: absolute;
  inset: 0 0 auto;
  height: min(27vh, 220px);
  z-index: 2;
  overflow: hidden;
  pointer-events: none;
  background: transparent;
}
.dolphin-swarm span {
  --i: var(--dolphin-index);
  position: absolute;
  left: -14vw;
  top: calc(5px + (var(--i) % 4) * 34px);
  font-size: clamp(34px, 5vw, 76px);
  line-height: 1;
  filter: drop-shadow(0 5px 3px rgba(0,0,0,.25));
  animation: original-dolphin-top-gag 1.85s cubic-bezier(.2,.65,.3,1) both;
  animation-delay: calc(var(--i) * 55ms);
}
.dolphin-swarm span:nth-child(3n) { font-size: clamp(28px, 4vw, 60px); }
.dolphin-swarm span:nth-child(even) { animation-duration: 2.05s; }
.effect-slice > strong {
  position: absolute;
  top: min(31vh, 245px);
  animation-delay: 1.05s;
}
@keyframes original-dolphin-top-gag {
  0% { left: -14vw; opacity: 0; transform: translateY(8px) rotate(-12deg) scale(.78); }
  12% { opacity: 1; }
  55% { transform: translateY(-7px) rotate(4deg) scale(1.02); }
  100% { left: 108vw; opacity: 1; transform: translateY(4px) rotate(12deg) scale(.9); }
}
`;
  fs.writeFileSync(cssPath, css);
}
