// prototipos/js/diagrama.js

// Dados fictícios ou recuperados do localStorage
function obterDadosCascata() {
  // Exemplo de estrutura de cascata
  return [
    { subBacia: 'SB-01', destino: 'SB-02' },
    { subBacia: 'SB-02', destino: 'ETE' },
    { subBacia: 'SB-03', destino: 'SB-02' }
  ];
}

function renderizarDiagrama() {
  const dados = obterDadosCascata();
  const container = document.getElementById('diagrama-cascata');
  container.innerHTML = '';
  // Renderização simples em divs conectadas
  dados.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'cascata-bloco';
    div.innerHTML = `<strong>${item.subBacia}</strong> <span style="margin:0 8px">→</span> <span>${item.destino}</span>`;
    container.appendChild(div);
  });
}

function validarCascata() {
  alert('Cascata validada com sucesso!');
  document.getElementById('btnAvancar').disabled = false;
}

function voltarCadastro() {
  window.location.href = 'cadastro-dados.html';
}

function avancarSimulacao() {
  window.location.href = 'simulacao-investimentos.html';
}

window.addEventListener('DOMContentLoaded', () => {
  renderizarDiagrama();
  document.getElementById('btnValidar').addEventListener('click', validarCascata);
  document.getElementById('btnVoltar').addEventListener('click', voltarCadastro);
  document.getElementById('btnAvancar').addEventListener('click', avancarSimulacao);
});
