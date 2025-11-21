# 🌐 FuturoConecta - Plataforma de Rede Profissional

## 📋 Sobre o Projeto

**FuturoConecta** é uma plataforma web moderna de rede profissional desenvolvida para conectar profissionais ao futuro do trabalho. O sistema permite visualizar, buscar e gerenciar perfis profissionais com informações detalhadas sobre experiências, habilidades, formação e projetos.

Este projeto full-stack combina um **frontend em React** com um **backend em FastAPI**, oferecendo uma experiência completa de desenvolvimento web moderno.

## 👥 Integrantes do Projeto

- **Murilo Gonzalez Bez Chleba** - RM 566199
- **Guilherme Augusto F. Fernandes** - RM 562107
- **Caio Marques Lins** - RM 559805

## 🎯 Objetivo Acadêmico

Projeto desenvolvido para o curso de **Engenharia de Software** da FIAP, integrando conceitos de:

- Desenvolvimento Frontend Moderno (React + Vite)
- APIs REST e Integração Backend
- Gerenciamento de Estado e Hooks
- Design Responsivo e Acessibilidade
- Estruturas de Dados e Algoritmos

## ⚡ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool rápido e moderno
- **Tailwind CSS** - Framework CSS utility-first
- **JavaScript ES6+** - Linguagem de programação

### Backend
- **Python 3.10+** - Linguagem de programação
- **FastAPI** - Framework web moderno
- **SQLAlchemy** - ORM para banco de dados
- **SQLite** - Banco de dados relacional

## 🎨 Funcionalidades

### Interface do Usuário
- ✅ Visualização de perfis profissionais em cards
- ✅ Sistema de busca textual avançado
- ✅ Filtros por área, cidade e tecnologia
- ✅ Modal com detalhes completos do perfil
- ✅ Modo escuro/claro (Dark Mode)
- ✅ Design responsivo para todos os dispositivos
- ✅ Animações e transições suaves

### Gerenciamento de Dados
- ✅ Cadastro de novos profissionais
- ✅ Integração com API REST
- ✅ Alternância entre dados locais (JSON) e API
- ✅ Validação de formulários
- ✅ Feedback visual de ações

### Recursos Avançados
- ✅ Sistema de recomendação de profissionais
- ✅ Envio de mensagens (simulado)
- ✅ Contador de resultados dinâmico
- ✅ Status de conectividade com API
- ✅ Tratamento de erros e fallback

## 📂 Estrutura do Projeto

```
futuroconecta/
├── back-end/                   # Backend em Python/FastAPI
│   ├── main.py                # Aplicação principal da API
│   ├── database.py            # Configuração do banco de dados
│   ├── models.py              # Models SQLAlchemy
│   ├── schemas.py             # Schemas de validação
│   ├── crud.py                # Operações CRUD
│   ├── seed.py                # Script para popular banco
│   ├── requirements.txt       # Dependências Python
│   └── README.md             # Documentação do backend
│
├── src/                       # Código-fonte do frontend
│   ├── components/           # Componentes React
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProfileCard.jsx
│   │   ├── ProfileModal.jsx
│   │   ├── SearchAndFilters.jsx
│   │   ├── AddProfessionalModal.jsx
│   │   ├── DarkModeToggle.jsx
│   │   ├── DataSourceToggle.jsx
│   │   └── TagList.jsx
│   │
│   ├── data/                 # Dados estáticos
│   │   └── profissionais.json
│   │
│   ├── services/             # Serviços e APIs
│   │   └── api.js
│   │
│   ├── App.jsx              # Componente principal
│   ├── main.jsx             # Entry point
│   └── index.css            # Estilos globais
│
├── public/                   # Arquivos públicos
├── index.html               # HTML principal
├── package.json             # Dependências Node
├── vite.config.js           # Configuração Vite
├── tailwind.config.cjs      # Configuração Tailwind
└── README.md               # Esta documentação
```

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- **Node.js 16+** e npm (para o frontend)
- **Python 3.10+** e pip (para o backend)

### Instalação e Execução

#### 1. Frontend (React)

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em: **http://localhost:5173**

#### 2. Backend (FastAPI)

```bash
# Navegar para a pasta do backend
cd back-end

# Criar ambiente virtual (recomendado)
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Instalar dependências
pip install -r requirements.txt

# Popular banco de dados
python seed.py

# Iniciar servidor
python main.py
```

O backend estará disponível em: **http://localhost:8000**

### Modo de Desenvolvimento Completo

1. Em um terminal, inicie o backend (porta 8000)
2. Em outro terminal, inicie o frontend (porta 5173)
3. Acesse http://localhost:5173 no navegador
4. Use o toggle "Fonte de Dados" para alternar entre JSON local e API

