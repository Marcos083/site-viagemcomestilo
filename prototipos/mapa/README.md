# Mapa interativo — protótipo

MVP standalone do widget de exploração por continente. Confirma o fluxo antes de investir em integração WordPress.

## Como rodar

Abrir `index.html` direto no navegador (usa paths relativos para `../../css/tokens.css` e `../../midia/`). Para evitar possíveis problemas de cache de fontes, servir via:

```bash
npx serve .
# ou
python -m http.server 8000
```

## O que este protótipo valida

- **Padrão de interação** — clique num continente abre drawer lateral (desktop) / bottom-sheet (mobile) com os roteiros filtrados
- **Estados visuais** — continentes sem roteiros ficam muted; hover/focus destaca em azul da marca; contagem via badge
- **A11y** — teclado (Tab/Enter/ESC), focus trap no drawer, `aria-label` descritivo em cada continente, `role="dialog"`
- **Responsividade** — bottom-sheet com handle no mobile, drawer lateral ≥ 768px
- **Escala de dados** — a lista de roteiros é gerada em runtime a partir de `data.js`; suporta N roteiros por continente sem alteração de HTML

## Decisões de arquitetura

- **Geometria real (Natural Earth 110m)** via `d3-geo` + `topojson-client` do CDN. Projeção Natural Earth 1 ajustada à viewBox por `fitExtent`. Os países são agrupados por continente em runtime usando o mapping ISO 3166-1 numérico (ver [`continents-iso.js`](./continents-iso.js))
- **Dependências client-side**: `d3-geo@3`, `topojson-client@3`, `world-atlas@2/countries-110m.json` (~90KB). Em produção, bundlar localmente (via npm build ou baixar os arquivos para `assets/vendor/`) para não depender do CDN externo
- **Dados separados em `data.js`** — em produção, substituir por fetch do endpoint `/wp-json/vce/v1/roteiros`. O formato do objeto já espelha o schema ACF alvo
- **Posição do badge**: usa override manual (`VCE_BADGE_OVERRIDES`) para cada continente, caindo no centroide d3-calculado se não houver override. Evita badges em locais esquisitos (ex.: centroide da Ásia cair sobre o deserto da Mongólia em vez de sobre a Europa/Oriente Médio)
- **2 níveis (continente → lista)** — nível país não adiciona valor com ≤3 roteiros por país

## O que **ainda não** está no protótipo (fase seguinte)

- Filtros secundários dentro do drawer (ano, duração, faixa de preço)
- Animação de zoom no continente selecionado (distração vs. ganho de UX — validar com cliente)
- Integração com página de destino real (`href` dos cards aponta para `#`)
- Telemetria de clique por continente (GA4/Meta)

## Integração WordPress (proposta)

1. **CPT `roteiro`** com ACF: `continente` (taxonomia), `paises` (repeater), `preco`, `parcelas`, `duracao_dias`, `datas` (repeater), `capa`
2. **Endpoint REST custom** em `mu-plugins/vce-mapa.php`:
   ```php
   register_rest_route('vce/v1', '/roteiros', [...]);
   ```
3. **Shortcode `[vce_mapa]`** que imprime o HTML do SVG e enqueue de `mapa.css`/`mapa.js`
4. **No JS**, trocar `window.VCE_MAPA_DATA` por `fetch('/wp-json/vce/v1/roteiros').then(r => r.json())`

## Próximos passos

1. Bundlar `world-atlas` e libs d3 localmente (tirar do CDN) antes de integrar ao WP
2. Montar CPT `roteiro` + ACF + endpoint REST conforme "Integração WordPress" acima
3. Criar shortcode `[vce_mapa]` e testar no ambiente de staging
4. Adicionar telemetria GA4 (`mapa_continent_click` com param `continent`)
