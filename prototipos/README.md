# MVP Parceiro Águas do Pará – Prototipação

## Visão Geral
Este protótipo simula a jornada MVP do credenciamento e operação de parceiros para a Águas do Pará, conforme modelo flexível de prestação de serviços. O objetivo é demonstrar rapidamente o fluxo de onboarding via WhatsApp, gestão de demandas via webapp e execução/validação dos serviços.

## Estrutura de Arquivos

- `index.html` – Tela inicial do MVP, com acesso ao fluxo de onboarding e gestão.
- `whatsapp-simulador.html` – Simulação realista do onboarding via WhatsApp (Bloco 1).
- `gestao-demandas.html` – Webapp para operadores gerirem e despacharem ordens de serviço (Bloco 2).
- `execucao-servico.html` – Interface do parceiro para execução e finalização do serviço (Bloco 3).
- `js/main.js` – Script principal que inicializa navegação, simulação de WhatsApp, validação de formulários e simulação de envio de fotos.
- `css/` – Pasta para eventuais ajustes de estilo (opcional, pois o template Aegea já provê o visual principal).

## Fluxo de Navegação

1. **Onboarding Parceiro (WhatsApp):**
   - Acesso via botão na tela inicial.
   - Simulação de conversa WhatsApp: triagem jurídica, vídeo explicativo, checklist, envio de documentos e aceite.
   - Ao final, parceiro é considerado ativo.

2. **Gestão de Demandas (Operador):**
   - Lista de ordens de serviço.
   - Filtro de parceiros habilitados.
   - Disparo multicanal (simulado) para até 5 parceiros.
   - Aceite do primeiro parceiro bloqueia os demais.

3. **Execução do Serviço (Parceiro):**
   - Simula recebimento da OS, envio de fotos (antes/depois) com localização, justificativas e reenvio em caso de reprovação.

## Como Executar Localmente

1. Baixe/clique duas vezes nos arquivos HTML em qualquer navegador moderno.
2. Certifique-se de que todos os arquivos estejam na mesma pasta para garantir funcionamento dos scripts e navegação.
3. O protótipo não requer backend: toda a lógica é simulada via JavaScript e navegação entre páginas.

## Funcionalidades Demonstradas

- Jornada completa de onboarding via WhatsApp (com simulação de API e envio de documentos).
- Gestão de ordens de serviço e seleção de parceiros.
- Simulação de disparo multicanal e aceite de OS.
- Execução do serviço com upload de fotos e validação.
- Navegação fluida e responsiva, alinhada ao visual Aegea.

## Observações

- O protótipo é um MVP: não há persistência real de dados ou integração com APIs externas.
- O fluxo de WhatsApp é simulado para demonstrar a experiência do usuário e pode ser customizado conforme feedback.
- Todos os estilos e componentes seguem o template visual da Aegea para garantir identidade visual.
