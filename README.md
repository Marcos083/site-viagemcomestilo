# Viagem com Estilo — Protótipos HTML/CSS

Protótipos navegáveis em HTML + CSS estáticos para as páginas internas do site. Servem como referência fiel para a implementação no WordPress/Elementor.

## Como rodar

Abrir qualquer `.html` direto no navegador, ou servir via live server:

```bash
npx serve .
# ou
python -m http.server 8000
```

## Mapa de páginas

| Arquivo              | Briefing         | Status  |
|----------------------|------------------|---------|
| `index.html`         | § 7 — Home nova  | pronto  |
| `destino.html`       | § 8.1            | pronto  |
| `como-funciona.html` | § 8.2            | pronto  |
| `depoimentos.html`   | § 8.3            | pronto  |
| `blog.html`          | § 8.4 listagem   | pronto  |
| `blog-post.html`     | § 8.4 post       | pronto  |
| `sobre.html`         | § 8.5            | pronto  |

> Todas as páginas estão com conteúdo placeholder marcado como `<!-- [CMS:...] -->` ou `<!-- [PLACEHOLDER:...] -->`. A troca por dados reais acontece na migração para WordPress (ver `cms-fields.md`) ou na entrega dos assets do cliente (ver `assets-pendentes.md`).

> A landing de vendas original (`../index.html` do projeto) vira referência de design — a nova `index.html` deste diretório é a **home institucional** com grid filtrável de roteiros por ano/continente, conforme ata de reunião.

## Arquitetura CSS

- `css/tokens.css` — variáveis do DS (cor, tipografia, espaço, raio, sombra). **Nunca** hardcodar valores fora daqui.
- `css/base.css` — reset enxuto, tipografia semântica (h1–h6, p), utilitários (container, label, section-line), acessibilidade (focus-visible, prefers-reduced-motion).
- `css/components.css` — todos os componentes reutilizáveis. BEM simplificado (`.card-roteiro__titulo`, `.card-roteiro--destaque`).
- `css/pages.css` — overrides por página. **Evitar ao máximo** — se precisar de 3+ regras por página, virar modificador em `components.css`.

## Componentes em `components.css`

| Classe             | Onde usa                                                   |
|--------------------|------------------------------------------------------------|
| `.btn`             | Todas as páginas. Variantes: primary, outline, white, ghost, whatsapp |
| `.navbar`          | Todas                                                       |
| `.hero`            | Todas. Variantes: padrão, compact, light                    |
| `.trust-bar`       | Home, Como Funciona                                         |
| `.card-manifesto`  | Home, Como Funciona, Destino. Variante `--spotlight` na Como Funciona |
| `.step`            | Como Funciona, Destino (itinerário)                         |
| `.card-roteiro`    | Home (grid filtrável), Destino (relacionados)               |
| `.filter-chips` / `.chip` | Home                                                 |
| `.diferencial`     | Home, Como Funciona                                         |
| `.card-depoimento` | Depoimentos, Home                                           |
| `.video-facade`    | Depoimentos. Carrega iframe só no clique                    |
| `.founder`         | Sobre, Home (bloco reduzido)                                |
| `.bloco-pagamento` | Home, Destino, Como Funciona — reforço do 48× sem juros     |
| `.faq`             | Home, Como Funciona, Destino                                |
| `.form`            | Home, Contato                                               |
| `.cta-final`       | Todas                                                        |
| `.footer`          | Todas                                                        |
| `.whatsapp-float`  | Todas. Variante `--labeled` para mobile com texto           |
| `.breadcrumb`      | Destino, Blog, Post                                         |
| `.card-post`       | Blog (listagem), Post (relacionados)                        |

## Tokens — decisões contra o padrão da landing

- **Body ≥ 17px mobile / ≥ 18px desktop** (ICP 50+). Não reduzir.
- **Alvos de toque ≥ 48×48px** via `--tap-min`. Aplicado em `.btn`, `.form__input`, `.chip`, `.faq__question`.
- **Contraste AA mínimo no corpo, AAA em CTAs e headlines** — texto `#1A1A2E` sobre `#FDFDFB` passa AAA; brand `#0001F9` sobre branco passa AAA.
- **Tokens em inglês e semânticos** — `--color-brand-primary`, `--font-size-body`, `--space-4`. Facilita mapeamento para o painel do Elementor.

## Convenções de código

- **Mobile-first.** Todas as `@media` em `min-width`. Breakpoints literais (custom properties não funcionam em `@media`): 375, 768, 1024, 1440.
- **BEM simplificado** — `.bloco__elemento--modificador`. Sem aninhamento pesado.
- **HTML semântico** — `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`. 1 `<h1>` por página.
- **Imagens** — sempre com `loading="lazy"`, `width`, `height`, `alt`. Placeholders numerados em `assets/img/`.
- **CTA WhatsApp** — link `https://wa.me/<!-- WHATSAPP_NUMBER -->`. Deixar comentário no HTML onde o número entra. Copy única: **"Falar com a equipe no WhatsApp"**.
- **Comentários de seção no HTML** (para migração Elementor):
  ```html
  <!-- [SEÇÃO: itinerário dia a dia]
       Componente: .step (components.css)
       Fixo: estrutura do bloco, título "Itinerário"
       Dinâmico (CMS — Destino): repetidor "dias" { dia, titulo, descricao, foto? }
  -->
  ```

## Premissas e pendências

- **Prazo 7–10 dias** congelado a partir da **entrega do conteúdo de roteiros** pela agência (valores, cronogramas, imagens reais), não da aprovação do briefing. Reconhecido em ata que o atraso de conteúdo é responsabilidade da agência.
- **Referências de design do Eric** — se não chegarem até o início do layout, seguir apenas o DS da landing.
- **Home nova** — confirmado em briefing que é uma home institucional distinta da landing de vendas (que continua como página `/lp` ou similar para tráfego pago).
- **"Assinatura de viagem" e "roteiros exclusivos"** — citados em ata como facilidades secundárias. Serão integrados ao bloco de diferenciais da home e à página Como Funciona.
- **Blog com IA "Viver de Ar"** — layout de listagem assume volume alto (paginação robusta, filtro por categoria).

## Arquivos de apoio

- [`assets-pendentes.md`](./assets-pendentes.md) — lista de imagens, vídeos e dados que o cliente precisa fornecer.
- [`cms-fields.md`](./cms-fields.md) — mapa de campos ACF por post-type para implementação do CMS.
