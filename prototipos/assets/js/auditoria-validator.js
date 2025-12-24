// auditoria-validator.js
// Lógica de auditoria para validação de execução de serviço (Bloco 3 - Aegea)

/**
 * Calcula a distância entre dois pontos GPS em metros (Haversine)
 * @param {Object} coord1 {lat: number, lng: number}
 * @param {Object} coord2 {lat: number, lng: number}
 * @returns {number} Distância em metros
 */
function calcularDistancia(coord1, coord2) {
  const R = 6371e3; // Raio da Terra em metros
  const toRad = deg => deg * Math.PI / 180;
  const lat1 = toRad(coord1.lat);
  const lat2 = toRad(coord2.lat);
  const deltaLat = toRad(coord2.lat - coord1.lat);
  const deltaLng = toRad(coord2.lng - coord1.lng);
  const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLng/2) * Math.sin(deltaLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

/**
 * Valida se o timestamp de envio está próximo ao timestamp de criação da foto
 * @param {Date} envio
 * @param {Date} criacao
 * @param {number} toleranciaMinutos
 * @returns {boolean}
 */
function validarTimestamp(envio, criacao, toleranciaMinutos = 5) {
  const diff = Math.abs(envio.getTime() - criacao.getTime());
  return diff <= toleranciaMinutos * 60 * 1000;
}

/**
 * Função principal de auditoria
 * @param {Object} dadosServico {localizacao: {lat, lng}, horario: Date}
 * @param {Object} fotoAntes {localizacao: {lat, lng}, horarioEnvio: Date, horarioCriacao: Date}
 * @param {Object} fotoDepois {localizacao: {lat, lng}, horarioEnvio: Date, horarioCriacao: Date}
 * @param {number} distanciaMaxMetros
 * @returns {Object} status e mensagens
 */
function auditarExecucao(dadosServico, fotoAntes, fotoDepois, distanciaMaxMetros = 100) {
  const resultado = {
    inconsistencias: [],
    aprovado: false,
    ordemPagamento: null
  };

  // 1. Verifica distância das fotos para o local do serviço
  const distAntes = calcularDistancia(dadosServico.localizacao, fotoAntes.localizacao);
  const distDepois = calcularDistancia(dadosServico.localizacao, fotoDepois.localizacao);
  if (distAntes > distanciaMaxMetros) {
    resultado.inconsistencias.push(`Foto 'Antes' fora do local do serviço (${distAntes.toFixed(1)}m)`);
  }
  if (distDepois > distanciaMaxMetros) {
    resultado.inconsistencias.push(`Foto 'Depois' fora do local do serviço (${distDepois.toFixed(1)}m)`);
  }

  // 2. Valida timestamps
  if (!validarTimestamp(fotoAntes.horarioEnvio, fotoAntes.horarioCriacao)) {
    resultado.inconsistencias.push("Horário de envio da foto 'Antes' muito diferente do horário de criação da foto.");
  }
  if (!validarTimestamp(fotoDepois.horarioEnvio, fotoDepois.horarioCriacao)) {
    resultado.inconsistencias.push("Horário de envio da foto 'Depois' muito diferente do horário de criação da foto.");
  }

  // 3. Aprovação
  if (resultado.inconsistencias.length === 0) {
    resultado.aprovado = true;
    resultado.ordemPagamento = gerarOrdemPagamentoMock();
  }

  return resultado;
}

/**
 * Exibe alertas de inconsistência na UI (mock)
 * @param {Array} inconsistencias
 */
function exibirAlertas(inconsistencias) {
  inconsistencias.forEach(msg => {
    alert('Inconsistência detectada: ' + msg);
  });
}

/**
 * Simula atualização de status na UI (mock)
 * @param {boolean} aprovado
 */
function atualizarStatusUI(aprovado) {
  const statusEl = document.getElementById('status-auditoria');
  if (!statusEl) return;
  statusEl.textContent = aprovado ? 'Aprovado' : 'Reprovado';
  statusEl.className = aprovado ? 'aprovado' : 'reprovado';
}

/**
 * Mock de geração de ordem de pagamento
 * @returns {Object}
 */
function gerarOrdemPagamentoMock() {
  return {
    numero: 'SAP-' + Math.floor(Math.random() * 100000),
    valor: 'R$ 250,00',
    data: new Date().toLocaleDateString()
  };
}

// Exemplo de uso (mock):
// const resultado = auditarExecucao(servico, fotoAntes, fotoDepois);
// if (!resultado.aprovado) exibirAlertas(resultado.inconsistencias);
// atualizarStatusUI(resultado.aprovado);
// if (resultado.ordemPagamento) console.log('Ordem de pagamento:', resultado.ordemPagamento);
