const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const fs = require('fs');
require('dotenv').config();
const logo = require('asciiart-logo');
const config = require('./package.json');
const { title } = require('process');


// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        multipleStatements: true
    },
    console.log(`Connected to the employees_db database.`)
);

//==================================================================================



    console.log(logo({
        name: 'Employee Tracker',
        font: 'Soft',
        lineChars: 8,
        padding: 2,
        margin: 2,
        borderColor: 'white',
        logoColor: 'bold-blue',
        textColor: 'blue',
    }
    )
        .emptyLine()
        .center("Welcome to my Employee Tracker, please choose from the following prompts")
        .render());

startMenu();

function startMenu() {



    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'mainMenu',
                choices: [
                    "View all Employees",
                    "View All Roles",
                    "View All Departments",
                    "Add Employee",
                    "Add Department",
                    "Add Role", 
                    "Update Employee Role",
                    "Finish"],
            },
        ])
        .then((response) => {
            //console.log(response);
            switch (response.mainMenu) {
                case "View all Employees":
                    console.log("EMPLOYEES");
                    viewAllEmployees();
                    break;

                case "View All Roles":
                    console.log("ROLES");
                    viewAllRoles();
                    break;

                case "View All Departments":
                    console.log("DEPARTMENTS");
                    viewAllDepartments();
                    break;

                case "Update Employee Role":
                    console.log("UPDATE EMPLOYEE ROLE");
                    updateEmployeeRole();
                    break;

                case "Add Employee":
                    console.log("ADD EMPLOYEE");
                    addEmployee();
                    break;

                case "Add Department":
                    console.log("ADD DEPARTMENT");
                    addDepartmentQuestions();
                    break;

                case "Add Role":
                    console.log("ADD ROLE");
                    addRole();
                    break;

                case "Finish":
                    console.log("Goodbye!");

                    break;
            }

        });
};

//=================================== VIEWING OPTIONS ===============================================


// Retrieves Employee Table
function viewAllEmployees() {
   
    db.query("SELECT * FROM employees", function (err, data) {
        if (err) console.log(err);
        console.table(data);
        // console.log("Press enter to return to menu");
        startMenu();

    });
};


// Retrieves Department Table

function viewAllDepartments() {

    db.query("SELECT * FROM department", function (err, data) {
        if (err) console.log(err);
        console.table(data);
        startMenu();

    })
};

// Retrieves Role Table

function viewAllRoles() {

    db.query("SELECT * FROM role", function (err, data) {
        if (err) console.log(err);
        console.table(data);
        startMenu();
    })
};



//=======================================ADDS AN EMPLOYEE ===========================================


function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "What is the employee's first name?"
            },
            {
                type: 'input',
                name: 'lastName',
                message: "What is the employee's last name?"
            },
            {
                type: 'input',
                name: 'newEmployeeRole',
                message: "What is the employee's role ID?",
            },
            {
                type: 'input',
                name: 'newEmployeeManager',
                message: "Who is the employee's manager ID?",
            }
        ])
        .then((response) => {
            //console.log(response);
            let firstName = response.firstName;
            let lastName = response.lastName;
            let newEmployeeRole = response.newEmployeeRole;
            let newEmployeeManager = response.newEmployeeManager;

            db.query(
                `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', '${newEmployeeRole}', '${newEmployeeManager}');`,
                function (err, data) {
                    if (err) console.log(err);
                    // console.table(data);
                    viewAllEmployees();
                    console.log(`Added ${firstName} ${lastName} to the database`);
                    return;

                }
            );


        });
};

// Add employee
// What is the employees first name?
// What is the employees last name?
// What is the employees role? -selection
// Who is the employees manager? - add none as an Option
//const employeeManagers = {employees.[first_name, last_name,]}



//===================================== ADD A ROLE ========================================================
function addRole() {
   
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the role?',
                name: 'roleName'
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'What is the salary for this role?'
            },
            {
                type: 'input',
                name: 'roleDepartment',
                message: 'What department does the role belong to? Please enter department ID, use reference chart above',
            },
        ])
        .then((response) => {
            let roleName = response.roleName;
            let roleSalary = response.roleSalary;
            let roleDepartment = response.roleDepartment;

            db.query(
                `INSERT INTO ROLE (title, salary, department_id) 
                VALUES ('${roleName}', '${roleSalary}', '${roleDepartment}');`,

                function (err, response) {
                    if (err) console.log(err);
                    // console.table(response);
                    viewAllRoles();
                    console.log(`Added ${roleName} to the database`);

                    return;
                }
            );

        });
};

// Add Role
// What is the name of the role?
// What is the salary of the role?
// What department does the role belong to? [Finance, Legal, etc etc]
// - Gives back message "Added ${'role} to the database"

//==============================ADDS A DEPARTMENT==========================================


function addDepartmentQuestions() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the Department?',
                name: "departmentName",

            },
        ])
        .then((response) => {
            db.query(`INSERT INTO department (name) VALUES ('${response.departmentName}');`, function (err, data) {
                if (err) console.log(err);
                viewAllDepartments();
                console.log(`Added ${response.departmentName} to the database`);

                return;
            });


        });
    ;
}

// //======================DRAFTING=========================================
async function updateEmployeeRole() {
    const choice = await db.promise().query("SELECT id, first_name, last_name FROM employees;");
    //console.table(choice[0]);
    const arrayOfDBresults = choice[0];

const arrayOfName = arrayOfDBresults.map((individualObj) => {
    return {id: individualObj.id, full_name: `${individualObj.first_name} ${individualObj.last_name}`};
});

console.table(arrayOfName); 
const arrID = arrayOfName.map((individualObj) => {
    return individualObj.id;

})
inquirer
.prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee's role do you want to update? Please reference chart above",
      choices: arrID
    }
  ]
)
};
//             // {
            //     type: 'list',
            //     message: 'Which role do you want to assign the selected employee?',
            //     name: "employeeRole",
            //     //              choices: [----array of Roles--------]
            // },
       // ])
       // .then((response) => {
            // let employeeRole = response.employeeRole;

            // db.query(`UPDATE employee SET role_id WHERE id = ${employeeRole};`,
            //     function (err, response) {
            //         if (err) console.log(err);
            //         console.log("Updated employee's role");
            //         viewAllRoles();
            //         startMenu();
            //         return;
            //     }
            // );

// };




// console.log("Updated employee's role");
// console.table(d)

//======================DRAFTING========================================





//======================DRAFTING=========================================

// Add department
// What is the name of the Department?
//  - Gives back message "Added ${'department"} to the database"
// View all Roles
// TABLE = ROLE __ id, title dep, salary
//======================DRAFTING=========================================
//======================DRAFTING=========================================
//======================DRAFTING=========================================





// View all employees
// TABLE = employees __ id, f/name,l/name, title, dep, salary, manager

// Add Role
// What is the name of the role?
// What is the salary of the role?
// What department does the role belong to? [Finance, Legal, etc etc]
// - Gives back message "Added ${'role"} to the database"

// Add employee
// What is the employees first name?
// What is the employees last name?
// What is the employees role? -selection
// Who is the employees manager? - add none as an Option


// Update Employee Role
// Which employees role do you want to update? -array of all employees
// which role do you want to assign the selected employee? array of Roles
// - Gives back message "Updated employee's role"

// USE THIS Application allows users to view the total utilized budget of a department???in other words, the combined salaries of all employees in that department (8 points).
//SELECT COUNT(column_name)
//FROM table_name
//WHERE condition;


//================================================================




//========================================DRAFTING===============================================================
