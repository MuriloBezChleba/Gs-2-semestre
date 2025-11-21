# 🚀 FuturoConecta - Backend API

## 📋 Resumo do Projeto

API REST desenvolvida em **Python** com **FastAPI** para gerenciar perfis profissionais da plataforma FuturoConecta. Esta API serve como backend para a aplicação frontend em React, fornecendo endpoints completos de CRUD e funcionalidades de busca e filtros.

## 🎯 Objetivo Acadêmico

Este projeto foi desenvolvido para a disciplina **Computational Thinking with Python** (2º Semestre/2025) com foco em:

- ✅ **Estruturas de decisão** (if/else, match/case)
- ✅ **Estruturas de repetição** (for, while)
- ✅ **Funções** (organizadas e documentadas)
- ✅ **APIs REST** (CRUD completo)
- ✅ **Comunicação com banco de dados** (SQLAlchemy + SQLite)

## 🛠️ Tecnologias Utilizadas

- **Python 3.10+** - Linguagem de programação
- **FastAPI** - Framework web moderno e rápido
- **SQLAlchemy** - ORM para manipulação do banco de dados
- **SQLite** - Banco de dados relacional
- **Pydantic** - Validação de dados
- **Uvicorn** - Servidor ASGI

## 📂 Estrutura do Projeto

```
back-end/
├── main.py                 # Aplicação FastAPI principal
├── database.py             # Configuração do banco de dados
├── models.py               # Models SQLAlchemy
├── schemas.py              # Schemas Pydantic
├── crud.py                 # Operações CRUD e lógica de negócio
├── seed.py                 # Script para popular banco de dados
├── requirements.txt        # Dependências Python
├── .gitignore             # Arquivos ignorados pelo Git
└── README.md              # Esta documentação
```

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Python 3.10 ou superior
- pip (gerenciador de pacotes Python)

### Passo a Passo

1. **Navegar para a pasta do backend**
```bash
cd back-end
```

2. **Criar ambiente virtual (recomendado)**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

3. **Instalar dependências**
```bash
pip install -r requirements.txt
```

4. **Popular o banco de dados**
```bash
python seed.py
```
Este comando irá:
- Criar o banco de dados SQLite
- Importar os 60 perfis do frontend
- Mostrar estatísticas da importação

5. **Iniciar o servidor**
```bash
python main.py
```
ou
```bash
uvicorn main:app --reload
```

6. **Acessar a API**
- **API**: http://localhost:8000
- **Documentação interativa (Swagger)**: http://localhost:8000/docs
- **Documentação alternativa (ReDoc)**: http://localhost:8000/redoc

## 📡 Endpoints da API

### Profissionais

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/profissionais` | Lista todos os profissionais |
| GET | `/api/profissionais/{id}` | Busca profissional por ID |
| POST | `/api/profissionais` | Cria novo profissional |
| PUT | `/api/profissionais/{id}` | Atualiza profissional |
| DELETE | `/api/profissionais/{id}` | Deleta profissional |

### Filtros e Buscas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/profissionais?busca=termo` | Busca textual |
| GET | `/api/profissionais?area=Desenvolvimento` | Filtro por área |
| GET | `/api/profissionais?cidade=São%20Paulo/SP` | Filtro por cidade |
| GET | `/api/profissionais?tecnologia=React` | Filtro por tecnologia |

### Dados Auxiliares

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/areas` | Lista áreas únicas |
| GET | `/api/cidades` | Lista cidades únicas |
| GET | `/api/tecnologias` | Lista tecnologias únicas |
| GET | `/api/estatisticas` | Estatísticas gerais |

### Outros

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Informações da API |
| GET | `/health` | Health check |

## 📊 Exemplos de Uso

### Listar todos os profissionais
```bash
curl http://localhost:8000/api/profissionais
```

### Buscar profissional por ID
```bash
curl http://localhost:8000/api/profissionais/1
```

### Criar novo profissional
```bash
curl -X POST http://localhost:8000/api/profissionais \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "cargo": "Desenvolvedor Python",
    "resumo": "Especialista em FastAPI e Django",
    "localizacao": "São Paulo/SP",
    "area": "Desenvolvimento",
    "habilidades_tecnicas": ["Python", "FastAPI", "SQL"],
    "soft_skills": ["Comunicação", "Trabalho em equipe"],
    "experiencias": [{
      "empresa": "Tech Corp",
      "cargo": "Desenvolvedor",
      "inicio": "2022-01",
      "fim": "Atual",
      "descricao": "Desenvolvimento de APIs REST"
    }],
    "formacao": [{
      "curso": "Ciência da Computação",
      "instituicao": "FIAP",
      "ano": 2021
    }],
    "idiomas": [{
      "idioma": "Português",
      "nivel": "Nativo"
    }]
  }'
```

### Buscar com filtros
```bash
# Busca textual
curl "http://localhost:8000/api/profissionais?busca=Python"

# Filtro por área
curl "http://localhost:8000/api/profissionais?area=Desenvolvimento"

