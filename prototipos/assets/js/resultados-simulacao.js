"use strict";

// Função utilitária para formatar valores monetários
function formatBRL(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
}

// Recupera dados da simulação
const simulacao = JSON.parse(sessionStorage.getItem('simulacao_resultado') || '{}');

// Renderiza métricas totalizadoras
function renderMetricas() {
  if (!simulacao.metricas) return;
  const el = document.getElementById('cards-metricas');
  if (!el) return;
  el.innerHTML = `
    <div class="card-metrica"><h3>VPL Faturamento</h3><p>${formatBRL(simulacao.metricas.vpl_faturamento)}</p></div>
    <div class="card-metrica"><h3>VPL Arrecadação</h3><p>${formatBRL(simulacao.metricas.vpl_arrecadacao)}</p></div>
    <div class="card-metrica"><h3>CAPEX Total</h3><p>${formatBRL(simulacao.metricas.capex_total)}</p></div>
    <div class="card-metrica"><h3>Cobertura Total</h3><p>${simulacao.metricas.cobertura_total}%</p></div>
    <div class="card-metrica"><h3>Extensão Total</h3><p>${simulacao.metricas.extensao_total} km</p></div>
  `;
}

// Renderiza tabela detalhada
function renderTabelaDetalhada() {
  if (!simulacao.detalhamento) return;
  const el = document.getElementById('tabela-detalhada');
  if (!el) return;
  let html = `<table class="tabela-detalhada">
    <thead><tr><th>Sub-bacia</th><th>Componente</th><th>CAPEX</th><th>Cobertura (%)</th><th>Extensão (km)</th><th>VPL Faturamento</th><th>VPL Arrecadação</th></tr></thead>
    <tbody>`;
  simulacao.detalhamento.forEach(linha => {
    html += `<tr>
      <td>${linha.subbacia}</td>
      <td>${linha.componente}</td>
      <td>${formatBRL(linha.capex)}</td>
      <td>${linha.cobertura}</td>
      <td>${linha.extensao}</td>
      <td>${formatBRL(linha.vpl_faturamento)}</td>
      <td>${formatBRL(linha.vpl_arrecadacao)}</td>
    </tr>`;
  });
  html += `</tbody></table>`;
  el.innerHTML = html;
}

// Geração de gráficos com Chart.js
function renderGraficos() {
  if (!window.Chart || !simulacao.detalhamento) return;
  const ctx = document.getElementById('grafico-vpl');
  if (!ctx) return;
  const labels = simulacao.detalhamento.map(l => l.subbacia);
  const vplFat = simulacao.detalhamento.map(l => l.vpl_faturamento);
  const vplArr = simulacao.detalhamento.map(l => l.vpl_arrecadacao);
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'VPL Faturamento', data: vplFat, backgroundColor: '#0027BD' },
        { label: 'VPL Arrecadação', data: vplArr, backgroundColor: '#00d084' }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'top' } }
    }
  });
}

// Exportação dos resultados
function exportarResultados(tipo) {
  if (tipo === 'json') {
    const blob = new Blob([JSON.stringify(simulacao, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resultado-simulacao.json';
    a.click();
    URL.revokeObjectURL(url);
  } else if (tipo === 'csv') {
    let csv = 'Sub-bacia,Componente,CAPEX,Cobertura,Extensão,VPL Faturamento,VPL Arrecadação\n';
    simulacao.detalhamento.forEach(linha => {
      csv += `${linha.subbacia},${linha.componente},${linha.capex},${linha.cobertura},${linha.extensao},${linha.vpl_faturamento},${linha.vpl_arrecadacao}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resultado-simulacao.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
}

// Inicialização
window.addEventListener('DOMContentLoaded', function() {
  renderMetricas();
  renderTabelaDetalhada();
  renderGraficos();
  // Botões de exportação
  const btnJson = document.getElementById('btnExportarJson');
  const btnCsv = document.getElementById('btnExportarCsv');
  if (btnJson) btnJson.onclick = () => exportarResultados('json');
  if (btnCsv) btnCsv.onclick = () => exportarResultados('csv');
});
