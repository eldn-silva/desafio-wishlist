<h1 align="center">DESAFIO TÉCNICO WISHLIST API - LUIZALABS</h1>

<h2>Sobre o projeto</h2>
<p>
A wish list API é uma aplicação que permite a criação/alteração/remoção/pesquisa de clientes em uma base de dados e permite ainda o gerenciamento de lista de desejos destes clientes.

Esta API é pública e portanto possui cadastro e autenticação de usuários, com utilização do JWT (Json Web Token). 

O desenvolvimento foi realizado a partir das especificações técnicas do desafio técnico do LuizaLabs, consumindo API externa para consulta de detalhes dos produtos, onde entramos somente com o ID do produto existente no corpo da requisição.
<p>

<h2>Funcionalidades</h2>
<p>
Colaboradores do Magalu podem se cadastrar nesta plataforma, enviando:
<p>- email </p>
<p>- senha </p>
<p>
<p>Após a realização do cadastro, é possível que nossos colaboradores efetuem algumas ações:<p>
<p>- Adição de novos clientes na base de dados da empresa </p>
<p>- Consulta de todos os clientes cadastrados na base de dados </p>
<p>- Consulta de crientes específicos </p>
<p>- Substituição de nome ou email de um determinado cliente </p>
<p>- Adição de produtos favoritos para cada cliente, produtos estes que são consumidos de outra API </p>
<p>- Consulta da wishlist de cada cliente </p>
<p>- Consulta de um produto específico favorito de um determinado cliente </p>
<p>- Exclusão de produtos da wishlist </p>
<p>- Exclusão de clientes </p>
<p>
<h2> Pré Requisitos </h2>
<p>Antes de começar, é necessário ter instalado em sua máquina as seguintes ferramentas:</p>

<p>- GIT</p>
<p>- Node.js versão 14.15.4 ou superior</p>
<p>- Mysql Workbench versão 8.0</p>

É importante ainda seguir os seguintes passos:
- Clonar este repositório;
- Acessar a pasta do projeto;
- Instalar as dependências através do comando npm install;
- Rodar script SQL (que está no arquivo database/criar-banco-e-tabelas.sql) no MYSQL;
- Iniciar o servidor;
<p>
<h2> API dos produtos </h2>
A API dos produtos que é consumida por esta API, é acessada através da URL abaixo:

```
http://challenge-api.luizalabs.com/api/product/?page=<PAGINA>
```
Onde PAGINA representa o número da página requisitada, iniciando em 1.

Para acessar um produto específico, basta entrar com o ID do produto no endpoint, conforme abaixo:

```
http://challenge-api.luizalabs.com/api/product/<ID>/
```

A estrutura dos produtos é composta por:
- price: preço do produto
- image: URL da imagem do produto
- brand: marca do produto
- id: id do produto
- title: nome do produto
- reviewScore: média dos reviews para este produto

<h2> Scripts </h2>
Antes de realizar os testes na presente API, é necessário rodar uma script SQL no MYSQL, para criação da DATABASE, TABELAS e seus respectivos relacionamentos. Esta script se encontra no arquivo database/criar-banco-e-tabelas.sql deste projeto. Esta script irá gerar também um usuário com permissão para administrar a database, usuário este que é o mesmo cadastrado na presente API.
<h2>Parâmetros de execução da tabela</h2>
<p>mysql_host - localhost </p>
<p>mysql_user - Usuário de acesso ao MySql:	usr_usuario </p>
<p>mysql_passwd - Senha de acesso ao MySql: usuario123 </p>
<p>mysql_db - Schema do MySql utilizado pela aplicação: desafio </p>
<p>http_port -	Porta de conexão do banco de dados: 3306 </p>

<h2> Autenticação e criação de usuário </h2>
Um cadastro de usuário e autenticação inicial são necessárias para realizar os testes local:

Para CADASTRO do usuário é necessário fazer:
```
- Acessar o endpoint /usuarios/cadastro
- Através do método POST enviar email e senha em formato JSON 
- Este e-mail e senha serão enviados para a tabela usuarios do banco de dados local.
```

Para realização do LOGIN, é necessário:

```
- Acessar o endpoint /usuarios/login
- Através do método POST entrar com email e senha cadastrados, em formato JSON. 
- Posteriormente será gerada uma chave token. 
- Esta chave token deve ser usada para o acesso à todas as requisições da API
- Levando em conta que a API seja testada através do POSTMAN, a chave deve ser inserida na aba 'Authorization', onde deve ser selecionada também o seu tipo, como sendo: Bearer Token
- Após isso, o usuário cadastrado está autorizado e autenticado para realizar as requisições
```

<h2> Requisições </h2>
Após os serviços e aplicação rodando, é necessário acessar http://localhost:3000 para desenvolvimento e teste da API. Todos os endpoints estão demonstrados abaixo:

<p>/clientes </p>
<p>/clientes/id_cliente </p>
<p>/wishlist </p>
<p>/wishlist/id_cliente </p>
<p>/wishlist/id_cliente/idproduto </p>
<p>/usuarios/cadastro </p>
<p>/usuarios/login </p>
<p>

<p>Neste ítem serão feitas algumas considerações pertinentes adotadas nesta aplicação, no que se refere às requisições:</p>
<p>- GET - Quando possuem, os parâmetros são enviados junto a URL </p>
<p>- POST - Parâmetros são enviados no corpo da requisição </p>
<p>- PATCH - O id do cliente é enviado na URL e o nome e email no corpo da requisição </p>
<p>- DELETE/clientes - O id do cliente é enviado na URL </p>
<p>- DELETE/wishlist - O id do cliente e produto a ser excluído são enviados no corpo da requisição </p>

<h2>Tecnologias</h2>
As seguintes ferramentas foram usadas na construção do projeto:

<p><b>Dependências</b></p>

- axios - versão 0.21.1 </p>
- bcrypt - versão 5.0.0 </p>
- body-parser - versão 1.19.0 </p>
- express - versão 4.17.1 </p>
- jsonwebtoken - versão 8.5.1 </p>
- morgan - versão 1.10.0 </p>
- mysql2 - versão 2.2.5 </p>

</p>

<p><b>Utilitários</b></p> 

- Editor - Visual Studo Code </p>
- Teste de API - Postman </p>

<h2><b>Autor</b></h2>
<p>Elder Nogueira da Silva - LuizaLabs</p>
