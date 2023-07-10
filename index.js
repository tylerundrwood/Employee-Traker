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

  const startApp = () => {
    return inquirer.prompt
        ([
           {
            type: "list",
            name: "first",
            message: "What would you like to do?",
            choices: ["View All Employees", "Update Employee Role","Add Employee", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
           }
        ])
        .then(function(data) {
            if(data.first == "View All Employees") {
                // Query employees table
                db.query('SELECT * FROM employee', function (err, results) {
                    console.table(results);
                    return startApp();
                });
            } else if(data.first == "View All Departments") {
                // Query department table
                db.query('SELECT * FROM department', function (err, results) {
                    console.table(results);
                    return startApp();
                });
            } else if(data.first == "View All Roles") {
                // Query role table
                db.query('SELECT * FROM role', function (err, results) {
                    console.table(results);
                    return startApp();
                });
            } else if(data.first == "Add Department") {
                // run function to add department
                addDepartmentQuestions();
            } else if(data.first == "Add Employee") {
                // run function to add employee
                addEmployeeQuestions();
            } else if(data.first == "Add Role") {
                // run function to add roll
                addRoleQuestions();
            } else if(data.first == "Update Employee Role") {
                //updateEmployeeRole();
                console.log("Currently Unavailable.")
                return startApp()
            }
             else if(data.first == "Quit") {
                // if user selects 'quit' the app exits
                process.exit(console.log("Goodbye!"));
            }
        })
}