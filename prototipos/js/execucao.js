"use strict";
// Simula upload de fotos, preview e captura de localização
(function() {
  const fotoAntes = document.getElementById('fotoAntes');
  const fotoDepois = document.getElementById('fotoDepois');
  const previewAntes = document.getElementById('previewAntes');
  const previewDepois = document.getElementById('previewDepois');
  const gpsAntesIndicador = document.getElementById('gpsAntes-indicador');
  const gpsDepoisIndicador = document.getElementById('gpsDepois-indicador');
  const btnEnviar = document.getElementById('btn-enviar');
  const loadingMsg = document.getElementById('loading-msg');
  let fotoAntesOK = false;
  let fotoDepoisOK = false;
  let gpsAntes = null;
  let gpsDepois = null;

  function checkReady() {
    if (fotoAntesOK && fotoDepoisOK && gpsAntes && gpsDepois) {
      btnEnviar.disabled = false;
      btnEnviar.classList.add('enabled');
    } else {
      btnEnviar.disabled = true;
      btnEnviar.classList.remove('enabled');
    }
  }

  function getLocation(cb, indicador) {
    if (!navigator.geolocation) {
      cb(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(function(pos) {
      indicador.style.display = 'flex';
      cb({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        timestamp: pos.timestamp
      });
    }, function() {
      cb(null);
    }, { enableHighAccuracy: true, timeout: 8000 });
  }

  fotoAntes.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(ev) {
        previewAntes.src = ev.target.result;
        previewAntes.style.display = 'block';
        fotoAntesOK = true;
        getLocation(function(loc) {
          gpsAntes = loc;
          checkReady();
        }, gpsAntesIndicador);
      };
      reader.readAsDataURL(file);
    } else {
      previewAntes.style.display = 'none';
      fotoAntesOK = false;
      gpsAntes = null;
      gpsAntesIndicador.style.display = 'none';
      checkReady();
    }
  });

  fotoDepois.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(ev) {
        previewDepois.src = ev.target.result;
        previewDepois.style.display = 'block';
        fotoDepoisOK = true;
        getLocation(function(loc) {
          gpsDepois = loc;
          checkReady();
        }, gpsDepoisIndicador);
      };
      reader.readAsDataURL(file);
    } else {
      previewDepois.style.display = 'none';
      fotoDepoisOK = false;
      gpsDepois = null;
      gpsDepoisIndicador.style.display = 'none';
      checkReady();
    }
  });

  document.getElementById('form-execucao').addEventListener('submit', function(e) {
    e.preventDefault();
    if (btnEnviar.disabled) return;
    btnEnviar.disabled = true;
    loadingMsg.style.display = 'block';
    // Simula envio para backend
    setTimeout(function() {
      // Salva dados no localStorage
      const obs = document.getElementById('observacoes').value;
      localStorage.setItem('execucao-servico', JSON.stringify({
        fotoAntes: previewAntes.src,
        gpsAntes: gpsAntes,
        fotoDepois: previewDepois.src,
        gpsDepois: gpsDepois,
        observacoes: obs,
        enviadoEm: new Date().toISOString()
      }));
      loadingMsg.style.display = 'none';
      window.location.href = 'aguardo-analise.html';
    }, 2000);
  });
})();
