// unifilar-renderer.js
// Renderização do diagrama unifilar da cascata de sub-bacias

/**
 * Renderiza o diagrama unifilar de sub-bacias em cascata
 * @param {string|number} sistemaId - id do sistema selecionado
 * @param {Array<Object>} dadosSubBacias - lista de sub-bacias (mock)
 * Cada sub-bacia: { id, nome, origemId, destinoId, ... }
 */
function renderizarUnifilar(sistemaId, dadosSubBacias) {
  const container = document.getElementById('unifilar-container');
  if (!container) return;
  // Filtra sub-bacias do sistema
  const subBacias = dadosSubBacias.filter(sb => sb.sistemaId === sistemaId);
  // Monta grafo: id -> filhos
  const filhos = {};
  subBacias.forEach(sb => {
    if (!filhos[sb.origemId]) filhos[sb.origemId] = [];
    filhos[sb.origemId].push(sb);
  });
  // Identifica raízes (sem origem)
  const roots = subBacias.filter(sb => !sb.origemId || sb.origemId === null);

  // Função recursiva para montar árvore
  function montarBlocos(nos, nivel) {
    if (!nos.length) return '';
    return `
      <div style="display:flex;gap:32px;justify-content:center;margin-bottom:32px;">
        ${nos.map(sb => `
          <div style="display:flex;flex-direction:column;align-items:center;">
            <div class="cardVeja" tabindex="0" role="button" aria-label="Detalhes da sub-bacia ${sb.nome}"
              style="min-width:120px;min-height:48px;padding:18px 16px;background:#fff;border:2px solid #0027BD;border-radius:12px;box-shadow:0 2px 8px rgba(0,39,189,0.10);font-weight:600;color:#0027BD;cursor:pointer;margin-bottom:8px;"
              data-subbacia="${sb.id}">
              ${sb.nome}
            </div>
            ${filhos[sb.id] && filhos[sb.id].length ?
              `<div style="width:2px;height:24px;background:#0027BD;"></div>` : ''}
            ${filhos[sb.id] && filhos[sb.id].length ? montarBlocos(filhos[sb.id], nivel+1) : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  // Renderiza árvore
  container.innerHTML = `<div style="padding:32px 0;">${montarBlocos(roots, 0)}</div>`;

  // Event listeners para abrir modal de detalhes
  container.querySelectorAll('.cardVeja').forEach(div => {
    div.addEventListener('click', function() {
      const id = this.getAttribute('data-subbacia');
      const sb = subBacias.find(s => String(s.id) === String(id));
      if (sb) {
        exibirModalDetalhesSubBacia(sb);
      }
    });
  });
}

// Função auxiliar para abrir modal (deve ser implementada na página)
function exibirModalDetalhesSubBacia(subBacia) {
  // Exemplo: abrir modal com detalhes
  let modal = document.getElementById('modalDetalhesSubBacia');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modalDetalhesSubBacia';
    modal.className = 'modal-overlay active';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `
      <div class="modal-content" style="max-width:420px;">
        <button class="modal-close" aria-label="Fechar" onclick="this.closest('.modal-overlay').remove()">&times;</button>
        <h2 style="color:#0027BD;font-size:1.2rem;margin-bottom:12px;">Detalhes da Sub-bacia</h2>
        <div style="color:#222;font-size:1rem;">
          <b>Nome:</b> ${subBacia.nome}<br>
          <b>ID:</b> ${subBacia.id}<br>
          <b>Origem:</b> ${subBacia.origemId || '-'}<br>
          <b>Destino:</b> ${subBacia.destinoId || '-'}<br>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.onclick = function(e) { if (e.target === modal) modal.remove(); };
  }
}

// Exporta função global
window.renderizarUnifilar = renderizarUnifilar;