## 📱 Usando a Aplicação

### Navegação Principal

1. **Visualizar Profissionais**: Cards exibidos na página inicial
2. **Buscar**: Use a barra de busca para encontrar por nome, cargo ou habilidade
3. **Filtrar**: Selecione área, cidade ou tecnologia nos filtros
4. **Ver Detalhes**: Clique em um card para abrir o modal com informações completas
5. **Adicionar Profissional**: Clique no botão flutuante "+" no canto inferior direito

### Funcionalidades do Modal

- **Recomendar Profissional**: Marque o profissional como recomendado
- **Enviar Mensagem**: Simule o envio de uma mensagem
- **Visualizar Portfolio**: Veja projetos, experiências e formação completa

### Alternando Fontes de Dados

Use o toggle no topo da página para alternar entre:
- **JSON Local**: Dados estáticos do arquivo `profissionais.json`
- **API Backend**: Dados dinâmicos do backend FastAPI

## 🎨 Design e Interface

### Paleta de Cores

- **Primary**: Azul (#3B82F6) - Ações principais e destaques
- **Background Claro**: Cinza claro (#F9FAFB)
- **Background Escuro**: Cinza escuro (#111827)
- **Texto**: Cinza (#1F2937) / Branco (#FFFFFF)

### Componentes Principais

- **ProfileCard**: Card de visualização rápida do profissional
- **ProfileModal**: Modal com informações detalhadas
- **SearchAndFilters**: Sistema de busca e filtros
- **AddProfessionalModal**: Formulário de cadastro
- **DarkModeToggle**: Alternador de tema claro/escuro
- **DataSourceToggle**: Alternador de fonte de dados

## 📡 Integração com API

### Endpoints Utilizados

```javascript
GET    /api/profissionais          # Lista profissionais
GET    /api/profissionais/{id}     # Busca por ID
POST   /api/profissionais          # Cria profissional
PUT    /api/profissionais/{id}     # Atualiza profissional
DELETE /api/profissionais/{id}     # Deleta profissional
GET    /api/areas                  # Lista áreas únicas
GET    /api/cidades                # Lista cidades únicas
GET    /api/tecnologias            # Lista tecnologias únicas
GET    /api/estatisticas           # Estatísticas gerais
```

### Tratamento de Erros

A aplicação implementa fallback automático para dados locais caso a API não esteja disponível, garantindo funcionamento contínuo.

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Gera build de produção
npm run preview      # Preview do build de produção
npm run lint         # Executa linter
```

## 🌐 Responsividade

A aplicação é totalmente responsiva e otimizada para:

- 📱 **Mobile**: 320px - 767px
- 📱 **Tablet**: 768px - 1023px
- 💻 **Desktop**: 1024px - 1439px
- 🖥️ **Large Desktop**: 1440px+

## ♿ Acessibilidade

- Suporte a leitores de tela
- Navegação por teclado
- Contraste adequado (WCAG 2.1)
- Labels semânticos
- ARIA attributes

## 📊 Dados do Sistema

O sistema gerencia perfis profissionais com:

- Informações básicas (nome, cargo, localização, área)
- Experiências profissionais
- Formação acadêmica
- Habilidades técnicas (Hard Skills)
- Soft Skills
- Projetos e portfólio
- Certificações
- Idiomas
- Áreas de interesse

## 🔐 Segurança

- Validação de dados no frontend e backend
- Sanitização de inputs
- CORS configurado adequadamente
- Proteção contra XSS

## 📈 Performance

- Lazy loading de componentes
- Otimização de re-renders com useMemo
- Build otimizado com Vite
- Assets comprimidos
- Code splitting automático

## 🐛 Troubleshooting

### Problema: API não conecta

**Solução**: Verifique se o backend está rodando em http://localhost:8000

### Problema: Dados não aparecem

**Solução**: Certifique-se de ter executado `python seed.py` no backend

### Problema: Estilos não carregam

**Solução**: Execute `npm install` para instalar todas as dependências

### Problema: Erro ao cadastrar profissional

**Solução**: Verifique se todos os campos obrigatórios estão preenchidos e se o backend está ativo

## 🤝 Contribuindo

Este é um projeto acadêmico, mas sugestões são bem-vindas:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos na FIAP.

## 📞 Contato

Para dúvidas ou sugestões sobre o projeto:

- **Murilo Gonzalez Bez Chleba** - RM 566199
- **Guilherme Augusto F. Fernandes** - RM 562107
- **Caio Marques Lins** - RM 559805

---

**FuturoConecta** - Conectando profissionais ao futuro do trabalho 🚀

Desenvolvido com ❤️ por estudantes da FIAP

