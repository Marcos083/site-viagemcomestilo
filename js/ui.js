/**
 * Viagem com Estilo — UI
 * Sem dependências. Apenas:
 *  1. Navbar: troca de cor ao scroll + logo branco ↔ azul.
 *  2. Menu mobile.
 *  3. Accordion FAQ (acessível, aria-expanded).
 *  4. Facade de vídeo (carrega embed só no clique).
 *  5. Filtros da home (ano + continente).
 */

(function () {
  'use strict';

  /* ---------- 1. NAVBAR SCROLL ---------- */
  const navbar = document.querySelector('.navbar');
  const navbarLogo = document.querySelector('[data-navbar-logo]');
  if (navbar) {
    const logoLight = navbarLogo && navbarLogo.dataset.logoLight;
    const logoDark = navbarLogo && navbarLogo.dataset.logoDark;

    const onScroll = () => {
      const scrolled = window.scrollY > 80;
      navbar.classList.toggle('is-scrolled', scrolled);
      if (navbarLogo && logoLight && logoDark) {
        navbarLogo.src = scrolled ? logoDark : logoLight;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 2. MENU MOBILE ---------- */
  const toggle = document.querySelector('.navbar__toggle');
  const links = document.querySelector('.navbar__links');
  if (toggle && links) {
    const syncExpanded = (isOpen) => {
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    };
    const open = () => {
      links.classList.add('is-open');
      toggle.classList.add('is-open');
      document.body.classList.add('is-menu-open');
      syncExpanded(true);
    };
    const close = () => {
      links.classList.remove('is-open');
      toggle.classList.remove('is-open');
      document.body.classList.remove('is-menu-open');
      syncExpanded(false);
    };
    toggle.setAttribute('aria-controls', 'navbar-links');
    syncExpanded(false);
    toggle.addEventListener('click', () => {
      links.classList.contains('is-open') ? close() : open();
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && links.classList.contains('is-open')) close();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && links.classList.contains('is-open')) close();
    });
  }

  /* ---------- 3. FAQ ACCORDION ---------- */
  document.querySelectorAll('.faq__item').forEach((item, idx) => {
    const q = item.querySelector('.faq__question');
    const a = item.querySelector('.faq__answer');
    if (!q || !a) return;

    const id = `faq-answer-${idx}`;
    a.setAttribute('id', id);
    q.setAttribute('aria-expanded', 'false');
    q.setAttribute('aria-controls', id);

    q.addEventListener('click', () => {
      const isOpen = item.classList.toggle('is-open');
      q.setAttribute('aria-expanded', String(isOpen));
      a.style.maxHeight = isOpen ? a.scrollHeight + 'px' : '0';
    });
  });

  /* ---------- 4. VIDEO FACADE ---------- */
  document.querySelectorAll('.video-facade').forEach(facade => {
    facade.addEventListener('click', () => {
      const embedUrl = facade.dataset.embed;
      if (!embedUrl) return;
      const iframe = document.createElement('iframe');
      iframe.src = embedUrl + (embedUrl.includes('?') ? '&' : '?') + 'autoplay=1';
      iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('title', facade.dataset.title || 'Vídeo de depoimento');
      iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0;';
      facade.innerHTML = '';
      facade.appendChild(iframe);
    });
  });

  /* ---------- 5. FILTROS DA HOME ---------- */
  const filterRoot = document.querySelector('[data-filter-root]');
  if (filterRoot) {
    const state = { ano: 'todos', continente: 'todos' };

    const applyFilter = () => {
      filterRoot.querySelectorAll('[data-card-roteiro]').forEach(card => {
        const matchAno = state.ano === 'todos' || card.dataset.ano === state.ano;
        const matchCont = state.continente === 'todos' || card.dataset.continente === state.continente;
        card.style.display = (matchAno && matchCont) ? '' : 'none';
      });
    };

    filterRoot.querySelectorAll('[data-filter]').forEach(chip => {
      chip.addEventListener('click', () => {
        const group = chip.dataset.filter;
        const value = chip.dataset.value;
        state[group] = value;
        filterRoot.querySelectorAll(`[data-filter="${group}"]`).forEach(c => c.classList.remove('is-active'));
        chip.classList.add('is-active');
        applyFilter();
      });
    });
  }
})();
