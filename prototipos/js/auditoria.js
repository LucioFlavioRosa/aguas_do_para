"use strict";

// Mock de serviços aguardando análise
const servicos = [
  {
    id: 1,
    nome: "João da Silva",
    servico: "Reparo de vazamento",
    endereco: "Rua das Flores, 123 - Belém/PA",
    localDemanda: { lat: -1.455833, lng: -48.504444 },
    fotoAntes: {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      gps: { lat: -1.455900, lng: -48.504500 },
      exifData: { dataFoto: "2024-07-01T09:10:00", dispositivo: "Moto G7" }
    },
    fotoDepois: {
      url: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
      gps: { lat: -1.455850, lng: -48.504460 },
      exifData: { dataFoto: "2024-07-01T09:40:00", dispositivo: "Moto G7" }
    },
    envioAntes: "2024-07-01T09:12:00",
    envioDepois: "2024-07-01T09:41:00"
  },
  {
    id: 2,
    nome: "Maria Souza",
    servico: "Instalação de hidrômetro",
    endereco: "Av. Brasil, 456 - Ananindeua/PA",
    localDemanda: { lat: -1.365833, lng: -48.425000 },
    fotoAntes: {
      url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
      gps: { lat: -1.366000, lng: -48.425200 },
      exifData: { dataFoto: "2024-07-01T10:00:00", dispositivo: "iPhone 12" }
    },
    fotoDepois: {
      url: "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?auto=format&fit=crop&w=400&q=80",
      gps: { lat: -1.365900, lng: -48.425100 },
      exifData: { dataFoto: "2024-07-01T11:00:00", dispositivo: "iPhone 12" }
    },
    envioAntes: "2024-07-01T10:45:00",
    envioDepois: "2024-07-01T11:50:00" // Inconsistente (mais de 30min)
  }
];

function distanciaEmMetros(coord1, coord2) {
  // Cálculo simples para pequenas distâncias (não usar para grandes distâncias)
  const R = 6371000; // Raio da Terra em metros
  const toRad = deg => deg * Math.PI / 180;
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLng = toRad(coord2.lng - coord1.lng);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function formatarDataISO(iso) {
  const d = new Date(iso);
  return d.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

function renderizarCards() {
  const lista = document.getElementById('lista-servicos');
  lista.innerHTML = '';
  servicos.forEach((s, idx) => {
    // Validação cruzada
    const distAntes = distanciaEmMetros(s.localDemanda, s.fotoAntes.gps);
    const distDepois = distanciaEmMetros(s.localDemanda, s.fotoDepois.gps);
    const tempoAntes = Math.abs(new Date(s.envioAntes) - new Date(s.fotoAntes.exifData.dataFoto)) / 60000;
    const tempoDepois = Math.abs(new Date(s.envioDepois) - new Date(s.fotoDepois.exifData.dataFoto)) / 60000;
    const distanciaMax = 100; // metros
    const tempoMax = 30; // minutos
    const validoAntes = distAntes <= distanciaMax && tempoAntes <= tempoMax;
    const validoDepois = distDepois <= distanciaMax && tempoDepois <= tempoMax;
    const aprovado = validoAntes && validoDepois;
    const inconsistencias = [];
    if (!validoAntes) inconsistencias.push('Foto "Antes" fora do raio ou horário.');
    if (!validoDepois) inconsistencias.push('Foto "Depois" fora do raio ou horário.');

    lista.innerHTML += `
      <div class="card-auditoria" data-id="${s.id}">
        <div class="info-servico">
          <strong>Prestador:</strong> ${s.nome}<br>
          <strong>Serviço:</strong> ${s.servico}<br>
          <strong>Endereço:</strong> ${s.endereco}
        </div>
        <div class="fotos-comparacao">
          <div>
            <img src="${s.fotoAntes.url}" alt="Foto Antes" />
            <div class="info-servico">
              <strong>Antes</strong><br>
              GPS: ${s.fotoAntes.gps.lat.toFixed(6)}, ${s.fotoAntes.gps.lng.toFixed(6)}<br>
              EXIF: ${formatarDataISO(s.fotoAntes.exifData.dataFoto)}<br>
              Envio: ${formatarDataISO(s.envioAntes)}<br>
              Dist.: ${distAntes.toFixed(1)}m | Δt: ${tempoAntes.toFixed(1)}min
            </div>
          </div>
          <div>
            <img src="${s.fotoDepois.url}" alt="Foto Depois" />
            <div class="info-servico">
              <strong>Depois</strong><br>
              GPS: ${s.fotoDepois.gps.lat.toFixed(6)}, ${s.fotoDepois.gps.lng.toFixed(6)}<br>
              EXIF: ${formatarDataISO(s.fotoDepois.exifData.dataFoto)}<br>
              Envio: ${formatarDataISO(s.envioDepois)}<br>
              Dist.: ${distDepois.toFixed(1)}m | Δt: ${tempoDepois.toFixed(1)}min
            </div>
          </div>
        </div>
        ${inconsistencias.length > 0 ? `<div style="color:#cf2e2e;font-weight:600;">Inconsistências: ${inconsistencias.join(' ')}</div>` : ''}
        <div class="acoes">
          <button class="btn-aprovar" ${aprovado ? '' : 'disabled'} onclick="aprovar(${s.id})">Aprovar</button>
          <button class="btn-reprovar" ${!aprovado ? '' : 'disabled'} onclick="reprovar(${s.id})">Reprovar</button>
        </div>
      </div>
    `;
  });
}

function aprovar(id) {
  // Simula notificação via WhatsApp
  window.location.href = `whatsapp-notificacao.html?status=aprovado&valor=120.00&previsao=05/07/2024`;
}

function reprovar(id) {
  // Simula notificação via WhatsApp
  window.location.href = `whatsapp-notificacao.html?status=reprovado&motivo=Inconsistência%20detectada%20nas%20fotos.%20Envie%20novas%20imagens%20com%20localização%20correta.`;
}

window.onload = renderizarCards;