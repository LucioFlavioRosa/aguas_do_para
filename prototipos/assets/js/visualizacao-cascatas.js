"use strict";

// Exemplo de dados de cascata (pode ser alimentado dinamicamente)
const dadosCascata = [
  { origem: "SB05", destino: "SB02" },
  { origem: "SB06", destino: "SB02" },
  { origem: "SB02", destino: "SB01" },
  { origem: "SB04", destino: "SB03" },
  { origem: "SB03", destino: "ETE" },
  { origem: "SB01", destino: "ETE" }
];

// Gera sintaxe Mermaid a partir dos dados
function gerarMermaid(dados) {
  let linhas = ["graph TD"];
  dados.forEach(l => {
    linhas.push(`    ${l.origem}[${l.origem}] --> ${l.destino}[${l.destino}]`);
  });
  return linhas.join('\n');
}

// Renderiza o diagrama Mermaid
function renderizarCascata() {
  const el = document.getElementById('mermaid-cascata');
  if (!el) return;
  el.innerHTML = `<pre class='mermaid'>${gerarMermaid(dadosCascata)}</pre>`;
  if (window.mermaid) {
    window.mermaid.initialize({ startOnLoad: false });
    window.mermaid.init(undefined, el);
  }
}

// Interatividade: hover e clique
function adicionarInteratividade() {
  // Aguarda renderização do Mermaid
  setTimeout(() => {
    const nodes = document.querySelectorAll('.mermaid [id^="node-"]');
    nodes.forEach(node => {
      node.addEventListener('mouseenter', function() {
        this.style.filter = 'drop-shadow(0 0 8px #0027BD)';
      });
      node.addEventListener('mouseleave', function() {
        this.style.filter = '';
      });
      node.addEventListener('click', function() {
        nodes.forEach(n => n.style.stroke = '');
        this.style.stroke = '#ff4d4d';
      });
    });
  }, 500);
}

window.addEventListener('DOMContentLoaded', function() {
  renderizarCascata();
  adicionarInteratividade();
});
