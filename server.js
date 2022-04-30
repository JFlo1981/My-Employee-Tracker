const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

// connect to db
const db = mysql.createConnection(
    {
        host: "localhost",
        // mysql username
        user: process.env.DB_US,
        //  mysql password
        password: process.env.DB_PW,
        database: "employee",
    },
    console.log("connected to employee db")
);

// server connection
db.connect(function(err){
    if (err) throw err;
    employeeDb();

})

// prompt for user input
function employeeDb() {
    inquirer
    .prompt({
        name: 'track',
        type: 'list',
        message: 'Employee Database --- What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    }).then(answers => {
        switch('Answer: ', answers.track) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break; 
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;   
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break; 
            case 'Update an employee role':
                updateEmployeeRole();
                break;    
            case 'Exit':
                exitTrack();
                break;
        }
    })
};

// view all departments in db
function viewDepartments() {
    db.query("SELECT * FROM department",
    function (err, res) {
        if (err) throw err;
        console.table('Departments: ', res);
        employeeDb();
    })
};

// view all roles in db 
function viewRoles() {
    db.query("SELECT * FROM role",
    function (err, res) {
        if (err) throw err;
        console.table('Roles: ', res);
        employeeDb();
    })
};

// view all employees in db
function viewEmployees() {
    db.query("SELECT * FROM employee",
    function (err, res) {
        if (err) throw err;
        console.table('Employees: ', res);
        employeeDb();
    })
};

//  add new department to db
function addDepartment() {
        inquirer
        .prompt([
            {
                name: "addDepartment",
                type: "input",
                message: "What is the name of the new department?"
            }
        ]).then(function(answer) {
            db.query(`INSERT INTO department (name) VALUES ('${answer.addDepartment}')`,
            (err, res) => {
                if (err) throw err;
                console.log("New " + answer.addDepartment + " department added.");
                employeeDb();
            })
        })
};

// add new role to db
function addRole() {
    inquirer
    .prompt([
        {
            name: "addRole",
            type: "input",
            message: "What is the new role?"
        },
        {
            name: "addSalary",
            type: "input",
            message: "What is the salary for this role?"
        },
        {
            name: "addDeptId",
            type: "input",
            message: "What is the department ID for this role?"
        }
    ]).then(function(answer) {
        db.query(`INSERT INTO roles (title, salary, department_id) Values ('${answer.addRole}', '${answer.addSalary}', '${answer.addDeptId})`,
        (err, res) => {
            if (err) throw err;
            console.log("A " + answer.addRole + " role has been added at a salary of " + answer.addSalary + ".");
            employeeDb();
        })
    })
};

//  add employee to db
function addEmployee() {
        inquirer
        .prompt([
            {
                name: 'last_name',
                type: 'input',
                message: "What is the new employee's last name?"
            },
            {
                name: 'first_name',
                type: 'input',
                message: "What is the new employee's first name?"
            },
            {
                name: 'role_id',
                type: 'input',
                message: "What is the employee's role? 1. Sales 2. Finance 3. Marketing 4. Growers",
                choices: ["1", "2", "3", "4"]
            },
            {
                name: 'manager_id',
                type: 'input',
                message: "What is the manager role id? 1. Sales Mgr 2. Finance Mgr 3. Marketing Mgr 4. Grower Mgr",
                choices: ["1", "2", "3", "4"]
            },
        ]).then(function(answer){
            db.query(`INSERT INTO employee (last_name, first_name, role_id, manager_id) VALUES ('${answer.last_name}', '${answer.first_name}', '${answer.role_id}', '${answer.manager_id})`,
            (err, res) => {
               if (err) throw err;
               console.log("Employee " + answer.last_name + ", " + answer.first_name + " added."); 
               employeeDb();
            })
        })
};

//  update employee role
function updateEmployeeRole() {
    inquirer
    .prompt([
        {
            name: "updateRole",
            type: "input",
            message: "What is the ID of the employee you want to update?",
        },
        {
            name: "newRole",
            type: "input",
            message: "What is the employee's new role? 1. Sales 2. Finance 3. Marketing 4. Growers",
            choices: ["1", "2", "3", "4"]
        }
    ]).then(function(answer) {
        const updateRole = answer.updateRole;
        const newRole = answer.newRole;
        const roleUpdate = `UPDATE employee SET role_id = "${newRole}" WHERE id = "${updateRole}"`;
        db.query(roleUpdate, function (err, res) {
            if (err) throw err;
            console.table(answer);
            employeeDb();
        })
    })
};

// exit db
function exitTrack() {
    console.log("Exiting Employee Tracker");
    db.end();
};
