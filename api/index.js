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

    // Make every card image eager and provide a visible fallback instead of blank space.
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
    </script></body>`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send('Unable to load the anniversary planner: ' + error.message);
  }
}
