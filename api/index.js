export default async function handler(req, res) {
  try {
    const source = await fetch('https://raw.githubusercontent.com/U-Adam/LA-Anniversary/main/index.html', {
      headers: { 'cache-control': 'no-cache' }
    });
    if (!source.ok) throw new Error(`Unable to load site source: ${source.status}`);

    let html = await source.text();

    // One malformed literal newline currently prevents the entire script from parsing.
    // Repairing it restores dynamic venue cards, photos, planner controls, and animations.
    html = html.replace(/\.join\('\s*'\);emailBtn\.href=/, ".join('\\n');emailBtn.href=");

    // Restore the approved section name. The Griffith hike is already in this data set.
    html = html.replace('🌟 Add-On Adventures', '🌟 Side Quests');

    // Make photo failures visible instead of leaving blank card space.
    html = html.replace('</body>', `<script>
      document.querySelectorAll('.card img').forEach(function(img){
        img.loading = 'eager';
        img.referrerPolicy = 'no-referrer';
        img.addEventListener('error', function(){
          var card = img.closest('.card');
          var title = card && card.querySelector('h3') ? card.querySelector('h3').textContent : 'Los Angeles';
          img.src = 'https://placehold.co/1200x700/f4e4bc/100f0d?text=' + encodeURIComponent(title);
        }, { once: true });
      });
    </script></body>`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send('Unable to load the anniversary planner: ' + error.message);
  }
}
