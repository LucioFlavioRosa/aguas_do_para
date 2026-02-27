'use strict';

// Função para recuperar dados da simulação
function getResultados() {
  let data = sessionStorage.getItem('simulacao_resultados');
  if (!data) data = localStorage.getItem('simulacao_resultados');
  if (!data) return null;
  return JSON.parse(data);
}

// Popular cards de métricas
function popularCards(resultados) {
  if (!resultados) return;
  document.getElementById('card-vpl-faturamento') && (document.getElementById('card-vpl-faturamento').textContent = 'R$ ' + resultados.vplFaturamento.toLocaleString());
  document.getElementById('card-vpl-arrecadacao') && (document.getElementById('card-vpl-arrecadacao').textContent = 'R$ ' + resultados.vplArrecadacao.toLocaleString());
  document.getElementById('card-capex-total') && (document.getElementById('card-capex-total').textContent = 'R$ ' + resultados.capexTotal.toLocaleString());
  document.getElementById('card-cobertura') && (document.getElementById('card-cobertura').textContent = resultados.cobertura + ' ligações');
  document.getElementById('card-extensao') && (document.getElementById('card-extensao').textContent = resultados.extensao + ' km');
}

// Renderizar tabela de resultados detalhados
function renderTabelaDetalhada(resultados) {
  const tbody = document.getElementById('tabela-resultados-body');
  if (!tbody || !resultados || !resultados.subBacias) return;
  tbody.innerHTML = '';
  resultados.subBacias.forEach(sb => {
    const tr = document.createElement('tr');
    ['nome', 'capex', 'cobertura', 'extensao'].forEach(key => {
      const td = document.createElement('td');
      td.textContent = key === 'capex' ? 'R$ ' + sb[key].toLocaleString() : sb[key];
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

// Gerar gráficos com Chart.js
function gerarGraficos(resultados) {
  if (!window.Chart || !resultados) return;
  // CAPEX por sub-bacia
  const ctxCapex = document.getElementById('grafico-capex')?.getContext('2d');
  if (ctxCapex) {
    new Chart(ctxCapex, {
      type: 'bar',
      data: {
        labels: resultados.subBacias.map(sb => sb.nome),
        datasets: [{
          label: 'CAPEX (R$)',
          data: resultados.subBacias.map(sb => sb.capex),
          backgroundColor: '#0693e3'
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });
  }
  // Cobertura por sub-bacia
  const ctxCobertura = document.getElementById('grafico-cobertura')?.getContext('2d');
  if (ctxCobertura) {
    new Chart(ctxCobertura, {
      type: 'pie',
      data: {
        labels: resultados.subBacias.map(sb => sb.nome),
        datasets: [{
          label: 'Cobertura',
          data: resultados.subBacias.map(sb => sb.cobertura),
          backgroundColor: ['#0693e3', '#00d084', '#cf2e2e', '#fcb900', '#9b51e0']
        }]
      },
      options: { responsive: true }
    });
  }
}

// Exportação de resultados
function exportarResultados(tipo = 'excel') {
  const resultados = getResultados();
  if (!resultados) {
    alert('Nenhum resultado disponível para exportação.');
    return;
  }
  if (tipo === 'excel') {
    if (window.XLSX) {
      const ws = XLSX.utils.json_to_sheet(resultados.subBacias);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Resultados');
      XLSX.writeFile(wb, 'resultados_simulacao.xlsx');
    } else {
      alert('Funcionalidade de exportação para Excel depende da biblioteca SheetJS/xlsx.js.');
    }
  } else if (tipo === 'pdf') {
    if (window.jspdf && window.html2canvas) {
      const doc = new jspdf.jsPDF();
      doc.text('Resultados da Simulação', 10, 10);
      let y = 20;
      resultados.subBacias.forEach(sb => {
        doc.text(`${sb.nome} - CAPEX: R$${sb.capex.toLocaleString()} - Cobertura: ${sb.cobertura} - Extensão: ${sb.extensao} km`, 10, y);
        y += 10;
      });
      doc.save('resultados_simulacao.pdf');
    } else {
      alert('Funcionalidade de exportação para PDF depende das bibliotecas jsPDF e html2canvas.');
    }
  }
}

// Bind de eventos
window.addEventListener('DOMContentLoaded', function() {
  const resultados = getResultados();
  popularCards(resultados);
  renderTabelaDetalhada(resultados);
  gerarGraficos(resultados);
  // Botões de exportação
  document.getElementById('btn-exportar-excel')?.addEventListener('click', function() { exportarResultados('excel'); });
  document.getElementById('btn-exportar-pdf')?.addEventListener('click', function() { exportarResultados('pdf'); });
});
