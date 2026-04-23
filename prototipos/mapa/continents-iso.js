/**
 * Mapeamento ISO numérico (3166-1) → continente para agrupar os países
 * do Natural Earth 110m por continente.
 *
 * Atribuição primária por país (ISO). Em runtime, cada polígono individual
 * é re-roteado pelo centroide (ver CONTINENT_BBOX abaixo) para lidar com
 * territórios ultramarinos (ex.: Guiana Francesa, que é ISO 250 "França"
 * mas geograficamente está na América do Sul).
 *
 * América Central é uma categoria do site (não ISO oficial) — agrupa
 * México, América Central continental e Caribe.
 */
window.VCE_CONTINENT_BY_ISO = {
  // ÁFRICA
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

  // ÁSIA
  4:'asia',   31:'asia',  48:'asia',  50:'asia',  51:'asia',  64:'asia',
  96:'asia',  104:'asia', 116:'asia', 144:'asia', 156:'asia', 158:'asia',
  196:'asia', 268:'asia', 344:'asia', 356:'asia', 360:'asia', 364:'asia',
  368:'asia', 376:'asia', 392:'asia', 398:'asia', 400:'asia', 408:'asia',
  410:'asia', 414:'asia', 417:'asia', 418:'asia', 422:'asia', 446:'asia',
  458:'asia', 462:'asia', 496:'asia', 512:'asia', 524:'asia', 586:'asia',
  608:'asia', 626:'asia', 634:'asia', 682:'asia', 702:'asia', 704:'asia',
  760:'asia', 762:'asia', 764:'asia', 784:'asia', 792:'asia', 795:'asia',
  860:'asia', 887:'asia',

  // EUROPA (inclui Rússia inteira — ver WHOLE_COUNTRIES)
  8:'europa',  20:'europa',  40:'europa',  56:'europa',  70:'europa', 100:'europa',
  112:'europa', 191:'europa', 203:'europa', 208:'europa', 233:'europa', 234:'europa',
  246:'europa', 248:'europa', 250:'europa', 276:'europa', 292:'europa', 300:'europa',
  336:'europa', 348:'europa', 352:'europa', 372:'europa', 380:'europa', 428:'europa',
  438:'europa', 440:'europa', 442:'europa', 470:'europa', 492:'europa', 498:'europa',
  499:'europa', 528:'europa', 578:'europa', 616:'europa', 620:'europa', 642:'europa',
  643:'europa', 674:'europa', 688:'europa', 703:'europa', 705:'europa', 724:'europa',
  752:'europa', 756:'europa', 804:'europa', 807:'europa', 826:'europa',

  // AMÉRICA DO NORTE (Canadá, EUA, Groenlândia, ilhas próximas ao Canadá)
  124:'america-norte', 304:'america-norte', 666:'america-norte',
  840:'america-norte',

  // AMÉRICA CENTRAL + CARIBE
  28:'america-central',  44:'america-central',  52:'america-central',
  60:'america-central',  84:'america-central',  92:'america-central',
  136:'america-central', 188:'america-central', 192:'america-central',
  212:'america-central', 214:'america-central', 222:'america-central',
  308:'america-central', 320:'america-central', 332:'america-central',
  340:'america-central', 388:'america-central', 474:'america-central',
  484:'america-central', 500:'america-central', 531:'america-central',
  533:'america-central', 534:'america-central', 535:'america-central',
  558:'america-central', 591:'america-central', 630:'america-central',
  652:'america-central', 659:'america-central', 660:'america-central',
  662:'america-central', 663:'america-central', 670:'america-central',
  780:'america-central', 796:'america-central', 850:'america-central',

  // AMÉRICA DO SUL
  32:'america-sul',  68:'america-sul',  76:'america-sul', 152:'america-sul',
  170:'america-sul', 218:'america-sul', 238:'america-sul', 254:'america-sul',
  328:'america-sul', 600:'america-sul', 604:'america-sul', 740:'america-sul',
  858:'america-sul', 862:'america-sul',

  // OCEANIA
  16:'oceania',  36:'oceania',  90:'oceania', 162:'oceania', 166:'oceania',
  184:'oceania', 242:'oceania', 258:'oceania', 296:'oceania', 316:'oceania',
  334:'oceania', 527:'oceania', 540:'oceania', 548:'oceania', 554:'oceania',
  570:'oceania', 574:'oceania', 580:'oceania', 581:'oceania', 583:'oceania',
  584:'oceania', 585:'oceania', 598:'oceania', 612:'oceania', 772:'oceania',
  776:'oceania', 798:'oceania', 876:'oceania', 882:'oceania'
};

/**
 * Bounding boxes geográficas (lon/lat) para roteamento a nível de polígono.
 * Cada polígono de país tem seu centroide comparado à bbox do continente
 * atribuído pelo ISO:
 *  - se cair dentro da bbox do "seu" continente → mantém
 *  - se cair fora → é re-roteado para o continente cuja bbox o contém
 *
 * Isso resolve: Guiana Francesa (ISO França=europa, centroide em
 * america-sul bbox → vai pra américa-sul); Guadalupe/Martinica (idem →
 * america-central); Chagos/Reunião (UK/FR → africa); etc.
 */
window.VCE_CONTINENT_BBOX = {
  'america-central': { minLon: -117, maxLon: -58, minLat:  7,   maxLat:  33 },
  'america-sul':     { minLon:  -85, maxLon: -30, minLat: -60,  maxLat:  13 },
  'america-norte':   { minLon: -170, maxLon: -50, minLat:  15,  maxLat:  85 },
  'europa':          { minLon:  -30, maxLon:  60, minLat:  35,  maxLat:  72 },
  'africa':          { minLon:  -20, maxLon:  55, minLat: -40,  maxLat:  38 },
  'asia':            { minLon:   25, maxLon: 180, minLat: -10,  maxLat:  80 },
  'oceania':         { minLon:  105, maxLon: 180, minLat: -50,  maxLat:   0 }
};

/**
 * Países cujo território deve ser tratado como UM bloco inteiro,
 * ignorando o roteamento por polígono. Uso: países que cruzam bboxes
 * mas que o editorial prefere manter visualmente coesos.
 *   - Rússia (643): se roteado por polígono, se divide nos Urais.
 *     Mantemos inteira em "europa" por simplicidade visual.
 */
window.VCE_WHOLE_COUNTRIES = new Set([643]);

/**
 * Posição do badge/label por continente, em coordenadas da viewBox
 * (1000×500). Ajustado para ficar visualmente centralizado na massa
 * principal de cada continente (não no centroide matemático, que cai
 * em lugares estranhos quando há ilhas).
 */
window.VCE_BADGE_OVERRIDES = {
  'america-norte':   [205, 160],
  'america-central': [260, 260],
  'america-sul':     [320, 370],
  'europa':          [515, 125],
  'africa':          [540, 315],
  'asia':            [705, 175],
  'oceania':         [855, 395]
};
