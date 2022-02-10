# API REST - crud em Node.js & Mongoose

Demonstração de backend codado em javascript para consumo de frontend e integração de aplicações, conectado ao MongoDB e usando o Mongoose para a conexão, com autenticação JWT. Essa API utiliza os métodos http CRUD, sendo os métodos mais requisitados na web.

## Construção da API

1. Instalação do `npm` no projeto para gerenciar todas as libs no `package.json`
1. Criação do `index.js`, onde será referenciada a classe `App` que possui o método `start()` dando início ao servidor
1. Configuração do `dotenv` no `index.js` para utilizar o ambiente global `process.env` na API
1. Criação da pasta `src` onde terá a raiz do projeto, e onde ficarão todos os patterns
1. Configuração do `App.js` onde ficarão os middlewares, configuração do express, listagem dos controllers, configuração da database e muito mais

## Conxão com o banco de dados e middlewares importantes

1. Criação do helper `mongoose`, onde estará a regra de negócio que faz a conexão com a database e retorna o método `connect()` para o `App.js`
1. Ainda no `App.js`, configuração do Swagger utilizando o nosso arquivo `swagger.json` e definindo a rota `/api/docs`
1. Configuração do middleware `jwt.js` que definirá quais rotas serão públicas com base no header `Authentication`, `URL` e `HTTPMethod`
1. O middleware do jsonwebtoken também servirá para decodificar o token de acesso para rotas privadas, já que para acessar uma rota privada, é necessário um toque criado com base no id, esse token com a claim `id` irá para o authentication, que logo mais será usado e decodificado, revelando um token valido

## CRUD methods

1. Com o banco de dados e o JWT inseridos na API, criamos um repository para guardar os métodos crud, que irão acessar o banco de dados de acordo com a ação que passarmos (esses métodos são relativos a cada framework de banco de dados, como é o caso do mongoose)
1. Tendo o repository em mãos, criamos a interface que irá obrigar uma implementação a ter os métodos crud que precisamos, no caso do login de usuário no mongoDB, usamos o método`find()`, também fazendo a regra de negócio junto ao jwt.sign() para decodificar o token de acesso, e fazendo as validações necessárias de string/number para não acontecer erros no programa
1. O segundo método será o `.create()` do mongoose, ele serve para criar algum dado novo no banco de dados, e será relativo ao controller `UsuarioController` que possui um método http POST, onde o controller faz o request do body, e usa como parâmetro para a função de cadastro do service `UsuarioService`. O service faz a validação de string/number e faz um intermédio entre o repository e o controller, recebendo do repository que possui método `.create()`, que por sua vez obedece aos parâmetros obrigatórios do model `Usuario`, e assim fazendo a inserção no banco de dados.
1. O método `find()` busca no banco de dados se já existe algum usuário com email cadastro, ou nome, ou outro parâmetro opcional, da mesma forma que é feito o login, porém buscando senha e login no banco de dados (a senha criptografada por algum algoritmo hash)
1. O método update será usado no controller `TarefaController`. Usando o model `Tarefa` e o método `.create()` para criar uma tarefa, precisamos de uma autenticação jwt de usuário para modificar a tarefa, então o service busca a tarefa pelo id da query string, e faz o método `.update()` passando como parâmetro a id da tarefa e os parâmetros a serem atualizados
1. O último método DELETE abstrai o id da tarefa da query string e busca pelo ID a tarefa no banco de dados, se essa tarefa tiver o mesmo ID de usuário comparado ao ID do usuário logado no momento, é possível deletar a tarefa através do método `.delete()` do mongoose, apenas passando a id da tarefa que está no banco de dados.
