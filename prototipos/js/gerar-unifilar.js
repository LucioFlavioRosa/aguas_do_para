// gerar-unifilar.js
// Script para gerar dinamicamente o diagrama unifilar de sub-bacias
// Utiliza SVG puro para visualização simples e clara

// Exemplo de dados simulados (pode ser substituído por dados reais)
const subBacias = [
  {
    id: 'SB1',
    nome: 'Sub-bacia 1',
    destino: 'SB2'
  },
  {
    id: 'SB2',
    nome: 'Sub-bacia 2',
    destino: 'SB3'
  },
  {
    id: 'SB3',
    nome: 'Sub-bacia 3',
    destino: null // Última bacia
  },
  {
    id: 'SB4',
    nome: 'Sub-bacia 4',
    destino: 'SB2' // Exemplo de múltiplas origens
  }
];

function gerarUnifilar(subBacias) {
  // Mapeia cada sub-bacia para uma posição vertical
  const nodeSpacingX = 180;
  const nodeSpacingY = 100;
  const nodeRadius = 30;
  const margin = 40;
  // Organiza as sub-bacias em linhas de acordo com o id
  const nodeOrder = {};
  let idx = 0;
  subBacias.forEach(sb => {
    if (!(sb.id in nodeOrder)) {
      nodeOrder[sb.id] = idx++;
    }
  });
  // Adiciona destinos que não estão na lista como nós finais
  subBacias.forEach(sb => {
    if (sb.destino && !(sb.destino in nodeOrder)) {
      nodeOrder[sb.destino] = idx++;
    }
  });
  const nodes = Object.keys(nodeOrder).map(id => ({
    id,
    nome: (subBacias.find(sb => sb.id === id) || {nome: id}).nome,
    y: margin + nodeOrder[id] * nodeSpacingY
  }));

  // Calcula largura e altura do SVG
  const svgWidth = nodeSpacingX * 2 + margin * 2;
  const svgHeight = margin * 2 + nodes.length * nodeSpacingY;

  // Cria SVG
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', svgWidth);
  svg.setAttribute('height', svgHeight);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Diagrama unifilar de sub-bacias');
  svg.style.width = '100%';
  svg.style.maxWidth = '700px';
  svg.style.display = 'block';
  svg.style.margin = '0 auto';

  // Desenha conexões (linhas)
  subBacias.forEach(sb => {
    if (sb.destino) {
      const origemNode = nodes.find(n => n.id === sb.id);
      const destinoNode = nodes.find(n => n.id === sb.destino);
      if (origemNode && destinoNode) {
        const line = document.createElementNS(svgNS, 'line');
        line.setAttribute('x1', nodeSpacingX);
        line.setAttribute('y1', origemNode.y);
        line.setAttribute('x2', nodeSpacingX + nodeSpacingX);
        line.setAttribute('y2', destinoNode.y);
        line.setAttribute('stroke', '#0027BD');
        line.setAttribute('stroke-width', '3');
        line.setAttribute('marker-end', 'url(#arrowhead)');
        svg.appendChild(line);
      }
    }
  });

  // Define seta para as linhas
  const defs = document.createElementNS(svgNS, 'defs');
  const marker = document.createElementNS(svgNS, 'marker');
  marker.setAttribute('id', 'arrowhead');
  marker.setAttribute('markerWidth', '10');
  marker.setAttribute('markerHeight', '7');
  marker.setAttribute('refX', '10');
  marker.setAttribute('refY', '3.5');
  marker.setAttribute('orient', 'auto');
  marker.setAttribute('markerUnits', 'strokeWidth');
  const arrowPath = document.createElementNS(svgNS, 'path');
  arrowPath.setAttribute('d', 'M0,0 L10,3.5 L0,7');
  arrowPath.setAttribute('fill', '#0027BD');
  marker.appendChild(arrowPath);
  defs.appendChild(marker);
  svg.appendChild(defs);

  // Desenha nós (círculos e textos)
  nodes.forEach((node, i) => {
    // Círculo
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', nodeSpacingX);
    circle.setAttribute('cy', node.y);
    circle.setAttribute('r', nodeRadius);
    circle.setAttribute('fill', '#fff');
    circle.setAttribute('stroke', '#0027BD');
    circle.setAttribute('stroke-width', '3');
    circle.setAttribute('aria-label', node.nome);
    svg.appendChild(circle);
    // Texto
    const text = document.createElementNS(svgNS, 'text');
    text.setAttribute('x', nodeSpacingX);
    text.setAttribute('y', node.y + 5);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '14');
    text.setAttribute('font-family', 'sans-serif');
    text.setAttribute('fill', '#0027BD');
    text.textContent = node.nome;
    svg.appendChild(text);
  });

  // Renderiza SVG no container
  const container = document.getElementById('unifilar-diagrama');
  container.innerHTML = '';
  container.appendChild(svg);
}

// Ao carregar a página, gera o diagrama
window.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('unifilar-diagrama')) {
    gerarUnifilar(subBacias);
  }
});
