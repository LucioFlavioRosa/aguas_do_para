// prototipos/assets/js/demanda-dispatcher.js
// Lógica de disparo de demandas (Bloco 2 - Web App)
(function () {
  let parceiros = JSON.parse(localStorage.getItem('parceirosCadastrados')) || [];
  let demandas = JSON.parse(localStorage.getItem('demandas')) || [];
  let aceites = {}; // { idDemanda: idParceiro }

  function filtrarParceiros(tipoServico) {
    return parceiros.filter(p => p.servicos && p.servicos.includes(tipoServico));
  }

  function selecionarParceiros(ids) {
    if (ids.length > 5) ids = ids.slice(0, 5);
    return parceiros.filter(p => ids.includes(p.id));
  }

  function simularEnvioMulticanal(demanda, parceirosSelecionados, cb) {
    // Simula envio WhatsApp/SMS/Email com loading
    document.dispatchEvent(new CustomEvent('demanda:envio-iniciado', { detail: { demanda, parceiros: parceirosSelecionados } }));
    setTimeout(() => {
      document.dispatchEvent(new CustomEvent('demanda:envio-finalizado', { detail: { demanda, parceiros: parceirosSelecionados } }));
      if (cb) cb();
    }, 1800);
  }

  function registrarAceite(idDemanda, idParceiro) {
    if (!aceites[idDemanda]) {
      aceites[idDemanda] = idParceiro;
      atualizarStatusDemanda(idDemanda, 'ACEITO', idParceiro);
      document.dispatchEvent(new CustomEvent('demanda:aceite', { detail: { idDemanda, idParceiro } }));
    } else {
      document.dispatchEvent(new CustomEvent('demanda:recusado', { detail: { idDemanda, idParceiro } }));
    }
  }

  function atualizarStatusDemanda(idDemanda, status, idParceiro) {
    demandas = demandas.map(d => {
      if (d.id === idDemanda) {
        d.status = status;
        d.parceiro = idParceiro || null;
      }
      return d;
    });
    localStorage.setItem('demandas', JSON.stringify(demandas));
  }

  // Exemplo de integração UI
  document.addEventListener('demanda:criar', function (e) {
    const demanda = e.detail;
    demanda.id = 'dem_' + Date.now();
    demanda.status = 'PENDENTE';
    demandas.push(demanda);
    localStorage.setItem('demandas', JSON.stringify(demandas));
    document.dispatchEvent(new CustomEvent('demanda:criada', { detail: demanda }));
  });

  document.addEventListener('demanda:disparar', function (e) {
    const { idDemanda, idsParceiros } = e.detail;
    const demanda = demandas.find(d => d.id === idDemanda);
    const parceirosSelecionados = selecionarParceiros(idsParceiros);
    simularEnvioMulticanal(demanda, parceirosSelecionados);
  });

  document.addEventListener('demanda:aceitar', function (e) {
    const { idDemanda, idParceiro } = e.detail;
    registrarAceite(idDemanda, idParceiro);
  });

  document.addEventListener('demanda:cancelar', function (e) {
    const { idDemanda } = e.detail;
    atualizarStatusDemanda(idDemanda, 'PENDENTE', null);
    delete aceites[idDemanda];
    document.dispatchEvent(new CustomEvent('demanda:reaberta', { detail: { idDemanda } }));
  });

  window.DemandaDispatcher = {
    filtrarParceiros,
    selecionarParceiros,
    simularEnvioMulticanal,
    registrarAceite,
    atualizarStatusDemanda,
    getDemandas: () => demandas,
    getParceiros: () => parceiros,
    getAceites: () => aceites
  };
})();
