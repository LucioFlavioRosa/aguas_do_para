"use strict";
// Simulação do fluxo WhatsApp Onboarding MVP Águas do Pará
// Armazena dados do usuário
const userData = {};
const chat = document.getElementById('wa-chat');
const form = document.getElementById('wa-form');
const input = document.getElementById('wa-input');

// Mensagens e etapas do fluxo
const flow = [
  {
    type: 'bot',
    text: 'Olá! 👋 Bem-vindo ao Programa Parceiro Águas do Pará! Obrigado pelo seu interesse em prestar serviços conosco. Para começarmos, por favor, informe o CNPJ da sua empresa para verificação jurídica.',
    field: 'cnpj',
    validate: v => /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/.test(v.replace(/\D/g, '')),
    error: 'CNPJ inválido. Por favor, digite no formato 00.000.000/0000-00 ou apenas números.'
  },
  {
    type: 'bot',
    text: 'Aguarde um instante enquanto verificamos seu CNPJ...'
  },
  {
    type: 'bot',
    text: 'CNPJ verificado com sucesso! 🎉\nEnquanto isso, assista a este vídeo explicando como funciona o programa: [Vídeo Explicativo](https://www.youtube.com/watch?v=dQw4w9WgXcQ)'
  },
  {
    type: 'bot',
    text: 'Para participar, você possui um celular com WhatsApp, câmera e GPS funcionando no dia a dia? (Responda "Sim" ou "Não")',
    field: 'tem_celular',
    validate: v => /sim|s|tenho/i.test(v),
    error: 'Para participar é necessário ter um celular com WhatsApp, câmera e GPS funcionando. Se tiver, responda "Sim".'
  },
  {
    type: 'bot',
    text: 'Ótimo! Agora precisamos de alguns dados básicos. Qual seu nome completo?',
    field: 'nome',
    validate: v => v.trim().length > 3,
    error: 'Por favor, digite seu nome completo.'
  },
  {
    type: 'bot',
    text: 'Qual seu endereço completo?',
    field: 'endereco',
    validate: v => v.trim().length > 5,
    error: 'Por favor, digite um endereço válido.'
  },
  {
    type: 'bot',
    text: 'Qual seu e-mail?',
    field: 'email',
    validate: v => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
    error: 'E-mail inválido. Por favor, digite um e-mail válido.'
  },
  {
    type: 'bot',
    text: 'Qual o raio de atuação (em km)?',
    field: 'raio',
    validate: v => /^\d{1,3}$/.test(v.trim()),
    error: 'Por favor, informe um número válido para o raio de atuação.'
  },
  {
    type: 'bot',
    text: 'Agora, marque os serviços que você pode realizar (digite os números separados por vírgula):\n1. Reparo de vazamentos de água\n2. Instalação/Troca de hidrômetros\n3. Desobstrução de esgoto\n4. Pequenos reparos (alvenaria/calçada)\n5. Outros',
    field: 'servicos',
    validate: v => /[1-5]/.test(v),
    error: 'Por favor, selecione ao menos um serviço (ex: 1,2,3)'
  },
  {
    type: 'bot',
    text: 'Sobre seus recursos e disponibilidade:\nVocê possui veículo próprio (Moto/Carro)?',
    field: 'veiculo',
    validate: v => /sim|s|tenho/i.test(v),
    error: 'Para participar é necessário ter veículo próprio. Se tiver, responda "Sim".'
  },
  {
    type: 'bot',
    text: 'Possui ferramentas básicas para os serviços?',
    field: 'ferramentas',
    validate: v => /sim|s|tenho/i.test(v),
    error: 'Para participar é necessário ter ferramentas básicas. Se tiver, responda "Sim".'
  },
  {
    type: 'bot',
    text: 'Quais janelas de horário você pode trabalhar? (Ex: Manhã, Tarde, Noite, Fim de semana, Feriados)',
    field: 'agenda',
    validate: v => v.trim().length > 0,
    error: 'Por favor, informe ao menos um período de disponibilidade.'
  },
  {
    type: 'bot',
    text: 'Agora precisamos validar sua identidade. Por favor, envie o número da sua CNH (simulação).',
    field: 'cnh',
    validate: v => /^\d{9,12}$/.test(v.replace(/\D/g, '')),
    error: 'Por favor, digite um número de CNH válido.'
  },
  {
    type: 'bot',
    text: 'Agora, envie sua chave PIX para pagamentos.',
    field: 'pix',
    validate: v => v.trim().length > 5,
    error: 'Por favor, informe uma chave PIX válida.'
  },
  {
    type: 'bot',
    text: 'Para finalizar, aceite os termos do programa digitando "Aceito".',
    field: 'termo',
    validate: v => /aceito/i.test(v),
    error: 'Para prosseguir, digite "Aceito".'
  },
  {
    type: 'bot',
    text: 'Cadastro concluído! 🎉\nParabéns, você agora faz parte da base de parceiros ativos da Águas do Pará. Em breve, entraremos em contato para os próximos passos. Obrigado!'
  }
];

let step = 0;

function addMsg(text, sender = 'bot') {
  const msgDiv = document.createElement('div');
  msgDiv.className = `wa-msg ${sender}`;
  msgDiv.innerHTML = text.replace(/\n/g, '<br>');
  const time = document.createElement('span');
  time.className = 'wa-time';
  const now = new Date();
  time.textContent = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  msgDiv.appendChild(time);
  chat.appendChild(msgDiv);
  chat.scrollTop = chat.scrollHeight;
}

function botStep() {
  const curr = flow[step];
  if (!curr) return;
  setTimeout(() => {
    addMsg(curr.text, 'bot');
    // Se for etapa de espera (ex: consulta API), pula para próxima após delay
    if (!curr.field) {
      step++;
      botStep();
    }
  }, Math.floor(Math.random()*1000)+1800);
}

function saveData(field, value) {
  userData[field] = value;
  localStorage.setItem('waOnboarding', JSON.stringify(userData));
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const curr = flow[step];
  let val = input.value.trim();
  if (!curr || !curr.field) return;
  // Validação
  if (curr.validate && !curr.validate(val)) {
    addMsg(curr.error, 'bot');
    input.value = '';
    return;
  }
  // Exibe mensagem do usuário
  addMsg(val, 'user');
  saveData(curr.field, val);
  input.value = '';
  step++;
  botStep();
});

// Máscara CNPJ
input.addEventListener('input', function() {
  if (flow[step] && flow[step].field === 'cnpj') {
    let v = input.value.replace(/\D/g, '');
    if (v.length > 14) v = v.slice(0,14);
    if (v.length > 12) v = v.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5');
    else if (v.length > 8) v = v.replace(/(\d{2})(\d{3})(\d{3})(\d{0,4})/, '$1.$2.$3/$4');
    else if (v.length > 5) v = v.replace(/(\d{2})(\d{3})(\d{0,3})/, '$1.$2.$3');
    else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,3})/, '$1.$2');
    input.value = v;
  }
});

// Inicia conversa
window.addEventListener('DOMContentLoaded', () => {
  chat.innerHTML = '';
  step = 0;
  botStep();
});