/**
 * Mapeamento ISO numérico (3166-1) → continente para agrupar os países
 * do Natural Earth 110m por continente.
 *
 * Nota: países com territórios ultramarinos (França, Reino Unido, EUA,
 * Países Baixos) aparecem geograficamente no continente do território
 * mas o id do país é único. Para o MVP, isso não é problema — o clique
 * vale o continente do país "mãe".
 */
window.VCE_CONTINENT_BY_ISO = {
  // ÁFRICA (54)
  12:'africa', 24:'africa', 72:'africa', 86:'africa', 108:'africa', 120:'africa',
  132:'africa', 140:'africa', 148:'africa', 174:'africa', 178:'africa', 180:'africa',
  204:'africa', 226:'africa', 231:'africa', 232:'africa', 262:'africa', 266:'africa',
  270:'africa', 288:'africa', 324:'africa', 384:'africa', 404:'africa', 426:'africa',
  430:'africa', 434:'africa', 450:'africa', 454:'africa', 466:'africa', 478:'africa',
  480:'africa', 504:'africa', 508:'africa', 516:'africa', 562:'africa', 566:'africa',
  624:'africa', 646:'africa', 678:'africa', 686:'africa', 690:'africa', 694:'africa',
  706:'africa', 710:'africa', 716:'africa', 728:'africa', 729:'africa', 732:'africa',
  748:'africa', 768:'africa', 788:'africa', 800:'africa', 818:'africa', 834:'africa',
  854:'africa', 894:'africa',

  // ÁSIA (49 — exclui Rússia, classificada como Europa aqui)
  4:'asia',   31:'asia',  48:'asia',  50:'asia',  51:'asia',  64:'asia',
  96:'asia',  104:'asia', 116:'asia', 144:'asia', 156:'asia', 158:'asia',
  196:'asia', 268:'asia', 344:'asia', 356:'asia', 360:'asia', 364:'asia',
  368:'asia', 376:'asia', 392:'asia', 398:'asia', 400:'asia', 408:'asia',
  410:'asia', 414:'asia', 417:'asia', 418:'asia', 422:'asia', 446:'asia',
  458:'asia', 462:'asia', 496:'asia', 512:'asia', 524:'asia', 586:'asia',
  608:'asia', 626:'asia', 634:'asia', 682:'asia', 702:'asia', 704:'asia',
  760:'asia', 762:'asia', 764:'asia', 784:'asia', 792:'asia', 795:'asia',
  860:'asia', 887:'asia',

  // EUROPA (47 — inclui Rússia e Turquia fica na Ásia)
  8:'europa',  20:'europa',  40:'europa',  56:'europa',  70:'europa', 100:'europa',
  112:'europa', 191:'europa', 203:'europa', 208:'europa', 233:'europa', 234:'europa',
  246:'europa', 248:'europa', 250:'europa', 276:'europa', 292:'europa', 300:'europa',
  336:'europa', 348:'europa', 352:'europa', 372:'europa', 380:'europa', 428:'europa',
  438:'europa', 440:'europa', 442:'europa', 470:'europa', 492:'europa', 498:'europa',
  499:'europa', 528:'europa', 578:'europa', 616:'europa', 620:'europa', 642:'europa',
  643:'europa', 674:'europa', 688:'europa', 703:'europa', 705:'europa', 724:'europa',
  752:'europa', 756:'europa', 804:'europa', 807:'europa', 826:'europa',

  // AMÉRICA DO NORTE (inclui América Central e Caribe, ~41)
  28:'america-norte',  44:'america-norte',  52:'america-norte',  60:'america-norte',
  84:'america-norte',  92:'america-norte', 124:'america-norte', 136:'america-norte',
  188:'america-norte', 192:'america-norte', 212:'america-norte', 214:'america-norte',
  222:'america-norte', 238:'america-norte', 308:'america-norte', 320:'america-norte',
  332:'america-norte', 340:'america-norte', 388:'america-norte', 474:'america-norte',
  484:'america-norte', 500:'america-norte', 531:'america-norte', 533:'america-norte',
  534:'america-norte', 535:'america-norte', 558:'america-norte', 591:'america-norte',
  630:'america-norte', 652:'america-norte', 659:'america-norte', 660:'america-norte',
  662:'america-norte', 663:'america-norte', 666:'america-norte', 670:'america-norte',
  780:'america-norte', 796:'america-norte', 840:'america-norte', 850:'america-norte',
  882:'america-norte',

  // AMÉRICA DO SUL (13)
  32:'america-sul',  68:'america-sul',  76:'america-sul', 152:'america-sul',
  170:'america-sul', 218:'america-sul', 254:'america-sul', 328:'america-sul',
  600:'america-sul', 604:'america-sul', 740:'america-sul', 858:'america-sul',
  862:'america-sul',

  // OCEANIA (25)
  16:'oceania',  36:'oceania',  90:'oceania', 162:'oceania', 166:'oceania',
  184:'oceania', 242:'oceania', 258:'oceania', 296:'oceania', 316:'oceania',
  334:'oceania', 527:'oceania', 540:'oceania', 548:'oceania', 554:'oceania',
  570:'oceania', 574:'oceania', 580:'oceania', 581:'oceania', 583:'oceania',
  584:'oceania', 585:'oceania', 598:'oceania', 612:'oceania', 772:'oceania',
  776:'oceania', 798:'oceania', 876:'oceania'

  // Antártida (10) omitida — não há roteiros
};

/**
 * Overrides de posição (x, y em coordenadas viewBox 1000x500) para
 * posicionar o badge numa região visualmente "óbvia" do continente,
 * em vez do centroide matemático — que pode cair fora da massa principal
 * quando há muitas ilhas (Oceania, Ásia).
 * Se ausente, usamos o centroide calculado por d3-geo.
 */
window.VCE_BADGE_OVERRIDES = {
  'america-norte': [240, 170],
  'america-sul':   [320, 360],
  'europa':        [510, 155],
  'africa':        [540, 295],
  'asia':          [720, 180],
  'oceania':       [830, 370]
};
