# My Store App

Aplicativo mobile desenvolvido em **React Native (Expo + TypeScript)** como parte do **Desafio Técnico – Desenvolvedor(a) React Native com Firebase**.

O app consome a [Fake Store API](https://fakestoreapi.com/products) para exibir produtos e utiliza **Firebase** para autenticação e persistência de favoritos.

---

## 📝 Explicação do Projeto

O **My Store App** foi construído para atender aos requisitos do desafio técnico:

1. **Login e Cadastro**

   * Implementados com **Firebase Authentication** (email/senha).
   * Apenas usuários autenticados conseguem acessar o app.

2. **Listagem de Produtos**

   * Após o login, o app lista os produtos consumidos da **Fake Store API**.
   * Exibe título, imagem, e preço.

3. **Favoritos**

   * Usuários podem **adicionar/remover favoritos**.
   * Favoritos são armazenados no **Firestore**, garantindo persistência entre sessões.
   * Há uma tela dedicada para exibir apenas os favoritos.

4. **Push Notifications (Opcional/Diferencial)**

   * Estrutura preparada para futura integração com **Firebase Cloud Messaging**.

5. **Arquitetura e Boas Práticas**

   * **TypeScript**: maior segurança e legibilidade do código.
   * **Context API**: gerenciamento de estado global (usuário autenticado e favoritos).
   * **Services**: camada separada para API externa e Firebase, promovendo desacoplamento.
   * **Arquitetura modular**: organização em `components`, `screens`, `contexts`, `services` e `helpers`, facilitando manutenção e escalabilidade.

---

## 🚀 Funcionalidades

* 🔑 **Autenticação** (login e cadastro) com Firebase.
* 🛒 **Listagem de produtos** consumidos da Fake Store API.
* ⭐ **Favoritar produtos** com persistência no Firestore.
* 📂 **Tela dedicada para favoritos**.
* 🔔 Integração com **Firebase Cloud Messaging** para push notifications.

---

## 🛠️ Tecnologias Utilizadas

* [React Native](https://reactnative.dev/) com [Expo](https://expo.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Firebase](https://firebase.google.com/)

  * Authentication
  * Firestore Database
  * Cloud Messaging
* [Axios](https://axios-http.com/) para requisições HTTP
* [React Navigation](https://reactnavigation.org/) para navegação
* [Context API](https://react.dev/reference/react/useContext) para gerenciamento de estado global

---

## 📦 Instalação e Execução

### 1. Clonar o repositório

```bash
git clone https://github.com/ThalitaCesar/my-store-app.git
cd my-store-app
```

### 2. Instalar dependências

```bash
npm install
# ou
yarn install
```

### 3. Configurar o Firebase

* Crie um projeto no [Firebase Console](https://console.firebase.google.com/).
* Crie um arquivo firebaseConfig.ts com as variáveis do projeto.
* Ative **Authentication (Email/Password)** e **Firestore Database**.
* Ative o Firestore Database → Configure o banco de dados no modo adequado (padrão: teste para desenvolvimento).
* E ative Cloud Messaging → Ative para possibilitar push notifications.

### 4. Rodar o projeto

```bash
expo start
```

---

## 🏗️ Estrutura do Projeto

```
my-store-app/
│
├── src/
│   ├── components/        # Componentes reutilizáveis
│   ├── config/            # Configuração do Firebase
│   ├── contexts/          # Context API (auth, favoritos)
│   ├── helpers/           # Funções auxiliares (ex: authHelpers.ts)
│   ├── navigation/        # Navegação principal (AppTabs, Stack)
│   ├── screens/           # Telas (Login, SignUp, Home, Favoritos)
│   ├── services/          # Comunicação com API/Firebase (auth, favoritos, produtos)
│   ├── styles/            # Estilo global
│   ├── theme/             # Temas e EStyleSheet
│   └── types/             # Definições de tipos
│
├── App.tsx                # Ponto de entrada do app
├── app.json               # Configuração do Expo
└── babel.config.js        # Configuração do projeto
```

---

## 📌 Melhorias Futuras

* [ ] Cobertura de testes automatizados (Jest + React Testing Library).
* [ ] Adicionar push notifications com Firebase Cloud Messaging.
* [ ] Cache offline de produtos (AsyncStorage ou SQLite).
* [ ] CI/CD com GitHub Actions.

---

## ✨ Autor

Desenvolvido por **[Thalita César](https://github.com/ThalitaCesar)** 💜
