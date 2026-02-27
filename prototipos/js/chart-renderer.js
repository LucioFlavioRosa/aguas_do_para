// chart-renderer.js
// Renderização de gráficos simples (barras verticais, horizontais e pizza) usando apenas HTML/CSS

/**
 * Renderiza um gráfico de barras verticais dentro de um container
 * @param {string} containerId - id do elemento container
 * @param {Array<number>} dados - valores numéricos
 * @param {Array<string>} labels - rótulos das barras
 * @param {Object} [opcoes] - opções de estilo
 */
function renderizarBarraVertical(containerId, dados, labels, opcoes = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const max = Math.max(...dados, 1);
  container.innerHTML = `
    <div class="chart-bar-vertical" style="display:flex;align-items:flex-end;gap:16px;height:220px;padding:24px 0;">
      ${dados.map((valor, i) => `
        <div style="display:flex;flex-direction:column;align-items:center;flex:1;">
          <div style="height:${(valor / max) * 140}px;width:32px;background:#0027BD;border-radius:8px 8px 0 0;box-shadow:0 2px 8px rgba(0,39,189,0.10);margin-bottom:8px;transition:height .3s;display:flex;align-items:flex-end;justify-content:center;">
            <span style="font-size:0.95rem;color:#222;font-weight:600;position:relative;top:-24px;">${valor}</span>
          </div>
          <span style="font-size:0.98rem;color:#666;text-align:center;">${labels[i]}</span>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Renderiza um gráfico de barras horizontais dentro de um container
 * @param {string} containerId - id do elemento container
 * @param {Array<number>} dados - valores numéricos
 * @param {Array<string>} labels - rótulos das barras
 * @param {Object} [opcoes] - opções de estilo
 */
function renderizarBarraHorizontal(containerId, dados, labels, opcoes = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const max = Math.max(...dados, 1);
  container.innerHTML = `
    <div class="chart-bar-horizontal" style="display:flex;flex-direction:column;gap:18px;padding:16px 0;">
      ${dados.map((valor, i) => `
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="min-width:90px;font-size:0.98rem;color:#666;">${labels[i]}</span>
          <div style="height:26px;flex:1;background:#eaf2ff;border-radius:8px;position:relative;">
            <div style="height:100%;width:${(valor / max) * 100}%;background:#0027BD;border-radius:8px;box-shadow:0 1px 6px rgba(0,39,189,0.08);display:flex;align-items:center;justify-content:flex-end;padding-right:8px;font-weight:600;color:#fff;transition:width .3s;">
              ${valor}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Renderiza um gráfico de pizza (conic-gradient) dentro de um container
 * @param {string} containerId - id do elemento container
 * @param {Array<number>} dados - valores numéricos
 * @param {Array<string>} labels - rótulos
 * @param {Array<string>} cores - cores para cada fatia
 */
function renderizarPizza(containerId, dados, labels, cores) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const total = dados.reduce((a, b) => a + b, 0) || 1;
  let angulos = dados.map(v => (v / total) * 360);
  let grad = [];
  let atual = 0;
  for (let i = 0; i < angulos.length; i++) {
    grad.push(`${cores[i % cores.length]} ${atual}deg ${(atual + angulos[i])}deg`);
    atual += angulos[i];
  }
  container.innerHTML = `
    <div style="display:flex;align-items:center;gap:32px;">
      <div style="width:160px;height:160px;border-radius:50%;background:conic-gradient(${grad.join(',')});box-shadow:0 2px 16px rgba(0,39,189,0.08);position:relative;">
        <span style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:1.2rem;color:#0027BD;font-weight:700;">${total}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${labels.map((l, i) => `
          <span style="display:flex;align-items:center;gap:8px;font-size:0.98rem;color:#444;">
            <span style="display:inline-block;width:16px;height:16px;border-radius:4px;background:${cores[i % cores.length]};"></span>
            ${l}: <b style="color:#0027BD;margin-left:4px;">${dados[i]}</b>
          </span>
        `).join('')}
      </div>
    </div>
  `;
}

// Exporta as funções globais
window.renderizarBarraVertical = renderizarBarraVertical;
window.renderizarBarraHorizontal = renderizarBarraHorizontal;
window.renderizarPizza = renderizarPizza;
