# Méthode de reprise d'un export HTTrack

Ce projet contient une méthode et des outils pour reprendre un site extrait par HTTrack
(Wix ou non) et le reconstruire en HTML/CSS simple. Les outils vivent dans `outils/`.

## Réglages par défaut (décidés une fois, valables pour tous les exports)

- **Sortie** : un fichier `.html` par page à la racine, un seul `assets/css/style.css`
  partagé, un seul `assets/js/site.js`. Pas de générateur, pas de framework.
- **Fidélité** : rendu fidèle à l'original, mais responsive refait proprement
  (grilles qui passent de 3 à 2 à 1 colonne, menu burger, pas de version mobile séparée).
- **Noms de fichiers** : ceux de l'original, accents compris.
- **Images** : toutes rapatriées en local dans `assets/img/`, renommées lisiblement
  (`articles/tchernobyl.png`, `equipe/carla-davailleau.jpg`), jamais les identifiants
  d'origine.
- **Polices** : les polices uploadées sur la plateforme sont remplacées par leurs
  équivalents Google Fonts. Vérifier le vrai nom de la fonte dans les `@font-face` de
  l'export avant de choisir.
- **Aucune mention** de Wix, HTTrack, parastorage, wixstatic ou de l'outil d'origine
  dans le code livré. Exception : le contenu juridique (hébergeur dans les mentions
  légales) n'est pas réécrit sans accord, il est signalé.

## Au début de chaque nouvelle conversion

Toujours poser les questions d'abord, avec `ask_user` : périmètre et lot pilote,
fonctionnalités dynamiques à conserver, hébergement visé, pages à supprimer.
Ne jamais commencer la conversion sans ces réponses.

## Les six phases

### 1. Reconnaissance
Lister l'arborescence de l'export. Compter les pages, repérer les doublons
(`articles/categories/x.html` en plus de `x.html` : une seule page à l'arrivée).
Copier l'export dans `_src/` (noms sans accents : les scripts d'écriture les refusent)
et ne jamais y toucher ensuite.

### 2. Relevé du rendu
Ouvrir chaque page type de l'export dans l'aperçu et relever les **styles calculés**,
pas le CSS source : couleurs, tailles, interlignes, rayons, positions, dégradés.
`outils/inspecteur.html` fait ce relevé et sort un rapport copiable.
C'est l'étape qui garantit la fidélité — le CSS d'une plateforme est illisible,
le rendu calculé ne mentionne pas.

### 3. Fondations
Écrire `assets/css/style.css` : variables de couleurs et de polices en tête,
sections commentées, un bloc responsive à la fin. Écrire `assets/js/site.js`
(menu mobile, carrousels, flux externes conservés à l'identique).
Configurer `outils/site.config.js` (navigation, réseaux sociaux, pied de page,
domaine public, identifiant de mesure d'audience).

Trois éléments que l'export ne contient jamais et qu'il faut ajouter :
- **Favicon** : carré, construit à partir de la marque du logo, en `.svg` plus un
  `apple-touch-icon.png` de 180 px et un `favicon.png` de 32 px.
- **Mesure d'audience** : un seul fichier `assets/js/analytics.js` avec
  l'identifiant en tête, chargé en `defer` par chaque page. Il ne se déclenche ni en
  local, ni tant que l'identifiant n'est pas renseigné.
- **`sitemap.xml` et `robots.txt`** : générés en fin de conversion, quand la liste
  des pages est arrêtée (voir phase 6).

### 4. Lot pilote
Convertir 3 ou 4 pages représentatives : accueil, une page de contenu, une page de
liste, un article. Les faire valider avant d'industrialiser. Ne jamais générer
50 pages sur un gabarit non validé.

### 5. Industrialisation
Extraire le contenu de toutes les pages en un index JSON, puis générer les pages avec
`outils/gabarit.js`. Toujours passer les textes par la fonction d'échappement, y
compris pour les attributs `content=` des metas : un guillemet droit non échappé
casse la balise silencieusement.

### 6. Contrôles
Ouvrir `outils/controles.html` et corriger tout ce qu'il signale avant de livrer.
Générer `sitemap.xml` et `robots.txt` une fois la liste des pages arrêtée, avec le
domaine de `site.config.js` et les noms de fichiers passés par `encodeURI`
(les accents doivent être encodés dans un sitemap).
Puis mettre à jour `github.md` (dépôt, date, table de correspondance des pages).

## Pièges rencontrés, à vérifier systématiquement
- Les liens externes sont transformés en chemins locaux (`../../../www.site.fr/doc.pdf`) :
  restaurer le `https://` et l'extension d'origine (HTTrack remplace `.pdf` par `.html`).
- Les liens passant par une redirection de moteur de recherche cachent la vraie URL,
  encodée en base64 dans le paramètre `u=a1…`.
- Les guillemets droits dans un texte injecté en attribut cassent la balise.
- Les images sont stockées en plusieurs variantes : prendre la plus grande.
- Un lien peut être dupliqué sur un espace insécable (deux `<a>` consécutifs à fusionner).
- Les coins arrondis du pied de page laissent voir le fond du `<body>` : chaque page
  déclare `--footer-notch` avec la couleur de la section qui la précède.

## Points signalés par les contrôles qui ne sont pas des bugs

Certaines alertes sont attendues et se justifient auprès du client plutôt que se corriger :

- **Mention de l'hébergeur dans les mentions légales** : contenu juridique, ne pas réécrire
  sans accord écrit. Le signaler.
- **Titres de plus de 70 caractères** sur les articles : ce sont les titres réels des
  articles, on ne les raccourcit pas. Seuls les titres de pages fabriqués par nous
  doivent tenir dans la limite.
- **Images en basse définition** : quand l'export ne contient que la petite variante,
  la lister au client pour qu'il fournisse l'originale.
