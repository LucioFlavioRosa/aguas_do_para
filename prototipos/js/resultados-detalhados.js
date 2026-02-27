"use strict";

document.addEventListener('DOMContentLoaded', function () {
  // Dados simulados
  const resumo = [
    { indicador: 'Capex Total', valor: 'R$ 30.000.000' },
    { indicador: 'VPL Faturamento', valor: 'R$ 69.000.000' },
    { indicador: 'VPL Arrecadação', valor: 'R$ 57.000.000' },
    { indicador: 'Cobertura Média', valor: '55%' },
    { indicador: 'Extensão Total de Rede', valor: '15 km' },
    { indicador: 'Ano', valor: '2026' },
    { indicador: 'Unidade', valor: 'Águas do Rio' }
  ];
  const subbacias = [
    { nome: 'SB-101', investimento: 12000000, vplFat: 27000000, vplArr: 22000000, cobertura: 60, extensao: 6.2 },
    { nome: 'SB-102', investimento: 8000000, vplFat: 19000000, vplArr: 16000000, cobertura: 52, extensao: 4.1 },
    { nome: 'SB-103', investimento: 10000000, vplFat: 23000000, vplArr: 19000000, cobertura: 53, extensao: 4.7 }
  ];
  const componentes = [
    { subbacia: 'SB-101', rede: 6.2, ligacoes: 3200, elevatorias: 2, recalque: 1.3, tronco: 2.1, ete: 'Não' },
    { subbacia: 'SB-102', rede: 4.1, ligacoes: 2100, elevatorias: 1, recalque: 0.8, tronco: 1.5, ete: 'Sim' },
    { subbacia: 'SB-103', rede: 4.7, ligacoes: 2500, elevatorias: 1, recalque: 1.0, tronco: 1.8, ete: 'Não' }
  ];

  // Preencher tabela resumo
  const tbodyResumo = document.querySelector('#tabela-resumo tbody');
  resumo.forEach(linha => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${linha.indicador}</td><td>${linha.valor}</td>`;
    tbodyResumo.appendChild(tr);
  });

  // Preencher tabela sub-bacia
  const tbodySub = document.querySelector('#tabela-subbacia tbody');
  subbacias.forEach(sb => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${sb.nome}</td>
      <td>R$ ${sb.investimento.toLocaleString('pt-BR')}</td>
      <td>R$ ${sb.vplFat.toLocaleString('pt-BR')}</td>
      <td>R$ ${sb.vplArr.toLocaleString('pt-BR')}</td>
      <td>${sb.cobertura}%</td>
      <td>${sb.extensao}</td>
    `;
    tbodySub.appendChild(tr);
  });

  // Preencher tabela componentes
  const tbodyComp = document.querySelector('#tabela-componentes tbody');
  componentes.forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${c.subbacia}</td>
      <td>${c.rede}</td>
      <td>${c.ligacoes}</td>
      <td>${c.elevatorias}</td>
      <td>${c.recalque}</td>
      <td>${c.tronco}</td>
      <td>${c.ete}</td>
    `;
    tbodyComp.appendChild(tr);
  });

  // Gráfico 1: Investimento por Sub-bacia
  const ctxInv = document.getElementById('grafico-investimento').getContext('2d');
  new Chart(ctxInv, {
    type: 'bar',
    data: {
      labels: subbacias.map(s => s.nome),
      datasets: [{
        label: 'Investimento (R$)',
        data: subbacias.map(s => s.investimento),
        backgroundColor: ['#0027BD', '#00d084', '#9b51e0']
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });

  // Gráfico 2: Cobertura por Sub-bacia
  const ctxCob = document.getElementById('grafico-cobertura').getContext('2d');
  new Chart(ctxCob, {
    type: 'bar',
    data: {
      labels: subbacias.map(s => s.nome),
      datasets: [{
        label: 'Cobertura (%)',
        data: subbacias.map(s => s.cobertura),
        backgroundColor: ['#fcb900', '#0693e3', '#cf2e2e']
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, max: 100 } }
    }
  });

  // Gráfico 3: Composição do Investimento (Pizza)
  const ctxComp = document.getElementById('grafico-composicao').getContext('2d');
  const soma = (arr, campo) => arr.reduce((acc, el) => acc + el[campo], 0);
  new Chart(ctxComp, {
    type: 'pie',
    data: {
      labels: ['Rede Coletora', 'Ligações', 'Elevatórias', 'Linha de Recalque', 'Coletor Tronco', 'ETE'],
      datasets: [{
        data: [
          soma(componentes, 'rede'),
          soma(componentes, 'ligacoes'),
          soma(componentes, 'elevatorias'),
          soma(componentes, 'recalque'),
          soma(componentes, 'tronco'),
          componentes.filter(c => c.ete === 'Sim').length
        ],
        backgroundColor: [
          '#00d084', '#fcb900', '#cf2e2e', '#0693e3', '#9b51e0', '#32373c'
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } }
    }
  });
});
