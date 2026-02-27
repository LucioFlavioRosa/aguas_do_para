'use strict';

// Função para capturar dados dos filtros e restrições
function getSimulacaoInputs() {
  const unidade = document.getElementById('filtro-unidade')?.value || '';
  const bloco = document.getElementById('filtro-bloco')?.value || '';
  const municipio = document.getElementById('filtro-municipio')?.value || '';
  const sistema = document.getElementById('filtro-sistema')?.value || '';
  const capexMin = parseFloat(document.getElementById('restricao-capex-min')?.value || '');
  const capexMax = parseFloat(document.getElementById('restricao-capex-max')?.value || '');
  const coberturaMin = parseFloat(document.getElementById('restricao-cobertura-min')?.value || '');
  const coberturaMax = parseFloat(document.getElementById('restricao-cobertura-max')?.value || '');
  const extensaoMin = parseFloat(document.getElementById('restricao-extensao-min')?.value || '');
  const extensaoMax = parseFloat(document.getElementById('restricao-extensao-max')?.value || '');
  return {
    unidade, bloco, municipio, sistema, capexMin, capexMax, coberturaMin, coberturaMax, extensaoMin, extensaoMax
  };
}

// Função para validar os inputs
function validarSimulacaoInputs(inputs) {
  let erros = [];
  if (!inputs.unidade) erros.push('Selecione a Unidade.');
  if (!inputs.sistema) erros.push('Selecione o Sistema.');
  if (isNaN(inputs.capexMin) || isNaN(inputs.capexMax) || inputs.capexMin > inputs.capexMax) erros.push('Intervalo de CAPEX inválido.');
  if (isNaN(inputs.coberturaMin) || isNaN(inputs.coberturaMax) || inputs.coberturaMin > inputs.coberturaMax) erros.push('Intervalo de Cobertura inválido.');
  if (isNaN(inputs.extensaoMin) || isNaN(inputs.extensaoMax) || inputs.extensaoMin > inputs.extensaoMax) erros.push('Intervalo de Extensão de Rede inválido.');
  return erros;
}

// Função para exibir modal de erro/sucesso estilizado
function showModal(message, type = 'erro') {
  const modal = document.createElement('div');
  modal.className = `custom-modal ${type}`;
  modal.innerHTML = `<div class="custom-modal-content"><span class="custom-modal-close" tabindex="0">&times;</span><p>${message}</p></div>`;
  document.body.appendChild(modal);
  modal.querySelector('.custom-modal-close').onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
  setTimeout(() => { if (document.body.contains(modal)) modal.remove(); }, 4000);
}

// Função para simular chamada assíncrona (mock)
function simularOtimizacao(inputs, callback) {
  // Simula atraso de rede
  fetch('data:application/json,{"ok":true}')
    .then(() => {
      // Gera dados fictícios
      const resultados = {
        vplFaturamento: Math.round(Math.random() * 1e7 + 1e7),
        vplArrecadacao: Math.round(Math.random() * 1e7 + 8e6),
        capexTotal: Math.round(Math.random() * 5e6 + 2e6),
        cobertura: Math.round(Math.random() * (inputs.coberturaMax - inputs.coberturaMin) + inputs.coberturaMin),
        extensao: Math.round(Math.random() * (inputs.extensaoMax - inputs.extensaoMin) + inputs.extensaoMin),
        subBacias: [
          { nome: 'SB-01', capex: 1200000, cobertura: 3500, extensao: 8.2 },
          { nome: 'SB-02', capex: 900000, cobertura: 2600, extensao: 5.7 },
          { nome: 'SB-03', capex: 1500000, cobertura: 4100, extensao: 10.1 }
        ]
      };
      callback(resultados);
    });
}

// Função principal de submissão da simulação
function handleSimulacaoSubmit(e) {
  e.preventDefault();
  const inputs = getSimulacaoInputs();
  const erros = validarSimulacaoInputs(inputs);
  if (erros.length > 0) {
    showModal(erros.join('<br>'), 'erro');
    return;
  }
  showModal('Simulação em andamento...', 'sucesso');
  simularOtimizacao(inputs, function(resultados) {
    // Salva no sessionStorage
    sessionStorage.setItem('simulacao_resultados', JSON.stringify(resultados));
    setTimeout(() => {
      window.location.href = 'resultados.html';
    }, 1000);
  });
}

// Bind do botão de simulação
window.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('btn-simular');
  if (btn) {
    btn.addEventListener('click', handleSimulacaoSubmit);
  }
});

// Estilos básicos do modal (pode ser movido para CSS)
(function(){
  const style = document.createElement('style');
  style.innerHTML = `
    .custom-modal { position:fixed;z-index:9999;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center; }
    .custom-modal-content { background:#fff; padding:2rem 2.5rem; border-radius:8px; box-shadow:0 2px 24px rgba(0,0,0,0.18); position:relative; min-width:280px; max-width:90vw; }
    .custom-modal.sucesso .custom-modal-content { border-left:5px solid #0693e3; }
    .custom-modal.erro .custom-modal-content { border-left:5px solid #cf2e2e; }
    .custom-modal-close { position:absolute;top:8px;right:16px;font-size:1.5rem;cursor:pointer; }
  `;
  document.head.appendChild(style);
})();
