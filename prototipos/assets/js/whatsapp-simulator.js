// whatsapp-simulator.js
// Simulador de interface do WhatsApp Web para protótipos MVP Aegea
// Desenvolvido para integração com protótipos HTML, seguindo identidade visual do projeto

(function(window, document) {
  // Utilitários
  function createEl(tag, attrs = {}, ...children) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') el.className = v;
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else el.setAttribute(k, v);
    }
    for (const child of children) {
      if (child instanceof Node) el.appendChild(child);
      else if (child != null) el.appendChild(document.createTextNode(child));
    }
    return el;
  }

  // Mensagem WhatsApp
  function Message({ text, time, sent = false, file = null, status = '', avatar = null }) {
    const msgClass = sent ? 'wa-msg sent' : 'wa-msg received';
    const bubble = createEl('div', { class: msgClass },
      file ? FileBubble(file) : null,
      text ? createEl('span', { class: 'wa-msg-text' }, text) : null,
      createEl('span', { class: 'wa-msg-meta' },
        time || '',
        sent && status ? createEl('span', { class: 'wa-msg-status' }, status) : null
      )
    );
    if (!sent && avatar) {
      const avatarImg = createEl('img', { class: 'wa-avatar', src: avatar, alt: 'Avatar' });
      return createEl('div', { class: 'wa-msg-row' }, avatarImg, bubble);
    }
    return createEl('div', { class: 'wa-msg-row' }, bubble);
  }

  // Arquivo (foto, documento)
  function FileBubble(file) {
    if (file.type.startsWith('image/')) {
      return createEl('div', { class: 'wa-file-img' },
        createEl('img', { src: file.url, alt: file.name, style: { maxWidth: '180px', borderRadius: '8px' } })
      );
    }
    // Outros tipos (pdf, doc, etc)
    return createEl('div', { class: 'wa-file-doc' },
      createEl('span', { class: 'wa-file-icon' }, '\uD83D\uDCC4'),
      createEl('span', { class: 'wa-file-name' }, file.name)
    );
  }

  // Input de mensagem
  function MessageInput({ onSend, onFile }) {
    const input = createEl('input', {
      class: 'wa-input',
      type: 'text',
      placeholder: 'Digite uma mensagem',
      autocomplete: 'off',
      'aria-label': 'Digite uma mensagem'
    });
    const fileInput = createEl('input', {
      type: 'file',
      class: 'wa-file-input',
      style: { display: 'none' },
      accept: 'image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
    const fileBtn = createEl('button', {
      type: 'button',
      class: 'wa-btn wa-btn-file',
      title: 'Enviar arquivo',
      onclick: () => fileInput.click()
    }, '\uD83D\uDCCE');
    const sendBtn = createEl('button', {
      type: 'button',
      class: 'wa-btn wa-btn-send',
      title: 'Enviar',
      onclick: () => {
        if (input.value.trim()) {
          onSend(input.value.trim());
          input.value = '';
        }
      }
    }, '\u27A4');
    fileInput.addEventListener('change', e => {
      if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const url = URL.createObjectURL(file);
        onFile({
          name: file.name,
          type: file.type,
          url: url
        });
        fileInput.value = '';
      }
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && input.value.trim()) {
        onSend(input.value.trim());
        input.value = '';
      }
    });
    return createEl('div', { class: 'wa-input-row' }, fileBtn, input, sendBtn, fileInput);
  }

  // Cabeçalho do chat
  function ChatHeader({ title, subtitle, avatar }) {
    return createEl('div', { class: 'wa-header' },
      avatar ? createEl('img', { class: 'wa-header-avatar', src: avatar, alt: 'Avatar' }) : null,
      createEl('div', { class: 'wa-header-info' },
        createEl('span', { class: 'wa-header-title' }, title),
        subtitle ? createEl('span', { class: 'wa-header-subtitle' }, subtitle) : null
      )
    );
  }

  // Container principal
  function WhatsAppSimulator({ mountId, contactName, contactAvatar, onSend, onFile }) {
    const root = document.getElementById(mountId);
    if (!root) return;
    root.classList.add('wa-simulator-root');
    // Header
    const header = ChatHeader({ title: contactName, avatar: contactAvatar });
    // Mensagens
    const messagesArea = createEl('div', { class: 'wa-messages', tabindex: '0', 'aria-live': 'polite' });
    // Input
    const inputRow = MessageInput({
      onSend: msg => {
        addMessage({ text: msg, sent: true, time: getTime(), status: '✓✓' });
        if (typeof onSend === 'function') onSend(msg);
      },
      onFile: file => {
        addMessage({ file: file, sent: true, time: getTime(), status: '✓✓' });
        if (typeof onFile === 'function') onFile(file);
      }
    });
    // Adiciona mensagem
    function addMessage(msgObj) {
      messagesArea.appendChild(Message(msgObj));
      messagesArea.scrollTop = messagesArea.scrollHeight;
    }
    // API pública
    root.addMessage = addMessage;
    // Monta
    root.appendChild(header);
    root.appendChild(messagesArea);
    root.appendChild(inputRow);
    // Utilitário de hora
    function getTime() {
      const d = new Date();
      return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
    // Retorna root para controle externo
    return root;
  }

  // CSS mínimo para simulação (pode ser sobrescrito pelo protótipo)
  const style = document.createElement('style');
  style.textContent = `
  .wa-simulator-root { font-family: 'Segoe UI', Arial, sans-serif; background: #ece5dd; border-radius: 12px; box-shadow: 0 2px 8px #0002; max-width: 420px; min-width: 320px; display: flex; flex-direction: column; height: 600px; overflow: hidden; border: 1px solid #d1d7db; }
  .wa-header { background: #075e54; color: #fff; display: flex; align-items: center; padding: 12px; }
  .wa-header-avatar { width: 40px; height: 40px; border-radius: 50%; margin-right: 12px; object-fit: cover; }
  .wa-header-info { display: flex; flex-direction: column; }
  .wa-header-title { font-weight: bold; font-size: 1.1em; }
  .wa-header-subtitle { font-size: 0.95em; color: #d0e6e2; }
  .wa-messages { flex: 1; overflow-y: auto; padding: 16px 8px; display: flex; flex-direction: column; gap: 8px; background: #ece5dd; }
  .wa-msg-row { display: flex; align-items: flex-end; }
  .wa-msg { max-width: 75%; padding: 8px 12px; border-radius: 8px; margin-bottom: 2px; position: relative; font-size: 1em; word-break: break-word; box-shadow: 0 1px 2px #0001; }
  .wa-msg.sent { background: #dcf8c6; margin-left: auto; border-bottom-right-radius: 2px; }
  .wa-msg.received { background: #fff; margin-right: auto; border-bottom-left-radius: 2px; }
  .wa-msg-meta { display: block; font-size: 0.8em; color: #888; margin-top: 2px; text-align: right; }
  .wa-msg-status { margin-left: 4px; color: #34b7f1; }
  .wa-avatar { width: 28px; height: 28px; border-radius: 50%; margin-right: 6px; object-fit: cover; }
  .wa-input-row { display: flex; align-items: center; background: #f7f7f7; padding: 8px; border-top: 1px solid #ece5dd; }
  .wa-input { flex: 1; border: none; border-radius: 20px; padding: 8px 14px; margin: 0 8px; font-size: 1em; background: #fff; }
  .wa-btn { background: none; border: none; font-size: 1.3em; cursor: pointer; color: #075e54; padding: 6px 8px; border-radius: 50%; transition: background 0.2s; }
  .wa-btn:hover { background: #e0f2f1; }
  .wa-file-img img { max-width: 180px; border-radius: 8px; }
  .wa-file-doc { display: flex; align-items: center; gap: 6px; background: #f0f0f0; border-radius: 6px; padding: 4px 8px; }
  .wa-file-icon { font-size: 1.6em; }
  .wa-file-name { font-size: 0.95em; }
  `;
  document.head.appendChild(style);

  // Exporta global
  window.WhatsAppSimulator = WhatsAppSimulator;
})(window, document);
