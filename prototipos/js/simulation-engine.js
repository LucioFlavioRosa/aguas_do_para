// prototipos/js/simulation-engine.js
// Simula execução do modelo de priorização de investimentos (mock)

(function() {
  // Mock de dados de sub-bacias/componentes
  const subBacias = [
    { id: 1, nome: 'Sub-bacia A', unidade: 'Águas do Rio', sistema: 'Sistema 1', municipio: 'Rio de Janeiro', capex: 1000000, cobertura: 12000, vpl: 3500000 },
    { id: 2, nome: 'Sub-bacia B', unidade: 'Águas do Rio', sistema: 'Sistema 1', municipio: 'Rio de Janeiro', capex: 800000, cobertura: 9000, vpl: 2200000 },
    { id: 3, nome: 'Sub-bacia C', unidade: 'Águas do Pará', sistema: 'Sistema 2', municipio: 'Belém', capex: 1500000, cobertura: 18000, vpl: 4200000 },
    { id: 4, nome: 'Sub-bacia D', unidade: 'Águas do Pará', sistema: 'Sistema 2', municipio: 'Ananindeua', capex: 600000, cobertura: 7000, vpl: 1600000 },
    { id: 5, nome: 'Sub-bacia E', unidade: 'Corsan', sistema: 'Sistema 3', municipio: 'Porto Alegre', capex: 950000, cobertura: 11000, vpl: 2800000 }
  ];

  // Função principal de simulação
  function executarSimulacao(filtros, restricoes, objetivoVPL) {
    // 1. Aplica filtros
    let filtrados = subBacias.filter(sb => {
      let ok = true;
      if (filtros.unidade && sb.unidade !== filtros.unidade) ok = false;
      if (filtros.sistema && sb.sistema !== filtros.sistema) ok = false;
      if (filtros.municipio && sb.municipio !== filtros.municipio) ok = false;
      return ok;
    });
    // 2. Ordena por critério
    if (objetivoVPL === 'cobertura') {
      filtrados.sort((a, b) => b.cobertura - a.cobertura);
    } else {
      // VPL/CAPEX
      filtrados.sort((a, b) => (b.vpl/b.capex) - (a.vpl/a.capex));
    }
    // 3. Seleciona até atingir restrições
    let capexTotal = 0, coberturaTotal = 0, vplTotal = 0;
    let selecionadas = [];
    for (let sb of filtrados) {
      if (restricoes.capex && (capexTotal + sb.capex) > restricoes.capex) continue;
      if (restricoes.cobertura && (coberturaTotal + sb.cobertura) > restricoes.cobertura) continue;
      selecionadas.push(sb);
      capexTotal += sb.capex;
      coberturaTotal += sb.cobertura;
      vplTotal += sb.vpl;
    }
    // 4. Retorna resultado
    return {
      selecionadas: selecionadas,
      metricas: {
        capexTotal: capexTotal,
        coberturaTotal: coberturaTotal,
        vplTotal: vplTotal
      }
    };
  }

  // Exponibiliza no escopo global
  window.SimulationEngine = {
    executarSimulacao
  };
})();
