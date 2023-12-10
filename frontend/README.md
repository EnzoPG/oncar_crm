# Api Rest ONCAR CRM

Instalar dependências (YARN ou NPM)
```
# yarn
yarn install

# npm
npm i
```
Executar o projeto
```
# yarn
yarn start

# npm
npm start
```
Configurar o backend (API) no projeto, abra o arquivo a seguir e altere o objeto com a URL do backend.
```
# FILE
oncar_crm/frontend/src/config/config.js

# baseURL
module.exports = {
    baseUrl: 'https://oncar-crm.domain.com/development/'
}
```
