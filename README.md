# FuturoConecta 🚀

## 📋 Resumo do Projeto

**FuturoConecta** é uma Single Page Application (SPA) que simula uma rede profissional focada no "futuro do trabalho", inspirada no LinkedIn. A plataforma permite visualizar, buscar e filtrar perfis de profissionais de diversas áreas, além de interagir com eles através de recomendações e mensagens.

Este projeto foi desenvolvido como parte de uma atividade acadêmica, demonstrando habilidades em desenvolvimento front-end moderno com React, Vite e Tailwind CSS.

## ✨ Funcionalidades Principais

- **Listagem de Profissionais**: Visualize 60 perfis profissionais em um grid responsivo com cards elegantes
- **Busca Avançada**: Busque profissionais por nome, cargo, habilidades e muito mais
- **Filtros Múltiplos**: Filtre por área de atuação, localização e tecnologias específicas
- **Modal de Detalhes**: Visualize informações completas do profissional incluindo:
  - Experiências profissionais detalhadas
  - Formação acadêmica
  - Habilidades técnicas e soft skills
  - Projetos e portfólio
  - Certificações
  - Idiomas
  - Áreas de interesse
- **Interações Funcionais**:
  - Botão para recomendar profissionais (com feedback visual)
  - Formulário para envio de mensagens (simulado)
- **Dark Mode**: Alternância entre modo claro e escuro com persistência no localStorage
- **Design Responsivo**: Interface otimizada para mobile, tablet e desktop

## 🛠️ Tecnologias Utilizadas

### Core
- **React 18.2** - Biblioteca JavaScript para construção de interfaces
- **Vite 5.0** - Build tool e bundler de última geração
- **JavaScript (ES6+)** - Linguagem de programação

### Estilização
- **Tailwind CSS 3.4** - Framework CSS utility-first para estilização
- **PostCSS** - Processamento de CSS
- **Autoprefixer** - Compatibilidade cross-browser automática

### Estrutura do Projeto
```
futuroconecta/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── DarkModeToggle.jsx
│   │   ├── SearchAndFilters.jsx
│   │   ├── ProfileCard.jsx
│   │   ├── ProfileModal.jsx
│   │   ├── TagList.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── profissionais.json
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.cjs
├── postcss.config.cjs
├── vite.config.js
└── README.md
```

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**

### Passo a Passo

1. **Clone o repositório** (ou baixe o código-fonte)
```bash
git clone [LINK_DO_REPOSITORIO]
cd futuroconecta
```

2. **Instale as dependências**
```bash
npm install
```
ou
```bash
yarn install
```

3. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```
ou
```bash
yarn dev
```

4. **Acesse no navegador**
```
http://localhost:5173
```

### Comandos Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Visualiza o build de produção localmente

## 🔐 Usuários e Senhas

> ⚠️ **Nota**: Este projeto não implementa sistema de autenticação. Todos os dados são fictícios e não há necessidade de login.

*(Reservado para futuras implementações)*

## 👥 Integrantes do Grupo

| Nome | RM |
|------|-----|
| [NOME_COMPLETO_1] | [RM_1] |
| [NOME_COMPLETO_2] | [RM_2] |
| [NOME_COMPLETO_3] | [RM_3] |

## 🔗 Links

- **Repositório GitHub**: [LINK_DO_REPOSITORIO]
- **Deploy (se houver)**: [LINK_DO_DEPLOY]

## 📦 Dados do Projeto

O arquivo `src/data/profissionais.json` contém **60 perfis profissionais fictícios** com dados completos e variados, incluindo:

- Profissionais de 6 áreas diferentes: Desenvolvimento, Design, Dados, Saúde, Educação e Marketing
- 20 cidades brasileiras diferentes
- Mais de 50 tecnologias e habilidades distintas
- Experiências profissionais detalhadas com períodos formatados
- Formações acadêmicas em diversas instituições
- Projetos, certificações e idiomas

## 🎨 Design e UX

- **Paleta de Cores**: Tons de azul (primary) com suporte a dark mode
- **Tipografia**: Sistema de fontes padrão otimizado para legibilidade
- **Layout**: Grid responsivo que se adapta de 1 coluna (mobile) até 4 colunas (desktop)
- **Componentes**: Cards com hover effects, modals com overlay, inputs estilizados
- **Acessibilidade**: Labels semânticos, aria-labels e navegação por teclado

## 📝 Notas de Desenvolvimento

- **Sem CSS Puro**: Todo o estilo foi implementado usando apenas classes do Tailwind CSS
- **Componentização**: Arquitetura modular com componentes reutilizáveis
- **Performance**: Uso de `useMemo` para otimizar filtragens e cálculos
- **Estado Local**: Gerenciamento de estado com React Hooks (useState, useEffect, useMemo)
- **Dados Estáticos**: JSON importado estaticamente (não requer backend)

## 🔮 Possíveis Melhorias Futuras

- [ ] Implementar sistema de autenticação real
- [ ] Adicionar paginação para melhor performance
- [ ] Implementar rotas com React Router
- [ ] Adicionar testes unitários e de integração
- [ ] Conectar com backend real e banco de dados
- [ ] Implementar sistema de notificações
- [ ] Adicionar chat em tempo real
- [ ] Permitir edição de perfis
- [ ] Sistema de recomendações com IA

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos e educacionais.

---

**Desenvolvido com ❤️ para o projeto acadêmico FIAP**

*Todos os perfis e dados são fictícios e gerados para demonstração.*
