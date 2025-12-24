// whatsapp-simulator.js
// Simula interface e experiência do WhatsApp para o MVP Águas do Pará
// Espera-se um container com id 'whatsapp-chat' para renderizar as mensagens

(function() {
  const chatContainerId = 'whatsapp-chat';
  const typingId = 'wa-typing';

  function addMessage({text, from = 'bot', delay = 0, timestamp = null, isImage = false, imageAlt = ''}) {
    setTimeout(function() {
      const chat = document.getElementById(chatContainerId);
      if (!chat) return;
      // Remove typing animation se existir
      removeTyping();
      // Cria mensagem
      const msgDiv = document.createElement('div');
      msgDiv.className = 'wa-msg wa-msg-' + from;
      if (isImage) {
        const img = document.createElement('img');
        img.src = text;
        img.alt = imageAlt || 'Imagem enviada';
        img.className = 'wa-msg-img';
        msgDiv.appendChild(img);
      } else {
        msgDiv.innerText = text;
      }
      // Timestamp
      const time = document.createElement('span');
      time.className = 'wa-msg-time';
      time.innerText = timestamp || getCurrentTime();
      msgDiv.appendChild(time);
      chat.appendChild(msgDiv);
      scrollToBottom();
    }, delay);
  }

  function showTyping(from = 'bot', delay = 1200) {
    const chat = document.getElementById(chatContainerId);
    if (!chat) return;
    removeTyping();
    const typingDiv = document.createElement('div');
    typingDiv.className = 'wa-typing wa-msg-' + from;
    typingDiv.id = typingId;
    typingDiv.innerHTML = '<span class="wa-typing-dot"></span><span class="wa-typing-dot"></span><span class="wa-typing-dot"></span>';
    chat.appendChild(typingDiv);
    scrollToBottom();
    setTimeout(removeTyping, delay);
  }

  function removeTyping() {
    const typingDiv = document.getElementById(typingId);
    if (typingDiv && typingDiv.parentNode) {
      typingDiv.parentNode.removeChild(typingDiv);
    }
  }

  function scrollToBottom() {
    const chat = document.getElementById(chatContainerId);
    if (chat) {
      chat.scrollTop = chat.scrollHeight;
    }
  }

  function getCurrentTime() {
    const d = new Date();
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  // API pública
  window.waSimulator = {
    addMessage,
    showTyping,
    removeTyping,
    scrollToBottom
  };
})();
