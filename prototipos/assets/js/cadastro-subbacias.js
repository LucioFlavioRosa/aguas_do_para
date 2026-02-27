// Script para Cadastro de Sub-Bacias
// Requer: inclusão de input[type=file] para Excel, div#tabelaSubbacias, div#cascataUnifilar

// Utiliza SheetJS para parsing de Excel (https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js)
// Exemplo de inclusão no HTML: <script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"></script>

(function() {
  // Persistência temporária
  let subbaciasData = [];
  const STORAGE_KEY = 'subbaciasData';

  // Carregar do localStorage se existir
  if (window.localStorage && localStorage.getItem(STORAGE_KEY)) {
    try { subbaciasData = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch(e) { subbaciasData = []; }
  }

  // Seletores
  const inputFile = document.getElementById('inputExcelSubbacias');
  const tabelaDiv = document.getElementById('tabelaSubbacias');
  const cascataDiv = document.getElementById('cascataUnifilar');

  // Função: renderiza tabela editável
  function renderTabela() {
    if (!tabelaDiv) return;
    if (!subbaciasData.length) {
      tabelaDiv.innerHTML = '<p style="color:#888;">Nenhum dado carregado.</p>';
      return;
    }
    let html = '<table class="tabela-resultados"><thead><tr>';
    // Cabeçalho
    Object.keys(subbaciasData[0]).forEach(col => {
      html += `<th>${col}</th>`;
    });
    html += '<th>Ações</th></tr></thead><tbody>';
    // Linhas
    subbaciasData.forEach((row, idx) => {
      html += '<tr>';
      Object.keys(row).forEach(col => {
        html += `<td><input type="text" value="${row[col]}" data-idx="${idx}" data-col="${col}" class="input-editar-subbacia" style="width:100px;"></td>`;
      });
      html += `<td><button type="button" data-del="${idx}" aria-label="Remover linha">🗑️</button></td>`;
      html += '</tr>';
    });
    html += '</tbody></table>';
    tabelaDiv.innerHTML = html;
  }

  // Função: renderiza cascata unifilar simplificada
  function renderCascata() {
    if (!cascataDiv) return;
    if (!subbaciasData.length) {
      cascataDiv.innerHTML = '';
      return;
    }
    // Espera colunas: 'Sub-bacia', 'Destino' (ajuste conforme Excel)
    let nodes = {}, edges = [];
    subbaciasData.forEach(row => {
      const origem = row['Sub-bacia'] || row['Origem'] || row['sub-bacia'] || row['origem'];
      const destino = row['Destino'] || row['destino'];
      if (origem) nodes[origem] = true;
      if (destino) nodes[destino] = true;
      if (origem && destino) edges.push([origem, destino]);
    });
    // Gera ordem simplificada (não cíclica)
    let ordem = [], visitados = {};
    function dfs(no) {
      if (visitados[no]) return;
      visitados[no] = true;
      edges.filter(e => e[0] === no).forEach(e => dfs(e[1]));
      ordem.unshift(no);
    }
    // Encontra nós sem predecessores
    let comPredecessor = new Set(edges.map(e => e[1]));
    Object.keys(nodes).forEach(no => {
      if (!comPredecessor.has(no)) dfs(no);
    });
    if (!ordem.length) ordem = Object.keys(nodes);
    // Renderiza
    let html = '<div class="cascata-unifilar">';
    ordem.forEach((no, idx) => {
      html += `<div class="cascata-no">${no}</div>`;
      if (idx < ordem.length - 1) html += '<div class="cascata-linha"></div>';
    });
    html += '</div>';
    cascataDiv.innerHTML = html;
  }

  // Função: valida dados
  function validarDados() {
    let valido = true;
    subbaciasData.forEach((row, idx) => {
      if (!row['Sub-bacia'] && !row['Origem']) valido = false;
      if (!row['Destino']) valido = false;
      // Adicione validações de tipos/campos obrigatórios conforme necessário
    });
    return valido;
  }

  // Função: salvar no localStorage
  function persistir() {
    if (window.localStorage) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subbaciasData));
    }
  }

  // Eventos de edição
  if (tabelaDiv) {
    tabelaDiv.addEventListener('input', function(e) {
      if (e.target.classList.contains('input-editar-subbacia')) {
        const idx = +e.target.getAttribute('data-idx');
        const col = e.target.getAttribute('data-col');
        subbaciasData[idx][col] = e.target.value;
        persistir();
        renderCascata();
      }
    });
    tabelaDiv.addEventListener('click', function(e) {
      if (e.target.tagName === 'BUTTON' && e.target.hasAttribute('data-del')) {
        const idx = +e.target.getAttribute('data-del');
        subbaciasData.splice(idx, 1);
        persistir();
        renderTabela();
        renderCascata();
      }
    });
  }

  // Evento de leitura do Excel
  if (inputFile) {
    inputFile.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(evt) {
        const data = evt.target.result;
        const workbook = XLSX.read(data, {type: 'binary'});
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet);
        subbaciasData = json;
        persistir();
        renderTabela();
        renderCascata();
      };
      reader.readAsBinaryString(file);
    });
  }

  // Inicialização
  renderTabela();
  renderCascata();

  // Expor para debug
  window._subbaciasData = subbaciasData;
})();
