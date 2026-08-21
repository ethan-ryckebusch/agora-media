/* Gabarit de page : en-tête, pied de page, document complet.
   À charger dans un run_script après site.config.js, ou dans un outil HTML.

   Usage :
     const html = GABARIT.page({
       titre: 'Histoire | Agora',
       description: 'Les articles de la rubrique Histoire.',
       prefixe: '',            // '../' pour une page dans un sous-dossier
       actif: 'Histoire',      // libellé de nav à marquer comme page courante
       encoche: '#FFF8EE',     // couleur des coins du pied de page
       etendu: false,          // true si la page utilise la police secondaire
       type: 'website',        // ou 'article'
       corps: '<section>…</section>'
     });
*/

window.GABARIT = (function () {
  const S = () => window.SITE;

  /* Échappe une valeur destinée à du texte ou à un attribut.
     À utiliser SANS EXCEPTION sur tout texte repris de l'export : un guillemet
     droit non échappé dans un attribut casse la balise silencieusement. */
  function ech(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function entete(o) {
    const p = o.prefixe || '', s = S();
    const liens = s.nav.map(n => {
      const courant = o.actif === n.libelle ? ' aria-current="page"' : '';
      return '          <li><a class="site-nav__link" href="' + p + n.url + '"' + courant + '>' +
        ech(n.libelle) + '</a></li>';
    }).join('\n');
    const btn = s.boutonNav;
    const btnCourant = o.actif === btn.libelle ? ' aria-current="page"' : '';
    const transparent = o.enteteTransparente ? ' site-header--transparent' : '';

    return '<header class="site-header' + transparent + '">\n' +
      '    <div class="container site-header__inner">\n' +
      '      <a class="site-logo" href="' + p + 'index.html">\n' +
      '        <img src="' + p + s.logo + '" alt="' + ech(s.nom) + ' — accueil" width="168" height="55">\n' +
      '      </a>\n\n' +
      '      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">\n' +
      '        <span></span><span></span><span></span>\n' +
      '        <span class="visually-hidden">Ouvrir le menu</span>\n' +
      '      </button>\n\n' +
      '      <nav class="site-nav" id="site-nav" aria-label="Rubriques">\n' +
      '        <ul class="site-nav__list">\n' + liens + '\n        </ul>\n      </nav>\n\n' +
      '      <a class="btn btn--cream" href="' + p + btn.url + '"' + btnCourant + '>' + ech(btn.libelle) + '</a>\n' +
      '    </div>\n  </header>\n';
  }

  function pied(o) {
    const p = o.prefixe || '', s = S();
    const reseaux = s.reseaux.map(r =>
      '          <a href="' + r.url + '" target="_blank" rel="noopener" aria-label="' + ech(r.nom) +
      '"><img src="' + p + 'assets/img/social/' + r.icone + '.png" alt="" width="21" height="21"></a>'
    ).join('\n');

    const colonnes = s.colonnesPied.map(c => {
      let inner;
      if (c.reseaux) {
        inner = '        <div class="footer-social">\n' + reseaux + '\n        </div>\n' +
          '        <p class="site-footer__copyright">' + ech(s.copyright) + '</p>';
      } else {
        inner = '        <ul class="footer-col__list">\n' +
          c.liens.map(l => '          <li><a href="' + p + l.url + '">' + ech(l.libelle) + '</a></li>').join('\n') +
          '\n        </ul>';
      }
      return '      <div class="footer-col">\n        <h2 class="footer-col__title">' + ech(c.titre) +
        '</h2>\n' + inner + '\n      </div>';
    }).join('\n\n');

    return '<footer class="site-footer">\n  <div class="container">\n' +
      '    <div class="site-footer__logo">\n      <a href="' + p + 'index.html"><img src="' + p + s.logo +
      '" alt="' + ech(s.nom) + '" width="180" height="59"></a>\n    </div>\n\n' +
      '    <div class="site-footer__columns">\n' + colonnes + '\n    </div>\n  </div>\n</footer>\n\n' +
      '<script src="' + p + 'assets/js/site.js"><\/script>\n</body>\n</html>\n';
  }

  function tete(o) {
    const p = o.prefixe || '', s = S();
    const fontes = o.etendu ? s.policesEtendues : s.polices;
    return '<!DOCTYPE html>\n<html lang="fr">\n<head>\n' +
      '<meta charset="utf-8">\n' +
      '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      '<title>' + ech(o.titre) + '</title>\n' +
      '<meta name="description" content="' + ech(o.description) + '">\n' +
      '<meta property="og:title" content="' + ech(o.titre) + '">\n' +
      '<meta property="og:type" content="' + (o.type || 'website') + '">\n' +
      '<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
      '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
      '<link href="https://fonts.googleapis.com/css2?' + fontes + '&display=swap" rel="stylesheet">\n' +
      '<link rel="icon" href="' + p + 'assets/img/favicon.svg" type="image/svg+xml">\n' +
      '<link rel="icon" href="' + p + 'favicon.png" sizes="32x32">\n' +
      '<link rel="apple-touch-icon" href="' + p + 'assets/img/apple-touch-icon.png">\n' +
      '<link rel="stylesheet" href="' + p + 'assets/css/style.css">\n' +
      '<script src="' + p + 'assets/js/analytics.js" defer><\/script>\n' +
      '</head>\n<body style="--footer-notch: ' + (o.encoche || s.encocheParDefaut) + '">\n';
  }

  function page(o) {
    return tete(o) + '\n' + entete(o) + '\n<main>\n' + o.corps + '\n</main>\n\n' + pied(o);
  }

  /* Carte d'article réutilisable pour les pages de liste. */
  function carte(a, o) {
    o = o || {};
    const p = o.prefixe || '';
    const meta = '            <p class="post-card__meta--inline">' + ech(a.auteur) + '<br>' + ech(a.date) +
      '<span class="post-card__dot"></span>' + ech(a.lecture) + '</p>\n';
    return '        <a class="post-card post-card--list" href="' + p + 'article/' + a.fichier + '">\n' +
      '          <div class="post-card__media">\n            <img src="' + p + 'assets/img/articles/' +
      a.image + '" alt="' + ech(a.titre) + '">\n          </div>\n' +
      '          <div class="post-card__body">\n' + meta +
      '            <h2 class="post-card__title">' + ech(a.titre) + '</h2>\n' +
      '            <p class="post-card__excerpt">' + ech(a.extrait) + '</p>\n' +
      '          </div>\n        </a>';
  }

  /* Page de liste complète (rubrique, auteur, tous les articles). */
  function liste(o) {
    const corps = '  <section class="category-section">\n    <div class="container">\n' +
      '      <div class="category-header">\n        <h1 class="category-title">' + ech(o.h1) + '</h1>\n' +
      (o.lienTous === false ? '' :
        '        <a class="category-header__link" href="tous-les-articles.html">Tous les articles</a>\n') +
      '      </div>\n\n      <div class="post-list">\n\n' +
      o.articles.map(a => carte(a)).join('\n\n') + '\n\n      </div>\n    </div>\n  </section>';
    return page(Object.assign({}, o, { corps: corps }));
  }

  return { ech: ech, tete: tete, entete: entete, pied: pied, page: page, carte: carte, liste: liste };
})();
