# ✅ Checklist de Testes - FuturoConecta

Use este checklist para verificar se todas as funcionalidades estão funcionando corretamente.

## 🚀 Preparação

- [ ] Executei `npm install` sem erros
- [ ] Executei `npm run dev` com sucesso
- [ ] A aplicação abriu em `http://localhost:5173`
- [ ] Não há erros no console do navegador

## 📱 Layout e Responsividade

### Desktop (> 1024px)
- [ ] Grid exibe 3-4 colunas de cards
- [ ] Header bem posicionado com logo e toggle
- [ ] Footer visível no fim da página
- [ ] Cards bem espaçados e alinhados

### Tablet (768px - 1024px)
- [ ] Grid ajusta para 2-3 colunas
- [ ] Busca e filtros continuam legíveis
- [ ] Modal ocupa bem o espaço

### Mobile (< 768px)
- [ ] Grid em 1 coluna
- [ ] Campos de filtro empilhados verticalmente
- [ ] Header e footer responsivos
- [ ] Modal ocupa quase toda a tela

## 🔍 Funcionalidade: Busca

- [ ] Campo de busca está visível
- [ ] Ao digitar um nome, filtra corretamente
- [ ] Ao digitar um cargo, filtra corretamente
- [ ] Ao digitar uma habilidade (ex: "React"), filtra corretamente
- [ ] Busca não é case-sensitive
- [ ] Contador de resultados atualiza
- [ ] Mensagem "Nenhum profissional encontrado" aparece quando não há resultados

## 🎯 Funcionalidade: Filtros

### Filtro por Área
- [ ] Select exibe todas as áreas disponíveis
- [ ] Ao selecionar uma área, filtra corretamente
- [ ] Combina com busca textual

### Filtro por Localização
- [ ] Select exibe todas as cidades disponíveis
- [ ] Ao selecionar uma cidade, filtra corretamente
- [ ] Combina com outros filtros

### Filtro por Tecnologia
- [ ] Select exibe todas as tecnologias disponíveis
- [ ] Ao selecionar uma tecnologia, filtra corretamente
- [ ] Combina com todos os outros filtros

### Limpar Filtros
- [ ] Botão "Limpar Filtros" aparece quando há filtros ativos
- [ ] Ao clicar, remove todos os filtros
- [ ] Todos os 60 perfis voltam a ser exibidos

## 📋 Funcionalidade: Cards de Perfil

- [ ] Cada card exibe foto/inicial do nome
- [ ] Nome do profissional visível
- [ ] Cargo exibido
- [ ] Localização com ícone 📍
- [ ] Resumo com no máximo 2 linhas
- [ ] 5 primeiras habilidades em tags
- [ ] Área do profissional no rodapé do card
- [ ] Hover effect funciona (sombra aumenta)
- [ ] Cursor muda para pointer ao passar o mouse

## 🔎 Funcionalidade: Modal de Detalhes

### Abertura e Fechamento
- [ ] Modal abre ao clicar em qualquer card
- [ ] Overlay escurece o fundo
- [ ] Botão X no canto superior direito
- [ ] Clicar no X fecha a modal
- [ ] Clicar no overlay fecha a modal

### Conteúdo da Modal
- [ ] Foto/inicial do profissional em destaque
- [ ] Nome, cargo e localização visíveis
- [ ] Área profissional exibida
- [ ] Resumo completo exibido

### Seções da Modal
- [ ] ✅ Botões de ação no topo
- [ ] 💼 Experiências profissionais com datas formatadas
- [ ] 🛠️ Habilidades técnicas em tags
- [ ] 🌟 Soft skills em tags
- [ ] 🎓 Formação acadêmica
- [ ] 🚀 Projetos com links clicáveis
- [ ] 📜 Certificações
- [ ] 🌍 Idiomas com níveis
- [ ] 💡 Áreas de interesse

### Botão "Recomendar Profissional"
- [ ] Botão está visível e clicável
- [ ] Ao clicar, aparece alerta verde de sucesso
- [ ] Texto do botão muda para "✓ Recomendado!"
- [ ] Botão fica desabilitado temporariamente
- [ ] Após 3 segundos, volta ao estado normal

