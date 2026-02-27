# CHANGELOG - Prototipo Priorização de Investimentos Aegea

## Versão 1.0 - [DATA DE ENTREGA]

### 1. Páginas e Funcionalidades Implementadas
- **prototipos/bloco2-gestao-demandas.html**
  - Listagem de pedidos pendentes (cards interativos com modal de detalhes)
  - Listagem de prestadores habilitados (tabela com seleção de até 5 prestadores)
  - Botão para disparar demanda (ativa modal de sucesso)
  - Modais de detalhes do serviço e confirmação de disparo
  - Validação de seleção de prestadores
  - Layout responsivo e identidade visual conforme template Aegea

### 2. Dados Mockados Utilizados
- Cards de pedidos pendentes com serviços fictícios (ex: Vazamento em via pública, Troca de hidrômetro, Desobstrução de esgoto)
- Lista de prestadores habilitados com nomes, endereços, veículos e quantidade de serviços
- Dados de serviços detalhados para exibição em modal

### 3. Limitações Conhecidas
- Não há integração real com sistemas externos (ex: ArcGIS, banco de dados, APIs)
- Dados exibidos são totalmente mockados e não persistem após recarregar a página
- Não há backend implementado; toda lógica é client-side
- Não há autenticação de usuários
- Navegação entre páginas e funcionalidades depende de implementação futura
- Exportação de simulações e upload de arquivos Excel ainda não implementados
- Não há tratamento de erros avançado ou logs

### 4. Observações
- O protótipo foi construído para fins de validação de fluxo e interface, não sendo recomendado para uso em produção.
- A estrutura, estilos e scripts seguem o padrão do template Aegea para garantir identidade visual.
- Este changelog será atualizado em futuras versões conforme novas funcionalidades e correções forem implementadas.
