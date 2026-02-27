"use strict";

// Seletores dos campos do formulário de simulação
const form = document.getElementById('form-simulacao');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Captura dos valores
    const unidade = form.unidade?.value?.trim();
    const bloco = form.bloco?.value?.trim();
    const municipio = form.municipio?.value?.trim();
    const sistema = form.sistema?.value?.trim();
    const capexMin = parseFloat(form.capex_min?.value);
    const capexMax = parseFloat(form.capex_max?.value);
    const coberturaMin = parseFloat(form.cobertura_min?.value);
    const coberturaMax = parseFloat(form.cobertura_max?.value);
    const extensaoMin = parseFloat(form.extensao_min?.value);
    const extensaoMax = parseFloat(form.extensao_max?.value);
    
    // Validação básica
    let erros = [];
    if (!unidade) erros.push('Unidade é obrigatória.');
    if (!municipio) erros.push('Município é obrigatório.');
    if (isNaN(capexMin) || isNaN(capexMax) || capexMin > capexMax) erros.push('Intervalo de CAPEX inválido.');
    if (isNaN(coberturaMin) || isNaN(coberturaMax) || coberturaMin > coberturaMax) erros.push('Intervalo de Cobertura inválido.');
    if (isNaN(extensaoMin) || isNaN(extensaoMax) || extensaoMin > extensaoMax) erros.push('Intervalo de Extensão inválido.');
    
    if (erros.length > 0) {
      alert('Corrija os seguintes erros:\n' + erros.join('\n'));
      return;
    }

    // Simulação MOCKADA dos resultados
    // Gera métricas totalizadoras e detalhamento por sub-bacia
    const simulacao = {
      filtros: {
        unidade, bloco, municipio, sistema,
        capexMin, capexMax, coberturaMin, coberturaMax, extensaoMin, extensaoMax
      },
      metricas: {
        vpl_faturamento: Math.round(Math.random() * 100000000 + 50000000),
        vpl_arrecadacao: Math.round(Math.random() * 90000000 + 40000000),
        capex_total: Math.round(Math.random() * 40000000 + 20000000),
        cobertura_total: Math.round(Math.random() * 40 + 50),
        extensao_total: Math.round(Math.random() * 80 + 120)
      },
      detalhamento: [
        {
          subbacia: "SB05",
          componente: "Rede Coletora",
          capex: 8000000,
          cobertura: 12,
          extensao: 25,
          vpl_faturamento: 18000000,
          vpl_arrecadacao: 15000000
        },
        {
          subbacia: "SB02",
          componente: "Elevatória",
          capex: 6000000,
          cobertura: 8,
          extensao: 20,
          vpl_faturamento: 12000000,
          vpl_arrecadacao: 10000000
        },
        {
          subbacia: "SB01",
          componente: "ETE",
          capex: 12000000,
          cobertura: 15,
          extensao: 30,
          vpl_faturamento: 22000000,
          vpl_arrecadacao: 18000000
        },
        {
          subbacia: "SB03",
          componente: "Rede Coletora",
          capex: 7000000,
          cobertura: 10,
          extensao: 22,
          vpl_faturamento: 16000000,
          vpl_arrecadacao: 13000000
        }
      ],
      timestamp: new Date().toISOString()
    };

    // Salva no sessionStorage
    sessionStorage.setItem('simulacao_resultado', JSON.stringify(simulacao));

    // Redireciona para a página de resultados
    window.location.href = 'resultados-simulacao.html';
  });
}
