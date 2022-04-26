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

