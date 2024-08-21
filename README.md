# Descrição do Teste Técnico

## Como começar

- Faça um fork deste teste na sua conta do github.
- Crie uma branch com o seu nome.
- Realize commits com frequência.

## Objetivo

Implementar uma Projeto em Next que:

- Receba um arquivo CSV contendo medicamentos.
- Realize validações específicas nos medicamentos.
- Registre os medicamentos validados em um banco de dados.
- Gere um resumo dos medicamentos não validadas.

## Requisitos Funcionais

### Recebimento do Arquivo

- Pagina que tenha um formulário para criar medicamentos individualmente e um input para receber um arquivo csv e um botão para confirmar o upload de medicamentos massivos.
- A API deve oferecer um endpoint para o upload de arquivos CSV.
- O arquivo deve seguir o formato especificado: `name;ean;stock;price`.

### Validações

1. **EAN desformatado**: Medicamentos com EANs menores que 7 e maiores que 11 caracteres são consideradas inválidas.
2. **Medicamentos Duplicados**: Um medicamento é duplicado se existir outro já registrado com os mesmos valores de `name`, e `ean`. Tais operações são consideradas inválidas.
3. **Valores Suspeitos**: Medicamentos com valores acima de R$500,00 ou com estoque a baixo de 4 são marcados como suspeitos, mas ainda válidos para inclusão no banco de dados.
4. Os Valores estão em centavos, desta forma 100 = R$1

### Processamento do Arquivo

- O arquivo deve ser lido e as operações devem ser validadas conforme as regras acima.
- As operações validadas devem ser armazenadas em um banco de dados (já existe um db na pasta `lib/data`).

### Resposta da API

Após o processamento do arquivo, a API deve retornar uma resposta contendo:

- Número de operações validadas e inseridas no banco de dados.
- Resumo das operações não validadas, incluindo o motivo.

### Geraçao do Arquivo

- Utilize a pagina `csv` para gerar o arquivo com os medicamentos.

### O que esperamos:

- Aplicação de conceitos para a criação de um projeto next.js eficiente.
- Aplicação de conceitos para a criação de uma API REST eficiente.
- Aplicação de conceitos para a criação de componentes `client` e `server` eficiente.
- Estratégias para a solução de problemas em tempo real.
- Capacidade de testar e validar sua solução.
- Persistência em banco de dados.

### Critérios de Avaliação:

- Testabilidade e Manutenibilidade.
- Eficiência e Preparo para Escalabilidade.
- Modularidade, Organização e Reutilização de Código.
- A preocupação com segurança também será considerada um plus na sua solução.
