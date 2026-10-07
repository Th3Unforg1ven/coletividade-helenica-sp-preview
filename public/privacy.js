/* Public GA4 measurement ID. Loaded only after analytics consent. */
(() => {
  const officialDomain = ['helenica.com.br', 'www.helenica.com.br'].includes(location.hostname);
  const GA_ID = officialDomain ? 'G-VL6E48HX1L' : 'G-S3G9EFPZRN';
  const KEY = 'chsp-privacy-v1';
  const MAX_AGE = 180 * 86400000;
  const scriptUrl = document.currentScript.src;
  const base = new URL('.', scriptUrl).pathname;
  let choice = null;
  try { const saved = JSON.parse(localStorage.getItem(KEY)); if (saved?.version === 1 && typeof saved.analytics === 'boolean' && typeof saved.external === 'boolean' && Number.isFinite(saved.savedAt) && Date.now() >= saved.savedAt && Date.now() - saved.savedAt < MAX_AGE) choice = saved; } catch {}
  let loaded = false, lastPath = '', timer;
  function tag() { window.dataLayer = window.dataLayer || []; window.dataLayer.push(arguments); }
  function sync() {
    const footer = document.querySelector('footer');
    if (footer && reopen.parentElement !== footer) footer.append(reopen);
    document.querySelectorAll('iframe[data-consent-src]').forEach(frame => {
      if (choice?.external && !frame.src) frame.src = frame.dataset.consentSrc;
      if (!choice?.external) frame.removeAttribute('src');
      let notice = frame.previousElementSibling;
      if (!notice?.classList.contains('embed-permission')) {
        notice = document.createElement('div'); notice.className = 'embed-permission';
        notice.innerHTML = '<p>Este conteúdo é fornecido por um serviço externo. Autorize conteúdos externos para carregá-lo.</p><button type="button">Escolher preferências</button>';
        notice.querySelector('button').onclick = open;
        frame.before(notice);
      }
      notice.hidden = !!choice?.external;
      frame.hidden = !choice?.external;
    });
    if (!choice?.analytics || !/^G-[A-Z0-9]+$/.test(GA_ID)) return;
    if (!loaded) {
      loaded = true;
      window['ga-disable-' + GA_ID] = false;
      tag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      tag('js', new Date()); tag('config', GA_ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
      const script = document.createElement('script'); script.async = true; script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID; document.head.append(script);
    }
    const path = location.hash.startsWith('#/') ? base + location.hash.slice(2).split(/[?#]/)[0] : location.pathname;
    if (path !== lastPath) { lastPath = path; tag('event', 'page_view', { page_location: location.origin + path, page_title: document.title }); }
  }
  const panel = document.createElement('section'); panel.className = 'privacy-panel'; panel.setAttribute('aria-label', 'Preferências de privacidade');
  panel.innerHTML = `<h2>Suas preferências de privacidade</h2><p>Usamos armazenamento necessário para lembrar suas escolhas. Estatísticas de acesso e conteúdos externos são opcionais.</p><label><input type="checkbox" checked disabled> Necessários (sempre ativos)</label><label><input type="checkbox" name="analytics"> Estatísticas de acesso (Google Analytics)</label><label><input type="checkbox" name="external"> Conteúdos externos (mapas e vídeos)</label><p><a href="${base}${location.hash.startsWith('#/') || base !== '/' ? '#/' : ''}privacidade">Política de privacidade</a></p><div><button type="button" data-action="reject">Somente necessários</button><button type="button" data-action="save">Confirmar seleção</button><button type="button" data-action="all">Aceitar todos</button></div><small>Confirmar seleção permite apenas as opções marcadas. Você pode rever sua decisão em “Privacidade e cookies”, no rodapé.</small>`;
  const reopen = document.createElement('button'); reopen.type = 'button'; reopen.className = 'privacy-reopen'; reopen.textContent = 'Privacidade e cookies'; reopen.onclick = open;
  const banner = document.createElement('section'); banner.className = 'privacy-banner'; banner.setAttribute('aria-label', 'Aviso de cookies');
  banner.innerHTML = `<p><strong>Usamos cookies para o funcionamento do site.</strong> Estatísticas de acesso e conteúdos externos só são ativados se você autorizar nas preferências do rodapé. Saiba mais na <a href="${base}${location.hash.startsWith('#/') || base !== '/' ? '#/' : ''}privacidade">Política de privacidade</a>.</p><button type="button">Continuar e fechar</button>`;
  banner.querySelector('button').onclick = () => save('reject');
  let returnFocus;
  function open() { returnFocus = document.activeElement; banner.hidden = true; panel.hidden = false; panel.querySelector('[name=analytics]').checked = !!choice?.analytics; panel.querySelector('[name=external]').checked = !!choice?.external; panel.querySelector('[name=analytics]').focus(); }
  function save(action) {
    const revoke = choice?.analytics && (action === 'reject' || (action === 'save' && !panel.querySelector('[name=analytics]').checked));
    choice = { version: 1, savedAt: Date.now(), analytics: action === 'all' || (action === 'save' && panel.querySelector('[name=analytics]').checked), external: action === 'all' || (action === 'save' && panel.querySelector('[name=external]').checked) };
    try { localStorage.setItem(KEY, JSON.stringify(choice)); } catch {}
    panel.hidden = true; banner.hidden = true;
    if (revoke) {
      window['ga-disable-' + GA_ID] = true;
      for (const cookie of document.cookie.split(';')) {
        const name = cookie.trim().split('=')[0]; if (!/^_ga(?:_|$)/.test(name)) continue;
        const domains = location.hostname.split('.').map((_, i, parts) => parts.slice(i).join('.'));
        for (const domain of ['', ...domains]) for (const path of ['/', base]) document.cookie = name + '=; Max-Age=0; path=' + path + (domain ? '; domain=' + domain : '');
      }
      if (loaded) { location.reload(); return; }
    }
    sync(); (returnFocus?.isConnected ? returnFocus : reopen).focus({ preventScroll: true });
  }
  panel.querySelectorAll('[data-action]').forEach(button => button.onclick = () => save(button.dataset.action));
  document.body.append(panel, banner, reopen); panel.hidden = true; banner.hidden = !!choice;
  new MutationObserver(() => { clearTimeout(timer); timer = setTimeout(sync, 100); }).observe(document.getElementById('root') || document.querySelector('main'), { childList: true, subtree: true });
  window.addEventListener('hashchange', sync); window.addEventListener('popstate', sync);
  window.addEventListener('storage', event => { if (event.key === KEY) location.reload(); });
  sync();
})();
