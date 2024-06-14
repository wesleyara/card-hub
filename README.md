# Card Hub

Card Hub é um projeto para gerenciar e trocar cartas colecionáveis!

[Preview](https://card-hub-one.vercel.app/)

## Instalação

```bash
# primeiro clone o repositório
git clone https://github.com/wesleyara/card-hub

# entre no diretório do projeto
cd card-hub

# instale as dependências
npm install 
# ou
yarn
``` 

## Como usar

```bash
# rode o projeto
npm start
# ou
yarn start
```

### Docker

Para rodar o projeto com Docker, siga os passos abaixo:

```bash
# build a imagem
docker build -t card-hub .

# rode o container
docker run -d -p 3000:3000 --name card-hub card-hub
```

## Tenologias e ferramentas

- [Next.js](https://nextjs.org/) para o desenvolvimento do front-end
- [Tailwind CSS](https://tailwindcss.com/) para a estilização
- [Shadcn/UI](https://ui.shadcn.com/) para os componentes
- [Axios](https://axios-http.com/) para as requisições
- [Tanstack/React Query](https://tanstack.com/)  para o gerenciamento de estado
- [Eslint](https://eslint.org/) para a padronização do código
- [Prettier](https://prettier.io/) para a formatação do código
- [Docker](https://www.docker.com/) para a criação de containers

## Falando sobre o projeto

A ideia é criar um sistema para gerenciar e trocar cartas colecionáveis, onde o usuário pode cadastrar suas cartas e procurar por outras cartas para trocar.

Todo o projeto foi desenvolvido com Next.js, Tailwind CSS e Shadcn/UI, além de utilizar o React Query para o gerenciamento de estado.

Pode realizar o registro, após isso só é necessário logar para começa a utilizar o sistema.

## Autor

<!-- Crie uma tabela com a imagem: -->
<img src="https://avatars.githubusercontent.com/u/89321125?v=4" width="100" height="100" alt="Wesley Araujo" />

| [Wesley Araujo](https://github.com/wesleyara) |
