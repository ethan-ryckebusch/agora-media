# Outils de reprise d'un export HTTrack

Trois outils, à utiliser dans cet ordre. La méthode complète est dans `CLAUDE.md`
à la racine du projet.

## 1. `site.config.js` — à remplir en premier

Navigation, réseaux sociaux, pied de page, couleurs interdites, dossier de l'export.
C'est le seul fichier à modifier quand on démarre un nouveau site : les deux autres
outils lisent tout ici.

## 2. `inspecteur.html` — relever le rendu d'origine

Ouvrir l'outil, saisir le chemin d'une page de l'export (`_src/index.html`), lancer
le relevé. Sortie : une ligne par élément visible avec sa position, sa taille, sa
police, sa couleur, son fond, son rayon.

Le bouton **Palette + polices** sort les couleurs par fréquence, les styles de texte
et les dégradés : ce sont les valeurs à reporter dans les variables en tête de
`assets/css/style.css`.

Pourquoi relever le rendu calculé plutôt que lire le CSS : le CSS d'une plateforme
comme Wix fait 450 Ko de classes générées par page, illisible et non réutilisable.
Le rendu calculé, lui, donne les vraies valeurs finales.

## 3. `gabarit.js` — générer les pages

À charger après `site.config.js` dans un script d'assemblage.

```js
const html = GABARIT.page({
  titre: 'Histoire | Agora',
  description: 'Les articles de la rubrique Histoire.',
  prefixe: '',          // '../' pour une page en sous-dossier
  actif: 'Histoire',    // libellé de nav marqué comme page courante
  encoche: '#FFF8EE',   // couleur des coins arrondis du pied de page
  corps: '<section>…</section>'
});
```

`GABARIT.liste({ h1, articles })` génère une page de rubrique complète.
`GABARIT.ech(texte)` échappe un texte : **à utiliser sur tout contenu repris de
l'export**, y compris dans les attributs `content=` des metas. Un guillemet droit
non échappé casse la balise sans erreur visible.

## 4. `controles.html` — avant de livrer

Découvre les pages en suivant les liens depuis `index.html`, puis passe huit contrôles :

1. Liens internes — toutes les cibles locales sont testées
2. Mentions de la plateforme d'origine (wix, httrack, parastorage…)
3. Images manquantes, trop petites pour leur affichage, ou en basse définition
4. Validité HTML — attributs parasites, balises non fermées, `lang` absent
5. Metas et titres — présence, longueur, doublons, nombre de `h1`
6. Comparaison avant / après, page par page, côte à côte
7. Rendu responsive en 390, 768 et 1440 px
8. Pages non converties

Tout ce qui est signalé en rouge doit être corrigé avant livraison. Le bouton
**Copier le rapport** sort un compte rendu texte.

## Limite à connaître

Ces outils couvrent la partie mécanique : mesure, assemblage, vérification. Le
découpage en sections, le nommage des images et des fichiers, le choix des gabarits
et la réécriture du responsive restent des décisions à prendre au cas par cas.
