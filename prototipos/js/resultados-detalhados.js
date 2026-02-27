// prototipos/js/resultados-detalhados.js

document.addEventListener('DOMContentLoaded', function () {
  // Dados simulados
  const resumo = {
    unidade: 'Águas do Rio',
    ano: '2026',
    capex: 30000000,
    cobertura: '45%',
    extensao: '9,8 km',
    vpl: 42.7,
    subbacias: 5,
    incrementoCobertura: 11.2
  };

  const subbacias = [
    { nome: 'SB-101', cobertura: 48.3, capex: 8200, vpl: 13.2, componentes: 'Rede coletora, Ligações' },
    { nome: 'SB-102', cobertura: 44.1, capex: 6700, vpl: 9.1, componentes: 'Rede coletora, Elevatória' },
    { nome: 'SB-103', cobertura: 46.8, capex: 5400, vpl: 7.7, componentes: 'Rede coletora, Ligações, Linha de Recalque' },
    { nome: 'SB-104', cobertura: 42.7, capex: 5100, vpl: 6.8, componentes: 'Rede coletora' },
    { nome: 'SB-105', cobertura: 43.9, capex: 5600, vpl: 5.9, componentes: 'Rede coletora, Elevatória' }
  ];

  const componentes = [
    { nome: 'Rede coletora', quantidade: 18.2, capex: 16500, opex: 420 },
    { nome: 'Ligações', quantidade: 8200, capex: 4200, opex: 120 },
    { nome: 'Elevatórias', quantidade: 3, capex: 5400, opex: 260 },
    { nome: 'Linha de Recalque', quantidade: 2.5, capex: 3900, opex: 110 }
  ];

  // Preencher resumo
  const resumoDiv = document.getElementById('resumo-simulacao');
  if (resumoDiv) {
    resumoDiv.innerHTML = `
      <ul>
        <li><strong>Unidade:</strong> ${resumo.unidade}</li>
        <li><strong>Ano:</strong> ${resumo.ano}</li>
        <li><strong>CapEx total:</strong> R$ ${(resumo.capex/1000000).toFixed(2)} milhões</li>
        <li><strong>Cobertura final:</strong> ${resumo.cobertura}</li>
        <li><strong>Extensão de rede:</strong> ${resumo.extensao}</li>
        <li><strong>VPL estimado:</strong> R$ ${resumo.vpl.toFixed(2)} milhões</li>
        <li><strong>Número de sub-bacias priorizadas:</strong> ${resumo.subbacias}</li>
        <li><strong>Incremento de cobertura:</strong> ${resumo.incrementoCobertura}%</li>
      </ul>
    `;
  }

  // Preencher tabela de sub-bacias
  const tbodySub = document.querySelector('#tabela-detalhe-subbacia tbody');
  if (tbodySub) {
    tbodySub.innerHTML = subbacias.map(sb => `
      <tr>
        <td>${sb.nome}</td>
        <td>${sb.cobertura}%</td>
        <td>R$ ${sb.capex.toLocaleString('pt-BR')}</td>
        <td>R$ ${sb.vpl.toFixed(1)} mi</td>
        <td>${sb.componentes}</td>
      </tr>
    `).join('');
  }

  // Preencher tabela de componentes
  const tbodyComp = document.querySelector('#tabela-detalhe-componentes tbody');
  if (tbodyComp) {
    tbodyComp.innerHTML = componentes.map(c => `
      <tr>
        <td>${c.nome}</td>
        <td>${c.quantidade}</td>
        <td>R$ ${c.capex.toLocaleString('pt-BR')}</td>
        <td>R$ ${c.opex.toLocaleString('pt-BR')}</td>
      </tr>
    `).join('');
  }

  // Gráfico CapEx por Sub-bacia
  const ctxBar = document.getElementById('grafico-capex-subbacia');
  if (ctxBar) {
    new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: subbacias.map(sb => sb.nome),
        datasets: [{
          label: 'CapEx (R$ mil)',
          data: subbacias.map(sb => sb.capex),
          backgroundColor: '#0027BD'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  // Gráfico de Pizza dos Componentes
  const ctxPie = document.getElementById('grafico-componente-pizza');
  if (ctxPie) {
    new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: componentes.map(c => c.nome),
        datasets: [{
          data: componentes.map(c => c.capex),
          backgroundColor: ['#0027BD', '#00d084', '#fcb900', '#9b51e0']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          title: { display: false }
        }
      }
    });
  }
});
