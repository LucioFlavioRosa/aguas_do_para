// form-validation.js
// Validação básica de formulários para MVP Águas do Pará
// Uso: Adicione 'data-validate' ao <form> e campos com name="cnpj", name="email", name="telefone"

(function() {
  function validateCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, '');
    if (cnpj.length !== 14) return false;
    // Validação básica (não rigorosa)
    if (/^(\d)\1+$/.test(cnpj)) return false;
    let t = cnpj.length - 2, d = cnpj.substring(t), d1 = parseInt(d.charAt(0)), d2 = parseInt(d.charAt(1)), calc = x => {
      let n = 0, y = t + 1, i = 0;
      for (; i < t; i++) n += cnpj.charAt(i) * (y--);
      return n % 11 < 2 ? 0 : 11 - n % 11;
    };
    return calc() === d1 && calc() === d2;
  }

  function validateEmail(email) {
    return /^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email);
  }

  function validateTelefone(tel) {
    return /^(\(?\d{2}\)?\s?)?(\d{4,5})[- ]?(\d{4})$/.test(tel.replace(/\D/g, ''));
  }

  function showError(input, msg) {
    let err = input.parentNode.querySelector('.form-error');
    if (!err) {
      err = document.createElement('div');
      err.className = 'form-error';
      input.parentNode.appendChild(err);
    }
    err.innerText = msg;
    input.classList.add('form-error-input');
  }

  function clearError(input) {
    let err = input.parentNode.querySelector('.form-error');
    if (err) err.remove();
    input.classList.remove('form-error-input');
  }

  function validateForm(form) {
    let valid = true;
    const cnpjField = form.querySelector('[name="cnpj"]');
    if (cnpjField) {
      clearError(cnpjField);
      if (!validateCNPJ(cnpjField.value)) {
        showError(cnpjField, 'CNPJ inválido.');
        valid = false;
      }
    }
    const emailField = form.querySelector('[name="email"]');
    if (emailField) {
      clearError(emailField);
      if (!validateEmail(emailField.value)) {
        showError(emailField, 'E-mail inválido.');
        valid = false;
      }
    }
    const telField = form.querySelector('[name="telefone"]');
    if (telField) {
      clearError(telField);
      if (!validateTelefone(telField.value)) {
        showError(telField, 'Telefone inválido.');
        valid = false;
      }
    }
    return valid;
  }

  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('form[data-validate]').forEach(function(form) {
      form.addEventListener('submit', function(e) {
        if (!validateForm(form)) {
          e.preventDefault();
        }
      });
    });
  });
})();
