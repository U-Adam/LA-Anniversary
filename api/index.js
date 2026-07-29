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

    // Enhance Slice's "Full Body" gag: a pod crosses the screen, then one enormous dolphin jumps before the punchline appears.
    html = html.replace('</head>', `<style>
      .dolphin-pod{position:absolute;left:-28vw;width:clamp(120px,18vw,290px);filter:drop-shadow(5px 8px 2px #0008);animation:podLeap 1.65s cubic-bezier(.2,.7,.35,1) forwards;will-change:transform,left,top}
      @keyframes podLeap{0%{left:-28vw;transform:translateY(22vh) rotate(-16deg) scale(.65)}45%{transform:translateY(-18vh) rotate(7deg) scale(1)}100%{left:112vw;transform:translateY(18vh) rotate(20deg) scale(.7)}}
      .dolphin-hero{position:absolute;left:-48vw;bottom:-20vh;width:min(82vw,980px);filter:drop-shadow(10px 14px 4px #0009);animation:heroDolphin 2.05s cubic-bezier(.16,.75,.28,1) forwards;will-change:transform,left,bottom}
      @keyframes heroDolphin{0%{left:-48vw;bottom:-24vh;transform:rotate(-18deg) scale(.55)}48%{left:12vw;bottom:30vh;transform:rotate(2deg) scale(1.15)}72%{left:42vw;bottom:22vh;transform:rotate(11deg) scale(1.35)}100%{left:118vw;bottom:-18vh;transform:rotate(25deg) scale(.75)}}
      .full-body-reveal{opacity:0;animation:fullBodyReveal .5s 1.95s cubic-bezier(.15,.9,.25,1.2) forwards}
      @keyframes fullBodyReveal{0%{opacity:0;transform:translateX(-50%) rotate(-8deg) scale(.35)}100%{opacity:1;transform:translateX(-50%) rotate(-3deg) scale(1)}}
    </style></head>`);

    // Make every card image eager, provide visible fallbacks, and bind the upgraded Slice animation.
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
