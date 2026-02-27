// prototipos/js/modal-manager.js
// Gerencia abertura/fechamento de modais reutilizando estrutura do template

(function() {
  function abrirModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.add('active');
      modal.style.display = 'flex';
      modal.setAttribute('tabindex', '-1');
      modal.focus();
    }
  }

  function fecharModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('active');
      modal.style.display = 'none';
    }
  }

  // Fecha modal ao clicar fora do conteúdo
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('mousedown', function(e) {
      if (e.target === modal) fecharModal(modal.id);
    });
  });

  // Fecha modal ao pressionar ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => fecharModal(modal.id));
    }
  });

  // Botões de fechar
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', function() {
      const modal = btn.closest('.modal-overlay');
      if (modal) fecharModal(modal.id);
    });
  });

  // Exponibiliza no escopo global
  window.ModalManager = {
    abrir: abrirModal,
    fechar: fecharModal
  };
})();
