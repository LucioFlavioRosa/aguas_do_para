// prototipos/assets/js/photo-upload.js
// Lógica de upload de fotos (Bloco 3 - WhatsApp)
(function () {
  // Utiliza exif-js para extrair metadados (deve ser incluído no HTML)
  function getExifData(file, cb) {
    if (!window.EXIF) {
      cb(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        EXIF.getData(img, function () {
          const gps = EXIF.getTag(this, 'GPSLatitude') ? {
            lat: EXIF.getTag(this, 'GPSLatitude'),
            lon: EXIF.getTag(this, 'GPSLongitude')
          } : null;
          const dt = EXIF.getTag(this, 'DateTimeOriginal') || null;
          cb({ gps, dt });
        });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function validarFoto(file) {
    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp'];
    const tamanhoMax = 5 * 1024 * 1024; // 5MB
    if (!tiposPermitidos.includes(file.type)) return 'Formato não suportado.';
    if (file.size > tamanhoMax) return 'Arquivo excede 5MB.';
    return null;
  }

  function previewFoto(file, cb) {
    const reader = new FileReader();
    reader.onload = function (e) {
      cb(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  function simularEnvioWhatsApp(file, cbProgress, cbFinal) {
    let progresso = 0;
    const interval = setInterval(() => {
      progresso += Math.random() * 25 + 10;
      if (progresso >= 100) {
        progresso = 100;
        clearInterval(interval);
        cbProgress(progresso);
        setTimeout(cbFinal, 400);
      } else {
        cbProgress(Math.floor(progresso));
      }
    }, 200);
  }

  // Exemplo de integração UI
  document.addEventListener('photo-upload:select', function (e) {
    const file = e.detail.file;
    const erro = validarFoto(file);
    if (erro) {
      document.dispatchEvent(new CustomEvent('photo-upload:erro', { detail: { msg: erro } }));
      return;
    }
    previewFoto(file, function (dataUrl) {
      document.dispatchEvent(new CustomEvent('photo-upload:preview', { detail: { dataUrl } }));
    });
    getExifData(file, function (meta) {
      document.dispatchEvent(new CustomEvent('photo-upload:meta', { detail: { meta } }));
    });
  });

  document.addEventListener('photo-upload:enviar', function (e) {
    const file = e.detail.file;
    simularEnvioWhatsApp(
      file,
      function (progress) {
        document.dispatchEvent(new CustomEvent('photo-upload:progress', { detail: { progress } }));
      },
      function () {
        document.dispatchEvent(new CustomEvent('photo-upload:finalizado', { detail: { file } }));
      }
    );
  });

  window.PhotoUpload = {
    validarFoto,
    previewFoto,
    getExifData,
    simularEnvioWhatsApp
  };
})();
