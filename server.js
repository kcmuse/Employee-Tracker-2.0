const inquirer = require(`inquirer`);
const mysql = require(`mysql`);
const tables = require(`console.table`);

const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employees_db'
    },
    console.log(`Connected to the employees database.`)
);

// TODO: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

const runProgram = () => {
    inquirer.prompt({
            name: ' business',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'Add an employee',
                'Update employee role',
                'View all roles',
                'Add a role',
                'View all deparments',
                'Add department'
            ]
        })
        .then(function(answer) {
            switch (answer.business) {
                case 'View all departments':
                    viewDeparments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'Add department':
                    addDepartment();
                    break;
                case 'Add a role':
                    break;
                case 'Add an employee':
                    break;
                case 'Update employee role':
                    break;
            }
        });
}

function viewDeparments() {
    console.log('Showing all departments\n');
    db.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err;
        console.table(res);
        runProgram();
    });
}

function viewAllRoles() {
    console.log(`Showing all roles\n`);
    db.query(`SELECT * FROM role`), (err, res) => {
        if (err) throw err;
        console.table(res);
        runProgram();
    }
}

function viewAllEmployees() {
    console.log(`Showing all Employees\n`);
    db.query(`SELECT * FROM employee`), (err, res) => {
        if (err) throw err;
        console.table(res);
        runProgram();
    }
}

function addDepartment() {
    inquirer.prompt({
        name: 'departName',
        type: 'input',
        message: 'Enter a name for the department?'
    }).then((answer) => {
        connection.query(`INSERT INTO department (name) VALUES ('${answer.departName}')`,
            (err, res) => {
                if (err) {
                    throw err;
                } else {
                    console.log('Department has been added');
                    runProgram();
                }
            });
    })
}

// GIVEN a command-line application that accepts user input
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database