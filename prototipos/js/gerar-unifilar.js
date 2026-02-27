// gerar-unifilar.js
// Script para gerar dinamicamente o diagrama unifilar de sub-bacias
// Utiliza SVG puro para renderização

(function() {
  // Exemplo de dados simulados de sub-bacias
  // Cada sub-bacia tem um nome, origem (null se for inicial) e destino
  const subBacias = [
    { id: 1, nome: 'Sub-bacia A', origem: null, destino: 2 },
    { id: 2, nome: 'Sub-bacia B', origem: 1, destino: 3 },
    { id: 3, nome: 'Sub-bacia C', origem: 2, destino: 4 },
    { id: 4, nome: 'Sub-bacia D', origem: 3, destino: null }
  ];

  // Função para gerar o diagrama unifilar
  function gerarUnifilar(subBacias) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const largura = 800;
    const altura = 200;
    const espacamentoX = 180;
    const centroY = altura / 2;
    const raio = 30;

    // Mapeia id para posição X
    const posicoes = {};
    subBacias.forEach((sb, idx) => {
      posicoes[sb.id] = 80 + idx * espacamentoX;
    });

    // Cria SVG
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', largura);
    svg.setAttribute('height', altura);
    svg.setAttribute('aria-label', 'Diagrama Unifilar de Sub-bacias');
    svg.setAttribute('role', 'img');
    svg.style.display = 'block';
    svg.style.margin = '0 auto';
    svg.style.background = '#f9f9f9';

    // Desenha conexões (linhas)
    subBacias.forEach(sb => {
      if (sb.origem !== null) {
        const x1 = posicoes[sb.origem];
        const x2 = posicoes[sb.id];
        const y = centroY;
        const linha = document.createElementNS(svgNS, 'line');
        linha.setAttribute('x1', x1 + raio);
        linha.setAttribute('y1', y);
        linha.setAttribute('x2', x2 - raio);
        linha.setAttribute('y2', y);
        linha.setAttribute('stroke', '#0027BD');
        linha.setAttribute('stroke-width', '3');
        linha.setAttribute('marker-end', 'url(#arrow)');
        svg.appendChild(linha);
      }
    });

    // Define marcador de seta
    const defs = document.createElementNS(svgNS, 'defs');
    const marker = document.createElementNS(svgNS, 'marker');
    marker.setAttribute('id', 'arrow');
    marker.setAttribute('markerWidth', '10');
    marker.setAttribute('markerHeight', '10');
    marker.setAttribute('refX', '10');
    marker.setAttribute('refY', '3');
    marker.setAttribute('orient', 'auto');
    marker.setAttribute('markerUnits', 'strokeWidth');
    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', 'M0,0 L10,3 L0,6 Z');
    path.setAttribute('fill', '#0027BD');
    marker.appendChild(path);
    defs.appendChild(marker);
    svg.appendChild(defs);

    // Desenha nós (círculos) e nomes
    subBacias.forEach(sb => {
      const x = posicoes[sb.id];
      const y = centroY;
      // Nó
      const circle = document.createElementNS(svgNS, 'circle');
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', raio);
      circle.setAttribute('fill', '#fff');
      circle.setAttribute('stroke', '#0027BD');
      circle.setAttribute('stroke-width', '3');
      circle.setAttribute('aria-label', sb.nome);
      svg.appendChild(circle);
      // Nome
      const text = document.createElementNS(svgNS, 'text');
      text.setAttribute('x', x);
      text.setAttribute('y', y + 5);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-size', '14');
      text.setAttribute('font-family', 'sans-serif');
      text.setAttribute('fill', '#0027BD');
      text.textContent = sb.nome;
      svg.appendChild(text);
    });

    // Renderiza no elemento alvo
    const container = document.getElementById('unifilar-diagrama');
    if (container) {
      container.innerHTML = '';
      container.appendChild(svg);
    } else {
      // Caso não exista o container, cria um novo no body
      const novo = document.createElement('div');
      novo.id = 'unifilar-diagrama';
      novo.style.margin = '40px auto';
      novo.style.maxWidth = largura + 'px';
      document.body.appendChild(novo);
      novo.appendChild(svg);
    }
  }

  // Exponibiliza função global para uso futuro
  window.gerarUnifilar = gerarUnifilar;

  // Gera automaticamente ao carregar se existir o container
  document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('unifilar-diagrama')) {
      gerarUnifilar(subBacias);
    }
  });
})();
