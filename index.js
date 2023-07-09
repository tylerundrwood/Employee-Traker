const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

const NewEmployee = require('./newEmployee');
const NewRole = require('./newRole');
const NewDepartment = require('./newDepartment');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'mecca_1006',
      database: 'company_db'
    },
    console.log(`Connected to the Company_DB.`)
  );
