/**
 * VCE — Mapa Interativo (protótipo)
 * Geometria real (Natural Earth 110m) via d3-geo + topojson-client (CDN).
 * Em produção no WP, baixar a topologia + o mapping ISO e empacotar localmente
 * (evita dependência de CDN externo em produção).
 */

import { geoNaturalEarth1, geoPath, geoCentroid } from 'https://esm.sh/d3-geo@3';
import { feature }                                 from 'https://esm.sh/topojson-client@3';

const WORLD_ATLAS_URL = 'https://unpkg.com/world-atlas@2/countries-110m.json';
const SVG_NS = 'http://www.w3.org/2000/svg';

(async function () {
  'use strict';

  const data      = window.VCE_MAPA_DATA;
  const isoMap    = window.VCE_CONTINENT_BY_ISO;
  const bboxMap   = window.VCE_CONTINENT_BBOX   || {};
  const whole     = window.VCE_WHOLE_COUNTRIES  || new Set();
  const overrides = window.VCE_BADGE_OVERRIDES  || {};
  if (!data || !isoMap) {
    console.error('[VCE Mapa] Dados ou mapping ISO ausentes.');
    return;
  }

  const svg       = document.querySelector('[data-mapa-svg]');
  const pathsG    = svg?.querySelector('[data-continent-paths]');
  const loading   = document.querySelector('[data-mapa-loading]');
  const drawer    = document.querySelector('[data-mapa-drawer]');
  const backdrop  = document.querySelector('[data-mapa-backdrop]');
  const closeBtn  = document.querySelector('[data-mapa-close]');
  const titleEl   = document.querySelector('[data-mapa-drawer-title]');
  const countEl   = document.querySelector('[data-mapa-drawer-count]');
  const listEl    = document.querySelector('[data-mapa-drawer-list]');

  if (!svg || !pathsG || !drawer) return;

  /* ---------- 1. Carrega e projeta a geometria real ---------- */

  let world;
  try {
    world = await fetch(WORLD_ATLAS_URL).then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    });
  } catch (err) {
    console.error('[VCE Mapa] Falha ao carregar topologia:', err);
    if (loading) loading.textContent = 'Não foi possível carregar o mapa. Recarregue a página.';
    return;
  }

  // Projeção Natural Earth, ajustada para a viewBox com margem mínima.
  // Filtra países sem continente (ex.: Antártida) para não desperdiçar
  // espaço vertical e dar mais "zoom" nas massas continentais.
  const allFeatures = feature(world, world.objects.countries);
  const renderedFeatures = {
    type: 'FeatureCollection',
    features: allFeatures.features.filter(f => isoMap[Number(f.id)])
  };
  const projection = geoNaturalEarth1()
    .fitExtent([[8, 8], [992, 492]], renderedFeatures);
  const pathGen = geoPath(projection);

  // Roteamento a nível de polígono:
  //   - país com ISO → continente default
  //   - cada polígono (para MultiPolygon) tem seu centroide verificado
  //     contra a bbox do continente. Se cair fora, é re-roteado para o
  //     continente cuja bbox o contém. Resolve territórios ultramarinos
  //     (Guiana Francesa, Guadalupe, Reunião, Chagos…).
  //   - países em WHOLE_COUNTRIES (ex.: Rússia) ignoram o roteamento.
  const inBBox = (lon, lat, b) =>
    lon >= b.minLon && lon <= b.maxLon && lat >= b.minLat && lat <= b.maxLat;

  const routePolygon = (coords, defaultCont) => {
    const poly = { type: 'Polygon', coordinates: coords };
    const [lon, lat] = geoCentroid(poly);
    const defBBox = bboxMap[defaultCont];
    if (defBBox && inBBox(lon, lat, defBBox)) return defaultCont;
    for (const [contId, bbox] of Object.entries(bboxMap)) {
      if (contId === defaultCont) continue;
      if (inBBox(lon, lat, bbox)) return contId;
    }
    return defaultCont;
  };

  const polysByContinent = {};
  allFeatures.features.forEach(f => {
    const iso = Number(f.id);
    const defaultCont = isoMap[iso];
    if (!defaultCont) return;
    const { geometry } = f;
    if (!geometry) return;
    const polys = geometry.type === 'Polygon'
      ? [geometry.coordinates]
      : geometry.type === 'MultiPolygon'
        ? geometry.coordinates
        : [];
    const forceWhole = whole.has(iso);
    polys.forEach(coords => {
      const cont = forceWhole ? defaultCont : routePolygon(coords, defaultCont);
      (polysByContinent[cont] ||= []).push(coords);
    });
  });

  // Render: um <path> por continente, cada um como MultiPolygon
  const featuresByContinent = {};
  Object.entries(polysByContinent).forEach(([contId, polys]) => {
    const f = {
      type: 'Feature',
      geometry: { type: 'MultiPolygon', coordinates: polys }
    };
    featuresByContinent[contId] = f;
    const d = pathGen(f);
    if (!d) return;
    const el = document.createElementNS(SVG_NS, 'path');
    el.setAttribute('class', 'mapa-svg__continent');
    el.setAttribute('data-continent', contId);
    el.setAttribute('d', d);
    pathsG.appendChild(el);
  });

  // Esconde loading, mostra SVG
  if (loading) loading.style.display = 'none';
  svg.removeAttribute('hidden');

  /* ---------- 2. Contagem e posição de badges/labels ---------- */

  const byContinent = data.roteiros.reduce((acc, r) => {
    (acc[r.continent] ||= []).push(r);
    return acc;
  }, {});

  // Posição de cada continente (override > centroide d3 da feature continental)
  const positions = {};
  Object.entries(featuresByContinent).forEach(([contId, f]) => {
    if (overrides[contId]) {
      positions[contId] = overrides[contId];
    } else {
      positions[contId] = pathGen.centroid(f);
    }
  });

  // Configura cada <path> de continente com contagem, a11y e foco
  svg.querySelectorAll('[data-continent]').forEach(node => {
    const id = node.dataset.continent;
    const count = (byContinent[id] || []).length;
    node.dataset.count = count;
    node.setAttribute('tabindex', count > 0 ? '0' : '-1');
    node.setAttribute('role', 'button');
    const contName = (data.continents.find(c => c.id === id) || {}).name || id;
    node.setAttribute(
      'aria-label',
      count > 0
        ? `${contName}, ${count} roteiro${count > 1 ? 's' : ''}`
        : `${contName}, sem roteiros disponíveis`
    );
  });

  // Popula badges (posição + número, ou esconde se 0)
  svg.querySelectorAll('[data-badge]').forEach(badge => {
    const id = badge.dataset.badge;
    const count = (byContinent[id] || []).length;
    const pos = positions[id];
    if (count === 0 || !pos) {
      badge.style.display = 'none';
      return;
    }
    const [cx, cy] = pos;
    const circle = badge.querySelector('circle');
    const text   = badge.querySelector('text');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    text.setAttribute('x', cx);
    text.setAttribute('y', cy);
    text.textContent = String(count);
  });

  // Labels: logo abaixo do badge
  svg.querySelectorAll('[data-label]').forEach(lbl => {
    const id = lbl.dataset.label;
    const pos = positions[id];
    if (!pos) { lbl.style.display = 'none'; return; }
    const [cx, cy] = pos;
    lbl.setAttribute('x', cx);
    lbl.setAttribute('y', cy + 38);
  });

  /* ---------- 3. Drawer ---------- */

  const formatBRL = value =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

  const parcelaLabel = (valor, parcelas) =>
    `ou ${parcelas}× de ${formatBRL(Math.ceil(valor / parcelas))} sem juros`;

  let lastFocused = null;

  const openDrawer = (continentId, triggerNode) => {
    const continent = data.continents.find(c => c.id === continentId);
    const roteiros = byContinent[continentId] || [];
    if (!continent || roteiros.length === 0) return;

    lastFocused = triggerNode || document.activeElement;

    svg.querySelectorAll('.is-selected').forEach(n => n.classList.remove('is-selected'));
    if (triggerNode) triggerNode.classList.add('is-selected');

    titleEl.textContent = continent.name;
    countEl.textContent =
      `${roteiros.length} roteiro${roteiros.length > 1 ? 's' : ''} disponível${roteiros.length > 1 ? 'is' : ''}`;

    listEl.innerHTML = roteiros.map(r => `
      <a class="roteiro-item" href="${r.url || '#'}" data-id="${r.id}">
        <div class="roteiro-item__cover">
          <img src="${r.capa}" alt="${r.titulo}" loading="lazy" width="240" height="240">
        </div>
        <div class="roteiro-item__body">
          ${r.destaque ? '<span class="roteiro-item__destaque">★ Em alta</span>' : ''}
          <h3 class="roteiro-item__titulo">${r.titulo}</h3>
          <p class="roteiro-item__sub">${r.subtitulo}</p>
          <div class="roteiro-item__meta">
            <span>${r.duracao_dias} dias</span>
            <span>•</span>
            <span>${r.datas.join(' · ')}</span>
          </div>
          <div class="roteiro-item__price">
            <span class="roteiro-item__price-small">a partir de</span>
            <span class="roteiro-item__price-value">${formatBRL(r.preco)}</span>
            <div class="roteiro-item__price-parcelas">${parcelaLabel(r.preco, r.parcelas)}</div>
          </div>
        </div>
      </a>
    `).join('');

    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    setTimeout(() => closeBtn.focus(), 50);
  };

  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    svg.querySelectorAll('.is-selected').forEach(n => n.classList.remove('is-selected'));
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  };

  /* ---------- 4. Eventos ---------- */

  svg.addEventListener('click', e => {
    const target = e.target.closest('[data-continent]');
    if (!target) return;
    openDrawer(target.dataset.continent, target);
  });

  svg.addEventListener('keydown', e => {
    const target = e.target.closest('[data-continent]');
    if (!target) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openDrawer(target.dataset.continent, target);
    }
  });

  closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
  });

  drawer.addEventListener('keydown', e => {
    if (e.key !== 'Tab' || !drawer.classList.contains('is-open')) return;
    const focusables = drawer.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last  = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });
})();
