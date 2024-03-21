# o que é apigatewayolinda?

O API Gateway Olinda é um serviço da CGS/STIC para criação, publicação, manutenção, monitoramento e proteção de APIs REST que autentica o Olinda. Os desenvolvedores de API podem criar APIs que acessem a Olinda do MEC ,com isso, o MEC passa ter autenticação e autorização nos serviços que o Olinda dispoe, os dados podem ser trafegados pela internet com segurança. Apigatewayolinda é escalável e suporta milhares de requisições por minuto.


# Nome do Ativo
* apigatewayolinda API  PHP COM LARAVEL
* apigatewayolinda FRONTEND EM REACTJS 

# Tecnologia
* PHP 7.4
* Composer
* Apache 2
* Docker
* React
* Postgresql


# clonando Repositório de codigo-fonte
git clone https://gitlabbuilder.mec.gov.br/apigatewayolinda/apigatewayolinda.git

# Instalação /Configuracão da aplicação

Para ambientes de desenvolvimento,  deverá obrigatoriamente utilizar o docker para disponibilizar a aplicação em desenvolvimento, para isso é necessário que se tenha o docker e o docker compose instalado e executar o seguinte comando no root da aplicação.

```
# Subindo o Frontend e Backend
--1- docker-compose build
--2- docker-compose up -d

#listando os container após o build

--docker ps

# instalando as dependências do frontend

--docker-compose exec apigatewayolinda-frontend sh -c "npm install"

# executando aplicação do frontend

--docker-compose exec apigatewayolinda-frontend sh -c "npm start"

# buildando somente o frontend

---docker-compose build apigatewayolinda-frontend
---docker-compose up -d apigatewayolinda-frontend

#Configurando o Backend da aplicação

--docker-compose exec apigatewayolinda_api sh -c "composer install"

--docker-compose exec apigatewayolinda_api sh -c "cp .env.example .env"

--docker-compose exec apigatewayolinda_api sh -c "php artisan key:generate"

--docker-compose exec apigatewayolinda_api sh -c "php artisan migrate"

--docker-compose exec apigatewayolinda_api sh -c "php artisan db:seed"

--docker-compose exec apigatewayolinda_api sh -c "php artisan passport:install"

```

# Visualizando aplicação localhost
* API 
http://localhost:7081/

* Frontend na porta 80
http://localhost:7080/

# Observações
* git config --global http.sslverify false 
Favor não alterar os arquivos de Configuração  dockerfile e docker-compose e chart, se necessário comunicar equipe da arquitetura da CGS.

# Instalação /Configuracão da aplicação

Para ambientes de desenvolvimento,  deverá obrigatoriamente utilizar o docker para disponibilizar a aplicação em desenvolvimento, para isso é necessário que se tenha o docker e o docker compose instalado e executar o seguinte comando no root da aplicação.
