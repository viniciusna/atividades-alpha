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

CREATE TABLE bank_statements (
	id CHAR(36) PRIMARY KEY,
	operating_account_id CHAR(36) REFERENCES accounts (id),
	operation_type VARCHAR,
	destiny_account_id CHAR(36) REFERENCES accounts (id),
	value NUMERIC(10,2),
	created_at TIMESTAMP
)

SELECT * FROM clients;
SELECT * FROM accounts;
SELECT * FROM bank_statements;

TRUNCATE TABLE clients;
TRUNCATE TABLE accounts;
TRUNCATE TABLE bank_statements;

drop table bank_statements;

-- Tratando só depósitos e saques primeiro
SELECT operation_type, "value", created_at
FROM bank_statements
WHERE operating_account_id='33834140-8bc8-4171-9d28-276419d68e78' AND operation_type != 'transfer'
OR operation_type='deposit' AND destiny_account_id='33834140-8bc8-4171-9d28-276419d68e78';

SELECT * FROM bank_statements
INNER JOIN accounts
ON operating_account_id=accounts.id OR destiny_account_id=accounts.id
WHERE accounts.id='33834140-8bc8-4171-9d28-276419d68e78'






