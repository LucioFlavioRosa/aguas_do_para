// navigation.js - Gerencia navegação e componentes globais do protótipo

// Função para carregar componentes reutilizáveis (header, footer)
function loadComponent(selector, url) {
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Erro ao carregar componente: ' + url);
      return response.text();
    })
    .then(html => {
      document.querySelector(selector).innerHTML = html;
    })
    .catch(err => {
      console.error(err);
    });
}

// Gerenciamento de estado de navegação (página ativa no menu)
function setActiveMenu(menuSelector, currentPage) {
  const menuLinks = document.querySelectorAll(menuSelector + ' a');
  menuLinks.forEach(link => {
    if (link.getAttribute('href') && link.getAttribute('href').includes(currentPage)) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

// Função auxiliar para transição entre páginas (salvar contexto, validação, etc.)
function navigateTo(url, options = {}) {
  // Exemplo: salvar contexto no sessionStorage
  if (options.context) {
    sessionStorage.setItem('navContext', JSON.stringify(options.context));
  }
  // Exemplo: validação antes de navegar
  if (options.beforeNavigate && typeof options.beforeNavigate === 'function') {
    const canNavigate = options.beforeNavigate();
    if (!canNavigate) return;
  }
  window.location.href = url;
}

// Exemplo de uso (deve ser chamado nas páginas):
// loadComponent('header', '/prototipos/assets/components/header.html');
// loadComponent('footer', '/prototipos/assets/components/footer.html');
// setActiveMenu('nav', 'bloco2-gestao-demandas.html');

// Exporta funções para uso global
window.Navigation = {
  loadComponent,
  setActiveMenu,
  navigateTo
};
