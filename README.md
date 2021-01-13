# fullstack-challenge-ddrtech

Este repositório foi criado para um desafio fullstack com o seguinte caso de uso: Criar uma api capaz de receber e servir arquivos JSON gerados pelo sistema de manufatura de uma empresa. Além de criar uma interface capaz de fazer upload e validar esses arquivos e um Dashboard que se encarrega de consumir os dados da api e apresentá-los ao cliente.

<br>

<h2> How to Install</h2>
<hr/>
<br>

No terminal, clone o projeto:

`https://github.com/GeorgeSued14/fullstack-challenge-ddrtech.git`

Entre na pasta

`cd /fullstack-challenge-ddrtech`

<br/>

<b> As instruções abaixo executam o ambiente que ainda está em desenvolvimento, não aconselhavél para produção</b>

<br>
<h2> Setup backend </h2>
<hr/>
<br>

Dependências necessárias:

- node (nvm) - https://tecadmin.net/install-nodejs-with-nvm/
- docker - https://docs.docker.com/engine/install/
- docker-compose - https://docs.docker.com/compose/install/

Entre na pasta

`cd /backend`

Verifique se as variáveis ambientes do banco de dados estão preenchidas em <b>.env.development</b>

Rode o comando para construir o ambiente

` docker-compose up --file docker-compose.development.yml build`

Em seguida

` docker-compose up --file docker-compose.development.yml up`

<br>
<h2> Setup Frontend </h2>
<hr/>
<br>

Dependências necessárias:

- node (nvm) - https://tecadmin.net/install-nodejs-with-nvm/
- angular #https://angular.io/guide/setup-local

Entre na pasta:

`cd /frontend`

Por precaução execute:

`npm install`

Em seguida:

`ng server --open`
