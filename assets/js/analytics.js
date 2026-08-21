const ID_MESURE = 'G-3ZYEELQH3P';

// Ne se déclenche ni en local, ni tant que l'identifiant n'est pas renseigné.
if (ID_MESURE.indexOf('XXXX') === -1 && location.protocol !== 'file:' &&
    !/^(localhost|127\.|192\.168\.)/.test(location.hostname)) {

  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID_MESURE;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', ID_MESURE, { anonymize_ip: true });
}
