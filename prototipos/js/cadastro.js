'use strict';

// Requer SheetJS/xlsx.js e mermaid.js carregados na página

let subBaciasData = [];

// Função para ler arquivo Excel
function handleExcelUpload(evt) {
  const file = evt.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    const valid = validarExcel(json);
    if (!valid.ok) {
      showModal(valid.msg, 'erro');
      return;
    }
    subBaciasData = json;
    renderTabelaSubBacias();
    salvarLocalStorage();
    gerarUnifilar();
  };
  reader.readAsArrayBuffer(file);
}

// Validação do Excel
function validarExcel(json) {
  if (!Array.isArray(json) || json.length === 0) return { ok: false, msg: 'Arquivo Excel vazio.' };
  const obrigatorias = ['Sub-bacia', 'Origem', 'Destino', 'Cobertura', 'CAPEX', 'Extensão'];
  const colunas = Object.keys(json[0]);
  for (let col of obrigatorias) {
    if (!colunas.includes(col)) return { ok: false, msg: `Coluna obrigatória ausente: ${col}` };
  }
  for (let i = 0; i < json.length; i++) {
    if (!json[i]['Sub-bacia']) return { ok: false, msg: `Linha ${i+2}: Sub-bacia obrigatória.` };
    if (isNaN(Number(json[i]['Cobertura']))) return { ok: false, msg: `Linha ${i+2}: Cobertura inválida.` };
    if (isNaN(Number(json[i]['CAPEX']))) return { ok: false, msg: `Linha ${i+2}: CAPEX inválido.` };
    if (isNaN(Number(json[i]['Extensão']))) return { ok: false, msg: `Linha ${i+2}: Extensão inválida.` };
  }
  return { ok: true };
}

// Renderização da tabela
function renderTabelaSubBacias() {
  const tbody = document.getElementById('tabela-subbacias-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  subBaciasData.forEach((row, idx) => {
    const tr = document.createElement('tr');
    Object.keys(row).forEach(key => {
      const td = document.createElement('td');
      td.textContent = row[key];
      td.ondblclick = function() { editarCelula(td, idx, key); };
      tr.appendChild(td);
    });
    // Botão de exclusão
    const tdDel = document.createElement('td');
    const btnDel = document.createElement('button');
    btnDel.textContent = 'Excluir';
    btnDel.className = 'btn-excluir';
    btnDel.onclick = function() { excluirLinha(idx); };
    tdDel.appendChild(btnDel);
    tr.appendChild(tdDel);
    tbody.appendChild(tr);
  });
}

// Edição inline
function editarCelula(td, idx, key) {
  const valorAntigo = td.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = valorAntigo;
  input.onblur = function() {
    subBaciasData[idx][key] = input.value;
    td.textContent = input.value;
    salvarLocalStorage();
    gerarUnifilar();
  };
  input.onkeydown = function(e) { if (e.key === 'Enter') input.blur(); };
  td.textContent = '';
  td.appendChild(input);
  input.focus();
}

// Exclusão de linha
function excluirLinha(idx) {
  subBaciasData.splice(idx, 1);
  renderTabelaSubBacias();
  salvarLocalStorage();
  gerarUnifilar();
}

// Salvar no localStorage
function salvarLocalStorage() {
  localStorage.setItem('subbacias', JSON.stringify(subBaciasData));
}

// Carregar do localStorage ao abrir
function carregarLocalStorage() {
  const data = localStorage.getItem('subbacias');
  if (data) {
    subBaciasData = JSON.parse(data);
    renderTabelaSubBacias();
    gerarUnifilar();
  }
}

// Geração dinâmica do diagrama unifilar (Mermaid)
function gerarUnifilar() {
  const container = document.getElementById('mermaid-unifilar');
  if (!container) return;
  let mermaidStr = 'graph TD\n';
  subBaciasData.forEach(row => {
    if (row['Origem'] && row['Destino']) {
      mermaidStr += `    ${row['Origem']}-->${row['Destino']}\n`;
    }
  });
  container.innerHTML = `<pre class='mermaid'>${mermaidStr}</pre>`;
  if (window.mermaid) {
    window.mermaid.init(undefined, container);
  }
}

// Modal reutilizável
function showModal(message, type = 'erro') {
  const modal = document.createElement('div');
  modal.className = `custom-modal ${type}`;
  modal.innerHTML = `<div class="custom-modal-content"><span class="custom-modal-close" tabindex="0">&times;</span><p>${message}</p></div>`;
  document.body.appendChild(modal);
  modal.querySelector('.custom-modal-close').onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
  setTimeout(() => { if (document.body.contains(modal)) modal.remove(); }, 4000);
}

// Bind de eventos
window.addEventListener('DOMContentLoaded', function() {
  const inputExcel = document.getElementById('input-excel-subbacias');
  if (inputExcel) {
    inputExcel.addEventListener('change', handleExcelUpload);
  }
  carregarLocalStorage();
});

// Estilos básicos do modal (pode ser movido para CSS)
(function(){
  const style = document.createElement('style');
  style.innerHTML = `
    .custom-modal { position:fixed;z-index:9999;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center; }
    .custom-modal-content { background:#fff; padding:2rem 2.5rem; border-radius:8px; box-shadow:0 2px 24px rgba(0,0,0,0.18); position:relative; min-width:280px; max-width:90vw; }
    .custom-modal.sucesso .custom-modal-content { border-left:5px solid #0693e3; }
    .custom-modal.erro .custom-modal-content { border-left:5px solid #cf2e2e; }
    .custom-modal-close { position:absolute;top:8px;right:16px;font-size:1.5rem;cursor:pointer; }
    .btn-excluir { background:#cf2e2e; color:#fff; border:none; border-radius:4px; padding:0.2em 0.8em; cursor:pointer; }
    .btn-excluir:hover { background:#a61b1b; }
  `;
  document.head.appendChild(style);
})();
