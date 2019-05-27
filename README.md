# Angular HTTP

# Required
  - MongoDB 4.0.9
  - NodeJS 8.11.1
  - Angular 7.3.8

## Run client

Para executar o projeto basta baixa-lo ou clona-lo e executar o comando `npm install` e `ng serve` dentro da pasta `client/app-client`. Para navegar pelo projeto basta acessar a url `http://localhost:4200/`.

## Run client

Inicialize o serviço do MongoDB, acesse a pasta `server/` e execute o comando `npm install` e `node app.js`. Para navegar pelo projeto basta acessar a url `http://localhost:3000/`.

## Generate data

Execute o comando `node generate_products.js` para popular o banco com dados fakes e aleatórios.

## Routes

| Method  | Route | Action
| ------------- | ------------- | ------------- |
| GET  | /products  | Retorna todos os produtos
| GET  | /productserr  | Retorna um erro 500
| GET  | /productsdelay  | Retorna a todos os produtos com um delay (2s)
| GET  | /products_ids  | Retorna todos os ids dos produtos
| GET  | /products/name/:id  | Retorna o nome do produto em string
| POST  | /products  | Salva o produto no banco e o retorna
| DELETE  | /products/:id  | Deleta o produto 
| PATCH  | /products/:id  | Altera os dados do produtos


