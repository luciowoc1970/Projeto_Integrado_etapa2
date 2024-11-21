create database unica_project;

use unica_project;

CREATE TABLE Usuario (
  idUsuario int NOT NULL AUTO_INCREMENT,
  nomeUsuario varchar(50) NOT NULL,
  nomeCompleto varchar(255) NOT NULL,
  senhaHash varchar(255),
  mfaEnabled boolean,
  email varchar(255) NOT NULL,
  senhaResetToken varchar(255),
  senhaResetExpires DateTime,
  CONSTRAINT pk_id_usuario_idUsuario PRIMARY KEY (idUsuario)
) ENGINE = InnoDB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE UsuarioComercial (
  idUsuario int NOT NULL AUTO_INCREMENT,
  nomeCompleto varchar(255) NOT NULL,
  CONSTRAINT pk_id_usuario_comercial_idUsuario PRIMARY KEY (idUsuario),
  CONSTRAINT fk_id_usuario_comercia_idUsuario FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
) ENGINE = InnoDB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE ClientExterno (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(255) NOT NULL,
  CONSTRAINT pk_id_cliente_externo_id PRIMARY KEY (id)
) ENGINE = InnoDB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE PedidodeVenda (
  idPedido int NOT NULL AUTO_INCREMENT,
  aprovado boolean NOT NULL,
  prazoEntrega datetime(3) NOT NULL,
  idClienteExterno int NOT NULL,
  CONSTRAINT pk_id_pedido_de_venda_idpedido PRIMARY KEY (idPedido),
  CONSTRAINT fk_id_pedido_de_venda_idpedido FOREIGN KEY (idClienteExterno) REFERENCES ClientExterno(id)
) ENGINE = InnoDB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE ItemPedidoVenda (
  idItem int NOT NULL AUTO_INCREMENT,
  idPedido int NOT NULL,
  idProduto int NOT NULL,
  quantidade int NOT NULL,
  CONSTRAINT pk_item_pedido_venda_id_item PRIMARY KEY (idItem),
  CONSTRAINT fk_item_pedido_venda_id_pedido FOREIGN KEY (idPedido) REFERENCES PedidodeVenda(idPedido)
) ENGINE = InnoDB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE GerenteComercial (
  idGerente int NOT NULL AUTO_INCREMENT,
  nome varchar(255) NOT NULL,
  CONSTRAINT pk_gerente_comercial_id_gerente PRIMARY KEY (idGerente)
) ENGINE = InnoDB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE GestorVendas (
  idColaborador INT AUTO_INCREMENT,
  nomeColaborador VARCHAR (50) NOT NULL,
  email VARCHAR (50) NOT NULL,
  telefoneColaborador VARCHAR (20) NOT NULL,
  departamento VARCHAR (50) NOT NULL,
  CONSTRAINT pk_id_colaborador_venda PRIMARY KEY(idColaborador)
) ENGINE = InnoDB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE GestorProducao (
  idColaborador INT NOT NULL AUTO_INCREMENT,
  nomeColaborador VARCHAR (50) NOT NULL,
  email VARCHAR (50) NOT NULL,
  telefoneColaborador VARCHAR(20) NOT NULL,
  departamento VARCHAR (50) NOT NULL,
  CONSTRAINT pk_id_colaborador_producao PRIMARY KEY(idColaborador)
) ENGINE = InnoDB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE Colaborador (
  idColaborador INT NOT NULL AUTO_INCREMENT,
  CONSTRAINT pk_colaborador_id_colaborador PRIMARY KEY (idColaborador),
  CONSTRAINT fk_id_colaborador_producoes FOREIGN KEY(idColaborador) REFERENCES GestorProducao (idColaborador),
  CONSTRAINT fk_id_colaborador_vendas FOREIGN KEY(idColaborador) REFERENCES GestorVendas (idColaborador)
) ENGINE = InnoDB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE Pedido (
  idPedido INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  dataPedido DATE,
  dataEntrega DATE,
  nomeCliente VARCHAR (50) NOT NULL,
  numCliente VARCHAR (50) NOT NULL
) ENGINE = InnoDB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE Produto (
  id int NOT NULL AUTO_INCREMENT,
  descricao varchar(45) NOT NULL,
  valorUnitario decimal(9, 2) DEFAULT NULL,
  dataFafricacao date DEFAULT NULL,
  undMedida varchar(15) NOT NULL,
  modelo varchar(45) DEFAULT NULL,
  peso decimal(7, 2) DEFAULT NULL,
  CONSTRAINT pk_produto_id  PRIMARY KEY (id)
) ENGINE = InnoDB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE Fornecedor (
  id int NOT NULL,
  endereço varchar(50) NOT NULL,
  cnpj varchar(16) NOT NULL,
  CONSTRAINT pk_fornecedor_cnpj PRIMARY KEY (cnpj)
) ENGINE = InnoDB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE Estoque (
  idProduto int NOT NULL AUTO_INCREMENT,
  descricaoProduto varchar(45) NOT NULL,
  qtdeEntrada int unsigned DEFAULT NULL,
  qtdeSaida int unsigned DEFAULT NULL,
  dataEntrada date DEFAULT NULL,
  dataSaida date DEFAULT NULL,
  valorUnitario decimal(10, 2) NOT NULL,
  numPedido int NOT NULL,
  idFornecedor varchar(16) DEFAULT NULL,
  codigo int DEFAULT NULL,
  CONSTRAINT pk_estoque_id_produto PRIMARY KEY (idProduto),
  KEY codigo (codigo),
  KEY idFornecedor (idFornecedor),
  CONSTRAINT fk_estoque_produto_id FOREIGN KEY (codigo) REFERENCES Produto (id),
  CONSTRAINT fk_estoque_fornecedor_cnpj FOREIGN KEY (idFornecedor) REFERENCES Fornecedor (cnpj)
) ENGINE = InnoDB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE Configuracao (
  id int NOT NULL AUTO_INCREMENT,
  aprovacaoPelaGerenciaComercial bool default false,
  preAprovarPedidos bool default false,
  valorMinimoAprovacao varchar(20),
  CONSTRAINT pk_configuracao_id PRIMARY KEY (id)
) ENGINE = InnoDB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE Material (
  id int NOT NULL AUTO_INCREMENT,
  sku varchar(20) not null,
  descricao varchar(50) not null,
  CONSTRAINT pk_material_id PRIMARY KEY (id)
) ENGINE = InnoDB AUTO_INCREMENT = 0 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
