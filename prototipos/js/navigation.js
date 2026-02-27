// Lógica de navegação entre páginas do protótipo
// 1. Destaca o link ativo no menu de navegação
// 2. Simula passagem de dados entre páginas via localStorage
// 3. Implementa lógica de voltar/avançar

function setActiveNav(arquivo) {
  // Destaca o link ativo do menu
  document.querySelectorAll('nav.menu-cenarios a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && arquivo && href.indexOf(arquivo) !== -1) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

// Simula passagem de dados entre páginas
function salvarParametrosSimulacao(parametros) {
  // Exemplo: salvar parâmetros de simulação
  localStorage.setItem('parametrosSimulacao', JSON.stringify(parametros));
}
function obterParametrosSimulacao() {
  const dados = localStorage.getItem('parametrosSimulacao');
  return dados ? JSON.parse(dados) : null;
}

// Lógica de voltar/avançar
function navegarPara(pagina) {
  window.location.href = pagina;
}
function voltar() {
  window.history.back();
}
function avancar() {
  window.history.forward();
}

// Exemplo de uso em outras páginas:
// salvarParametrosSimulacao({cenario: 1, cobertura: 38});
// const params = obterParametrosSimulacao();
