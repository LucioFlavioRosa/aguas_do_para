// prototipos/js/photo-simulator.js
// Simulador de captura de foto com GPS para protótipo MVP Águas do Pará
// Gera preview da imagem e coordenadas fictícias ao clicar em botões de foto

(function() {
  // Utilização: Adicione o atributo data-photo-sim-btn a um botão para ativar a simulação
  // Adicione data-photo-preview="id-do-preview" para indicar onde mostrar a imagem
  // Adicione data-photo-coords="id-do-coords" para indicar onde mostrar as coordenadas

  function getFakeCoords() {
    // Gera coordenadas fictícias (exemplo: Belém-PA)
    const lat = (-1.45 + (Math.random() - 0.5) * 0.01).toFixed(6);
    const lng = (-48.48 + (Math.random() - 0.5) * 0.01).toFixed(6);
    return { lat, lng };
  }

  function handlePhotoSimClick(e) {
    e.preventDefault();
    const btn = e.currentTarget;
    const previewId = btn.getAttribute('data-photo-preview');
    const coordsId = btn.getAttribute('data-photo-coords');
    // Simula seleção de arquivo de imagem
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
    input.onchange = function(ev) {
      const file = ev.target.files[0];
      if (file && previewId) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          const img = document.getElementById(previewId);
          if (img) {
            img.src = evt.target.result;
            img.style.display = 'block';
            img.alt = 'Prévia da foto capturada';
          }
        };
        reader.readAsDataURL(file);
      }
      if (coordsId) {
        const coords = getFakeCoords();
        const coordsElem = document.getElementById(coordsId);
        if (coordsElem) {
          coordsElem.textContent = `Lat: ${coords.lat}, Lng: ${coords.lng}`;
          coordsElem.style.display = 'block';
        }
      }
    };
  }

  function bindPhotoSimBtns() {
    const btns = document.querySelectorAll('[data-photo-sim-btn]');
    btns.forEach(btn => {
      btn.addEventListener('click', handlePhotoSimClick);
    });
  }

  document.addEventListener('DOMContentLoaded', bindPhotoSimBtns);
})();
