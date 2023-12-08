# Api Rest oncarapp

Instalar dependências
```
yarn install
``` 

### Renomeie o arquivo .exemple para .env

Rodar projeto em modo de desenvolvimento
```
yarn dev 
```
Abra outra aba no terminal para rodas os testes 
```
yarn test:watch
```

Projeto desenvolvido em Clean Architecture
seguindo a estrutura de pastas

Domain - Pasta onde se encontra o núcleo das regras de negócios
 - Contracts -> repository -> utils
 - Entities -> errors -> helpers - entidades.ts
 - UseCases - > Admin -> Car -> Lead
 
Application - Pasta onde se encontra o núcleo da aplicação que vai tratar as requisições do client
- Controllers
- errors
- helpers
- validation

Infrastructure - Pasta onde se encontra conexões externas que são feitas como banco de dados e bibliotecas
- repository - mongoDb - helpers
- utils

Main - Pasta onde se encontra o núcleo da aplicação onde é únificado para que se conecte o software
- adapters
- config
- factories - domain - application - infrastructure
- middlewares
- routers

Tests -  Pasta onde está os testes da aplicação
- application - controllers - validation
- domain - entities - useCases
- infrastructure

## Observações - 
Arquitetura focada na separação das dependências,  entre regra de negócios e regras de aplicação, separando os propósitos. 

Banco de dados - MongoDb
com as seguintes Entidades

```
type TypeAdmin = {
  _id: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
```
```
type TypeCar = {
  _id: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

```
```
type TypeLead = {
  _id: string;
  idCar: string;
  name: string;
  email: string;
  contact: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
```

## Variáveis de Ambiente
```
PORT=5000
MONGO_URL=mongodb+srv://oncarapp:op6FKV96qSbnsHjQ@cluster0.jrqd3xn.mongodb.net/test
TOKEN_KEY=key_oncarapp
```