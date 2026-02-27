// prototipos/js/table-interactions.js
// Gerencia interações de tabela: ordenação, filtro, edição inline, seleção múltipla, paginação

(function() {
  // Utilitário para ordenar tabela
  function sortTable(table, col, asc = true) {
    const tbody = table.tBodies[0];
    Array.from(tbody.querySelectorAll('tr'))
      .sort((a, b) => {
        let aText = a.children[col].innerText.trim();
        let bText = b.children[col].innerText.trim();
        // Tenta converter para número
        let aNum = parseFloat(aText.replace(/\./g, '').replace(',', '.'));
        let bNum = parseFloat(bText.replace(/\./g, '').replace(',', '.'));
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return asc ? aNum - bNum : bNum - aNum;
        }
        return asc ? aText.localeCompare(bText) : bText.localeCompare(aText);
      })
      .forEach(tr => tbody.appendChild(tr));
  }

  // Adiciona event listeners para ordenação de colunas
  document.querySelectorAll('table.sortable thead th').forEach((th, idx) => {
    let asc = true;
    th.style.cursor = 'pointer';
    th.addEventListener('click', function() {
      const table = th.closest('table');
      sortTable(table, idx, asc);
      asc = !asc;
    });
  });

  // Filtro de busca
  document.querySelectorAll('[data-table-filter]').forEach(input => {
    const tableId = input.getAttribute('data-table-filter');
    const table = document.getElementById(tableId);
    input.addEventListener('input', function() {
      const val = input.value.toLowerCase();
      table.querySelectorAll('tbody tr').forEach(tr => {
        tr.style.display = Array.from(tr.children).some(td =>
          td.innerText.toLowerCase().includes(val)
        ) ? '' : 'none';
      });
    });
  });

  // Edição inline de células
  document.querySelectorAll('table.editable td[data-editable="true"]').forEach(td => {
    td.addEventListener('click', function(e) {
      if (td.querySelector('input')) return;
      const oldValue = td.innerText;
      const input = document.createElement('input');
      input.type = 'text';
      input.value = oldValue;
      input.style.width = '100%';
      td.innerText = '';
      td.appendChild(input);
      input.focus();
      input.addEventListener('blur', function() {
        td.innerText = input.value;
        td.setAttribute('data-value', input.value);
      });
      input.addEventListener('keydown', function(ev) {
        if (ev.key === 'Enter') {
          input.blur();
        } else if (ev.key === 'Escape') {
          td.innerText = oldValue;
        }
      });
    });
  });

  // Seleção múltipla via checkboxes
  document.querySelectorAll('table.selectable').forEach(table => {
    const checkboxes = table.querySelectorAll('input[type=checkbox][data-select-group]');
    checkboxes.forEach(cb => {
      cb.addEventListener('change', function() {
        cb.closest('tr').classList.toggle('selected', cb.checked);
        // Limite de seleção (exemplo: 5)
        const max = parseInt(table.getAttribute('data-max-select')) || 5;
        const checked = Array.from(checkboxes).filter(x => x.checked);
        checkboxes.forEach(box => {
          if (!box.checked && checked.length >= max) {
            box.disabled = true;
          } else {
            box.disabled = false;
          }
        });
      });
    });
  });

  // Paginação de tabelas longas
  document.querySelectorAll('table.paginated').forEach(table => {
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    const pageSize = parseInt(table.getAttribute('data-page-size')) || 10;
    let currentPage = 1;
    const totalPages = Math.ceil(rows.length / pageSize);
    function renderPage(page) {
      rows.forEach((tr, idx) => {
        tr.style.display = (idx >= (page-1)*pageSize && idx < page*pageSize) ? '' : 'none';
      });
      if (table.nextElementSibling && table.nextElementSibling.classList.contains('pagination-controls')) {
        table.nextElementSibling.querySelector('.page-info').innerText = `Página ${page} de ${totalPages}`;
      }
    }
    // Cria controles de paginação
    const controls = document.createElement('div');
    controls.className = 'pagination-controls';
    controls.innerHTML = `
      <button type="button" class="prev-page">&lt;</button>
      <span class="page-info">Página 1 de ${totalPages}</span>
      <button type="button" class="next-page">&gt;</button>
    `;
    table.after(controls);
    controls.querySelector('.prev-page').onclick = function() {
      if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
      }
    };
    controls.querySelector('.next-page').onclick = function() {
      if (currentPage < totalPages) {
        currentPage++;
        renderPage(currentPage);
      }
    };
    renderPage(1);
  });
})();
