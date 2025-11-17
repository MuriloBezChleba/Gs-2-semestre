# 🔗 Integração Frontend + Backend - FuturoConecta

## 📋 Visão Geral

O frontend React agora pode **alternar entre duas fontes de dados**:
1. **JSON Local** - Arquivo `src/data/profissionais.json` (padrão)
2. **API Backend** - Servidor FastAPI em `http://localhost:8000`

## ✨ Funcionalidades Implementadas

### 🔄 Toggle de Fonte de Dados

Um novo componente `DataSourceToggle` foi adicionado ao topo da página principal, permitindo:
- ✅ Alternar entre JSON local e API backend
- ✅ Indicador visual do status da API (Online/Offline)
- ✅ Persistência da preferência no `localStorage`
- ✅ Verificação automática de disponibilidade da API
- ✅ Tooltip explicativo sobre cada fonte

### 📡 Serviço de API (`src/services/api.js`)

Novo módulo com funções para comunicação com o backend:

```javascript
// Configuração
setUseAPI(true/false)        // Define qual fonte usar
isUsingAPI()                 // Verifica fonte atual

// Endpoints implementados
fetchProfissionais(params)   // GET /api/profissionais (com filtros)
fetchProfissionalById(id)    // GET /api/profissionais/{id}
fetchAreas()                 // GET /api/areas
fetchCidades()               // GET /api/cidades
fetchTecnologias()           // GET /api/tecnologias
fetchEstatisticas()          // GET /api/estatisticas
createProfissional(data)     // POST /api/profissionais
updateProfissional(id, data) // PUT /api/profissionais/{id}
deleteProfissional(id)       // DELETE /api/profissionais/{id}
checkAPIHealth()             // GET /health
```

### 🎯 Compatibilidade de Dados

O sistema automaticamente converte os nomes de campos entre frontend e backend:

| Frontend | Backend |
|----------|---------|
| `habilidadesTecnicas` | `habilidades_tecnicas` |
| `softSkills` | `soft_skills` |
| `areaInteresses` | `area_interesses` |

## 🚀 Como Usar

### Passo 1: Certificar que o Backend está Rodando

```bash
cd back-end
.\venv\Scripts\python.exe main.py
```

Você deve ver:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

### Passo 2: Iniciar o Frontend

```bash
# Na raiz do projeto
npm run dev
```

Acesse: `http://localhost:5173`

### Passo 3: Alternar Entre Fontes de Dados

1. Na página principal, procure o componente **"Fonte de Dados"** no topo
2. Observe o indicador de status:
   - 🟢 **API Online** - Backend está respondendo
   - 🔴 **API Offline** - Backend não está disponível
3. Clique no toggle para alternar:
   - **Desligado (Cinza)** = JSON Local
   - **Ligado (Azul)** = API Backend
4. A preferência é salva automaticamente no navegador

## 📊 Comportamento do Sistema

### Usando JSON Local (Padrão)

- ✅ **Mais rápido** - Dados já estão no bundle
- ✅ **Funciona offline** - Não precisa de backend
- ✅ **60 perfis estáticos**
- ❌ Não permite criar/editar/deletar

### Usando API Backend

- ✅ **Dados dinâmicos** - Sincronizado com banco de dados
- ✅ **CRUD completo** - Pode criar, editar e deletar
- ✅ **Filtros no servidor** - Mais eficiente para grandes volumes
- ❌ Requer backend rodando
- ❌ Leve delay de rede

### Fallback Automático

Se você ativar a API mas ela não estiver disponível:
1. Sistema tenta conectar
2. Exibe mensagem de erro amarela
3. **Volta automaticamente para JSON local**
4. Nenhum dado é perdido

## 🔧 Recursos Avançados

### Estado de Carregamento

Quando busca dados da API:
```
🔄 Spinner animado
"Carregando dados da API..."
```

### Indicadores Visuais

