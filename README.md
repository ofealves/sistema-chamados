# Nexou | Sistema de Chamados

Sistema de chamados desenvolvido para simular o fluxo de suporte interno de uma empresa, com dashboard, gerenciamento de tickets, relatórios e interface responsiva para desktop e mobile.

🔗 **Deploy:** https://sistema-chamados-kappa.vercel.app  
🔗 **Repositório:** https://github.com/ofealves/sistema-chamados

---

## Sobre o projeto

O **Nexou** é uma aplicação front-end criada para simular um sistema de abertura e acompanhamento de chamados técnicos.

A proposta do projeto foi sair dos exemplos mais comuns de portfólio e construir algo mais próximo de uma aplicação administrativa real, com múltiplas páginas, navegação lateral, indicadores, listagens, filtros e relatórios visuais.

Em vez de focar apenas em uma interface bonita, a ideia aqui foi trabalhar também a organização das informações, a experiência de uso e a adaptação do sistema para diferentes tamanhos de tela.

---

## Objetivo

Este projeto foi desenvolvido para praticar:

- construção de interfaces administrativas com Next.js
- componentização com React
- tipagem com TypeScript
- organização de dados e métricas em dashboard
- filtros, ordenação e paginação
- uso de formulários com validação
- responsividade em layouts mais complexos

---

## Funcionalidades

- Dashboard com visão geral dos chamados
- Cards com indicadores principais
- Listagem de chamados recentes
- Tela de gerenciamento de chamados
- Filtro por status
- Filtro por prioridade
- Ordenação por data
- Página de relatórios com resumo geral
- Gráficos de status e prioridade
- Paginação na listagem de relatórios
- Tela para abertura de novo chamado
- Layout responsivo para mobile, tablet e desktop

---

## Estrutura do sistema

### Dashboard

Página inicial com uma visão rápida dos dados mais importantes do sistema.

Nela, é possível visualizar:

- total de chamados
- chamados em aberto
- chamados em andamento
- chamados resolvidos
- quantidade de chamados com alta prioridade
- listagem dos chamados mais recentes
- resumos rápidos por prioridade e status

### Chamados

Tela voltada para a visualização e navegação entre os tickets cadastrados.

Permite:

- listar os chamados
- filtrar por status
- filtrar por prioridade
- ordenar por data
- acessar os detalhes de cada chamado

### Relatórios

Página criada para concentrar uma leitura mais analítica dos dados.

Inclui:

- cards com indicadores principais
- gráficos para distribuição por status
- gráficos para distribuição por prioridade
- listagem paginada de chamados

### Novo chamado

Tela voltada para o cadastro de novos tickets dentro do sistema.

---

## Tecnologias utilizadas

Este projeto foi construído com:

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **React Hook Form**
- **Zod**
- **Recharts**
- **Lucide React**
- **Vercel** para deploy

---

## Responsividade

Um dos pontos mais trabalhados durante o desenvolvimento foi a responsividade.

O sistema passou por ajustes para melhorar a experiência em diferentes dispositivos, principalmente em:

- tabelas adaptadas para visual de cards no mobile
- reorganização de grids em telas intermediárias
- melhor distribuição dos cards no notebook
- ajustes de espaçamento e leitura em telas menores

A ideia foi manter a interface consistente sem perder usabilidade entre celular, tablet e desktop.

---

## Decisões de implementação

Algumas escolhas foram importantes no projeto:

- os dados usados atualmente são mockados, para permitir foco inicial maior na interface e na experiência do usuário
- a navegação foi organizada no formato de painel administrativo, simulando um sistema interno
- as páginas foram separadas por responsabilidade, facilitando manutenção e evolução futura
- em telas menores, algumas estruturas em tabela foram substituídas por cards para melhorar a leitura
- o dashboard foi pensado para destacar rapidamente os indicadores mais relevantes do sistema

---

## Pontos que o projeto já demonstra

Mesmo sendo uma aplicação front-end, o projeto já mostra prática com elementos importantes de uma aplicação real:

- organização de layout administrativo
- separação de componentes
- manipulação de dados para exibição
- construção de dashboard
- validação de formulário com bibliotecas usadas no ecossistema React
- preocupação com experiência do usuário
- adaptação entre diferentes tamanhos de tela

---

## Melhorias futuras

Este projeto ainda pode evoluir bastante. Algumas melhorias planejadas são:

- integração com back-end
- autenticação de usuários
- persistência em banco de dados
- cadastro real de chamados
- edição e exclusão de tickets
- busca por termos
- exportação real de relatórios em PDF
- diferentes níveis de acesso por perfil
- dados dinâmicos no dashboard
- integração com API

---

## Como rodar o projeto localmente

Clone o repositório:
Entre na pasta do projeto:
```bash
cd sistema-chamados
```
Instale as dependências:
```bash
npm install
```
Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
Depois, abra no navegador:
```bash
http://localhost:3000
```

Aprendizados

Esse projeto foi importante para consolidar minha prática em desenvolvimento front-end, principalmente em interfaces administrativas mais completas.

Durante a construção, trabalhei pontos como:

estruturação de páginas

componentização

leitura e organização visual de dados

ajustes de responsividade

construção de uma interface com aparência mais próxima de sistemas usados no dia a dia

Mais do que montar telas isoladas, a proposta foi desenvolver uma aplicação com fluxo, navegação e consistência visual.

Status do projeto

Atualmente, o projeto está em evolução e representa uma base sólida para expansão com back-end, autenticação e persistência de dados.

Hoje ele funciona bem como demonstração de interface, estrutura de sistema e experiência de uso em uma aplicação administrativa.

Autor

Desenvolvido por Felipe Alves.

LinkedIn: https://www.linkedin.com/in/oifelipealves/

Portfólio: https://portfolio-two-delta-w8vbs00b29.vercel.app/

```bash
git clone https://github.com/ofealves/sistema-chamados.git