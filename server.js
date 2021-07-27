const inquirer = require(`inquirer`);
const mysql = require(`mysql`);
const tables = require(`console.table`);
const { allowedNodeEnvironmentFlags } = require("process");

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
            message: 'Please choose something to do!',
            choices: [
                'View all employees',
                'Add an employee',
                'Update employee role',
                'View all roles',
                'Add a new role',
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
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update employee role':
                    updateEmployeeRole();
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
        db.query(`INSERT INTO department (name) VALUES ('${answer.departName}')`,
            (err, res) => {
                if (err) {
                    throw err;
                } else {
                    console.log('Congratulations your new department has been added!');
                    runProgram();
                }
            });
    })
};

function addRole() {
    db.query(`SELECT * FROM department`, (err, res) => {
        if (err) {
            throw err;
        } else {
            inquirer.prompt([{
                    name: 'title',
                    type: 'input',
                    message: 'Please enter name for new role...'
                },
                {
                    name: `salary`,
                    type: `number`,
                    message: `Please enter salary for new role..."i.e. 60000"`
                },
                {
                    name: `department_id`,
                    type: `list`,
                    message: `What department is this new role under?`,
                    choices: res.map(choice => choice.name)
                }

            ]).then((answer) => {
                db.query(`INSERT INTO role (title, salary, department_id) 
                VALUES (
                 '${answer.title}',
                 '${answer.salary}',
                 (SELECT id FROM department WHERE name = '${answer.department_id}'));`,
                    (err, res) => {
                        if (err) {
                            throw err;
                        } else {
                            console.log('Congratulations your new role as been added!');
                            runProgram();
                        }
                    });
            })
        }
    })
};

function addEmployee() {
    db.query(`SELECT * FROM role`, (err, res) => {
        if (err) {
            throw err;
        } else {
            inquirer.prompt([{
                    name: 'firstName',
                    type: 'input',
                    message: 'Please enter a first name for new employee...'
                },
                {
                    name: 'lastName',
                    type: 'input',
                    message: 'Please enter a last name for new employee...'
                },
                {
                    name: `role`,
                    type: `list`,
                    message: `What is the role of the new employee?`,
                    choices: res.map(choice => choice.title)
                }

            ]).then((answer) => {
                db.query(`INSERT INTO employee (first_name, last_name, role_id) 
                VALUES (
                 '${answer.firstName}',
                 '${answer.lastName}',
                 (SELECT id FROM role WHERE title = '${answer.role}'));`,
                    (err, res) => {
                        if (err) {
                            throw err;
                        } else {
                            console.log('Congratulations your new employee as been added!');
                            runProgram();
                        }
                    });
            })
        }
    })

}

function updateEmployeeRole() {

}


// GIVEN a command-line application that accepts user input
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database