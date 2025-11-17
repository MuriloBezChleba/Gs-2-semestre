# 📖 Exemplos de Uso da API - FuturoConecta

Este documento contém exemplos práticos de como usar cada endpoint da API.

## 🔧 Ferramentas Recomendadas

- **cURL** (linha de comando)
- **Postman** (interface gráfica)
- **Swagger UI** (http://localhost:8000/docs)
- **Thunder Client** (extensão VS Code)

---

## 📋 Endpoints CRUD

### 1. Listar Todos os Profissionais

**Request:**
```bash
GET http://localhost:8000/api/profissionais
```

**cURL:**
```bash
curl http://localhost:8000/api/profissionais
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "nome": "Ana Carolina Silva",
    "cargo": "Engenheira de Software Sênior",
    "area": "Desenvolvimento",
    "localizacao": "São Paulo/SP",
    ...
  }
]
```

### 2. Buscar Profissional por ID

**Request:**
```bash
GET http://localhost:8000/api/profissionais/1
```

**cURL:**
```bash
curl http://localhost:8000/api/profissionais/1
```

**Response (200 OK):**
```json
{
  "id": 1,
  "nome": "Ana Carolina Silva",
  "foto": "",
  "cargo": "Engenheira de Software Sênior",
  "resumo": "Especialista em desenvolvimento...",
  "localizacao": "São Paulo/SP",
  "area": "Desenvolvimento",
  "habilidades_tecnicas": ["JavaScript", "React", "Python"],
  "soft_skills": ["Liderança", "Comunicação"],
  "experiencias": [...],
  "formacao": [...],
  "projetos": [...],
  "certificacoes": [...],
  "idiomas": [...],
  "area_interesses": [...]
}
```

**Response (404 Not Found):**
```json
{
  "detail": "Profissional com ID 999 não encontrado"
}
```

### 3. Criar Novo Profissional

**Request:**
```bash
POST http://localhost:8000/api/profissionais
Content-Type: application/json
```

**Body:**
```json
{
  "nome": "João Pedro Silva",
  "foto": "",
  "cargo": "Desenvolvedor Python Júnior",
  "resumo": "Desenvolvedor iniciante apaixonado por tecnologia e sempre buscando aprender mais",
  "localizacao": "Campinas/SP",
  "area": "Desenvolvimento",
  "habilidades_tecnicas": ["Python", "FastAPI", "SQL", "Git"],
  "soft_skills": ["Aprendizado rápido", "Trabalho em equipe", "Proatividade"],
  "experiencias": [
    {
      "empresa": "TechStart",
      "cargo": "Estagiário de Desenvolvimento",
      "inicio": "2023-06",
      "fim": "Atual",
      "descricao": "Desenvolvimento de APIs REST com FastAPI e integração com bancos de dados"
    }
  ],
  "formacao": [
    {
      "curso": "Análise e Desenvolvimento de Sistemas",
      "instituicao": "FIAP",
      "ano": 2024
    }
  ],
  "projetos": [
    {
      "titulo": "API de Gerenciamento de Tarefas",
      "link": "https://github.com/joao/todo-api",
      "descricao": "API REST completa com autenticação e CRUD de tarefas"
    }
  ],
  "certificacoes": ["Python para Data Science - Alura"],
  "idiomas": [
    {
      "idioma": "Português",
      "nivel": "Nativo"
    },
    {
      "idioma": "Inglês",
      "nivel": "Intermediário"
    }
  ],
  "area_interesses": ["Backend Development", "APIs", "Cloud Computing"]
}
```

**cURL:**
```bash
curl -X POST http://localhost:8000/api/profissionais \
  -H "Content-Type: application/json" \
  -d @perfil.json
```

**Response (201 Created):**
```json
{
  "id": 61,
  "nome": "João Pedro Silva",
  "cargo": "Desenvolvedor Python Júnior",
  ...
}
```

### 4. Atualizar Profissional

**Request:**
```bash
PUT http://localhost:8000/api/profissionais/1
Content-Type: application/json
```

**Body (campos opcionais):**
```json
{
  "cargo": "Engenheira de Software Pleno",
  "habilidades_tecnicas": ["JavaScript", "React", "Python", "Docker", "Kubernetes"]
}
```

**cURL:**
```bash
curl -X PUT http://localhost:8000/api/profissionais/1 \
  -H "Content-Type: application/json" \
  -d '{"cargo":"Engenheira de Software Pleno"}'
```

**Response (200 OK):**
```json
{
  "id": 1,
  "nome": "Ana Carolina Silva",
  "cargo": "Engenheira de Software Pleno",
  ...
}
```

### 5. Deletar Profissional

**Request:**
```bash
DELETE http://localhost:8000/api/profissionais/61
```

**cURL:**
```bash
curl -X DELETE http://localhost:8000/api/profissionais/61
```

**Response (204 No Content):**
```
(sem corpo na resposta)
```

---

## 🔍 Endpoints de Busca e Filtros

### 6. Busca Textual

Busca em nome, cargo e resumo do profissional.

**Request:**
```bash
GET http://localhost:8000/api/profissionais?busca=Python
```

**cURL:**
```bash
curl "http://localhost:8000/api/profissionais?busca=Python"
```

**Response:**
```json
[
  {
    "id": 5,
    "nome": "Maria Santos",
    "cargo": "Desenvolvedora Python",
    ...
  }
]
```

### 7. Filtro por Área

**Request:**
```bash
GET http://localhost:8000/api/profissionais?area=Desenvolvimento
```

**cURL:**
```bash
curl "http://localhost:8000/api/profissionais?area=Desenvolvimento"
```

### 8. Filtro por Cidade

**Request:**
```bash
GET http://localhost:8000/api/profissionais?cidade=São%20Paulo/SP
```

**cURL:**
```bash
curl "http://localhost:8000/api/profissionais?cidade=S%C3%A3o%20Paulo%2FSP"
```

### 9. Filtro por Tecnologia

**Request:**
```bash
GET http://localhost:8000/api/profissionais?tecnologia=React
```

**cURL:**
```bash
curl "http://localhost:8000/api/profissionais?tecnologia=React"
```

### 10. Múltiplos Filtros Combinados

**Request:**
```bash
GET http://localhost:8000/api/profissionais?area=Design&cidade=Rio%20de%20Janeiro/RJ&tecnologia=Figma
```

**cURL:**
```bash
curl "http://localhost:8000/api/profissionais?area=Design&cidade=Rio%20de%20Janeiro%2FRJ&tecnologia=Figma"
```

### 11. Paginação

**Request:**
```bash
GET http://localhost:8000/api/profissionais?skip=10&limit=5
```

**cURL:**
```bash
curl "http://localhost:8000/api/profissionais?skip=10&limit=5"
```

---

## 📊 Endpoints Auxiliares

### 12. Listar Áreas Únicas

**Request:**
```bash
GET http://localhost:8000/api/areas
```

**cURL:**
```bash
curl http://localhost:8000/api/areas
```

**Response:**
```json
[
  "Dados",
  "Desenvolvimento",
  "Design",
  "Educação",
  "Marketing",
  "Saúde"
]
```

### 13. Listar Cidades Únicas

**Request:**
```bash
GET http://localhost:8000/api/cidades
```

**cURL:**
```bash
curl http://localhost:8000/api/cidades
```

**Response:**
```json
[
  "Aracaju/SE",
  "Belém/PA",
  "Belo Horizonte/MG",
  "Brasília/DF",
  "Campinas/SP",
  ...
]
```

### 14. Listar Tecnologias Únicas

**Request:**
```bash
GET http://localhost:8000/api/tecnologias
```

**cURL:**
```bash
curl http://localhost:8000/api/tecnologias
```

**Response:**
```json
[
  "Adobe XD",
  "After Effects",
  "Angular",
  "AWS",
  "Azure",
  "Docker",
  "Figma",
  ...
]
```

### 15. Estatísticas Gerais

**Request:**
```bash
GET http://localhost:8000/api/estatisticas
```

**cURL:**
```bash
curl http://localhost:8000/api/estatisticas
```

**Response:**
```json
{
  "total_profissionais": 60,
  "total_areas": 6,
  "total_cidades": 20,
  "total_tecnologias": 52,
  "profissionais_por_area": {
    "Desenvolvimento": 15,
    "Design": 10,
    "Dados": 12,
    "Saúde": 8,
    "Educação": 8,
    "Marketing": 7
  }
}
```

### 16. Profissionais por Tecnologia Específica

**Request:**
```bash
GET http://localhost:8000/api/profissionais/tecnologia/Python
```

**cURL:**
```bash
curl http://localhost:8000/api/profissionais/tecnologia/Python
```

**Response:**
```json
[
  {
    "id": 3,
    "nome": "Carlos Eduardo",
    "cargo": "Cientista de Dados",
    "habilidades_tecnicas": ["Python", "Pandas", "TensorFlow"],
    ...
  }
]
```

---

## 🏥 Health Check

### 17. Verificar Status da API

**Request:**
```bash
GET http://localhost:8000/health
```

**cURL:**
```bash
curl http://localhost:8000/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "API funcionando corretamente"
}
```

### 18. Informações da API

**Request:**
```bash
GET http://localhost:8000/
```

**cURL:**
```bash
curl http://localhost:8000/
```

**Response:**
```json
{
  "message": "API FuturoConecta - Rede Profissional",
  "version": "1.0.0",
  "docs": "/docs",
  "endpoints": {
    "profissionais": "/api/profissionais",
    "areas": "/api/areas",
    "cidades": "/api/cidades",
    "tecnologias": "/api/tecnologias",
    "estatisticas": "/api/estatisticas"
  }
}
```

---

## 🐍 Exemplos em Python

### Usando requests

```python
import requests

BASE_URL = "http://localhost:8000"

# Listar profissionais
response = requests.get(f"{BASE_URL}/api/profissionais")
profissionais = response.json()
print(f"Total: {len(profissionais)}")

# Buscar por ID
response = requests.get(f"{BASE_URL}/api/profissionais/1")
profissional = response.json()
print(profissional['nome'])

# Criar novo profissional
novo_perfil = {
    "nome": "Maria Silva",
    "cargo": "Designer UX",
    ...
}
response = requests.post(
    f"{BASE_URL}/api/profissionais",
    json=novo_perfil
)
print(f"Criado com ID: {response.json()['id']}")

# Busca com filtros
params = {
    "area": "Desenvolvimento",
    "tecnologia": "Python"
}
response = requests.get(f"{BASE_URL}/api/profissionais", params=params)
resultados = response.json()
print(f"Encontrados: {len(resultados)}")
```

---

## 🌐 Integração com Frontend

### Exemplo em JavaScript (Fetch API)

```javascript
const BASE_URL = 'http://localhost:8000';

// Listar profissionais
async function listarProfissionais() {
  const response = await fetch(`${BASE_URL}/api/profissionais`);
  const profissionais = await response.json();
  console.log(profissionais);
}

// Buscar com filtros
async function buscarComFiltros(area, cidade) {
  const params = new URLSearchParams({
    area: area,
    cidade: cidade
  });
  
  const response = await fetch(`${BASE_URL}/api/profissionais?${params}`);
  const resultados = await response.json();
  return resultados;
}

// Criar profissional
async function criarProfissional(dados) {
  const response = await fetch(`${BASE_URL}/api/profissionais`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados)
  });
  
  return await response.json();
}
```

---

## 🔒 Códigos de Status HTTP

| Código | Significado | Quando acontece |
|--------|-------------|-----------------|
| 200 | OK | Requisição bem-sucedida |
| 201 | Created | Recurso criado com sucesso |
| 204 | No Content | Recurso deletado com sucesso |
| 400 | Bad Request | Dados inválidos na requisição |
| 404 | Not Found | Recurso não encontrado |
| 422 | Unprocessable Entity | Erro de validação Pydantic |
| 500 | Internal Server Error | Erro no servidor |

---

## 💡 Dicas

1. **Use o Swagger UI** (http://localhost:8000/docs) para testar interativamente
2. **Valide os dados** antes de enviar requisições POST/PUT
3. **Use paginação** para listas grandes (`skip` e `limit`)
4. **Combine filtros** para buscas mais específicas
5. **Verifique os códigos de status** para tratamento de erros

---

**Documentação gerada para Global Solution - FIAP 2025**

