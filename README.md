# manufatura-json-api


Interface Web e API criadas para fazer upload de dados JSON gerados por um sistema de manufatura e exibi-los em um dashboard.
<br>

<h2> How to Install </h2>
<br>

No terminal, clone o projeto:

`https://github.com/GeorgeSued14/manufatura-json-api.git`

Entre na pasta

`cd /backend`

## Setup backend

Dependências:

- node (nvm) - https://tecadmin.net/install-nodejs-with-nvm/
- docker - https://docs.docker.com/engine/install/
- docker-compose - https://docs.docker.com/compose/install/

Entre na pasta

`cd /backend`

Verifique se as variáveis ambientes do banco de dados estão preenchidas em <>.env.development</>

Rode o comando para construir o ambiente

` docker-compose build`

Em seguida

` docker-compose up`

Registre o usuário ADMIN para acesso as rotas privadas (Altere para os dados que deseja inserir).

```
{
    "name": "admin",
    "email": "seuemail@provedor.com",
    "phone_number": "+552199999999",
    "role": "ADMIN",
    "password":"admin"
}
```

## Setup frontend

Dependências:

- npm ou yarn
- node (nvm) - https://tecadmin.net/install-nodejs-with-nvm/
- angular https://angular.io/guide/setup-local
- docker - https://docs.docker.com/engine/install/
- docker-compose - https://docs.docker.com/compose/install/

<h2>Development</h2>

Entre na pasta:

`cd /frontend`

Por precaução execute:

`npm install`

Em seguida rode:

`ng serve --open`

<h2>Production</h2>

Entre na pasta:

`cd /frontend`

Para fazer o build da imagem

`docker-compose build`

Em seguida

`docker-compose up`
