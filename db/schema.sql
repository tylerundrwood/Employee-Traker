CREATE DATABASE company_db;

-- use database we just created
USE company_db;

-- create department table
CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);