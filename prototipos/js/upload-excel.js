// upload-excel.js - Simulação de upload de arquivo Excel

document.addEventListener('DOMContentLoaded', function () {
  var uploadInput = document.getElementById('excel-upload-input');
  if (uploadInput) {
    uploadInput.addEventListener('change', function (e) {
      if (e.target.files.length > 0) {
        var fileName = e.target.files[0].name;
        alert('Arquivo "' + fileName + '" selecionado com sucesso! (Simulação de upload)');
      }
    });
  }
});
