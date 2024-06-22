CREATE DATABASE empleados_db;

USE empleados_db;

CREATE TABLE empleados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    salario DECIMAL(10, 2) NOT NULL
);