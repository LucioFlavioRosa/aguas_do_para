/* Dados mockados para protótipo de priorização de investimentos SES */

// Lista de Sub-bacias
const mockSubbacias = [
  {
    id: 1,
    nome: "Sub-bacia A1",
    municipio: "Belém",
    sistema: "Sistema Norte",
    origem: "A0",
    destino: "A2",
    cobertura: 35,
    extensao: 12.5,
    ligacoes: 3200,
    faturamento: 1800,
    arrecadacao: 1600
  },
  {
    id: 2,
    nome: "Sub-bacia A2",
    municipio: "Belém",
    sistema: "Sistema Norte",
    origem: "A1",
    destino: "ETE Norte",
    cobertura: 42,
    extensao: 8.7,
    ligacoes: 2100,
    faturamento: 1200,
    arrecadacao: 1100
  },
  {
    id: 3,
    nome: "Sub-bacia B1",
    municipio: "Ananindeua",
    sistema: "Sistema Sul",
    origem: "B0",
    destino: "B2",
    cobertura: 28,
    extensao: 10.2,
    ligacoes: 1800,
    faturamento: 950,
    arrecadacao: 890
  },
  {
    id: 4,
    nome: "Sub-bacia B2",
    municipio: "Ananindeua",
    sistema: "Sistema Sul",
    origem: "B1",
    destino: "ETE Sul",
    cobertura: 38,
    extensao: 7.1,
    ligacoes: 1200,
    faturamento: 700,
    arrecadacao: 650
  }
];

// Lista de Componentes
const mockComponentes = [
  { id: 1, tipo: "Rede Coletora", preco_capex: 120, preco_opex: 8, unidade: "km" },
  { id: 2, tipo: "Ligação", preco_capex: 1.2, preco_opex: 0.1, unidade: "unidade" },
  { id: 3, tipo: "Estação Elevatória", preco_capex: 350, preco_opex: 20, unidade: "unidade" },
  { id: 4, tipo: "Linha de Recalque", preco_capex: 200, preco_opex: 12, unidade: "km" },
  { id: 5, tipo: "Coletor Tronco", preco_capex: 250, preco_opex: 15, unidade: "km" },
  { id: 6, tipo: "ETE", preco_capex: 900, preco_opex: 60, unidade: "unidade" }
];

// Lista de Sistemas e ETEs
const mockSistemas = [
  { id: 1, nome: "Sistema Norte", ete: "ETE Norte", capacidade: 120, vazao_atual: 80 },
  { id: 2, nome: "Sistema Sul", ete: "ETE Sul", capacidade: 100, vazao_atual: 70 }
];

// Resultados de simulações pré-calculados
const mockResultadosSimulacoes = [
  {
    id: 1,
    nome: "Cenário Base",
    data: "12/06/2026",
    vpl: 8500,
    capex: 4200,
    cobertura: 38,
    extensao: 30.5,
    ligacoes: 8300,
    faturamento: 4650,
    arrecadacao: 4300
  },
  {
    id: 2,
    nome: "Expansão Moderada",
    data: "13/06/2026",
    vpl: 9900,
    capex: 5100,
    cobertura: 45,
    extensao: 38.0,
    ligacoes: 10400,
    faturamento: 5700,
    arrecadacao: 5200
  },
  {
    id: 3,
    nome: "Máxima Cobertura",
    data: "14/06/2026",
    vpl: 11000,
    capex: 6200,
    cobertura: 52,
    extensao: 45.2,
    ligacoes: 12300,
    faturamento: 6700,
    arrecadacao: 6100
  },
  {
    id: 4,
    nome: "Cenário Restritivo",
    data: "15/06/2026",
    vpl: 7800,
    capex: 3900,
    cobertura: 34,
    extensao: 27.0,
    ligacoes: 7100,
    faturamento: 4100,
    arrecadacao: 3900
  }
];
