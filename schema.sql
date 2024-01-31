CREATE DATABASE oficina;

CREATE TABLE servico (
	  id serial primary key,
  	descricao text NOT NULL,
  	valor text NOT NULL
);

CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  cpf CHAR(11) NOT NULL,
  telefone TEXT NOT NULL
);


CREATE TABLE servicos_cliente (
  id SERIAL PRIMARY KEY,
	cliente_id INTEGER REFERENCES clientes(id),
  servico_id INTEGER REFERENCES servico(id),
  data_entrada TEXT,
  data_saida TEXT
);