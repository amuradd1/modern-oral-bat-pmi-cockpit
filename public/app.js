(function boot() {
  const data = window.PMI_DATA;
  if (!data) {
    document.body.innerHTML = '<main><p>PMI dataset failed to load.</p></main>';
    return;
  }

  const byId = (id) => document.getElementById(id);
  const sourceMap = new Map(data.sources.map((src) => [src.id, src]));

  const asDate = new Date(data.asOfDate + 'T00:00:00');
  byId('as-of-date').textContent = Number.isNaN(asDate.getTime())
    ? data.asOfDate
    : asDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

  byId('hero-focus').textContent = data.focus;
  byId('hero-caveat').textContent = data.caveat;

  renderKpis(data.kpis, sourceMap);
  renderVolumeChart(data.volumeTrend);
  renderRevenueChart(data.revenueTrend);
  renderTradeSignals(data.tradeSignals, sourceMap);
  renderTradeFlowMap(data);
  renderMaterials(data.materials, sourceMap);
  renderFlowBreakdown(data.flowBreakdown, sourceMap);
  renderFactories(data.factories, sourceMap);
  renderInputVolatilityChart(data.inputVolatility.rows);
  renderInputVolatilityCards(data.inputVolatility.rows, sourceMap);
  renderInputVolatilityTable(data.inputVolatility.rows, sourceMap);
  byId('input-volatility-method').textContent =
    `${data.inputVolatility.method} As-of month: ${data.inputVolatility.asOfMonth}.`;
  renderSources(data.sources);
  setupExports();

  // ── KPIs ──
  function renderKpis(kpis, srcMap) {
    const root = byId('kpi-grid');
    root.innerHTML = kpis
      .map((kpi, index) => {
        const delayClass = index > 1 ? 'd2' : 'd1';
        return `
          <article class="kpi-card fade-in ${delayClass}">
            <div class="kpi-label">${esc(kpi.label)}</div>
            <div class="kpi-value">${esc(kpi.value)}</div>
            <div class="kpi-detail">${esc(kpi.detail)}</div>
            <div class="kpi-delta">${esc(kpi.delta)}</div>
            ${renderRefs(kpi.sourceIds, srcMap)}
          </article>
        `;
      })
      .join('');
  }

  // ── Volume chart ──
  function renderVolumeChart(trend) {
    const canvas = byId('volume-chart');
    if (!canvas || !window.Chart) {
      byId('volume-chart-fallback').textContent = 'Chart library unavailable.';
      return;
    }
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 320);
    grad.addColorStop(0, 'rgba(11,106,121,0.35)');
    grad.addColorStop(1, 'rgba(11,106,121,0.03)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: trend.map((x) => x.year),
        datasets: [{
          label: 'PMI Nicotine Pouches (million cans)',
          data: trend.map((x) => x.value),
          borderColor: '#0b6a79',
          pointBackgroundColor: '#1a936f',
          pointRadius: 5,
          borderWidth: 3,
          fill: true,
          backgroundColor: grad,
          tension: 0.25
        }]
      },
      options: chartOpts({
        yCallback: (val) => `${val}M`,
        tooltipCallback: (ctx) => `${ctx.parsed.y.toFixed(1)} million cans`
      })
    });
  }

  // ── Revenue & users chart ──
  function renderRevenueChart(trend) {
    const canvas = byId('revenue-chart');
    if (!canvas || !window.Chart) {
      byId('revenue-chart-fallback').textContent = 'Chart library unavailable.';
      return;
    }
    const ctx = canvas.getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: trend.map((x) => x.year),
        datasets: [
          {
            label: 'Oral Net Revenue ($B)',
            data: trend.map((x) => x.revenue),
            backgroundColor: 'rgba(23,100,171,0.75)',
            borderColor: '#1764ab',
            borderWidth: 1,
            yAxisID: 'revAxis',
            order: 2
          },
          {
            label: 'Smoke-free Users (M)',
            data: trend.map((x) => x.users),
            type: 'line',
            borderColor: '#1a936f',
            pointBackgroundColor: '#1a936f',
            borderWidth: 3,
            pointRadius: 5,
            tension: 0.25,
            yAxisID: 'userAxis',
            order: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#193c49', font: { family: 'IBM Plex Sans', size: 12 } } },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                if (ctx.dataset.label.includes('Revenue')) return `$${ctx.parsed.y.toFixed(2)}B`;
                return `${ctx.parsed.y.toFixed(1)}M users`;
              }
            }
          }
        },
        scales: {
          x: { grid: { color: 'rgba(25,60,73,0.08)' }, ticks: { color: '#425466' } },
          revAxis: {
            type: 'linear',
            position: 'left',
            grid: { color: 'rgba(25,60,73,0.08)' },
            ticks: { color: '#1764ab', callback: (v) => `$${v}B` },
            title: { display: true, text: 'Net Revenue ($B)', color: '#1764ab' }
          },
          userAxis: {
            type: 'linear',
            position: 'right',
            grid: { drawOnChartArea: false },
            ticks: { color: '#1a936f', callback: (v) => `${v}M` },
            title: { display: true, text: 'Users (M)', color: '#1a936f' }
          }
        }
      }
    });
  }

  // ── Trade flow map ──
  function renderTradeFlowMap(data) {
    const mapEl = byId('trade-flow-map');
    if (!window.L) {
      mapEl.innerHTML = '<p style="padding:10px">Map library unavailable.</p>';
      return;
    }

    const map = L.map('trade-flow-map', { zoomControl: true }).setView([30, 10], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const supplierCoords = {
      'DE': [51.1657, 10.4515],
      'GB': [51.5074, -0.1278],
      'IN': [20.5937, 78.9629],
      'PH': [12.8797, 121.7740],
      'SE': [57.7089, 11.9746],
      'US': [37.7719, -87.1112],
      'JP': [36.2048, 138.2529],
      'TW': [23.6978, 120.9605],
      'CH': [46.8182, 8.2275],
      'TR': [38.9637, 35.2433]
    };

    const factoryCoords = [
      { name: 'Owensboro, KY', lat: 37.7719, lon: -87.1112 },
      { name: 'Aurora, CO', lat: 39.7294, lon: -104.8319 },
      { name: 'Gothenburg, SE', lat: 57.7089, lon: 11.9746 }
    ];

    // Factory markers (larger, blue)
    factoryCoords.forEach((f) => {
      L.circleMarker([f.lat, f.lon], {
        radius: 10,
        weight: 2,
        color: '#1764ab',
        fillColor: '#1764ab',
        fillOpacity: 0.9
      }).addTo(map).bindPopup(`<strong>PMI Factory</strong><br>${esc(f.name)}`);
    });

    // Supplier country markers and flow lines
    const drawnCountries = new Set();
    data.flowBreakdown.forEach((mat) => {
      mat.flows.forEach((flow) => {
        if (!flow.fromIso || !supplierCoords[flow.fromIso] || flow.fromIso === 'US') return;
        const from = supplierCoords[flow.fromIso];
        if (!from) return;

        // Supplier marker
        if (!drawnCountries.has(flow.fromIso)) {
          drawnCountries.add(flow.fromIso);
          const conf = flow.confidence;
          L.circleMarker(from, {
            radius: 7,
            weight: 1,
            color: markerColor(conf),
            fillColor: markerColor(conf),
            fillOpacity: 0.82
          }).addTo(map).bindPopup(
            `<strong>${esc(flow.from)}</strong><br>Supplies: ${esc(mat.material)}<br>` +
            (flow.suppliers ? `Supplier: ${esc(flow.suppliers)}` : 'Supplier unknown')
          );
        }

        // Flow line to primary U.S. factory
        const to = [37.7719, -87.1112]; // Owensboro
        const weight = Math.max(1, Math.round(flow.share / 15));
        L.polyline([from, to], {
          color: materialColor(mat.material),
          weight: weight,
          opacity: 0.5,
          dashArray: flow.confidence === 'low' ? '6 4' : null
        }).addTo(map).bindPopup(
          `<strong>${esc(mat.material)}</strong><br>${esc(flow.from)} → U.S.<br>Est. share: ~${flow.share}%`
        );
      });
    });

    setTimeout(() => map.invalidateSize(), 100);
  }

  // ── Trade signals ──
  function renderTradeSignals(signals, srcMap) {
    const root = byId('trade-signals');
    root.innerHTML = signals
      .map((signal) => `
        <article class="trade-item">
          <div class="trade-head">
            <strong>${esc(signal.material)}</strong>
            <span class="trade-value">${esc(signal.value)}</span>
          </div>
          <div class="trade-flow-label">${esc(signal.flow)}</div>
          <p class="muted" style="margin:6px 0 0">${esc(signal.note)}</p>
          ${renderRefs(signal.sourceIds, srcMap)}
        </article>
      `)
      .join('');
  }

  // ── Materials table ──
  function renderMaterials(materials, srcMap) {
    const body = byId('materials-body');
    body.innerHTML = materials
      .map((m) => `
        <tr>
          <td><strong>${esc(m.material)}</strong></td>
          <td><code>${esc(m.hsCode)}</code></td>
          <td>${esc(m.useCase)}</td>
          <td>${esc(m.pmiDisclosure)}</td>
          <td>${esc(Array.isArray(m.likelySourceCountries) ? m.likelySourceCountries.join(', ') : m.likelySourceCountries)}</td>
          <td>${m.knownSuppliers.length
            ? m.knownSuppliers.map((s) => `${esc(s.name)} (${esc(s.country)}, ${s.shipments} shipments)`).join('<br>')
            : '<span class="muted">Not publicly identified</span>'
          }</td>
          <td>${esc(m.tradeValue)}</td>
          <td class="muted">${esc(m.evidence)}</td>
          <td>
            <span class="confidence ${esc(m.confidence)}">${esc(m.confidence)}</span>
            ${renderRefs(m.sourceIds, srcMap)}
          </td>
        </tr>
      `)
      .join('');
  }

  // ── Flow breakdown (horizontal bar cards) ──
  function renderFlowBreakdown(flows, srcMap) {
    const root = byId('flow-breakdown');
    root.innerHTML = flows
      .map((mat) => {
        const bars = mat.flows
          .map((f) => {
            const color = f.fromIso ? materialColor(mat.material) : '#aab';
            return `
              <div class="flow-row">
                <div class="flow-label">${esc(f.from)}${f.suppliers ? ` (${esc(f.suppliers)})` : ''}</div>
                <div class="flow-bar-wrap">
                  <div class="flow-bar" style="width:${f.share}%;background:${color}">
                    <span class="flow-pct">${f.share}%</span>
                  </div>
                </div>
                <span class="confidence ${esc(f.confidence)}" style="font-size:0.68rem">${esc(f.confidence)}</span>
              </div>
            `;
          })
          .join('');

        return `
          <article class="flow-card">
            <div class="flow-card-head">
              <strong>${esc(mat.material)}</strong>
              <span class="muted">→ ${esc(mat.destination)}</span>
            </div>
            ${bars}
            ${renderRefs(mat.sourceIds, srcMap)}
          </article>
        `;
      })
      .join('');
  }

  // ── Factory list + map ──
  function renderFactories(factories, srcMap) {
    const listRoot = byId('factory-list');
    listRoot.innerHTML = factories
      .map((f) => `
        <article class="factory-item">
          <div class="factory-head">
            <strong>${esc(f.name)}</strong>
            <span class="confidence ${esc(f.confidence)}">${esc(f.confidence)}</span>
          </div>
          <div class="muted">${esc(f.location)} | ${esc(f.category)} | ${esc(f.status)}</div>
          <p class="muted" style="margin:6px 0 0">${esc(f.note)}</p>
          ${renderRefs(f.sourceIds, srcMap)}
        </article>
      `)
      .join('');

    if (!window.L) {
      byId('factory-map').innerHTML = '<p style="padding:10px">Map library unavailable.</p>';
      return;
    }

    const map = L.map('factory-map', { zoomControl: true }).setView([34, -20], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const points = [];
    factories.forEach((factory) => {
      if (typeof factory.lat !== 'number' || typeof factory.lon !== 'number') return;
      L.circleMarker([factory.lat, factory.lon], {
        radius: 7,
        weight: 1,
        color: markerColor(factory.confidence),
        fillColor: markerColor(factory.confidence),
        fillOpacity: 0.82
      }).addTo(map).bindPopup(
        `<strong>${esc(factory.name)}</strong><br>${esc(factory.location)}<br>${esc(factory.category)}`
      );
      points.push([factory.lat, factory.lon]);
    });
    if (points.length > 1) map.fitBounds(points, { padding: [24, 24] });
  }

  // ── Input volatility chart ──
  function renderInputVolatilityChart(rows) {
    const canvas = byId('input-volatility-chart');
    if (!canvas || !window.Chart) {
      byId('input-volatility-fallback').textContent = 'Chart library unavailable.';
      return;
    }
    new Chart(canvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: rows.map((x) => shortInputLabel(x.input)),
        datasets: [
          {
            label: '12M annualized vol %',
            data: rows.map((x) => x.vol12AnnualizedPercent),
            backgroundColor: 'rgba(23,100,171,0.75)',
            borderColor: '#1764ab',
            borderWidth: 1
          },
          {
            label: '24M annualized vol %',
            data: rows.map((x) => x.vol24AnnualizedPercent),
            backgroundColor: 'rgba(11,106,121,0.75)',
            borderColor: '#0b6a79',
            borderWidth: 1
          }
        ]
      },
      options: chartOpts({
        yCallback: (val) => `${val}%`,
        yTitle: 'Annualized volatility (%)',
        tooltipCallback: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)}%`
      })
    });
  }

  // ── Volatility cards ──
  function renderInputVolatilityCards(rows, srcMap) {
    const root = byId('input-volatility-cards');
    root.innerHTML = rows
      .map((row) => `
        <article class="trade-item">
          <div class="trade-head">
            <strong>${esc(row.input)}</strong>
            <span class="confidence ${riskToConfidence(row.riskSignal)}">${esc(row.riskSignal)}</span>
          </div>
          <div class="muted">${esc(row.proxySeries)} (${esc(row.seriesCode)})</div>
          <p class="muted" style="margin:6px 0 0">
            12M vol: ${row.vol12AnnualizedPercent.toFixed(2)}% | 24M vol: ${row.vol24AnnualizedPercent.toFixed(2)}% | YoY: ${fmtPct(row.yoyPercent)}
          </p>
          ${renderRefs(row.sourceIds, srcMap)}
        </article>
      `)
      .join('');
  }

  // ── Volatility table ──
  function renderInputVolatilityTable(rows, srcMap) {
    const body = byId('input-volatility-body');
    body.innerHTML = rows
      .map((row) => `
        <tr>
          <td><strong>${esc(row.input)}</strong></td>
          <td>${esc(row.proxySeries)}</td>
          <td>${esc(row.seriesCode)}</td>
          <td>${row.latestIndex.toFixed(3)}</td>
          <td>${fmtPct(row.yoyPercent)}</td>
          <td>${row.vol12AnnualizedPercent.toFixed(2)}%</td>
          <td>${row.vol24AnnualizedPercent.toFixed(2)}%</td>
          <td><span class="confidence ${riskToConfidence(row.riskSignal)}">${esc(row.riskSignal)}</span></td>
          <td>${renderRefs(row.sourceIds, srcMap)}</td>
        </tr>
      `)
      .join('');
  }

  // ── Sources ──
  function renderSources(sources) {
    const root = byId('sources-list');
    root.innerHTML = sources
      .map((src) => `
        <article class="source-item" id="source-${esc(src.id)}">
          <h4>[${esc(src.id)}] ${esc(src.title)}</h4>
          <div class="source-meta">${esc(src.type)} | ${esc(src.publisher)} | ${esc(src.date)}</div>
          <div class="source-link"><a href="${escAttr(src.url)}" target="_blank" rel="noopener noreferrer">${esc(src.url)}</a></div>
        </article>
      `)
      .join('');
  }

  // ── Exports ──
  function setupExports() {
    const csvBtn = byId('export-csv');
    if (csvBtn) csvBtn.addEventListener('click', () => {
      downloadFile(`pmi-supply-chain-${data.asOfDate}.csv`, buildCsv(), 'text/csv;charset=utf-8;');
    });
    const pptBtn = byId('export-ppt');
    if (pptBtn) pptBtn.addEventListener('click', buildPpt);
  }

  function buildCsv() {
    const rows = [['section', 'material', 'metric', 'value', 'detail', 'confidence', 'source_ids']];
    data.kpis.forEach((k) => rows.push(['kpi', '', k.label, k.value, `${k.detail}; ${k.delta}`, 'high', (k.sourceIds || []).join('|')]));
    data.materials.forEach((m) => rows.push(['material', m.material, m.hsCode, Array.isArray(m.likelySourceCountries) ? m.likelySourceCountries.join('|') : m.likelySourceCountries, m.evidence, m.confidence, (m.sourceIds || []).join('|')]));
    data.tradeSignals.forEach((s) => rows.push(['trade_signal', s.material, s.flow, s.value, s.note, '', (s.sourceIds || []).join('|')]));
    data.flowBreakdown.forEach((fb) => fb.flows.forEach((f) => rows.push(['flow_breakdown', fb.material, f.from, `${f.share}%`, f.suppliers || '', f.confidence, (fb.sourceIds || []).join('|')])));
    data.inputVolatility.rows.forEach((r) => rows.push(['input_vol', r.input, r.proxySeries, `${r.vol24AnnualizedPercent}%`, `YoY: ${fmtPct(r.yoyPercent)}`, r.riskSignal, (r.sourceIds || []).join('|')]));
    return rows.map((r) => r.map(csvEsc).join(',')).join('\n');
  }

  function buildPpt() {
    const Pptx = window.PptxGenJS;
    if (!Pptx) { alert('PowerPoint library unavailable.'); return; }
    const pptx = new Pptx();
    pptx.layout = 'LAYOUT_WIDE';
    pptx.title = `PMI Supply Chain Intelligence (${data.asOfDate})`;

    const s1 = pptx.addSlide();
    s1.background = { color: '0B6A79' };
    s1.addText('PMI Supply Chain Intelligence', { x: 0.6, y: 0.65, w: 11.8, h: 0.6, color: 'F4FFFC', fontSize: 32, bold: true });
    s1.addText(`As of ${data.asOfDate}`, { x: 0.6, y: 1.35, w: 5, h: 0.3, color: 'D8F8F1', fontSize: 16 });
    s1.addText('Trade flows & material sourcing for PMI nicotine pouch manufacturing', { x: 0.6, y: 1.85, w: 8, h: 0.34, color: 'E7FFFA', fontSize: 14 });

    const s2 = pptx.addSlide();
    s2.addText('KPI Snapshot', { x: 0.4, y: 0.22, w: 6, h: 0.4, fontSize: 22, bold: true, color: '0F1724' });
    const kpiRows = [['Metric', 'Value', 'Detail']];
    data.kpis.forEach((k) => kpiRows.push([k.label, k.value, `${k.detail}; ${k.delta}`]));
    s2.addTable(kpiRows, { x: 0.4, y: 0.8, w: 12.5, fontSize: 11, border: { type: 'solid', color: 'D5E3DE', pt: 1 }, fill: 'FFFFFF' });

    const s3 = pptx.addSlide();
    s3.addText('Raw Material Sourcing Matrix', { x: 0.4, y: 0.22, w: 10, h: 0.4, fontSize: 20, bold: true, color: '0F1724' });
    const matRows = [['Material', 'HS Code', 'Source Countries', 'Trade Value', 'Confidence']];
    data.materials.forEach((m) => matRows.push([m.material, m.hsCode, Array.isArray(m.likelySourceCountries) ? m.likelySourceCountries.join(', ') : m.likelySourceCountries, m.tradeValue, m.confidence]));
    s3.addTable(matRows, { x: 0.4, y: 0.8, w: 12.5, fontSize: 9, border: { type: 'solid', color: 'D5E3DE', pt: 1 }, fill: 'FFFFFF' });

    const s4 = pptx.addSlide();
    s4.addText('Trade Flow Signals', { x: 0.4, y: 0.22, w: 10, h: 0.4, fontSize: 20, bold: true, color: '0F1724' });
    const tfRows = [['Material', 'Flow', 'Value', 'Note']];
    data.tradeSignals.forEach((s) => tfRows.push([s.material, s.flow, s.value, s.note]));
    s4.addTable(tfRows, { x: 0.4, y: 0.8, w: 12.5, fontSize: 9, border: { type: 'solid', color: 'D5E3DE', pt: 1 }, fill: 'FFFFFF' });

    pptx.writeFile({ fileName: `pmi-supply-chain-${data.asOfDate}.pptx` });
  }

  // ── Helpers ──
  function renderRefs(ids, srcMap) {
    if (!Array.isArray(ids) || !ids.length) return '';
    const chips = ids.filter((id) => srcMap.has(id)).map((id) => `<a class="ref-chip" href="#source-${esc(id)}">${esc(id)}</a>`).join('');
    return chips ? `<div class="refs">${chips}</div>` : '';
  }

  function chartOpts({ yCallback, yTitle, tooltipCallback }) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#193c49', font: { family: 'IBM Plex Sans', size: 12 } } },
        tooltip: tooltipCallback ? { callbacks: { label: tooltipCallback } } : {}
      },
      scales: {
        x: { grid: { color: 'rgba(25,60,73,0.08)' }, ticks: { color: '#425466' } },
        y: {
          grid: { color: 'rgba(25,60,73,0.08)' },
          ticks: { color: '#425466', callback: yCallback || undefined },
          title: yTitle ? { display: true, text: yTitle, color: '#425466' } : {}
        }
      }
    };
  }

  function markerColor(c) {
    if (c === 'high') return '#146356';
    if (c === 'medium') return '#9d7e12';
    return '#9b2c2c';
  }

  function materialColor(mat) {
    if (mat.includes('Nonwoven') || mat.includes('Fleece')) return '#0b6a79';
    if (mat.includes('Nicotine')) return '#9b2c2c';
    if (mat.includes('Plastic') || mat.includes('can')) return '#1764ab';
    if (mat.includes('MCC') || mat.includes('cellulose')) return '#1a936f';
    return '#6b7d8e';
  }

  function riskToConfidence(s) { return s === 'high' ? 'high' : s === 'medium' ? 'medium' : 'low'; }
  function fmtPct(v) { const n = Number(v); return Number.isFinite(n) ? `${n >= 0 ? '+' : ''}${n.toFixed(2)}%` : 'N/A'; }
  function shortInputLabel(l) {
    if (l.includes('Polymer')) return 'Polymer';
    if (l.includes('Nicotine')) return 'Nicotine';
    if (l.includes('Nonwoven')) return 'Nonwoven';
    if (l.includes('Cellulose')) return 'Cellulose';
    return l;
  }

  function downloadFile(name, content, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  }

  function csvEsc(v) {
    const s = String(v == null ? '' : v);
    return s.includes(',') || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g, '""')}"` : s;
  }

  function esc(t) {
    return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function escAttr(t) { return esc(t).replace(/`/g, '&#96;'); }
})();
