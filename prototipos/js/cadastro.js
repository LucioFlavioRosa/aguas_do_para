// prototipos/js/cadastro.js

// Dados fictícios para simulação de upload
const dadosExemplo = [
  { id: 1, subBacia: 'SB-01', obra: 'Rede Coletora', capex: 120000, opex: 15000 },
  { id: 2, subBacia: 'SB-02', obra: 'ETE', capex: 350000, opex: 40000 },
  { id: 3, subBacia: 'SB-03', obra: 'Interceptador', capex: 90000, opex: 10000 }
];

function renderTabela(dados) {
  const tabela = document.getElementById('tabela-dados');
  tabela.innerHTML = '';
  const thead = document.createElement('thead');
  thead.innerHTML = `<tr>
    <th>Sub-Bacia</th>
    <th>Obra</th>
    <th>CAPEX</th>
    <th>OPEX</th>
  </tr>`;
  tabela.appendChild(thead);
  const tbody = document.createElement('tbody');
  dados.forEach((linha, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td contenteditable="true" data-col="subBacia">${linha.subBacia}</td>
      <td contenteditable="true" data-col="obra">${linha.obra}</td>
      <td contenteditable="true" data-col="capex">${linha.capex}</td>
      <td contenteditable="true" data-col="opex">${linha.opex}</td>
    `;
    tbody.appendChild(tr);
  });
  tabela.appendChild(tbody);
}

function handleUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    // Simulação: sempre carrega dadosExemplo
    renderTabela(dadosExemplo);
    document.getElementById('btnSalvar').disabled = false;
  };
  reader.readAsText(file);
}

function getTabelaEditada() {
  const tabela = document.getElementById('tabela-dados');
  const linhas = tabela.querySelectorAll('tbody tr');
  const dados = [];
  linhas.forEach(tr => {
    const tds = tr.querySelectorAll('td');
    dados.push({
      subBacia: tds[0].innerText.trim(),
      obra: tds[1].innerText.trim(),
      capex: Number(tds[2].innerText.replace(/[^\d]/g, '')),
      opex: Number(tds[3].innerText.replace(/[^\d]/g, ''))
    });
  });
  return dados;
}

function salvarAlteracoes() {
  const dados = getTabelaEditada();
  localStorage.setItem('dadosCadastro', JSON.stringify(dados));
  alert('Alterações salvas com sucesso!');
  document.getElementById('btnAvancar').disabled = false;
}

function navegarParaVisualizacao() {
  window.location.href = 'visualizacao-cascata.html';
}

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('inputExcel').addEventListener('change', handleUpload);
  document.getElementById('btnSalvar').addEventListener('click', salvarAlteracoes);
  document.getElementById('btnAvancar').addEventListener('click', navegarParaVisualizacao);
  // Se já houver dados salvos, exibir
  const salvos = localStorage.getItem('dadosCadastro');
  if (salvos) {
    renderTabela(JSON.parse(salvos));
    document.getElementById('btnSalvar').disabled = false;
    document.getElementById('btnAvancar').disabled = false;
  }
});
