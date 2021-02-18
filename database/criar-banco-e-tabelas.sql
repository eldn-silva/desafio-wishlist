create database desafio;
create user usr_usuario@'%' identified by 'usuario123';
grant all privileges on desafio.* to usr_usuario;
flush privileges;
use desafio;
CREATE TABLE `clientes` (
  `idclientes` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`idclientes`),
  UNIQUE KEY `email` (`email`)
);
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `senha` varchar(200) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`)
);
CREATE TABLE `wishlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idproduto` varchar(500) NOT NULL,
  `titulo` varchar(500) NOT NULL,
  `preco` float NOT NULL,
  `imagem` varchar(500) DEFAULT NULL,
  `clientes_idclientes` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_wishlist_clientes_idx` (`clientes_idclientes`),
  CONSTRAINT `fk_wishlist_clientes` FOREIGN KEY (`clientes_idclientes`) REFERENCES `clientes` (`idclientes`)
);