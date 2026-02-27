// Simulação do motor de otimização para protótipo Aegea
// Função principal: executarSimulacao()

function executarSimulacao() {
  // Captura dos filtros da tela de simulação
  const unidade = document.getElementById('filtro-unidade') ? document.getElementById('filtro-unidade').value : '';
  const municipio = document.getElementById('filtro-municipio') ? document.getElementById('filtro-municipio').value : '';
  const capex = parseFloat(document.getElementById('filtro-capex') ? document.getElementById('filtro-capex').value : '0');
  const metaCobertura = parseFloat(document.getElementById('filtro-meta-cobertura') ? document.getElementById('filtro-meta-cobertura').value : '0');

  // Validação básica
  const erros = [];
  if (isNaN(capex) || capex < 0) erros.push('O orçamento CAPEX deve ser um valor positivo.');
  if (isNaN(metaCobertura) || metaCobertura < 0 || metaCobertura > 100) erros.push('A meta de cobertura deve estar entre 0 e 100%.');
  if (!unidade) erros.push('Selecione uma unidade de negócio.');
  if (!municipio) erros.push('Selecione um município.');

  if (erros.length > 0) {
    alert(erros.join('\n'));
    return;
  }

  // Lógica simulada: resultados hardcoded
  const resultados = {
    filtros: {
      unidade,
      municipio,
      capex,
      metaCobertura
    },
    cenarios: [
      {
        nome: 'Maximização do VPL - Faturamento',
        vpl: 12500000,
        cobertura: 87,
        obrasPriorizadas: [
          { nome: 'Rede Coletora Setor Norte', custo: 3200000, ano: 2025 },
          { nome: 'ETE Indaiatuba Expansão', custo: 4800000, ano: 2026 },
          { nome: 'Interligação Sub-bacia 3', custo: 2100000, ano: 2027 }
        ]
      },
      {
        nome: 'Maximização do VPL - Arrecadação',
        vpl: 9900000,
        cobertura: 80,
        obrasPriorizadas: [
          { nome: 'Rede Coletora Setor Norte', custo: 3200000, ano: 2025 },
          { nome: 'ETE Indaiatuba Expansão', custo: 4800000, ano: 2026 }
        ]
      }
    ]
  };

  // Salva os resultados simulados no sessionStorage para leitura na tela de resultados
  sessionStorage.setItem('resultadosSimulacao', JSON.stringify(resultados));

  // Redireciona para a tela de resultados
  window.location.href = 'resultados-simulacao.html';
}

// Função utilitária para carregar resultados na tela de resultados
function carregarResultadosSimulacao() {
  const dados = sessionStorage.getItem('resultadosSimulacao');
  if (!dados) return;
  const resultados = JSON.parse(dados);
  // Aqui, o frontend da página resultados-simulacao.html deve consumir este objeto e renderizar os dados
}
