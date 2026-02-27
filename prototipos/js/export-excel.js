// export-excel.js
// Simula exportação de dados para Excel (CSV)

/**
 * Exporta um array de objetos para arquivo CSV (Excel)
 * @param {Array<Object>} dados - dados a exportar
 * @param {string} nomeArquivo - nome do arquivo (sem extensão)
 */
function exportarParaExcel(dados, nomeArquivo) {
  if (!Array.isArray(dados) || !dados.length) {
    alert('Nenhum dado para exportar.');
    return;
  }
  const colunas = Object.keys(dados[0]);
  const csv = [
    colunas.join(','),
    ...dados.map(obj => colunas.map(c => {
      let v = obj[c] !== undefined && obj[c] !== null ? String(obj[c]) : '';
      // Escapa aspas e vírgulas
      if (v.includes('"')) v = v.replace(/"/g, '""');
      if (v.includes(',') || v.includes('\n')) v = '"' + v + '"';
      return v;
    }).join(','))
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nomeArquivo.replace(/[^a-zA-Z0-9_-]/g, '_') + '.csv';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

// Exporta função global
window.exportarParaExcel = exportarParaExcel;
