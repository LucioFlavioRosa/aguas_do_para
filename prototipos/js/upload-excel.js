// Script para simular upload de arquivo Excel na página de cadastro
// Exibe mensagem de confirmação ao selecionar um arquivo

document.addEventListener('DOMContentLoaded', function () {
  var input = document.getElementById('excel-upload-input');
  if (input) {
    input.addEventListener('change', function (event) {
      var file = event.target.files[0];
      if (file) {
        alert('Arquivo "' + file.name + '" selecionado com sucesso! (Simulação de upload)');
      }
    });
  }
});
