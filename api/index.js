export default async function handler(req, res) {
  try {
    const source = await fetch('https://raw.githubusercontent.com/U-Adam/LA-Anniversary/main/index.html', {
      headers: { 'cache-control': 'no-cache' }
    });
    if (!source.ok) throw new Error(`Unable to load site source: ${source.status}`);

    let html = await source.text();

    // Repair the malformed newline that prevented the entire planner script from parsing.
    html = html.replace(/\.join\('\s*'\);emailBtn\.href=/, ".join('\\n');emailBtn.href=");

    // Restore the approved section name; Griffith Hike + Observatory is in this data set.
    html = html.replace('🌟 Add-On Adventures', '🌟 Side Quests');

    // Replace stale destination URLs with verified current official pages.
    html = html
      .replaceAll('https://www.theodysseymovie.com/', 'https://www.odysseymovie.com/')
      .replaceAll('https://www.universalstudioshollywood.com/web/en/us/tickets-packages/general-admission-tickets', 'https://www.universalstudioshollywood.com/web/en/us/theme-park-ticket-deals')
      .replaceAll('https://www.universalstudioshollywood.com/web/en/us/tickets-packages/universal-express', 'https://www.universalstudioshollywood.com/web/en/us/theme-park-ticket-deals')
      .replaceAll('https://www.universalstudioshollywood.com/web/en/us/tickets-packages/vip-experience', 'https://www.universalstudioshollywood.com/web/en/us/theme-park-ticket-deals')
      .replaceAll('https://griffithobservatory.org/explore/griffith-park/', 'https://griffithobservatory.lacity.gov/explore/griffith-park/')
      .replaceAll('https://www.voodoodoughnut.com/find-us/', 'https://www.universalstudioshollywood.com/web/en/us/things-to-do/dining/citywalk/voodoo-doughnut');

    // Enhance Slice's "Full Body" gag and chapter navigation.
    html = html.replace('</head>', `<style>
      .dolphin-pod{position:absolute;left:-28vw;width:clamp(120px,18vw,290px);filter:drop-shadow(5px 8px 2px #0008);animation:podLeap 1.65s cubic-bezier(.2,.7,.35,1) forwards;will-change:transform,left,top}
      @keyframes podLeap{0%{left:-28vw;transform:translateY(22vh) rotate(-16deg) scale(.65)}45%{transform:translateY(-18vh) rotate(7deg) scale(1)}100%{left:112vw;transform:translateY(18vh) rotate(20deg) scale(.7)}}
      .dolphin-hero{position:absolute;left:-48vw;bottom:-20vh;width:min(82vw,980px);filter:drop-shadow(10px 14px 4px #0009);animation:heroDolphin 2.05s cubic-bezier(.16,.75,.28,1) forwards;will-change:transform,left,bottom}
      @keyframes heroDolphin{0%{left:-48vw;bottom:-24vh;transform:rotate(-18deg) scale(.55)}48%{left:12vw;bottom:30vh;transform:rotate(2deg) scale(1.15)}72%{left:42vw;bottom:22vh;transform:rotate(11deg) scale(1.35)}100%{left:118vw;bottom:-18vh;transform:rotate(25deg) scale(.75)}}
      .full-body-reveal{opacity:0;animation:fullBodyReveal .5s 1.95s cubic-bezier(.15,.9,.25,1.2) forwards}
      @keyframes fullBodyReveal{0%{opacity:0;transform:translateX(-50%) rotate(-8deg) scale(.35)}100%{opacity:1;transform:translateX(-50%) rotate(-3deg) scale(1)}}
      .chapter-jump{cursor:pointer;transition:transform .16s ease,box-shadow .16s ease}
      .chapter-jump:hover{transform:translate(-2px,-3px);box-shadow:6px 6px 0 var(--yellow)}
      .chapter-jump:focus-visible{outline:5px solid var(--cyan);outline-offset:4px}
      .percy-picks-only{display:grid;grid-template-columns:minmax(220px,420px) 1fr;align-items:center;gap:28px;padding:18px}
      .percy-picks-portrait{position:relative;overflow:hidden;min-height:430px;background:#fff;border:5px solid var(--ink);box-shadow:8px 8px 0 var(--ink)}
      .percy-picks-portrait img{position:absolute;top:0;left:-200%;width:300%;height:100%;object-fit:cover;border:0}
      .percy-picks-headline{margin:0;font:900 clamp(3rem,8vw,7rem)/.82 Impact,"Arial Black",sans-serif;text-transform:uppercase;color:var(--yellow);-webkit-text-stroke:4px var(--ink);paint-order:stroke fill;text-shadow:6px 6px 0 var(--red)}
      @media(max-width:700px){.percy-picks-only{grid-template-columns:1fr}.percy-picks-portrait{min-height:360px}.percy-picks-headline{text-align:center}}
    </style></head>`);

    // Make every card image eager, provide visible fallbacks, bind animations, and create chapter jump behavior.
    html = html.replace('</body>', `<script>
      document.querySelectorAll('.card img').forEach(function(img){
        img.loading = 'eager';
        img.decoding = 'async';
        img.referrerPolicy = 'no-referrer';
        img.addEventListener('error', function(){
          var card = img.closest('.card');
          var title = card && card.querySelector('h3') ? card.querySelector('h3').textContent : 'Los Angeles';
          img.src = 'https://placehold.co/1200x700/f4e4bc/100f0d?text=' + encodeURIComponent(title);
        }, { once: true });
      });
      document.querySelectorAll('a[target="_blank"]').forEach(function(link){
        link.rel = 'noopener noreferrer';
      });

      var chapters = Array.from(document.querySelectorAll('.chapter'));
      chapters.forEach(function(chapter, index){
        var number = index + 1;
        chapter.id = 'chapter-' + number;
        chapter.style.scrollMarginTop = '145px';
        var head = chapter.querySelector('.chapter-head');
        if (head) {
          head.classList.add('chapter-jump');
          head.tabIndex = 0;
          head.setAttribute('role', 'link');
          head.setAttribute('aria-label', 'Go to chapter ' + number);
          var jump = function(){ chapter.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
          head.addEventListener('click', jump);
          head.addEventListener('keydown', function(event){
            if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); jump(); }
          });
        }
      });

      // Any chapter label elsewhere on the page now jumps to the matching section.
      document.querySelectorAll('a,button,[class*="chapter"]').forEach(function(element){
        if (element.closest('.chapter')) return;
        var match = (element.textContent || '').match(/chapter\\s*([1-5])/i);
        if (!match) return;
        var target = document.getElementById('chapter-' + match[1]);
        if (!target) return;
        element.classList.add('chapter-jump');
        element.addEventListener('click', function(event){
          event.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });

      // Chapter 5 is now one Percy Picks headline plus Percy's approved picture.
      var percyChapter = document.getElementById('chapter-5');
      var percySource = document.querySelector('.cast .percy img');
      if (percyChapter && percySource) {
        var existingHead = percyChapter.querySelector('.chapter-head');
        if (existingHead) existingHead.remove();
        percyChapter.innerHTML = '<div class="percy-picks-only"><div class="percy-picks-portrait"><img src="' + percySource.src + '" alt="Percy"></div><h2 class="percy-picks-headline">Chapter 5:<br>Percy’s Picks</h2></div>';
      }

      function upgradedSliceMagic(){
        clear();
        var pod = '';
        for (var i = 0; i < 16; i++) {
          var top = 4 + (i % 6) * 14;
          var delay = (i * 0.075).toFixed(2);
          var scale = (0.55 + (i % 4) * 0.14).toFixed(2);
          pod += '<img class="dolphin-pod" src="' + dolphins + '" style="top:' + top + '%;animation-delay:' + delay + 's;transform:scale(' + scale + ')">';
        }
        overlay.innerHTML = pod + '<img class="dolphin-hero" src="' + dolphins + '"><div class="bubble full-body-reveal">FULL BODY!</div>';
        overlay.className = 'overlay show';
        setTimeout(clear, 3200);
      }
      document.querySelectorAll('.tap-slice').forEach(function(button){
        button.onclick = upgradedSliceMagic;
      });
    </script></body>`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send('Unable to load the anniversary planner: ' + error.message);
  }
}