// navigation.js
// Gerencia navegação entre telas do protótipo MVP Águas do Pará
// Uso: Adicione 'data-nav' nos botões/links com o nome da página de destino (ex: data-nav="whatsapp.html")

(function() {
  function goTo(page) {
    window.location.href = page;
  }

  function handleNavClick(e) {
    var target = e.target;
    while (target && !target.hasAttribute('data-nav')) {
      target = target.parentElement;
    }
    if (target && target.hasAttribute('data-nav')) {
      e.preventDefault();
      var page = target.getAttribute('data-nav');
      goTo(page);
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('click', handleNavClick);
  });

  // Exponibiliza função global para navegação programática
  window.navigateTo = goTo;
})();
