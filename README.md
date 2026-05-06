# Nexou | Sistema de Chamados

Sistema fullstack de abertura e acompanhamento de chamados técnicos, com autenticação, dashboard dinâmico, gerenciamento de tickets e relatórios com exportação em PDF.

🔗 **Deploy:** https://sistema-chamados-kappa.vercel.app  
🔗 **Backend:** https://github.com/ofealves/sistema-chamados-backend

---

## Sobre o projeto

O **Nexou** é uma aplicação fullstack criada para simular um sistema administrativo real de suporte técnico interno.

O projeto nasceu como frontend com dados mockados e evoluiu para uma aplicação completa integrada a uma API REST própria, com autenticação JWT, controle de acesso por perfil e persistência real em banco de dados.

---

## Funcionalidades

- Cadastro e login com autenticação JWT
- Dashboard com métricas reais do banco de dados
- Listagem de chamados com filtro por status, prioridade e ordenação por data
- Abertura de novo chamado com validação de formulário
- Página de detalhe de cada ticket
- Atualização de status e exclusão de tickets — apenas para admin
- Relatórios com gráficos de status e prioridade
- Exportação de relatório em PDF
- Layout responsivo para mobile, tablet e desktop
- Controle de acesso por perfil — usuário comum e administrador

---

## Tecnologias

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **React Hook Form**
- **Zod**
- **Recharts**
- **jsPDF**
- **Axios / Fetch API** para consumo da API REST
- **Vercel** para deploy

**Integração com:**
- **Node.js + Express** — API REST própria
- **MongoDB Atlas** — banco de dados em nuvem
- **JWT** — autenticação

---

## Como rodar localmente

Clone o repositório:

```bash
git clone https://github.com/ofealves/sistema-chamados.git
cd sistema-chamados
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env.local` na raiz:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse em `http://localhost:3000`.

> O backend precisa estar rodando localmente ou aponte para a URL do Railway.

---

## Decisões técnicas

**Autenticação com JWT**  
O token é armazenado no localStorage após o login. Em cada requisição autenticada, ele é enviado no header `Authorization: Bearer <token>`. O backend valida o token e identifica o usuário.

**Controle de acesso por perfil**  
O role do usuário (`user` ou `admin`) é retornado no login e salvo no localStorage. Na página de detalhe do ticket, os botões de atualizar e deletar só aparecem para administradores. No backend, as rotas de PATCH e DELETE têm um middleware de adminAuth que bloqueia usuários comuns.

**Dados dinâmicos**  
Todas as páginas buscam dados reais da API — dashboard, chamados, relatórios e detalhe do ticket. Não há mais dados mockados no projeto.

---

## Autor

Desenvolvido por Felipe Alves  
[LinkedIn](https://www.linkedin.com/in/oifelipealves/) · [Portfólio](https://portfolio-two-delta-w8vbs00b29.vercel.app/)
