repo: ethan-ryckebusch/agora-media
branch: main

## Last sync
date: 2026-08-19T08:12:00Z

### Updated in this project
- Site entièrement repris en HTML/CSS simple : plus aucune trace de Wix ni de HTTrack dans le code.
- Une seule feuille de style partagée (`assets/css/style.css`) et un seul script (`assets/js/site.js`).
- 49 pages : accueil, à propos, contact, 3 pages légales, 5 rubriques, à la une, 5 pages auteurs, tous les articles, 31 articles.
- Images extraites du dépôt et renommées lisiblement dans `assets/img/`.

## Screen map
| Page du projet | Fichiers d'origine dans le dépôt |
| --- | --- |
| index.html | index.html |
| à-propos.html | à-propos.html |
| contact.html | contact.html |
| mentions-légales.html, conditions-utilisation.html, politique-confidentialité.html | pages homonymes |
| société.html, économie.html, international.html, histoire.html, institutions.html | pages homonymes + articles/categories/* |
| à-la-une.html | articles/categories/à-la-une.html |
| arnaud-del-socorro.html, carla-davailleau.html, etienne-domercq.html, lukas-derrou.html, arthur-birault.html | pages auteurs racine + articles/categories/* |
| tous-les-articles.html | tous-les-articles.html |
| article/*.html (31) | article/*.html (31) |
| assets/css/style.css | styles inline de toutes les pages (couleurs, typographies, gabarits) |
| assets/js/site.js | script du carrousel YouTube embarqué dans index.html |
| assets/img/** | assets/images/** (variantes Wix, renommées) |

## Choix de reprise
- Les doublons Wix (`articles/categories/x.html` en plus de `x.html`) sont fusionnés en une seule page par rubrique ou auteur.
- Chaque page déclare `--footer-notch` sur `<body>` : couleur de l'encoche des coins arrondis du pied de page.
- Polices d'origine (uploads Wix) remplacées par leurs équivalents Google Fonts : Commissioner, Fustat, Questrial.
- Les liens de sources passant par des redirections Bing sont rétablis vers les URL réelles ; les 11 liens
  externes qu'HTTrack avait transformés en chemins locaux (`../../../domaine/...`) sont rétablis en `https://`.
- Contrôle final : 49 pages, 1943 références internes, aucun lien cassé.
- Image de l'article « dossiers Epstein » : seule une version basse résolution existait dans l'extrait, à remplacer.
