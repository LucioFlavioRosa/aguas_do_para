// prototipos/js/resultados.js

function recuperarDadosSimulacao() {
  // Simula recuperação de dados do sessionStorage ou URL
  let dados = sessionStorage.getItem('resultadosSimulacao');
  if (dados) return JSON.parse(dados);
  // Dados fictícios caso não haja nada salvo
  return {
    faturamento: {
      obras: [
        { nome: 'Rede Coletora SB-01', capex: 120000, vpl: 350000, cobertura: '2500 hab.' },
        { nome: 'ETE', capex: 350000, vpl: 700000, cobertura: '5000 hab.' }
      ],
      vplTotal: 1050000,
      coberturaTotal: '7500 hab.'
    },
    arrecadacao: {
      obras: [
        { nome: 'Rede Coletora SB-01', capex: 120000, vpl: 320000, cobertura: '2500 hab.' },
        { nome: 'ETE', capex: 350000, vpl: 650000, cobertura: '5000 hab.' }
      ],
      vplTotal: 970000,
      coberturaTotal: '7500 hab.'
    }
  };
}

function renderTabelaObras(tipo) {
  const dados = recuperarDadosSimulacao();
  const obras = dados[tipo].obras;
  const tabela = document.getElementById('tabela-obras');
  tabela.innerHTML = '';
  const thead = document.createElement('thead');
  thead.innerHTML = `<tr>
    <th>Obra</th>
    <th>CAPEX</th>
    <th>VPL</th>
    <th>Cobertura</th>
  </tr>`;
  tabela.appendChild(thead);
  const tbody = document.createElement('tbody');
  obras.forEach(obra => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${obra.nome}</td>
      <td>R$ ${obra.capex.toLocaleString('pt-BR')}</td>
      <td>R$ ${obra.vpl.toLocaleString('pt-BR')}</td>
      <td>${obra.cobertura}</td>
    `;
    tbody.appendChild(tr);
  });
  tabela.appendChild(tbody);
}

function atualizarCards(tipo) {
  const dados = recuperarDadosSimulacao();
  document.getElementById('card-vpl').innerText = 'R$ ' + dados[tipo].vplTotal.toLocaleString('pt-BR');
  document.getElementById('card-cobertura').innerText = dados[tipo].coberturaTotal;
}

function alternarAba(tipo) {
  renderTabelaObras(tipo);
  atualizarCards(tipo);
  document.getElementById('btnFaturamento').classList.toggle('ativo', tipo === 'faturamento');
  document.getElementById('btnArrecadacao').classList.toggle('ativo', tipo === 'arrecadacao');
}

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btnFaturamento').addEventListener('click', () => alternarAba('faturamento'));
  document.getElementById('btnArrecadacao').addEventListener('click', () => alternarAba('arrecadacao'));
  alternarAba('faturamento'); // Exibe primeiro por padrão
});
