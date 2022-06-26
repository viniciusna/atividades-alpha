-- Database: bank

-- DROP DATABASE IF EXISTS bank;

CREATE DATABASE bank
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE TABLE clients (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(60),
    date_of_birth DATE,
    email VARCHAR(20) UNIQUE,
    cpf CHAR(11) UNIQUE
);

CREATE TABLE accounts (
	id CHAR(36) PRIMARY KEY,
	client_id CHAR(36) REFERENCES clients (id),
	account_number CHAR(5) UNIQUE,
	account_verifying_digit CHAR(1),
	password VARCHAR,
	account_balance NUMERIC(10,2)
)

SELECT * FROM clients;
SELECT * FROM accounts;

TRUNCATE TABLE clients;
TRUNCATE TABLE accounts;

drop table accounts;

