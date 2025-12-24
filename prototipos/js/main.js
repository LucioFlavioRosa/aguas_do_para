// main.js – Inicialização dos módulos do MVP Parceiro Águas do Pará

document.addEventListener('DOMContentLoaded', function () {
  // Navegação entre telas (simples)
  document.querySelectorAll('[data-navigate]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      const target = btn.getAttribute('data-navigate');
      if (target) window.location.href = target;
    });
  });

  // WhatsApp Simulator (bloco 1)
  if (document.getElementById('whatsapp-chat')) {
    const chat = document.getElementById('whatsapp-chat');
    const input = document.getElementById('wa-input');
    const form = document.getElementById('wa-form');
    let step = 0;
    const flow = [
      { msg: 'Olá! Obrigado pelo interesse em ser um Parceiro Águas do Pará. Para começarmos, por favor, informe o CNPJ da sua empresa.', expectInput: true },
      { msg: 'Estamos consultando seu CNPJ... Aguarde um instante.', expectInput: false },
      { msg: 'Enquanto isso, assista ao vídeo explicativo sobre o programa.', expectInput: false, video: true },
      { msg: 'Você possui um celular com WhatsApp, câmera e GPS funcionando?', expectInput: true, options: ['Sim', 'Não'] },
      { msg: 'Ótimo! Agora precisamos de algumas informações básicas: Nome, Endereço, E-mail e Raio de Atuação.', expectInput: true, fields: ['Nome', 'Endereço', 'E-mail', 'Raio de Atuação'] },
      { msg: 'Selecione os serviços que você pode realizar:', expectInput: true, checklist: ['Reparo de vazamentos de água', 'Instalação/Troca de hidrômetros', 'Desobstrução de esgoto', 'Pequenos reparos (alvenaria/calçada)', 'Outros'] },
      { msg: 'Agora marque os recursos e disponibilidade:', expectInput: true, checklist: ['Veículo (Moto/Carro)', 'Ferramentas básicas', 'Manhã', 'Tarde', 'Noite', 'Fim de semana', 'Dias da semana', 'Feriado'] },
      { msg: 'Por favor, envie uma foto da sua CNH, uma selfie e sua chave PIX.', expectInput: true, upload: true },
      { msg: 'Para finalizar, aceite os termos do programa.', expectInput: true, accept: true },
      { msg: 'Cadastro concluído! Você agora faz parte da nossa base de parceiros ativos. Aguarde oportunidades de serviço.', expectInput: false }
    ];
    function renderStep() {
      const f = flow[step];
      let html = `<div class='wa-msg wa-bot'>${f.msg}</div>`;
      if (f.video) {
        html += `<div class='wa-msg wa-bot'><video controls width='250'><source src='https://www.w3schools.com/html/mov_bbb.mp4' type='video/mp4'>Seu navegador não suporta vídeo.</video></div>`;
      }
      if (f.options) {
        html += `<div class='wa-options'>` + f.options.map(opt => `<button type='button' class='wa-opt-btn'>${opt}</button>`).join('') + `</div>`;
      }
      if (f.fields) {
        html += `<form id='wa-fields-form'>` + f.fields.map(field => `<input required placeholder='${field}' name='${field}' class='wa-input'/>`).join('') + `<button type='submit'>Enviar</button></form>`;
      }
      if (f.checklist) {
        html += `<form id='wa-checklist-form'>` + f.checklist.map(item => `<label><input type='checkbox' name='checklist' value='${item}'/> ${item}</label><br>`).join('') + `<button type='submit'>Enviar</button></form>`;
      }
      if (f.upload) {
        html += `<form id='wa-upload-form'><input type='file' required multiple accept='image/*'/><input type='text' required placeholder='Chave PIX'/><button type='submit'>Enviar</button></form>`;
      }
      if (f.accept) {
        html += `<form id='wa-accept-form'><label><input type='checkbox' required/> Aceito os termos</label><button type='submit'>Finalizar</button></form>`;
      }
      chat.innerHTML += html;
      chat.scrollTop = chat.scrollHeight;
      // Bind dynamic forms/buttons
      if (f.options) {
        chat.querySelectorAll('.wa-opt-btn').forEach(btn => {
          btn.onclick = () => { chat.innerHTML += `<div class='wa-msg wa-user'>${btn.textContent}</div>`; step++; setTimeout(renderStep, 600); };
        });
      }
      if (f.fields) {
        chat.querySelector('#wa-fields-form').onsubmit = function(e) { e.preventDefault(); chat.innerHTML += `<div class='wa-msg wa-user'>Dados enviados</div>`; step++; setTimeout(renderStep, 600); };
      }
      if (f.checklist) {
        chat.querySelector('#wa-checklist-form').onsubmit = function(e) { e.preventDefault(); chat.innerHTML += `<div class='wa-msg wa-user'>Checklist enviado</div>`; step++; setTimeout(renderStep, 600); };
      }
      if (f.upload) {
        chat.querySelector('#wa-upload-form').onsubmit = function(e) { e.preventDefault(); chat.innerHTML += `<div class='wa-msg wa-user'>Arquivos enviados</div>`; step++; setTimeout(renderStep, 600); };
      }
      if (f.accept) {
        chat.querySelector('#wa-accept-form').onsubmit = function(e) { e.preventDefault(); chat.innerHTML += `<div class='wa-msg wa-user'>Aceito</div>`; step++; setTimeout(renderStep, 600); };
      }
    }
    renderStep();
  }

  // Form validation (bloco 2 e 3)
  document.querySelectorAll('form[data-validate]').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      let valid = true;
      form.querySelectorAll('[required]').forEach(function(input) {
        if (!input.value) valid = false;
      });
      if (!valid) {
        e.preventDefault();
        alert('Preencha todos os campos obrigatórios.');
      }
    });
  });

  // Photo simulator (bloco 3)
  document.querySelectorAll('.photo-upload').forEach(function(input) {
    input.addEventListener('change', function(e) {
      if (input.files.length) {
        const preview = document.getElementById(input.getAttribute('data-preview'));
        if (preview) {
          const reader = new FileReader();
          reader.onload = function(ev) { preview.src = ev.target.result; };
          reader.readAsDataURL(input.files[0]);
        }
      }
    });
  });

  // Mock data loading (exemplo para tabelas)
  if (document.getElementById('parceiros-table')) {
    const parceiros = [
      {nome: 'João Silva', endereco: 'Rua A, Cidade X', veiculo: 'Moto', servicos: 12},
      {nome: 'Maria Souza', endereco: 'Av. B, Cidade Y', veiculo: 'Carro', servicos: 8},
      {nome: 'Pedro Lima', endereco: 'Trav. C, Cidade Z', veiculo: 'Moto', servicos: 20},
      {nome: 'Ana Paula', endereco: 'Rua D, Cidade W', veiculo: 'Carro', servicos: 5},
      {nome: 'Carlos Mendes', endereco: 'Av. E, Cidade V', veiculo: 'Moto', servicos: 15}
    ];
    let html = '';
    parceiros.forEach(p => {
      html += `<tr><td>${p.nome}</td><td>${p.endereco}</td><td>${p.veiculo}</td><td>${p.servicos}</td><td><button type='button'>Selecionar</button></td></tr>`;
    });
    document.getElementById('parceiros-table').innerHTML = html;
  }
});
