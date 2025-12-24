// prototipos/assets/js/onboarding-flow.js
// Lógica do fluxo de cadastro (Bloco 1 - WhatsApp)
(function () {
  const STEPS = [
    'triagem-cnpj',
    'video-explicativo',
    'valida-celular',
    'dados-basicos',
    'checklist-servicos',
    'recursos-disponibilidade',
    'upload-cnh-selfie-pix',
    'termo-aceite',
    'finalizado'
  ];

  let currentStep = 0;
  let onboardingData = JSON.parse(localStorage.getItem('onboardingData')) || {};

  function saveData(key, value) {
    onboardingData[key] = value;
    localStorage.setItem('onboardingData', JSON.stringify(onboardingData));
  }

  function validateCNPJ(cnpj) {
    // Regex para CNPJ: 14 dígitos, permite máscara
    const re = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/;
    return re.test(cnpj.replace(/\D/g, ''));
  }

  function nextStep() {
    if (currentStep < STEPS.length - 1) {
      currentStep++;
      renderStep();
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
      renderStep();
    }
  }

  function renderStep() {
    const step = STEPS[currentStep];
    document.dispatchEvent(new CustomEvent('onboarding:step', { detail: { step, onboardingData } }));
  }

  // Simulação de envio ao backend
  function submitOnboarding() {
    // Aqui seria chamada API real
    setTimeout(() => {
      localStorage.removeItem('onboardingData');
      document.dispatchEvent(new CustomEvent('onboarding:finalizado'));
    }, 1200);
  }

  // Eventos de UI simulada (exemplo de integração)
  document.addEventListener('onboarding:input', function (e) {
    const { key, value } = e.detail;
    if (key === 'cnpj') {
      if (!validateCNPJ(value)) {
        document.dispatchEvent(new CustomEvent('onboarding:erro', { detail: { msg: 'CNPJ inválido' } }));
        return;
      }
      saveData('cnpj', value);
      // Simula consulta API
      document.dispatchEvent(new CustomEvent('onboarding:loading', { detail: { msg: 'Consultando CNPJ...' } }));
      setTimeout(() => {
        document.dispatchEvent(new CustomEvent('onboarding:api-cnpj-ok'));
        nextStep();
      }, 1200);
      return;
    }
    saveData(key, value);
    nextStep();
  });

  document.addEventListener('onboarding:checklist', function (e) {
    const { key, values } = e.detail;
    saveData(key, values);
    nextStep();
  });

  document.addEventListener('onboarding:upload', function (e) {
    const { key, file } = e.detail;
    // Apenas simula upload (file é File ou base64)
    saveData(key, file);
    nextStep();
  });

  document.addEventListener('onboarding:aceite', function (e) {
    saveData('termo_aceite', true);
    submitOnboarding();
  });

  // Inicialização
  window.OnboardingFlow = {
    start: function () {
      currentStep = 0;
      onboardingData = {};
      localStorage.removeItem('onboardingData');
      renderStep();
    },
    next: nextStep,
    prev: prevStep,
    getStep: function () { return STEPS[currentStep]; },
    getData: function () { return onboardingData; }
  };
})();
