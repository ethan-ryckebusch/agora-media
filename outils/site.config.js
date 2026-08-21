/* Configuration du site en cours de reprise.
   C'est le seul fichier à modifier quand on démarre un nouvel export :
   gabarit.js et controles.html lisent tout ici. */

window.SITE = {

  // ---------------------------------------------------------------- Identité
  nom: 'Agora',
  logo: 'assets/img/logo-agora.svg',
  copyright: '© Agora - 2026',

  // Dossier où l'export brut a été copié (sert aux contrôles avant/après).
  // Mettre '' si l'export n'est plus dans le projet.
  source: '_src/',

  // Adresse publique du site, avec la barre oblique finale. Sert au sitemap.
  domaine: 'https://ethan-ryckebusch.github.io/agora-media/',

  // Identifiant de mesure Google Analytics 4 (format G-XXXXXXXXXX).
  // La valeur réelle est dans assets/js/analytics.js ; ici c'est pour mémoire.
  analytics: 'G-XXXXXXXXXX',

  // Polices Google Fonts à charger (familles + graisses)
  polices: 'family=Commissioner:wght@400;700;800&family=Fustat:wght@400;500;700;800',
  policesEtendues: 'family=Commissioner:wght@400;700;800&family=Fustat:wght@400;500;700;800&family=Questrial',

  // ------------------------------------------------------------- Navigation
  nav: [
    { url: 'société.html', libelle: 'Société' },
    { url: 'économie.html', libelle: 'Économie' },
    { url: 'international.html', libelle: 'International' },
    { url: 'histoire.html', libelle: 'Histoire' },
    { url: 'institutions.html', libelle: 'Institutions' }
  ],
  boutonNav: { url: 'à-propos.html', libelle: 'À Propos' },

  // --------------------------------------------------------------- Réseaux
  reseaux: [
    { url: 'https://www.instagram.com/agora.media_/', nom: 'Instagram', icone: 'instagram' },
    { url: 'https://www.tiktok.com/@media.agora', nom: 'TikTok', icone: 'tiktok' },
    { url: 'https://www.youtube.com/@media_agora', nom: 'YouTube', icone: 'youtube' },
    { url: 'http://linkedin.com/company/agora-média', nom: 'LinkedIn', icone: 'linkedin' },
    { url: 'https://www.facebook.com/profile.php?id=61576292908680', nom: 'Facebook', icone: 'facebook' },
    { url: 'https://www.dailymotion.com/agora.media', nom: 'Dailymotion', icone: 'dailymotion' }
  ],

  // ------------------------------------------------------------ Pied de page
  colonnesPied: [
    {
      titre: 'Cadre légal',
      liens: [
        { url: 'mentions-légales.html', libelle: 'Mentions légales' },
        { url: 'conditions-utilisation.html', libelle: 'Conditions d’utilisation' },
        { url: 'politique-confidentialité.html', libelle: 'Politique de confidentialité' }
      ]
    },
    { titre: 'Suivre Agora', reseaux: true },
    {
      titre: 'En savoir plus',
      liens: [
        { url: 'à-propos.html', libelle: 'À propos' },
        { url: 'contact.html', libelle: 'Contact' }
      ]
    }
  ],

  // ------------------------------------------------------------- Contrôles
  // Couleur d'encoche par défaut du pied de page (voir --footer-notch)
  encocheParDefaut: '#FFF8EE',

  // Mots interdits dans le code livré : les contrôles les signalent
  motsInterdits: ['wix', 'httrack', 'parastorage', 'wixstatic', 'mediaagora.wixsite'],

  // Largeur minimale acceptable pour une image d'article
  largeurImageMin: 600,

  // Pages à ignorer dans les contrôles (outils, brouillons)
  ignorer: ['outils/', '_src/', '_build/']
};
