/* Agora — comportements partagés : menu mobile et carrousel des dernières vidéos. */

/* ------------------------------------------------ Menu de navigation mobile */
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

/* ------------------------- Carrousel des dernières vidéos de la chaîne YouTube
   Le flux RSS de la chaîne est converti en JSON par rss2json, puis les
   vignettes défilent en continu. Clic = lecture dans la vignette.          */
(function () {
  var track = document.getElementById('shorts-track');
  var viewport = document.getElementById('shorts-viewport');
  if (!track || !viewport) return;

  var CHANNEL_ID = 'UCtODjOr1u6c_5OelQr7mIYQ';
  var rssUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + CHANNEL_ID;
  var apiUrl = 'https://api.rss2json.com/v1/api.json?rss_url=' +
    encodeURIComponent(rssUrl) + '&_=' + Date.now();

  var videos = [];
  var autoScrollSpeed = 1.5;
  var isAutoScrolling = true;
  var isDragging = false;
  var dragStartX = 0;
  var scrollStartX = 0;

  fetch(apiUrl)
    .then(function (res) { return res.json(); })
    .then(function (data) {
      videos = (data.items || []).slice(0, 15);
      if (!videos.length) throw new Error('flux vide');
      // Trois copies pour que le défilement paraisse infini.
      track.innerHTML = thumbnails() + thumbnails() + thumbnails();
      setupInteractions();
      startAutoScroll();
    })
    .catch(function (err) {
      console.error(err);
      track.innerHTML = '<p class="shorts__status">Impossible de charger les vidéos.</p>';
    });

  function videoIdOf(url) {
    return url.indexOf('watch?v=') > -1 ? url.split('watch?v=')[1] : url.split('/').pop();
  }

  function thumbnails() {
    return videos.map(function (item) {
      var id = videoIdOf(item.link);
      return '<div class="shorts__item" data-videoid="' + id + '" title="' + item.title + '">' +
        '<img src="https://i.ytimg.com/vi/' + id + '/hqdefault.jpg" alt="' + item.title + '" />' +
        '<div class="shorts__play"></div></div>';
    }).join('');
  }

  function setupInteractions() {
    track.querySelectorAll('.shorts__item').forEach(function (thumb) {
      var player = null;

      thumb.addEventListener('mouseenter', function () { isAutoScrolling = false; });
      thumb.addEventListener('mouseleave', function () { if (!player) isAutoScrolling = true; });

      thumb.addEventListener('click', function (e) {
        e.stopPropagation();
        if (player) return;
        document.querySelectorAll('.shorts__player').forEach(function (p) { p.remove(); });

        player = document.createElement('div');
        player.className = 'shorts__player';
        player.innerHTML = '<iframe src="https://www.youtube.com/embed/' +
          thumb.getAttribute('data-videoid') +
          '?autoplay=1&controls=1&modestbranding=1&rel=0" ' +
          'allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        thumb.appendChild(player);
        isAutoScrolling = false;

        thumb.addEventListener('mouseleave', function () {
          if (player) { player.remove(); player = null; isAutoScrolling = true; }
        }, { once: true });
      });
    });

    viewport.addEventListener('mousedown', function (e) {
      isDragging = true;
      dragStartX = e.pageX;
      scrollStartX = viewport.scrollLeft;
    });
    window.addEventListener('mouseup', function () { isDragging = false; });
    window.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      e.preventDefault();
      viewport.scrollLeft = scrollStartX - (e.pageX - dragStartX);
    });
  }

  function startAutoScroll() {
    (function step() {
      if (isAutoScrolling && !isDragging) {
        viewport.scrollLeft += autoScrollSpeed;
        // Retour au premier tiers pour boucler sans saut visible.
        if (viewport.scrollLeft >= track.scrollWidth / 3 * 2) {
          viewport.scrollLeft -= track.scrollWidth / 3;
        }
      }
      requestAnimationFrame(step);
    })();
  }
})();
