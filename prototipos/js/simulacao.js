"use strict";

document.addEventListener('DOMContentLoaded', function () {
  const simularBtn = document.getElementById('btn-simular');
  const resultadosDiv = document.getElementById('area-resultados');
  if (!simularBtn || !resultadosDiv) return;

  simularBtn.addEventListener('click', function (e) {
    e.preventDefault();
    // Coleta dos filtros e restrições
    const unidade = document.getElementById('filtro-unidade')?.value || 'Águas do Rio';
    const ano = document.getElementById('filtro-ano')?.value || '2026';
    const capex = document.getElementById('restricao-capex')?.value || '30.000.000';
    const cobertura = document.getElementById('restricao-cobertura')?.value || '40-60%';
    const extensao = document.getElementById('restricao-extensao')?.value || '15 km';

    resultadosDiv.innerHTML = '<div class="simulacao-loading" style="padding:2rem;text-align:center"><span class="loader"></span> Processando simulação...</div>';
    
    setTimeout(function () {
      // Resultados fictícios coerentes com os inputs
      resultadosDiv.innerHTML = `
        <section class="simulacao-resultado">
          <h2>Resultado da Simulação</h2>
          <ul>
            <li><strong>Unidade:</strong> ${unidade}</li>
            <li><strong>Ano:</strong> ${ano}</li>
            <li><strong>Capex disponível:</strong> R$ ${capex}</li>
            <li><strong>Meta de cobertura:</strong> ${cobertura}</li>
            <li><strong>Extensão máxima de rede:</strong> ${extensao}</li>
          </ul>
          <div class="resumo-vpl">
            <h3>Resumo Financeiro</h3>
            <p><strong>VPL Faturamento:</strong> R$ ${(parseInt(capex.replace(/\D/g, '')) * 2.3).toLocaleString('pt-BR')}</p>
            <p><strong>VPL Arrecadação:</strong> R$ ${(parseInt(capex.replace(/\D/g, '')) * 1.9).toLocaleString('pt-BR')}</p>
          </div>
          <div class="acoes">
            <a href="resultados-detalhados.html" class="elementor-button elementor-button-link elementor-size-sm">Ver Detalhamento</a>
          </div>
        </section>
      `;
    }, 1800);
  });
});
