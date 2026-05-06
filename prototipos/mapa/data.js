/**
 * VCE — Mock de roteiros para o protótipo do mapa interativo.
 * Em produção, este objeto virá do endpoint REST do WordPress
 * (/wp-json/vce/v1/roteiros) populado por um CPT "roteiro" + ACF.
 *
 * Estrutura mínima que o componente espera:
 *   continent: id do continente (casa com `continents[].id` e `data-continent` do SVG)
 *   titulo, subtitulo, preco, parcelas, duracao_dias, datas[], capa, destaque?
 *
 * Paths das `capa` são relativos à página que carrega o script — hoje
 * o mapa é embedado na home (raiz do projeto), então `midia/...` resolve
 * direto. O protótipo standalone em prototipos/mapa/index.html deixou
 * de funcionar — se precisar voltar a iterá-lo isolado, ajuste com base
 * tag ou paths absolutos.
 */
window.VCE_MAPA_DATA = {
  continents: [
    { id: 'america-norte',   name: 'América do Norte' },
    { id: 'america-central', name: 'América Central'  },
    { id: 'america-sul',     name: 'América do Sul'   },
    { id: 'europa',          name: 'Europa'           },
    { id: 'africa',          name: 'África'           },
    { id: 'asia',            name: 'Ásia'             },
    { id: 'oceania',         name: 'Oceania'          }
  ],
  roteiros: [
    {
      id: 'eurotrip-primavera',
      continent: 'europa',
      paises: ['França', 'Grécia', 'Itália'],
      titulo: 'Eurotrip de Primavera',
      subtitulo: 'França, Grécia e Itália em 21 dias',
      preco: 24900,
      parcelas: 48,
      duracao_dias: 21,
      datas: ['Abr 2026', 'Set 2026'],
      capa: 'midia/França, Grecia e Italia.webp',
      destaque: true
    },
    {
      id: 'leste-europeu',
      continent: 'europa',
      paises: ['Polônia', 'República Tcheca', 'Hungria', 'Áustria'],
      titulo: 'Leste Europeu',
      subtitulo: 'Varsóvia, Praga, Budapeste e Viena',
      preco: 17400,
      parcelas: 48,
      duracao_dias: 16,
      datas: ['Mai 2026', 'Out 2026'],
      capa: 'midia/Leste Europeu.webp'
    },
    {
      id: 'italia',
      continent: 'europa',
      paises: ['Itália'],
      titulo: 'Itália Clássica',
      subtitulo: 'Roma, Florença, Veneza e Costa Amalfitana',
      preco: 19800,
      parcelas: 48,
      duracao_dias: 14,
      datas: ['Jun 2026'],
      capa: 'midia/Itália.webp'
    },
    {
      id: 'marrocos',
      continent: 'africa',
      paises: ['Marrocos'],
      titulo: 'Marrocos Imersivo',
      subtitulo: 'Marrakech, deserto de Merzouga e Chefchaouen',
      preco: 14900,
      parcelas: 48,
      duracao_dias: 12,
      datas: ['Mar 2026', 'Out 2026'],
      capa: 'midia/Marrocos.webp'
    },
    {
      id: 'africa-do-sul',
      continent: 'africa',
      paises: ['África do Sul'],
      titulo: 'África do Sul & Safari',
      subtitulo: 'Cidade do Cabo, Kruger e Joanesburgo',
      preco: 21500,
      parcelas: 48,
      duracao_dias: 13,
      datas: ['Jul 2026'],
      capa: 'midia/Africa do Sul.webp'
    },
    {
      id: 'maldivas',
      continent: 'asia',
      paises: ['Maldivas'],
      titulo: 'Maldivas Resort',
      subtitulo: 'Bangalôs sobre a água em all-inclusive',
      preco: 28900,
      parcelas: 48,
      duracao_dias: 9,
      datas: ['Ago 2026', 'Nov 2026'],
      capa: 'midia/Maldivas.webp',
      destaque: true
    },
    {
      id: 'india-nepal',
      continent: 'asia',
      paises: ['Índia', 'Nepal'],
      titulo: 'Índia e Nepal',
      subtitulo: 'Triângulo Dourado + Kathmandu',
      preco: 19200,
      parcelas: 48,
      duracao_dias: 17,
      datas: ['Set 2026'],
      capa: 'midia/India e Nepal.webp'
    },
    {
      id: 'china',
      continent: 'asia',
      paises: ['China'],
      titulo: 'China Milenar',
      subtitulo: 'Pequim, Xi\u2019an, Shanghai e Muralha',
      preco: 22400,
      parcelas: 48,
      duracao_dias: 14,
      datas: ['Mai 2026'],
      capa: 'midia/China.webp'
    },
    {
      id: 'cancun',
      continent: 'america-central',
      paises: ['México'],
      titulo: 'Cancún & Riviera Maya',
      subtitulo: 'All-inclusive + Chichén Itzá e cenotes',
      preco: 11900,
      parcelas: 48,
      duracao_dias: 8,
      datas: ['Fev 2026', 'Jul 2026', 'Dez 2026'],
      capa: 'midia/Cancun.webp'
    },
    {
      id: 'punta-cana',
      continent: 'america-central',
      paises: ['República Dominicana'],
      titulo: 'Punta Cana',
      subtitulo: 'Resort 5★ com pensão completa',
      preco: 10400,
      parcelas: 48,
      duracao_dias: 8,
      datas: ['Mar 2026', 'Out 2026'],
      capa: 'midia/Punta Cana.webp'
    }
  ]
};