### Botão "Enviar Mensagem"
- [ ] Botão está visível e clicável
- [ ] Ao clicar, formulário aparece
- [ ] Campo de texto para mensagem está presente
- [ ] Placeholder está visível
- [ ] Campo aceita texto normalmente
- [ ] Botão "Enviar" está presente
- [ ] Botão "Cancelar" está presente
- [ ] Ao clicar em "Cancelar", formulário fecha
- [ ] Ao clicar em "Enviar", aparece mensagem de sucesso
- [ ] Campo limpa após enviar
- [ ] Formulário fecha após enviar (com delay)

## 🌙 Funcionalidade: Dark Mode

### Toggle
- [ ] Toggle está visível no header
- [ ] Ícones de sol ☀️ e lua 🌙 são visíveis
- [ ] Ao clicar, alterna entre claro e escuro
- [ ] Animação de transição é suave

### Modo Claro
- [ ] Fundo da página é claro (cinza muito claro)
- [ ] Cards são brancos
- [ ] Texto é escuro e legível
- [ ] Cores do tema são azuis vibrantes

### Modo Escuro
- [ ] Fundo da página é escuro
- [ ] Cards são cinza escuro
- [ ] Texto é claro e legível
- [ ] Cores do tema são ajustadas para contraste

### Persistência
- [ ] Ao recarregar a página, modo permanece
- [ ] LocalStorage salva a preferência
- [ ] Funciona em diferentes abas

## 🎨 Design e UX

- [ ] Espaçamentos consistentes
- [ ] Cores harmoniosas
- [ ] Tipografia legível
- [ ] Botões com hover effects
- [ ] Links têm feedback visual
- [ ] Sem sobreposições indesejadas
- [ ] Scroll funciona corretamente
- [ ] Nenhum elemento "quebrado"

## ⚡ Performance

- [ ] Página carrega rapidamente
- [ ] Filtros respondem instantaneamente
- [ ] Modal abre/fecha sem lag
- [ ] Scroll é fluido
- [ ] Sem travamentos ao digitar

## 🐛 Testes de Borda

- [ ] Buscar por texto que não existe - mostra mensagem apropriada
- [ ] Aplicar todos os filtros ao mesmo tempo - funciona
- [ ] Abrir modal, fechar e abrir outro - funciona
- [ ] Alternar dark mode várias vezes - funciona
- [ ] Enviar mensagem vazia - não envia (campo required)
- [ ] Clicar múltiplas vezes em "Recomendar" - não duplica ação

## 📊 Verificação de Dados

- [ ] Todos os 60 perfis são exibidos inicialmente
- [ ] Nomes são variados e únicos
- [ ] Áreas incluem: Desenvolvimento, Design, Dados, Saúde, Educação, Marketing
- [ ] Cidades são variadas (múltiplos estados)
- [ ] Habilidades são relevantes para cada área
- [ ] Experiências têm datas coerentes
- [ ] Links de projetos estão presentes
- [ ] Idiomas incluem níveis

## 🔧 Verificação Técnica

- [ ] Código usa apenas Tailwind (sem CSS puro)
- [ ] Console do navegador sem erros
- [ ] Console do navegador sem warnings críticos
- [ ] DevTools do React funciona (se instalado)
- [ ] Hot Module Replacement (HMR) funciona

## ✅ Checklist Final

- [ ] **TODAS** as funcionalidades acima estão funcionando
- [ ] Aplicação está pronta para apresentação
- [ ] README.md está preenchido com informações do grupo
- [ ] Código está organizado e comentado
- [ ] Projeto pode ser facilmente compartilhado

---

## 🎯 Score

**Total de itens:** ~100 verificações

**Meta:** 95%+ de itens marcados ✅

Se você marcou menos de 95% dos itens, revise as funcionalidades que falharam e corrija antes de entregar o projeto.

---

## 📝 Notas

- Teste em diferentes navegadores (Chrome, Firefox, Edge)
- Teste em dispositivo mobile real, se possível
- Peça para outra pessoa testar para feedback imparcial
- Documente qualquer bug encontrado e corrija antes da entrega

---

**Boa sorte! 🚀**

