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
const addDepartmentQuestions = () => {
    return inquirer.prompt
        ([
            {
                type: "input",
                name: "departmentName",
                message: "What is the name of the new department?",
                validate: DepartmentNameInput => {
                    if(DepartmentNameInput) {
                        return true
                    } else {
                        console.log("Please input a department name.")
                    }
                }
            }
        ])
        .then(function(department) {
            const bestDepartment = new NewDepartment (department.departmentName)
            // deconstruct newDepartment object to easily insert into query
            const name = bestDepartment.name
            // query new department name into table
            db.query('INSERT INTO department (name) VALUES (?)', name, (err, result) => {
                if(err) {
                    console.log(err);
                    return startApp();
                } else {
                    console.log('New Department Added!');
                    return startApp();
                }
            })
        })
}

// add role questions
const addRoleQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "roleTitle",
            message: "What is the name of the new role?",
            validate: roleNameInput => {
                if(roleNameInput) {
                    return true
                } else {
                    console.log("Please input a name for this new role.")
                }
            }
        },
        {
            type: "input",
            name: "roleSalary",
            message: "What is the salary for this position?",
            validate: roleSalaryInput => {
                if(roleSalaryInput) {
                    return true;
                } else {
                    console.log("Please enter a salary for this new role.")
                }
            }
        },
    ]).then(function(roleInput) {
        
        let title = roleInput.roleTitle
        let salary = roleInput.roleSalary
        db.promise().query("SELECT id AS name FROM department")
            .then(([row, fields]) => {
                return inquirer.prompt ({
                    type: "list",
                    name: "roleDepartment",
                    message: "What department will this role be in?",
                    choices: row.filter(r => !!r.name).map(r => r.name), 
                    validate: roleDepartmentInput => {
                        if(roleDepartmentInput) {
                            return true;
                        } else {
                            console.log("Please input what department this new role belongs to.")
                        }
                    }
                })
            }).then(function(roleDep) {
                let department_id = roleDep.roleDepartment
                console.log(title)
                console.log(salary)
                console.log(department_id)
                let values = [
                    [title, salary, department_id]
                ]
                    db.query("INSERT INTO role (title, salary, department_id) VALUES (?)", values, (err, res) => {
                        if(err) {
                            console.log(err)
                            return startApp()
                        } else {
                            console.log("New Role Created!")
                            return startApp()
                        }
                    })
              })
    })     
}