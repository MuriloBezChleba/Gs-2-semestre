# 🚀 Guia Rápido - FuturoConecta

## Início Rápido

```bash
npm install
npm run dev
```

Acesse: `http://localhost:5173`

## 📂 Estrutura de Componentes

### Componentes Principais

1. **App.jsx** - Componente raiz
   - Gerencia estados globais (busca, filtros, modal)
   - Carrega dados do JSON
   - Implementa lógica de filtragem com useMemo

2. **Header.jsx** - Cabeçalho da aplicação
   - Logo e título
   - Integra o DarkModeToggle

3. **SearchAndFilters.jsx** - Busca e filtros
   - Campo de busca textual
   - Filtros por área, cidade e tecnologia
   - Botão "Limpar Filtros"

4. **ProfileCard.jsx** - Card de perfil
   - Exibe resumo do profissional
   - Foto (ou inicial), nome, cargo, localização
   - Primeiras 5 habilidades técnicas
   - Hover effect elegante

5. **ProfileModal.jsx** - Modal de detalhes
   - Informações completas do profissional
   - Botões funcionais (Recomendar e Enviar Mensagem)
   - Formulário de mensagem expansível
   - Seções organizadas (experiências, formação, projetos, etc.)

6. **TagList.jsx** - Lista de tags reutilizável
   - Suporta diferentes variantes de cor
   - Limite opcional de exibição
   - Usado para skills, certificações, idiomas, etc.

7. **DarkModeToggle.jsx** - Toggle de tema
   - Persiste preferência no localStorage
   - Animação suave de transição

8. **Footer.jsx** - Rodapé
   - Links fictícios
   - Informações do projeto

## 🎨 Tailwind CSS - Classes Principais Utilizadas

### Responsividade
- `md:` - Breakpoint médio (tablet)
- `lg:` - Breakpoint grande (desktop)
- `xl:` - Breakpoint extra grande

### Dark Mode
- `dark:` - Classes aplicadas no modo escuro
- Exemplo: `bg-white dark:bg-gray-800`

### Grid e Layout
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- `flex justify-between items-center`

### Cores do Tema
- `primary-600` - Azul principal
- `primary-400` - Azul claro
- `gray-800` - Cinza escuro (dark mode)

## 📊 Estrutura do JSON

Cada perfil contém:

```json
{
  "id": number,
  "nome": string,
  "foto": string (vazio por padrão),
  "cargo": string,
  "resumo": string,
  "localizacao": string,
  "area": string,
  "habilidadesTecnicas": string[],
  "softSkills": string[],
  "experiencias": [{ empresa, cargo, inicio, fim, descricao }],
  "formacao": [{ curso, instituicao, ano }],
  "projetos": [{ titulo, link, descricao }],
  "certificacoes": string[],
  "idiomas": [{ idioma, nivel }],
  "areaInteresses": string[]
}
```

## 🔍 Como Funciona a Filtragem

A filtragem é implementada no `App.jsx` usando `useMemo`:

```javascript
const filteredProfessionals = useMemo(() => {
  return profissionaisData.filter(prof => {
    // Busca textual (AND)
    // Filtro por área (AND)
    // Filtro por cidade (AND)
    // Filtro por tecnologia (AND)
    return matchesSearch && matchesArea && matchesCity && matchesTech
  })
}, [searchTerm, selectedArea, selectedCity, selectedTech])
```

**Todos os filtros funcionam em conjunto (operador AND)**

## 🌙 Dark Mode - Como Funciona

1. Estado inicial lido do `localStorage`
2. Classe `dark` adicionada/removida do `<html>`
3. Tailwind aplica automaticamente as classes `dark:*`
4. Preferência salva no `localStorage` a cada mudança

## 🎯 Funcionalidades Interativas

### Recomendar Profissional
- Clique no botão "Recomendar Profissional"
- Feedback visual instantâneo (alerta verde)
- Botão muda para "✓ Recomendado!" temporariamente

### Enviar Mensagem
- Clique em "Enviar Mensagem"
- Formulário expande dentro da modal
- Digite a mensagem e clique em "Enviar"
- Confirmação de envio (simulado)
- Formulário limpa automaticamente

## 💡 Dicas de Personalização

### Adicionar Mais Profissionais
Edite `src/data/profissionais.json` seguindo a estrutura existente.

### Mudar Cores do Tema
Edite `tailwind.config.cjs` na seção `theme.extend.colors.primary`.

### Adicionar Novos Filtros
1. Adicione estado no `App.jsx`
2. Adicione campo no `SearchAndFilters.jsx`
3. Adicione lógica de filtro no `useMemo` do `filteredProfessionals`

### Customizar Cards
Edite `ProfileCard.jsx` para alterar quais informações aparecem no card.

## 🐛 Solução de Problemas Comuns

### Tailwind não está funcionando
```bash
# Certifique-se de que o Tailwind está importado
# Verifique src/index.css

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Dark mode não persiste
- Verifique se o localStorage está habilitado no navegador
- Limpe o cache do navegador

### Filtros não funcionam
- Verifique se os dados do JSON estão corretos
- Abra o console do navegador para ver possíveis erros

### Erro ao instalar dependências
```bash
# Limpe o cache e reinstale
rm -rf node_modules package-lock.json
npm install
```

## 📱 Teste de Responsividade

Teste em diferentes tamanhos:
- Mobile: < 768px (1 coluna)
- Tablet: 768px - 1024px (2-3 colunas)
- Desktop: > 1024px (3-4 colunas)

## 🚀 Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão em `dist/`

Para testar o build localmente:
```bash
npm run preview
```

## 📝 Checklist de Verificação

- [ ] Todas as dependências instaladas
- [ ] Servidor de desenvolvimento iniciado
- [ ] 60 perfis carregando corretamente
- [ ] Busca funcionando
- [ ] Filtros funcionando (área, cidade, tecnologia)
- [ ] Modal abrindo ao clicar em um card
- [ ] Botão "Recomendar" com feedback visual
- [ ] Botão "Enviar Mensagem" com formulário funcional
- [ ] Dark mode alternando corretamente
- [ ] Layout responsivo em diferentes tamanhos
- [ ] Sem erros no console do navegador

---

**Dúvidas?** Consulte o README.md principal ou a documentação oficial do [React](https://react.dev), [Vite](https://vitejs.dev) e [Tailwind CSS](https://tailwindcss.com).

