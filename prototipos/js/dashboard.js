// dashboard.js - MVP Águas do Pará
const prestadoresMock = [
  { id: 1, nome: "João Silva", endereco: "Rua das Flores, 123 - Belém", veiculo: "Moto", servicos: ["Reparo de vazamentos de água", "Desobstrução de esgoto"], totalServicos: 21 },
  { id: 2, nome: "Maria Oliveira", endereco: "Av. Brasil, 456 - Marabá", veiculo: "Carro", servicos: ["Instalação/Troca de hidrômetros", "Pequenos reparos"], totalServicos: 17 },
  { id: 3, nome: "Pedro Souza", endereco: "Rua Pará, 789 - Santarém", veiculo: "Moto", servicos: ["Reparo de vazamentos de água"], totalServicos: 8 },
  { id: 4, nome: "Ana Costa", endereco: "Trav. Tucuruí, 55 - Tucuruí", veiculo: "Carro", servicos: ["Desobstrução de esgoto", "Outros"], totalServicos: 12 },
  { id: 5, nome: "Carlos Mendes", endereco: "Rua do Sol, 200 - Altamira", veiculo: "Moto", servicos: ["Pequenos reparos"], totalServicos: 5 },
  { id: 6, nome: "Fernanda Lima", endereco: "Av. Independência, 1000 - Parauapebas", veiculo: "Carro", servicos: ["Reparo de vazamentos de água", "Instalação/Troca de hidrômetros"], totalServicos: 23 },
  { id: 7, nome: "Lucas Rocha", endereco: "Rua das Palmeiras, 321 - Castanhal", veiculo: "Moto", servicos: ["Desobstrução de esgoto"], totalServicos: 9 },
  { id: 8, nome: "Juliana Ramos", endereco: "Rua Amazonas, 87 - Abaetetuba", veiculo: "Carro", servicos: ["Outros", "Pequenos reparos"], totalServicos: 14 },
  { id: 9, nome: "Ricardo Nunes", endereco: "Av. Tapajós, 777 - Itaituba", veiculo: "Moto", servicos: ["Reparo de vazamentos de água"], totalServicos: 6 },
  { id: 10, nome: "Patrícia Dias", endereco: "Rua das Acácias, 12 - Redenção", veiculo: "Carro", servicos: ["Instalação/Troca de hidrômetros"], totalServicos: 11 },
  { id: 11, nome: "Fábio Teixeira", endereco: "Rua do Comércio, 300 - Bragança", veiculo: "Moto", servicos: ["Desobstrução de esgoto", "Pequenos reparos"], totalServicos: 15 },
  { id: 12, nome: "Marina Souza", endereco: "Av. Pará, 100 - Cametá", veiculo: "Carro", servicos: ["Reparo de vazamentos de água", "Outros"], totalServicos: 19 },
  { id: 13, nome: "Eduardo Lima", endereco: "Rua das Mangueiras, 88 - Barcarena", veiculo: "Moto", servicos: ["Pequenos reparos"], totalServicos: 7 },
  { id: 14, nome: "Bianca Freitas", endereco: "Av. João Paulo, 900 - Capanema", veiculo: "Carro", servicos: ["Instalação/Troca de hidrômetros", "Desobstrução de esgoto"], totalServicos: 16 },
  { id: 15, nome: "Rafael Gomes", endereco: "Rua das Laranjeiras, 45 - Paragominas", veiculo: "Moto", servicos: ["Reparo de vazamentos de água", "Pequenos reparos"], totalServicos: 13 },
  { id: 16, nome: "Letícia Pires", endereco: "Rua do Porto, 500 - Óbidos", veiculo: "Carro", servicos: ["Outros"], totalServicos: 4 },
  { id: 17, nome: "André Barbosa", endereco: "Av. Nazaré, 222 - Belém", veiculo: "Moto", servicos: ["Desobstrução de esgoto"], totalServicos: 10 },
  { id: 18, nome: "Camila Martins", endereco: "Rua do Mercado, 77 - Breves", veiculo: "Carro", servicos: ["Reparo de vazamentos de água", "Instalação/Troca de hidrômetros"], totalServicos: 18 },
  { id: 19, nome: "Vinícius Lopes", endereco: "Rua das Pedras, 33 - Tucumã", veiculo: "Moto", servicos: ["Pequenos reparos", "Outros"], totalServicos: 9 },
  { id: 20, nome: "Priscila Souza", endereco: "Av. Central, 101 - Moju", veiculo: "Carro", servicos: ["Instalação/Troca de hidrômetros"], totalServicos: 8 }
];

const tbody = document.getElementById('tbody-prestadores');
const selectServico = document.getElementById('tipo-servico');
const btnDisparar = document.getElementById('btn-disparar');
const formPrestadores = document.getElementById('form-prestadores');

let prestadoresFiltrados = [...prestadoresMock];
let selecionados = [];

function renderTabela() {
  tbody.innerHTML = '';
  prestadoresFiltrados.forEach((p, idx) => {
    const checked = selecionados.includes(p.id) ? 'checked' : '';
    const tr = document.createElement('tr');
    if (selecionados.includes(p.id)) tr.classList.add('selected');
    tr.innerHTML = `
      <td><input type="checkbox" name="selecionar" value="${p.id}" ${checked} aria-label="Selecionar prestador ${p.nome}" /></td>
      <td>${p.nome}</td>
      <td>${p.endereco}</td>
      <td>${p.veiculo}</td>
      <td>${p.totalServicos}</td>
    `;
    tbody.appendChild(tr);
  });
}

function filtrarPrestadores() {
  const tipo = selectServico.value;
  if (!tipo) {
    prestadoresFiltrados = [...prestadoresMock];
  } else {
    prestadoresFiltrados = prestadoresMock.filter(p => p.servicos.includes(tipo));
  }
  selecionados = selecionados.filter(id => prestadoresFiltrados.some(p => p.id === id));
  renderTabela();
  atualizarBotao();
}

function atualizarBotao() {
  btnDisparar.disabled = selecionados.length === 0 || selecionados.length > 5;
}

selectServico.addEventListener('change', filtrarPrestadores);

tbody.addEventListener('change', function(e) {
  if (e.target.name === 'selecionar') {
    const id = parseInt(e.target.value);
    if (e.target.checked) {
      if (selecionados.length < 5) {
        selecionados.push(id);
      } else {
        e.target.checked = false;
        alert('Você pode selecionar no máximo 5 prestadores.');
      }
    } else {
      selecionados = selecionados.filter(sel => sel !== id);
    }
    renderTabela();
    atualizarBotao();
  }
});

formPrestadores.addEventListener('submit', function(e) {
  e.preventDefault();
  if (selecionados.length === 0 || selecionados.length > 5) return;
  // Simular dados da demanda
  const demanda = {
    tipoServico: selectServico.value || 'Todos',
    localizacao: 'Rua Exemplo, 100 - Belém',
    dataHora: new Date().toLocaleString('pt-BR')
  };
  const prestadoresSelecionados = prestadoresMock.filter(p => selecionados.includes(p.id));
  localStorage.setItem('demanda', JSON.stringify(demanda));
  localStorage.setItem('prestadoresSelecionados', JSON.stringify(prestadoresSelecionados));
  window.location.href = 'confirmacao-disparo.html';
});

// Inicialização
renderTabela();
atualizarBotao();
