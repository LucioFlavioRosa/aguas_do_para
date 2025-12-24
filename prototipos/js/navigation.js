// navigation.js - MVP Águas do Pará
// Funções de navegação entre etapas do fluxo, com breadcrumb visual

// Mapeamento das etapas do fluxo principal
const FLOW_STEPS = [
  { key: 'cadastro', label: 'Etapa 1: Cadastro' },
  { key: 'despacho', label: 'Etapa 2: Despacho' },
  { key: 'execucao', label: 'Etapa 3: Execução' },
  { key: 'auditoria', label: 'Etapa 4: Auditoria' }
];

// Salva o estado atual antes de redirecionar
function goToStep(stepKey, extraState = {}) {
  const state = {
    step: stepKey,
    ...extraState
  };
  localStorage.setItem('mvp_flow_state', JSON.stringify(state));
  // Simulação de navegação (ajuste os caminhos conforme o protótipo)
  switch (stepKey) {
    case 'cadastro':
      window.location.href = 'cadastro.html';
      break;
    case 'despacho':
      window.location.href = 'despacho.html';
      break;
    case 'execucao':
      window.location.href = 'execucao.html';
      break;
    case 'auditoria':
      window.location.href = 'auditoria.html';
      break;
    default:
      window.location.href = 'index.html';
  }
}

// Renderiza o breadcrumb visual no topo das páginas de dashboard
function renderBreadcrumb(currentStepKey) {
  const container = document.getElementById('breadcrumb-flow');
  if (!container) return;
  container.innerHTML = '';
  FLOW_STEPS.forEach((step, idx) => {
    const stepDiv = document.createElement('div');
    stepDiv.className = 'breadcrumb-step' + (step.key === currentStepKey ? ' active' : '') + (idx < FLOW_STEPS.length - 1 ? ' with-arrow' : '');
    stepDiv.innerText = step.label;
    container.appendChild(stepDiv);
    if (idx < FLOW_STEPS.length - 1) {
      const arrow = document.createElement('span');
      arrow.className = 'breadcrumb-arrow';
      arrow.innerHTML = '&rarr;';
      container.appendChild(arrow);
    }
  });
}

// Exemplo de uso (coloque no onload das páginas de dashboard):
// renderBreadcrumb('despacho');

// CSS mínimo para breadcrumb (pode ser movido para o CSS global do protótipo)
(function injectBreadcrumbStyle() {
  const style = document.createElement('style');
  style.innerHTML = `
    #breadcrumb-flow {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1rem;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }
    .breadcrumb-step {
      padding: 6px 16px;
      border-radius: 20px;
      background: #f5f7fb;
      color: #0027BD;
      font-weight: 500;
      border: 1px solid #e2e5f0;
      transition: background 0.2s, color 0.2s;
    }
    .breadcrumb-step.active {
      background: #0027BD;
      color: #fff;
    }
    .breadcrumb-arrow {
      color: #0027BD;
      font-size: 1.2em;
      margin: 0 4px;
    }
  `;
  document.head.appendChild(style);
})();

// Export para uso em módulos
window.goToStep = goToStep;
window.renderBreadcrumb = renderBreadcrumb;
