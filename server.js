const inquirer = require(`inquirer`);
const mysql = require(`mysql`);

const db = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'employees_db'
    },
    console.log(`Connected to the employees database.`)
);

db.connect((err) => {
    if (err) throw err;
    console.log(`You have been connected!`);
    runProgram();
})
const runProgram = () => {
    inquirer.prompt({
            name: 'business',
            type: 'list',
            message: 'Please choose something to do!',
            choices: [
                'View all employees',
                'Add an employee',
                // 'Update employee role',
                'View all roles',
                'Add a new role',
                'View all departments',
                'Add department'
            ]
        })
        .then((answer) => {
            switch (answer.business) {
                case 'View all employees':
                    viewAllEmployees();
                    break;

                case 'Add an employee':
                    addEmployee();
                    break;

                case 'Update employee role':
                    updateEmployeeRole();
                    break;

                case 'View all roles':
                    viewAllRoles();
                    break;

                case 'Add a new role':
                    addRole();
                    break;

                case 'View all departments':
                    viewDepartments();
                    break;

                case 'Add department':
                    addDepartment();
                    break;
            }
        });
};
// used to view all departments.
function viewDepartments() {
    console.log('Showing all departments\n');
    db.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err;
        console.table(res);
        runProgram();
    });
};
// used to see all roles
function viewAllRoles() {
    console.log(`Showing all roles\n`);
    db.query(`SELECT id, title, salary FROM role`, (err, res) => {
        if (err) throw err;
        console.table(res);
        runProgram();
    })
}
// used to see all employees
function viewAllEmployees() {
    let allEmployee = `SELECT 
    employee.id, 
    first_name AS 'First name', 
    last_name AS 'Last name', 
    role.title AS 'Role', 
    role.salary AS 'Salary', 
    department.name AS 'Department' 
    FROM employee
    JOIN role ON role.id = employee.role_id
    JOIN department ON department.id = role.department_id;`;
    console.log(`Showing all Employees\n`);
    db.query(allEmployee, (err, res) => {
        if (err) throw err;
        console.table(res);
        runProgram();
    })
}

// function to add a new department
function addDepartment() {
    inquirer.prompt({
        name: 'departName',
        type: 'input',
        message: 'Enter a name for the department?'
    }).then((answer) => {
        db.query(`INSERT INTO department (name) VALUES ('${answer.departName}')`,
            (err, res) => {
                if (err) throw err;
                console.log('Congratulations your new department has been added!');
                runProgram();
            }
        );
    })
};
// function to add new role
function addRole() {
    db.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err;
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
                    if (err) throw err;
                    console.log('Congratulations your new role as been added!');
                    runProgram();
                });
        })
    })
};
// function to add a new employee
function addEmployee() {
    db.query(`SELECT * FROM role`, (err, res) => {
        if (err) throw err;
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
                    if (err) throw err;
                    console.log('Congratulations your new employee as been added!');
                    runProgram();
                });
        })
    })

}

// Function to update the employee role
// function updateEmployeeRole() {
//     db.query(`SELECT first_name AS role_id FROM employee`, (emperr, empres) => {
//         if (emperr) throw emperr;
//         db.query(`SELECT title AS id FROM role`, (roleErr, roleRes) => {
//             if (roleErr) throw roleErr;
//             inquirer.prompt([{
//                     name: 'employee_id',
//                     type: 'list',
//                     message: 'Which employee would you like to edit?',
//                     choices: empres.map(employee => employee.role_id)
//                 },
//                 {
//                     name: `newRole`,
//                     type: `list`,
//                     message: `Please choose a new role...`,
//                     choices: roleRes.map(role => role.id)
//                 }
//             ]).then((answer) => {
//                 db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [answer.newRole, answer.employee_id], (err) => {
//                     if (err) throw err;
//                     console.log("Employee Role has been updated");
//                     runProgram();
//                 })
//             })
//         })
//     })
// };