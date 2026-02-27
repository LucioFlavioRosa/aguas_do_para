// prototipos/js/main.js
// Arquivo principal de funcionalidades do protótipo Aegea

// --------- NAVEGAÇÃO ENTRE PÁGINAS (Simulação de SPA) ----------
document.addEventListener('DOMContentLoaded', function () {
  // Simulação de navegação entre páginas conectadas
  const navLinks = document.querySelectorAll('a[data-nav]');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const destino = link.getAttribute('href');
      window.location.href = destino;
    });
  });

  // --------- VALIDAÇÃO DE FORMULÁRIOS ---------
  const forms = document.querySelectorAll('form');
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      let valido = true;
      const requiredFields = form.querySelectorAll('[required]');
      requiredFields.forEach(function(field) {
        if (!field.value || (field.type === 'checkbox' && !field.checked)) {
          valido = false;
          field.classList.add('erro-campo');
        } else {
          field.classList.remove('erro-campo');
        }
      });
      if (!valido) {
        e.preventDefault();
        exibirMensagem('Por favor, preencha todos os campos obrigatórios.', form);
      }
    });
  });

  // --------- MANIPULAÇÃO DE DOM (Exemplo: Mensagem de Erro) ---------
  function exibirMensagem(msg, form) {
    let msgDiv = form.querySelector('.mensagem-erro');
    if (!msgDiv) {
      msgDiv = document.createElement('div');
      msgDiv.className = 'mensagem-erro';
      msgDiv.style.color = '#cf2e2e';
      msgDiv.style.marginBottom = '1em';
      form.prepend(msgDiv);
    }
    msgDiv.textContent = msg;
  }

  // --------- EXEMPLO DE CONEXÃO ENTRE FUNCIONALIDADES ---------
  // Caso o protótipo tenha botões que levam da tela de cadastro para simulação, ou vice-versa
  const simulaBtn = document.getElementById('btn-simular');
  if (simulaBtn) {
    simulaBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'simulacao.html';
    });
  }

  // Caso o protótipo tenha um botão para voltar ao cadastro
  const cadastroBtn = document.getElementById('btn-cadastro');
  if (cadastroBtn) {
    cadastroBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'cadastro.html';
    });
  }

  // --------- EXEMPLO DE PREENCHIMENTO AUTOMÁTICO (Simulação realista) ---------
  // Exemplo: ao selecionar uma unidade, preencher automaticamente campos relacionados
  const unidadeSelect = document.getElementById('unidade-select');
  if (unidadeSelect) {
    unidadeSelect.addEventListener('change', function() {
      const cidadeInput = document.getElementById('cidade-input');
      if (cidadeInput) {
        if (this.value === 'aguas-do-rio') {
          cidadeInput.value = 'Rio de Janeiro';
        } else if (this.value === 'sao-paulo') {
          cidadeInput.value = 'São Paulo';
        } else {
          cidadeInput.value = '';
        }
      }
    });
  }
});

// --------- ESTILO BÁSICO PARA CAMPOS COM ERRO ---------
(function() {
  const style = document.createElement('style');
  style.innerHTML = '.erro-campo { border-color: #cf2e2e !important; } .mensagem-erro { font-size: 1rem; }';
  document.head.appendChild(style);
})();
