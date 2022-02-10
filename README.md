# API REST - Crud em Node.js

Demonstração de backend codado em javascript para consumo de frontend, conectado ao MongoDB e usando o Mongoose para a conexão, essa API utiliza os métodos http CRUD, sendo os métodos mais utilizados na web.

## Construção da API

1. Instalação do `npm` no projeto para gerenciar todas as libs no `package.json`
1. Criação do `index.js`, onde será referenciada a classe `App` que possui o método `start()` dando início ao servidor
1. Configuração do `dotenv` no `index.js` para utilizar o ambiente global `process.env` na API
1. Criação da pasta `src` onde terá a raiz do projeto, e onde ficarão todos os patterns
1. Configuração do `App.js` onde ficarão os middlewares, configuração do express, listagem dos controllers, configuração da database e muito mais
1. Criação do helper `mongoose`, onde estará a regra de negócio que faz a conexão com a database e retorna o método `connect()` para o `App.js`
1. Ainda no `App.js`, configuração do Swagger utilizando o nosso arquivo `swagger.json` e definindo a rota `/api/docs`
1. Configuração do middleware `jwt.js` que definirá quais rotas serão públicas com base no header `Authentication`, `URL` e `HTTPMethod`
1. O middleware do jsonwebtoken também servirá para decodificar o token de acesso para rotas privadas, já que para acessar uma rota privada, é necessário um toque criado com base no id, esse token com a claim `id` irá para o authentication, que logo mais será usado e decodificado, revelando um token valido
1. Com o banco de dados e o JWT inseridos na API, criamos um repository para guardar os métodos crud, que irão acessar o banco de dados de acordo com a ação que passarmos (esses métodos são relativos a cada framework de banco de dados, como é o caso do mongoose)
1. Tendo o repository em mãos, criamos a interface que irá obrigar uma implementação a ter os métodos crud que precisamos, no caso da criação e login de usuário no mongoDB, usamos os métodos `create()` e `find()`, também fazendo a regra de negócio junto ao jwt.sign() para decodificar o token de acesso, e fazendo as validações necessárias de string para não acontecer erros no programa
