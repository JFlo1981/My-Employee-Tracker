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
    inquirer.prompt({
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
            'Delete an employee',
            'Exit'
        ]
    }).then(answer => {
        switch('Answer: ', answer.track) {
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
                updateEmployee();
                break;
            case 'Delete an employee':
                deleteEmployee();
                break;    
            case 'Exit':
                exitTrack();
                break;
        }
    })
};

function viewDepartments() {
    db.query("SELECT * FROM department",
    function (err, res) {
        if (err) throw err;
        console.table('Departments: ', res);
        employeeDb();
    })
};