# Múltiplos filtros
curl "http://localhost:8000/api/profissionais?area=Design&cidade=Rio%20de%20Janeiro/RJ"
```

## 🧪 Estruturas Python Implementadas

### 1. Estruturas de Decisão

```python
# if/else simples (crud.py)
if profissional is None:
    return None

# if/elif/else múltiplo (seed.py)
if sucesso > 0:
    print("Sucesso!")
elif erros > 0:
    print("Alguns erros")
else:
    print("Sem dados")

# Operador ternário
valor = campo_db if campo in mapeamento else campo
```

### 2. Estruturas de Repetição

```python
# for simples (crud.py)
for prof in profissionais:
    areas.add(prof.area)

# for com enumerate (seed.py)
for indice, perfil in enumerate(perfis_json, start=1):
    print(f"[{indice}/{total}]")

# for aninhado (crud.py)
for prof in profissionais:
    for tech in prof.habilidades_tecnicas:
        if tecnologia.lower() in tech.lower():
            resultado.append(prof)

# List comprehension
habilidades = [skill for skill in profissional.habilidades_tecnicas]
```

### 3. Funções

```python
# Função simples
def obter_profissional_por_id(db: Session, profissional_id: int):
    return db.query(Profissional).filter(Profissional.id == profissional_id).first()

# Função com múltiplos parâmetros e valores padrão
def buscar_profissionais(
    db: Session,
    termo_busca: Optional[str] = None,
    area: Optional[str] = None,
    skip: int = 0,
    limit: int = 100
):
    # Lógica de busca
    pass

# Função com type hints e retorno tipado
def obter_areas_unicas(db: Session) -> List[str]:
    return sorted(list(areas))
```

## 🗄️ Banco de Dados

### Modelo de Dados

O modelo `Profissional` contém os seguintes campos:

- **id**: Integer (Primary Key)
- **nome**: String(200)
- **foto**: String(500)
- **cargo**: String(200)
- **resumo**: Text
- **localizacao**: String(100)
- **area**: String(100)
- **habilidades_tecnicas**: JSON (Array)
- **soft_skills**: JSON (Array)
- **experiencias**: JSON (Array de objetos)
- **formacao**: JSON (Array de objetos)
- **projetos**: JSON (Array de objetos)
- **certificacoes**: JSON (Array)
- **idiomas**: JSON (Array de objetos)
- **area_interesses**: JSON (Array)

### Populando o Banco

O script `seed.py` importa automaticamente os 60 perfis do arquivo `../src/data/profissionais.json` do frontend.

## 🔧 Comandos Úteis

```bash
# Iniciar servidor em modo desenvolvimento (com reload automático)
uvicorn main:app --reload

# Iniciar em porta diferente
uvicorn main:app --port 8080

# Popular banco de dados
python seed.py

# Verificar versão do Python
python --version

# Listar pacotes instalados
pip list

# Atualizar requirements.txt
pip freeze > requirements.txt
```

## 📝 Validação de Dados

A API usa **Pydantic** para validação automática:

- ✅ Campos obrigatórios
- ✅ Tipos de dados corretos
- ✅ Tamanhos mínimos/máximos
- ✅ Formatos válidos

Exemplo de erro de validação:
```json
{
  "detail": [
    {
      "loc": ["body", "nome"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

## 🔐 CORS

A API está configurada para aceitar requisições do frontend:
- `http://localhost:5173` (Vite)
- `http://localhost:3000` (React padrão)

Para adicionar outras origens, edite `main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "https://seu-dominio.com"],
    # ...
)
```

## 📊 Estatísticas

Após popular o banco, você terá:
- ✅ 60 perfis profissionais
- ✅ 6 áreas diferentes
- ✅ 20 cidades
- ✅ 50+ tecnologias únicas

## 👥 Integrantes do Grupo

| Nome | RM |
|Murilo Gonzalez Bez Chleba | RM 566199|
|Guilherme Augusto F. Fernandes | RM 562107|
|Caio Marques Lins | RM 559805|

## 🔗 Links

- **Repositório GitHub**: [LINK_DO_REPOSITORIO]
- **Frontend**: `../` (diretório raiz do projeto)

## 🐛 Solução de Problemas

### Erro: ModuleNotFoundError
```bash
# Certifique-se de que o venv está ativado
# Windows: venv\Scripts\activate
# Linux/Mac: source venv/bin/activate

# Reinstale as dependências
pip install -r requirements.txt
```

### Erro: Database is locked
```bash
# Feche todas as conexões com o banco
# Delete o arquivo futuroconecta.db
# Execute seed.py novamente
```

### Porta 8000 em uso
```bash
# Use outra porta
uvicorn main:app --port 8080
```

## 📚 Documentação Adicional

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [SQLAlchemy Docs](https://www.sqlalchemy.org/)
- [Pydantic Docs](https://docs.pydantic.dev/)

## 📄 Licença

Projeto desenvolvido para fins acadêmicos - FIAP 2025.

---

**Desenvolvido com ❤️ para Global Solution - Computational Thinking with Python**