O contador de resultados mostra a fonte:
```
"60 profissionais encontrados (via API Backend)"
"60 profissionais encontrados (via JSON Local)"
```

### Tratamento de Erros

```javascript
// Mensagem de erro amigável
"⚠️ Erro ao conectar com a API. Usando dados locais como fallback."
```

## 📝 Arquivos Modificados/Criados

### Novos Arquivos
1. `src/services/api.js` - Serviço de comunicação com API
2. `src/components/DataSourceToggle.jsx` - Toggle de fonte de dados

### Arquivos Modificados
1. `src/App.jsx` - Integração com API e gerenciamento de estados

## 🎨 UI/UX

### Toggle Component
```
┌─────────────────────────────────────────────────┐
│ Fonte de Dados: JSON Local  [○─────]  🔴 API   │
│                                       Offline    │
└─────────────────────────────────────────────────┘
```

Quando API está online e ativada:
```
┌─────────────────────────────────────────────────┐
│ Fonte de Dados: API Backend [─────●]  🟢 API   │
│                                        Online    │
└─────────────────────────────────────────────────┘
```

## 🧪 Testar a Integração

### 1. Teste com API Online

```bash
# Terminal 1: Backend
cd back-end
.\venv\Scripts\python.exe main.py

# Terminal 2: Frontend  
npm run dev

# Navegador
1. Acesse http://localhost:5173
2. Ative o toggle "API Backend"
3. Veja os dados carregarem da API
4. Abra DevTools > Network para ver requisições
```

### 2. Teste com API Offline

```bash
# Não inicie o backend

# Frontend
npm run dev

# Navegador
1. Acesse http://localhost:5173
2. Veja indicador "🔴 API Offline"
3. Sistema usa JSON local automaticamente
4. Tente ativar toggle - permanece desabilitado
```

### 3. Teste de Fallback

```bash
# Backend e Frontend rodando

# Navegador
1. Ative toggle "API Backend"
2. Dados carregam normalmente
3. Pare o backend (Ctrl+C no terminal)
4. Recarregue a página
5. Sistema detecta falha e volta para JSON local
```

## 📈 Próximas Melhorias Possíveis

- [ ] Cache de dados da API no localStorage
- [ ] Sincronização automática a cada X segundos
- [ ] Modo híbrido (busca local, salva na API)
- [ ] Indicador de dados "desatualizados"
- [ ] Retry automático em caso de falha
- [ ] WebSocket para atualizações em tempo real
- [ ] Otimização com React Query ou SWR

## 🔒 Segurança

Atualmente o CORS está configurado para aceitar requisições de:
- `http://localhost:5173` (Vite)
- `http://localhost:3000` (React padrão)

Para adicionar outras origens, edite `back-end/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://seu-dominio.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 📚 Documentação da API

Com o backend rodando, acesse:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 💡 Dicas de Uso

1. **Desenvolvimento**: Use JSON local para velocidade
2. **Testes de CRUD**: Use API backend
3. **Demonstração**: Mostre o toggle alternando entre ambos
4. **Produção**: Desabilite JSON local e use apenas API

## 🎓 Valor Acadêmico

Esta integração demonstra:
- ✅ **Separação de responsabilidades** (Frontend/Backend)
- ✅ **RESTful APIs** consumo correto
- ✅ **Tratamento de erros** e fallbacks
- ✅ **Estados assíncronos** (loading, error, success)
- ✅ **Persistência** no navegador
- ✅ **UX moderna** com feedback visual
- ✅ **Código limpo** e documentado

---

## 🎉 Resultado Final

✅ Frontend pode usar JSON local OU API backend  
✅ Toggle visual para alternar fontes  
✅ Fallback automático em caso de erro  
✅ Indicadores de status em tempo real  
✅ Compatibilidade total entre formatos  
✅ Experiência de usuário fluida  

**Projeto completo e profissional! 🚀**

---

**Desenvolvido para FIAP - Global Solution 2025**

