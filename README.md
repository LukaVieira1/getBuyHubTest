# getBuyHubTest
A aplicação consite em listar filmes, possibilitando a pesquisa por nome e ver filme similares.

https://get-buy-hub-test.vercel.app/

## Pré-requisitos
Tenha instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com) e [Node.js](https://nodejs.org/en/)

## Rodando a aplicação
Para iniciar o projeto, siga o passo a passo abaixo.
1. Faça o clone do repositorio no seu computador e execute os seguintes passos
```bash
# Instalar as dependências
$ npm install
```

2. Crie na raiz da um .env e adicione uma variável de ambiente "NEXT_PUBLIC_API_URL" que irá conter o link para a api. Nesse projeto utiliza-se "NEXT_PUBLIC_API_URL=https://api.themoviedb.org". Crie também uma variavel de ambiente "NEXT_PUBLIC_API_KEY" que ira conter a chave de acesso do the movie db, você pode 
registrar sua key [aqui](https://www.themoviedb.org/settings/api) (para mais informações verificar a [documentação](https://developers.themoviedb.org/3/getting-started/introduction).
3. Execute o projeto
```bash
# Executando o projeto
$ npm run dev
```
