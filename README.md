# 🎬 Cinema Cidade

<p align="center">
  <a href="https://cinema-delberss.vercel.app/" target="_blank">
    <img src="./public/images/preview.png" alt="Preview" width="600" />
  </a>
</p>


> Plataforma moderna e responsiva para venda de ingressos de cinema, desenvolvida com **React**, **TypeScript**, **Zustand**  e **Material UI**.

🔗 **Acesse online:** [cinema-delberss.vercel.app](https://cinema-delberss.vercel.app/)

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

- ⚛️ [React 19](https://react.dev/)
- 💎 [TypeScript](https://www.typescriptlang.org/)
- 🎨 [Material UI](https://mui.com/)
- 💅 [Emotion Styled](https://emotion.sh/docs/styled)
- 🧭 [React Router DOM](https://reactrouter.com/)
- 🧠 [Zustand](https://zustand-demo.pmnd.rs/)
- 🔳 [qrcode.react](https://www.npmjs.com/package/qrcode.react)
- ⚡ [Vite](https://vitejs.dev/) — para desenvolvimento rápido


---
## 📁 Estrutura do Projeto
```
cinema/
│
├── public/
│ └── images/ # Imagens públicas
│ └── data
|       └── filmes.json
├── src/
│ ├── components/ 
│ │ ├── AnimationComponent
│ │ ├── CodigoVerificacao
│ ├── pages
│ │ ├── ConfirmacaoPage.tsx
│ │ ├── LoginPage.tsx
│ │ ├── MeusIngressosPage.tsx
│ │ ├── PagamentoPage.tsx
│ │ └── RegistroPage.tsx
│ ├──store/
│ │ ├── useCinemaStore.ts
│ ├──utils/
│ │ ├── validateCPF.ts
│ ├── App.tsx
│ └── main.tsx
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🖥️ Como Rodar Localmente

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/delberss/cinema
```
### 2️⃣ Acesse a pasta do projeto
```bash
cd cinema
```
### 3️⃣ Instale as dependências

```bash
npm install
```
### 4️⃣ Execute o projeto
```bash
npm run dev
```
### 5️⃣ Abra no navegador
```bash
http://localhost:5173
```