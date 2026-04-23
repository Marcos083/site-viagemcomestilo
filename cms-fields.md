# Mapa de campos de CMS — Viagem com Estilo

Referência para a implementação de ACF (Advanced Custom Fields) no WordPress. Um post-type por conceito dinâmico.

---

## 1. Post-type: `destino`

| Campo              | Tipo ACF                                   | Obrig. | Obs.                                                 |
|--------------------|--------------------------------------------|--------|------------------------------------------------------|
| `titulo`           | text                                       | sim    | H1 da página                                         |
| `subtitulo`        | text                                       | não    | Frase curta abaixo do H1                             |
| `ano`              | select (2026 / 2027 / 2028 / 2029)         | sim    | Alimenta filtro da home                              |
| `continente`       | select (Europa / América / África / Oceania / Ásia / Oriente Médio) | sim | Alimenta filtro da home + menu      |
| `hero_imagem`      | image                                      | sim    | ≥ 1920×1200                                          |
| `resumo_bullets`   | repeater (text)                            | sim    | 3–4 itens (duração, cidades, ponto forte, saída)     |
| `duracao_dias`     | number                                     | sim    | Aparece em card de resumo                            |
| `data_saida`       | date_picker (múltiplas)                    | sim    | Repeater se houver várias saídas                     |
| `valor_total`      | number                                     | sim    | Formato R$ no front                                  |
| `parcelas`         | number                                     | sim    | Máx. 48                                              |
| `valor_parcela`    | number                                     | não    | Calculável via PHP; campo opcional                   |
| `selo_destaque`    | select (Mais vendido / Últimas vagas / Grupo exclusivo / —) | não | Badge no card                       |
| `itinerario`       | repeater `{ dia:text, titulo:text, descricao:textarea, foto:image? }` | sim |                                    |
| `incluso`          | repeater (text)                            | sim    | Lista de itens                                       |
| `nao_incluso`      | repeater (text)                            | não    | Lista de itens                                       |
| `galeria`          | gallery                                    | não    | 6–10 imagens                                         |
| `faq_destino`      | repeater `{ pergunta:text, resposta:textarea }` | não   | FAQ específico                                      |
| `depoimentos_ids`  | relationship → `depoimento`                | não    | Vincular depoimentos filtrados                       |
| `meta_title`       | text                                       | sim    | SEO — até 60 caracteres                              |
| `meta_description` | textarea                                   | sim    | SEO — até 160 caracteres                             |
| `og_image`         | image                                      | não    | Fallback: `hero_imagem`                              |

**Taxonomias:** `ano`, `continente` (também podem ser registradas como taxonomias WP para facilitar arquivos/URLs, além dos selects).

**URL sugerida:** `/destinos/<slug>`

---

## 2. Post-type: `post` (blog)

Usar o post-type padrão do WordPress com campos ACF extra.

| Campo               | Tipo ACF                                | Obrig. | Obs.                                            |
|---------------------|------------------------------------------|--------|-------------------------------------------------|
| `titulo`            | (título nativo)                          | sim    |                                                 |
| `imagem_capa`       | image (ou featured image nativo)         | sim    | 1600×900                                        |
| `autora`            | text (ou usar autor nativo)              | sim    |                                                 |
| `tempo_leitura_min` | number                                   | não    | Calculável via JS                               |
| `sumario`           | true_false                               | não    | Exibir sumário clicável se post > 1.200 palavras|
| `cta_destino_id`    | relationship → `destino`                 | não    | Card do roteiro relacionado no meio/fim do post |
| `meta_title`        | text                                     | sim    | SEO                                             |
| `meta_description`  | textarea                                 | sim    | SEO                                             |

**Taxonomia:** `category` nativo — valores: `Destinos`, `Dicas`, `Primeira viagem`, `Documentação`.

**URL sugerida:** `/blog/<slug>`

---

## 3. Post-type: `depoimento`

| Campo         | Tipo ACF                               | Obrig. | Obs.                                        |
|---------------|----------------------------------------|--------|---------------------------------------------|
| `nome`        | text                                   | sim    |                                             |
| `cidade`      | text                                   | não    |                                             |
| `destino_id`  | relationship → `destino`               | não    | Para filtro por destino                     |
| `ano_viagem`  | number                                 | não    | Para filtro por ano                         |
| `foto`        | image                                  | não    | 800×800                                     |
| `depoimento`  | textarea                               | sim    | 2–3 frases para card escrito                |
| `estrelas`    | number (1–5)                           | não    | Padrão 5                                    |
| `video_url`   | url                                    | não    | YouTube embed URL; se vazio, mostra só texto|
| `video_thumb` | image                                  | não    | 1280×720; fallback: `foto`                  |

**URL sugerida:** não ter página individual — usar só em listagem.

---

## 4. Ajustes no tema

- **Menu principal** — 2 níveis:
  - Roteiros → submenu dinâmico por Ano + por Continente (via walker customizado ou blocos estáticos)
  - Como funciona
  - Depoimentos
  - Blog
  - Sobre
  - Fale conosco (WhatsApp)
- **Opções globais (via ACF Options Page):**
  - `whatsapp_numero` (text) — usado em todos os CTAs
  - `endereco`, `email`, `instagram_url`, `youtube_url` — footer
  - `numeros_trust_bar` — X viajantes, Y anos, Z destinos
- **Função helper:** `vce_whatsapp_url($mensagem_opcional)` — constrói `https://wa.me/<numero>?text=<msg>`.

---

## 5. Ordem sugerida de implementação do CMS

1. ACF Options Page (globais) — destrava todos os CTAs.
2. Post-type `destino` + taxonomias → importar 1 destino piloto (África do Sul, único com material).
3. Template `single-destino.php` mapeando os campos.
4. Template `archive-destino.php` (home/listagem com filtros).
5. Post-type `depoimento` + template da página.
6. Categorias + template do blog (usa post-type nativo).
7. Página Sobre (ACF fields simples, sem post-type próprio).
