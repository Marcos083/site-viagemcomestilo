# Assets pendentes — Viagem com Estilo

Lista de tudo o que o cliente precisa fornecer para o site sair do protótipo e virar versão final. **O prazo de 7–10 dias congela a partir da entrega desses itens.**

## Por página

### Home

| Item                              | Formato        | Resolução mín.    | Obs.                                                |
|-----------------------------------|----------------|-------------------|-----------------------------------------------------|
| Vídeo hero (background)           | MP4, < 8MB     | 1920×1080         | Opcional — fallback para imagem se não houver       |
| Imagem hero (fallback / desktop)  | JPG/WebP       | 2400×1400         | Obrigatória                                         |
| 4 imagens de diferencial          | WebP           | 1200×900          | 1 por diferencial (pagamento, grupo, acompanhamento, exclusividade) |
| Número real de viajantes embarcados | Número        | —                 | Ex.: "+2.000"                                       |
| Número real de anos de operação   | Número         | —                 | Ex.: "13"                                           |
| Número real de destinos/ano       | Número         | —                 | Para trust bar                                      |

### Template de página por destino (× 40–50 roteiros)

Por destino, o ideal:

| Item                          | Qtd mín. | Formato    | Resolução mín. |
|-------------------------------|----------|------------|----------------|
| Imagem hero do destino        | 1        | WebP       | 1920×1200      |
| Imagens de galeria            | 6–10     | WebP       | 1200×800       |
| Valor total (R$) e nº parcelas | —       | Número     | —              |
| Cronograma / datas de saída   | —        | Texto      | —              |
| Itinerário dia a dia          | —        | Texto      | —              |
| O que está incluso            | Lista    | Texto      | —              |
| O que não está incluso        | Lista    | Texto      | —              |
| FAQ específico (documentação, clima, moeda, tempo de voo) | 4–6 | Texto | — |

> **Status atual (ata de 20/04/2026):** apenas a pasta da África do Sul tinha material atualizado no drive. Matheus vai cobrar Eric para subir os demais.

### Página Como Funciona / Viagem com Estilo

| Item                                                                 | Formato | Obs.                                   |
|----------------------------------------------------------------------|---------|----------------------------------------|
| 3 imagens reais para blocos de objeção (pagamento, grupo, inglês)    | WebP    | 1200×900                               |
| 4–5 imagens para os passos do método (escolha → reserva → preparação → embarque → retorno) | WebP | 1200×900 |
| Política de pagamento e cancelamento (texto curto)                   | Texto   | —                                      |
| Citações reais de clientes para cada objeção (1 por bloco)            | Texto   | Nome + cidade/destino                  |

### Página de depoimentos

| Item                                       | Qtd   | Formato    | Obs.                                     |
|--------------------------------------------|-------|------------|------------------------------------------|
| Vídeos de depoimento                       | ?     | YouTube ou MP4 | **Confirmar com Matheus se existem** |
| Thumbnails dos vídeos                      | 1/vídeo | WebP     | 1280×720                                 |
| Cases escritos (foto + destino + duração + 2–3 frases) | 6+ | Texto + foto | Foto 800×800                   |
| Número total de viajantes / destinos / anos | —    | Número     | Para hero                                |

### Página Sobre

| Item                                  | Qtd   | Formato  | Obs.                               |
|---------------------------------------|-------|----------|------------------------------------|
| Foto do(s) fundador(es)               | 1–3   | WebP     | 1200×1500 (vertical 3:4)           |
| Bio do(s) fundador(es) (150–250 palavras cada) | — | Texto  | Humanizada, sem jargão corporativo |
| Texto de propósito/missão             | —     | Texto    | 2–3 parágrafos                     |
| Fotos de bastidores (grupos em viagem) | 8–12 | WebP     | 1200×800                           |
| Logos de imprensa/parceiros (se houver) | —   | SVG/PNG  | Fundo transparente                 |

### Blog

| Item                         | Obs.                                                          |
|------------------------------|---------------------------------------------------------------|
| Posts iniciais (IA "Viver de Ar") | 5–10 para lançamento. Texto + imagem de capa (1600×900).  |
| Foto da autora / avatar      | Quadrada, 400×400                                             |

## Dados comerciais (urgente)

- [ ] Valores finais de todos os roteiros (R$) — **bloqueante**
- [ ] Cronograma / datas de saída de cada roteiro — **bloqueante**
- [ ] Número de WhatsApp oficial para o site (confirmar se é `+55 41 9288-2478`)
- [ ] E-mail oficial de contato
- [ ] Endereço físico (Biosfera Coworking — confirmar)
- [ ] Redes sociais (Instagram, YouTube — confirmar URLs)

## Itens do código que dependem de dados reais

Procurar pelos marcadores no HTML:
- `<!-- WHATSAPP_NUMBER -->` — número de WhatsApp
- `<!-- PLACEHOLDER -->` — texto/imagem a substituir
- `data-count="X"` — números de contador (trust bar)
