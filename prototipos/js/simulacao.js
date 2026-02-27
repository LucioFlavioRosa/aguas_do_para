// prototipos/js/simulacao.js

document.addEventListener('DOMContentLoaded', function () {
  const simularBtn = document.getElementById('btn-simular');
  const resultadoArea = document.getElementById('area-resultado-simulacao');
  if (!simularBtn || !resultadoArea) return;

  simularBtn.addEventListener('click', function (e) {
    e.preventDefault();
    // Coleta dos filtros e restrições
    const unidade = document.getElementById('filtro-unidade')?.value || 'Águas do Rio';
    const ano = document.getElementById('filtro-ano')?.value || '2026';
    const capex = document.getElementById('restricao-capex')?.value || '30.000.000';
    const cobertura = document.getElementById('restricao-cobertura')?.value || '40-50%';
    const extensao = document.getElementById('restricao-extensao')?.value || '10 km';

    // Feedback visual de processamento
    resultadoArea.innerHTML = '<div class="simulacao-loading">Simulando otimização, aguarde...</div>';
    resultadoArea.classList.add('simulacao-processando');

    setTimeout(function () {
      resultadoArea.classList.remove('simulacao-processando');
      // Resultados fictícios coerentes com os inputs
      resultadoArea.innerHTML = `
        <h3>Resultados da Simulação</h3>
        <ul>
          <li><strong>Unidade:</strong> ${unidade}</li>
          <li><strong>Ano:</strong> ${ano}</li>
          <li><strong>CapEx disponível:</strong> R$ ${capex}</li>
          <li><strong>Meta de cobertura:</strong> ${cobertura}</li>
          <li><strong>Extensão máxima de rede:</strong> ${extensao}</li>
        </ul>
        <div class="resumo-simulacao">
          <p><strong>VPL estimado:</strong> R$ ${(Math.random() * 100 + 30).toFixed(2)} milhões</p>
          <p><strong>Número de sub-bacias priorizadas:</strong> 5</p>
          <p><strong>Incremento de cobertura:</strong> ${(Math.random() * 12 + 38).toFixed(1)}%</p>
        </div>
        <a href="resultados-detalhados.html" class="elementor-button elementor-button-link elementor-size-sm" id="btn-detalhar-resultado">
          <span class="elementor-button-content-wrapper">
            <span class="elementor-button-text">Ver Detalhamento</span>
          </span>
        </a>
      `;
    }, 1800);
  });
});
