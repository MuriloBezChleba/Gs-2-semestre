# 📦 Guia de Instalação - FuturoConecta

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### 1. Node.js (versão 16 ou superior)

**Windows:**
- Baixe em: https://nodejs.org/
- Execute o instalador
- Escolha "Recommended for Most Users"
- Marque a opção "Add to PATH"

**Verificar instalação:**
```bash
node --version
npm --version
```

Deve retornar algo como:
```
v18.x.x ou superior
9.x.x ou superior
```

## 🚀 Instalação do Projeto

### Passo 1: Abrir Terminal/Prompt de Comando

**Windows:**
- Pressione `Win + R`
- Digite `cmd` ou `powershell`
- Pressione Enter

**Ou use o terminal integrado do VS Code:**
- Abra o VS Code no diretório do projeto
- Pressione `Ctrl + '` (backtick)

### Passo 2: Navegar até o Diretório do Projeto

```bash
cd "D:\FIAP\gs 2.1"
```

### Passo 3: Instalar Dependências

```bash
npm install
```

**O que acontece:**
- NPM baixa todas as dependências listadas no `package.json`
- Cria a pasta `node_modules/`
- Pode levar 1-3 minutos dependendo da conexão

**Saída esperada:**
```
added 150 packages, and audited 151 packages in 1m
found 0 vulnerabilities
```

### Passo 4: Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

**Saída esperada:**
```
  VITE v5.0.11  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### Passo 5: Abrir no Navegador

Abra seu navegador e acesse:
```
http://localhost:5173
```

**✅ Pronto! A aplicação está rodando!**

## 🔧 Comandos Úteis

### Parar o Servidor
- Pressione `Ctrl + C` no terminal
- Confirme com `S` (Sim) se solicitado

### Reiniciar o Servidor
```bash
npm run dev
```

### Build de Produção
```bash
npm run build
```
- Gera arquivos otimizados na pasta `dist/`

### Testar Build de Produção
```bash
npm run preview
```

## ❌ Solução de Problemas

### Erro: "npm: command not found"
**Problema:** Node.js não está instalado ou não está no PATH

**Solução:**
1. (Re)instale o Node.js de https://nodejs.org/
2. Marque "Add to PATH" durante instalação
3. Reinicie o terminal
4. Tente novamente

### Erro: "Cannot find module"
**Problema:** Dependências não foram instaladas

**Solução:**
```bash
npm install
```

### Erro: "Port 5173 is already in use"
**Problema:** Porta já está sendo usada

**Solução:**
1. Feche outras instâncias do Vite
2. Ou altere a porta em `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000 // ou outra porta
  }
})
```

### Erro: "EACCES: permission denied"
**Problema:** Permissões de pasta

**Solução (Windows):**
1. Execute o terminal como Administrador
2. Ou mude as permissões da pasta

**Solução (alternativa):**
```bash
npm cache clean --force
npm install
```

### Erro: "Failed to resolve import"
**Problema:** Caminho de importação incorreto

**Solução:**
- Verifique se todos os arquivos estão nos lugares corretos
- Confira a estrutura de pastas em ESTRUTURA_PROJETO.txt

### Tailwind CSS não está funcionando
**Problema:** Configuração do Tailwind

**Solução:**
1. Verifique se `tailwind.config.cjs` existe
2. Verifique se `src/index.css` contém:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
3. Reinicie o servidor com `Ctrl+C` e `npm run dev`

### Página em branco no navegador
**Problema:** Erro de JavaScript

**Solução:**
1. Abra o Console do navegador (F12)
2. Veja os erros em vermelho
3. Verifique se o arquivo `src/data/profissionais.json` existe
4. Verifique se não há erros de sintaxe no JSON

### JSON não carrega / Erro 404
**Problema:** Arquivo JSON não encontrado

**Solução:**
1. Verifique se `src/data/profissionais.json` existe
2. Confirme que tem 60 perfis executando:
```bash
python -c "import json; print(len(json.load(open('src/data/profissionais.json'))))"
```
Deve retornar: `60`

## 📁 Estrutura de Arquivos Obrigatória

Certifique-se de que a estrutura está assim:

```
gs 2.1/
├── node_modules/          (criado após npm install)
├── src/
│   ├── components/
│   │   ├── DarkModeToggle.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── ProfileCard.jsx
│   │   ├── ProfileModal.jsx
│   │   ├── SearchAndFilters.jsx
│   │   └── TagList.jsx
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

## 🌐 Testar em Diferentes Dispositivos

### Mobile (do seu computador)
1. Inicie o servidor: `npm run dev`
2. No terminal, execute:
```bash
npm run dev -- --host
```
3. Pegue o IP da rede local (ex: `http://192.168.1.100:5173`)
4. Acesse do seu celular (na mesma rede Wi-Fi)

### Ferramentas de Desenvolvedor (Chrome)
1. F12 para abrir DevTools
2. Clique no ícone de dispositivo (Ctrl+Shift+M)
3. Escolha diferentes dispositivos para testar

## 🎓 Primeira Execução - Checklist

- [ ] Node.js instalado (v16+)
- [ ] Terminal aberto no diretório correto
- [ ] Executei `npm install`
- [ ] Executei `npm run dev`
- [ ] Abri `http://localhost:5173` no navegador
- [ ] Vejo 60 cards de profissionais
- [ ] Console do navegador sem erros (F12)
- [ ] Posso clicar nos cards e abrir modals
- [ ] Busca e filtros funcionam
- [ ] Dark mode alterna corretamente

## 📞 Precisa de Ajuda?

1. **Verifique o Console do Navegador** (F12) - erros em vermelho
2. **Verifique o Terminal** - mensagens de erro do Vite
3. **Consulte CHECKLIST_TESTE.md** - lista completa de testes
4. **Consulte GUIA_RAPIDO.md** - informações técnicas
5. **Releia este arquivo** - solução de problemas comuns

## ✅ Tudo Funcionando?

Se você chegou até aqui e tudo está funcionando, parabéns! 🎉

Próximos passos:
1. Leia o **GUIA_RAPIDO.md** para entender o código
2. Use o **CHECKLIST_TESTE.md** para testar tudo
3. Personalize o projeto conforme necessário
4. Preencha os dados do grupo no **README.md**

---

**Desenvolvido para FIAP - Global Solution 2.1**

