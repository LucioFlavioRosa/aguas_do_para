// Script para carregar dinamicamente header e footer reutilizáveis
// Uso: adicionar <div id="header-container"></div> e <div id="footer-container"></div> no HTML

function loadComponent(containerId, componentPath) {
  const container = document.getElementById(containerId);
  if (container) {
    fetch(componentPath)
      .then(response => {
        if (!response.ok) throw new Error('Erro ao carregar componente: ' + componentPath);
        return response.text();
      })
      .then(html => {
        container.innerHTML = html;
      })
      .catch(error => {
        console.error(error);
      });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  loadComponent('header-container', 'prototipos/components/header.html');
  loadComponent('footer-container', 'prototipos/components/footer.html');
});
