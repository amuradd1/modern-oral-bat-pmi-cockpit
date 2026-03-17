window.PMI_DATA = {
  asOfDate: '2026-02-26',
  focus: 'PMI supply chain intelligence: where Philip Morris International sources materials for nicotine pouch manufacturing (ZYN and oral smoke-free portfolio).',
  caveat:
    'PMI does not publicly disclose full supplier-country mapping by pouch input. Material origins combine direct PMI disclosures, customs shipping records, and macro trade-flow indicators. All sourcing links are confidence-scored.',
  kpis: [
    {
      id: 'global_pouch_2025',
      label: 'Global nicotine pouch shipments (2025)',
      value: '879.6M',
      detail: 'cans/can-equivalent units',
      delta: '+36.6% vs 2024',
      sourceIds: ['s1']
    },
    {
      id: 'us_zyn_2025',
      label: 'U.S. ZYN shipment volume (2025)',
      value: '794M',
      detail: 'cans shipped in U.S.',
      delta: '+37% YoY',
      sourceIds: ['s2', 's3']
    },
    {
      id: 'oral_net_revenue',
      label: 'Oral smoke-free net revenues (2025)',
      value: '$4.03B',
      detail: 'PMI oral smoke-free net revenues',
      delta: '+53.2% YoY',
      sourceIds: ['s1']
    },
    {
      id: 'oral_factories',
      label: 'Oral smoke-free factories',
      value: '10',
      detail: 'global oral smoke-free manufacturing facilities',
      delta: 'Largest facility in the U.S.',
      sourceIds: ['s1']
    },
    {
      id: 'pouch_markets',
      label: 'Nicotine pouch market footprint',
      value: '56',
      detail: 'markets with pouch availability',
      delta: 'As of Dec 31, 2025',
      sourceIds: ['s1']
    },
    {
      id: 'sf_users',
      label: 'PMI smoke-free users',
      value: '43.2M',
      detail: 'estimated adult users globally',
      delta: 'As of Dec 31, 2025',
      sourceIds: ['s1']
    }
  ],
  volumeTrend: [
    { year: 2023, value: 421.1, unit: 'million cans', sourceIds: ['s1'] },
    { year: 2024, value: 644.0, unit: 'million cans', sourceIds: ['s1'] },
    { year: 2025, value: 879.6, unit: 'million cans', sourceIds: ['s1'] }
  ],
  revenueTrend: [
    { year: 2023, revenue: 1.63, users: 36.5, sourceIds: ['s1', 's21'] },
    { year: 2024, revenue: 2.63, users: 38.8, sourceIds: ['s1', 's21'] },
    { year: 2025, revenue: 4.03, users: 43.2, sourceIds: ['s1'] }
  ],
  factories: [
    {
      name: 'Owensboro Site',
      location: 'Owensboro, Kentucky, USA',
      lat: 37.7719,
      lon: -87.1112,
      category: 'Nicotine pouch manufacturing',
      status: 'Operating',
      note: 'PMI identifies Owensboro as an existing smoke-free manufacturing site; annual report states the largest oral smoke-free facility is in the U.S.',
      confidence: 'high',
      sourceIds: ['s1', 's4']
    },
    {
      name: 'Aurora Site',
      location: 'Aurora, Colorado, USA',
      lat: 39.7294,
      lon: -104.8319,
      category: 'Nicotine pouch manufacturing expansion',
      status: 'Ramp-up',
      note: 'USD 600M investment. Initial operations started late 2025, full regular production expected during 2026; projected annual capacity up to 550M cans.',
      confidence: 'high',
      sourceIds: ['s4']
    },
    {
      name: 'Wilson Site',
      location: 'Wilson, North Carolina, USA',
      lat: 35.7213,
      lon: -77.9155,
      category: 'Smoke-free manufacturing site',
      status: 'Operating',
      note: 'Publicly identified by PMI as an existing smoke-free manufacturing location in the U.S.',
      confidence: 'medium',
      sourceIds: ['s4']
    },
    {
      name: 'Swedish Match - Gothenburg',
      location: 'Gothenburg, Sweden',
      lat: 57.7089,
      lon: 11.9746,
      category: 'Snus & oral nicotine production',
      status: 'Operating',
      note: 'Swedish Match headquarters and primary Scandinavian production facility. Long-established snus manufacturing with nicotine pouch capability.',
      confidence: 'high',
      sourceIds: ['s11']
    },
    {
      name: 'Swedish Match - Kungälv',
      location: 'Kungälv, Sweden',
      lat: 57.8710,
      lon: 11.9735,
      category: 'Snus production',
      status: 'Operating',
      note: 'Additional Swedish Match production facility near Gothenburg.',
      confidence: 'medium',
      sourceIds: ['s11']
    },
    {
      name: 'Swedish Match - Owensboro',
      location: 'Owensboro, Kentucky, USA',
      lat: 37.7719,
      lon: -87.1112,
      category: 'Moist smokeless tobacco & nicotine pouches',
      status: 'Operating',
      note: 'Swedish Match North America primary U.S. production facility. Key ZYN manufacturing site.',
      confidence: 'high',
      sourceIds: ['s6', 's11']
    }
  ],
  materials: [
    {
      material: 'Fleece / pouch nonwoven material',
      hsCode: 'HS 5603',
      useCase: 'Outer pouch wrapper material',
      pmiDisclosure: 'PMI lists pouch material as a direct oral input.',
      likelySourceCountries: ['Germany', 'United Kingdom'],
      knownSuppliers: [
        { name: 'Pely-Tex GmbH', country: 'Germany', shipments: 1887, since: 2022 },
        { name: 'Glatfelter Lydney Ltd', country: 'United Kingdom', shipments: 577, since: 2022 }
      ],
      tradeValue: '$615.5M (DE→US, 2023) + $117.4M (UK→US, 2023)',
      evidence: 'Customs records for Swedish Match North America show recurring nonwoven/fleece-like shipments from PELY-TEX GmbH (DE) and Glatfelter Lydney Ltd (UK). Macro HS 5603 trade data confirms Germany and UK as major nonwoven exporters to U.S.',
      confidence: 'medium',
      sourceIds: ['s1', 's6', 's7', 's9', 's10']
    },
    {
      material: 'Nicotine liquid / nicotine salt premix',
      hsCode: 'HS 2939',
      useCase: 'Active ingredient in pouch filling',
      pmiDisclosure: 'PMI lists nicotine salt and premix as direct materials. ZYN discloses nicotine bitartrate dihydrate as active ingredient.',
      likelySourceCountries: ['India', 'Philippines'],
      knownSuppliers: [],
      tradeValue: 'Not publicly quantified at company level',
      evidence: 'Trade-profile indicators show HS 2939 (alkaloids, incl. nicotine derivatives) in Swedish Match North Europe AB imports from India and Philippines. PMI does not name nicotine suppliers publicly.',
      confidence: 'low',
      sourceIds: ['s1', 's8', 's15']
    },
    {
      material: 'Resin (plastic cans and lids)',
      hsCode: 'HS 3923',
      useCase: 'Primary pouch container and lid components',
      pmiDisclosure: 'PMI lists plastic cans and lids as direct materials for oral smoke-free products.',
      likelySourceCountries: ['India', 'Philippines'],
      knownSuppliers: [],
      tradeValue: 'Not publicly quantified at company level',
      evidence: 'Trade-profile indicators for Swedish Match North Europe AB include significant HS 3923 activity (plastic packing articles) from these origins.',
      confidence: 'low',
      sourceIds: ['s1', 's8']
    },
    {
      material: 'MCC (microcrystalline cellulose)',
      hsCode: 'HS 3912',
      useCase: 'Pouch filler/carrier substrate',
      pmiDisclosure: 'ZYN ingredient disclosure lists microcrystalline cellulose.',
      likelySourceCountries: ['Not publicly disclosed'],
      knownSuppliers: [],
      tradeValue: 'Not publicly quantified',
      evidence: 'Ingredient is confirmed at product level, but no PMI public disclosure maps MCC supplier countries. Global MCC market dominated by DuPont/IFF (US), JRS Pharma (DE), Asahi Kasei (JP), and Mingtai Chemical (TW).',
      confidence: 'medium',
      sourceIds: ['s15']
    },
    {
      material: 'Food-grade flavourings & sweeteners',
      hsCode: 'HS 3302 / 2106',
      useCase: 'Pouch flavour system',
      pmiDisclosure: 'ZYN ingredient page discloses food-grade flavourings and Acesulfame K sweetener.',
      likelySourceCountries: ['Switzerland', 'United States', 'Germany'],
      knownSuppliers: [],
      tradeValue: 'Not publicly quantified at company level',
      evidence: 'PMI historically sources flavourings through major flavour houses (Givaudan, Firmenich, IFF). No PMI-specific supplier confirmation for oral products.',
      confidence: 'low',
      sourceIds: ['s15']
    },
    {
      material: 'pH adjusters (sodium carbonate/bicarbonate)',
      hsCode: 'HS 2836',
      useCase: 'Nicotine bioavailability / pH control',
      pmiDisclosure: 'ZYN ingredient page discloses sodium carbonate and sodium bicarbonate.',
      likelySourceCountries: ['United States', 'Turkey'],
      knownSuppliers: [],
      tradeValue: 'Commodity chemical, widely available domestically',
      evidence: 'Standard industrial chemicals with deep U.S. domestic supply. Likely sourced domestically given low value-to-weight ratio.',
      confidence: 'medium',
      sourceIds: ['s15']
    }
  ],
  tradeSignals: [
    {
      material: 'Fleece / nonwoven (HS 5603)',
      flow: 'Germany → United States',
      value: '$615.5M (2023)',
      note: 'Macro trade flow for nonwovens to U.S. Germany is the #1 nonwoven exporter to the U.S. market.',
      sourceIds: ['s9']
    },
    {
      material: 'Fleece / nonwoven (HS 5603)',
      flow: 'United Kingdom → United States',
      value: '$117.4M (2023)',
      note: 'UK as a meaningful nonwoven export source into U.S. market. Glatfelter Lydney is a confirmed shipper.',
      sourceIds: ['s10']
    },
    {
      material: 'Nonwoven / pouch inputs',
      flow: 'Pely-Tex GmbH (DE) → Swedish Match North America',
      value: '1,887 shipments since 2022',
      note: 'Company-level customs indicator. Pely-Tex is a specialist nonwoven manufacturer based in Germany.',
      sourceIds: ['s6']
    },
    {
      material: 'Nonwoven / pouch inputs',
      flow: 'Glatfelter Lydney Ltd (UK) → Swedish Match North America',
      value: '577 shipments since 2022',
      note: 'Company-level customs indicator. Glatfelter (now Magnera) produces specialty nonwovens and engineered materials.',
      sourceIds: ['s6']
    },
    {
      material: 'Alkaloids incl. nicotine (HS 2939)',
      flow: 'India → Swedish Match North Europe AB',
      value: 'Customs profile indicator',
      note: 'HS 2939 import activity detected in Swedish Match North Europe AB trade profile. India is a major tobacco-derived nicotine producer.',
      sourceIds: ['s8']
    },
    {
      material: 'Plastic packing articles (HS 3923)',
      flow: 'Philippines → Swedish Match North Europe AB',
      value: 'Customs profile indicator',
      note: 'HS 3923 activity in Swedish Match North Europe AB import profile suggests plastic can/lid sourcing from Philippines.',
      sourceIds: ['s8']
    }
  ],
  flowBreakdown: [
    {
      material: 'Nonwoven / Fleece',
      flows: [
        { from: 'Germany', fromIso: 'DE', share: 65, suppliers: 'Pely-Tex GmbH', confidence: 'medium' },
        { from: 'United Kingdom', fromIso: 'GB', share: 25, suppliers: 'Glatfelter Lydney Ltd', confidence: 'medium' },
        { from: 'Other / Unknown', fromIso: null, share: 10, suppliers: '', confidence: 'low' }
      ],
      destination: 'U.S. (Owensboro / Aurora)',
      sourceIds: ['s6', 's7', 's9', 's10']
    },
    {
      material: 'Nicotine salt / premix',
      flows: [
        { from: 'India', fromIso: 'IN', share: 60, suppliers: 'Unknown', confidence: 'low' },
        { from: 'Philippines', fromIso: 'PH', share: 25, suppliers: 'Unknown', confidence: 'low' },
        { from: 'Other / Unknown', fromIso: null, share: 15, suppliers: '', confidence: 'low' }
      ],
      destination: 'Sweden (Gothenburg) → U.S.',
      sourceIds: ['s8']
    },
    {
      material: 'Plastic cans & lids',
      flows: [
        { from: 'India', fromIso: 'IN', share: 40, suppliers: 'Unknown', confidence: 'low' },
        { from: 'Philippines', fromIso: 'PH', share: 30, suppliers: 'Unknown', confidence: 'low' },
        { from: 'U.S. domestic', fromIso: 'US', share: 30, suppliers: 'Unknown', confidence: 'low' }
      ],
      destination: 'U.S. (Owensboro / Aurora)',
      sourceIds: ['s8']
    },
    {
      material: 'MCC (cellulose filler)',
      flows: [
        { from: 'U.S. domestic', fromIso: 'US', share: 40, suppliers: 'DuPont/IFF (likely)', confidence: 'low' },
        { from: 'Germany', fromIso: 'DE', share: 25, suppliers: 'JRS Pharma (likely)', confidence: 'low' },
        { from: 'Japan / Taiwan', fromIso: 'JP', share: 20, suppliers: 'Asahi Kasei / Mingtai (likely)', confidence: 'low' },
        { from: 'Other / Unknown', fromIso: null, share: 15, suppliers: '', confidence: 'low' }
      ],
      destination: 'U.S. (Owensboro / Aurora)',
      sourceIds: ['s15']
    }
  ],
  inputVolatility: {
    asOfMonth: '2025-12',
    method: 'Annualized volatility is calculated as standard deviation of monthly returns over trailing 12 and 24 months (monthly sigma * sqrt(12)).',
    rows: [
      {
        input: 'Polymer resin (can/lid proxy)',
        proxySeries: 'Thermoplastic resins and plastics materials PPI',
        seriesCode: 'PCU3252113252111',
        latestIndex: 265.035,
        yoyPercent: -5.16,
        vol12AnnualizedPercent: 5.35,
        vol24AnnualizedPercent: 5.17,
        riskSignal: 'medium',
        sourceIds: ['s22']
      },
      {
        input: 'Nicotine derivatives (proxy)',
        proxySeries: 'Medicinal and botanical chemicals PPI',
        seriesCode: 'WPU0631',
        latestIndex: 197.217,
        yoyPercent: 0.85,
        vol12AnnualizedPercent: 1.06,
        vol24AnnualizedPercent: 2.81,
        riskSignal: 'low',
        sourceIds: ['s23']
      },
      {
        input: 'Nonwoven fleece',
        proxySeries: 'Nonwoven fabrics PPI',
        seriesCode: 'WPU03450321',
        latestIndex: 201.524,
        yoyPercent: 1.88,
        vol12AnnualizedPercent: 0.90,
        vol24AnnualizedPercent: 2.11,
        riskSignal: 'low',
        sourceIds: ['s24']
      },
      {
        input: 'Cellulose / MCC proxy',
        proxySeries: 'Wood pulp PPI',
        seriesCode: 'WPU09110501',
        latestIndex: 141.721,
        yoyPercent: -10.87,
        vol12AnnualizedPercent: 6.21,
        vol24AnnualizedPercent: 7.17,
        riskSignal: 'high',
        sourceIds: ['s25']
      }
    ]
  },
  sources: [
    {
      id: 's1',
      title: 'Philip Morris International Form 10-K (FY ended Dec 31, 2025)',
      type: 'Annual filing',
      publisher: 'SEC / PMI',
      date: '2026-02-05',
      url: 'https://www.sec.gov/Archives/edgar/data/1413329/000162828026005939/pm-20251231.htm'
    },
    {
      id: 's2',
      title: 'PMI Q4 2025 Earnings Call Transcript',
      type: 'Earnings transcript',
      publisher: 'Seeking Alpha',
      date: '2026-02-06',
      url: 'https://seekingalpha.com/article/4762219-philip-morris-international-inc-pm-q4-2025-earnings-call-transcript'
    },
    {
      id: 's3',
      title: 'Building leading brands with purpose (ZYN growth)',
      type: 'Company page',
      publisher: 'PMI',
      date: '2026-02-26',
      url: 'https://www.pmi.com/our-business/building-leading-brands-with-purpose'
    },
    {
      id: 's4',
      title: 'PMI smoke-free progress update (Aurora investment)',
      type: 'Press release',
      publisher: 'Business Wire / PMI',
      date: '2024-07-16',
      url: 'https://www.businesswire.com/news/home/20240716820095/en/Philip-Morris-International-Progresses-on-Goal-to-Become-Majority-Smoke-Free-by-2030'
    },
    {
      id: 's6',
      title: 'Swedish Match North America LLC importer profile',
      type: 'Customs-derived trade records',
      publisher: 'ImportGenius',
      date: '2026-02-26',
      url: 'https://www.importgenius.com/importers/swedish-match-north-america-llc'
    },
    {
      id: 's7',
      title: 'Swedish Match North America LLC shipment history',
      type: 'Customs-derived trade records',
      publisher: 'ImportInfo',
      date: '2026-02-26',
      url: 'https://www.importinfo.com/swedish-match-north-america-llc-1791546?page=6'
    },
    {
      id: 's8',
      title: 'Swedish Match North Europe AB company profile',
      type: 'Trade-flow aggregator profile',
      publisher: 'Volza',
      date: '2026-02-26',
      url: 'https://www.volza.com/company-profile/swedish-match-north-europe-ab-186942/'
    },
    {
      id: 's9',
      title: 'U.S. imports from Germany, HS 5603 (nonwovens), 2023',
      type: 'Macro trade flow',
      publisher: 'WITS / UN Comtrade',
      date: '2023-12-31',
      url: 'https://wits.worldbank.org/trade/comtrade/en/country/USA/year/2023/tradeflow/Imports/partner/DEU/product/5603'
    },
    {
      id: 's10',
      title: 'U.S. imports from United Kingdom, HS 5603 (nonwovens), 2023',
      type: 'Macro trade flow',
      publisher: 'WITS / UN Comtrade',
      date: '2023-12-31',
      url: 'https://wits.worldbank.org/trade/comtrade/en/country/USA/year/2023/tradeflow/Imports/partner/GBR/product/5603'
    },
    {
      id: 's11',
      title: 'Swedish Match Our Business (manufacturing footprint)',
      type: 'Company page',
      publisher: 'Swedish Match',
      date: '2026-02-26',
      url: 'https://www.swedishmatch.com/Our-business/'
    },
    {
      id: 's15',
      title: 'ZYN USA About (ingredient-level disclosure)',
      type: 'Company page',
      publisher: 'ZYN USA',
      date: '2026-02-26',
      url: 'https://us.zyn.com/about-zyn/'
    },
    {
      id: 's21',
      title: 'PMI 2024 Annual Report',
      type: 'Annual report',
      publisher: 'PMI',
      date: '2025-02-06',
      url: 'https://www.pmi.com/content/dam/pmicom/global/docs/investor_relation/pmi_2024_annualreport.pdf'
    },
    {
      id: 's22',
      title: 'FRED/BLS PPI series: Thermoplastic resins and plastics materials',
      type: 'Public price index',
      publisher: 'FRED (BLS source)',
      date: '2026-02-26',
      url: 'https://fred.stlouisfed.org/series/PCU3252113252111'
    },
    {
      id: 's23',
      title: 'FRED/BLS PPI series: Medicinal and botanical chemicals',
      type: 'Public price index',
      publisher: 'FRED (BLS source)',
      date: '2026-02-26',
      url: 'https://fred.stlouisfed.org/series/WPU0631'
    },
    {
      id: 's24',
      title: 'FRED/BLS PPI series: Nonwoven fabrics',
      type: 'Public price index',
      publisher: 'FRED (BLS source)',
      date: '2026-02-26',
      url: 'https://fred.stlouisfed.org/series/WPU03450321'
    },
    {
      id: 's25',
      title: 'FRED/BLS PPI series: Wood pulp',
      type: 'Public price index',
      publisher: 'FRED (BLS source)',
      date: '2026-02-26',
      url: 'https://fred.stlouisfed.org/series/WPU09110501'
    }
  ]
};
