const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const fs = require('fs');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);


inquirer
  .prompt([
    {
    type: 'list',
    message: 'What would you like to do?',
    name: 'mainMenu',
    choices: ["View all Employees", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"],
},
  ])
  .then((response) => {
    console.log(response);
    switch(response.mainMenu) {
        case "View all Employees":
            viewAllEmployees();
            console.log("View all Employees");
            break;

        case "Update Employee Role":
            console.log("Update Employee Role");
            break;

        case "View All Roles":
            console.log("View all Roles");
            break;
        
        case "Add Department": 
            addDepartmentQuestions();
            break;


    }
});

function viewAllEmployees () {
db.query("SELECT * FROM employees", function(err, data){
    if (err) console.log(err);
    console.table(data)
})
}

function addDepartmentQuestions () {
inquirer
    .prompt([
        {
            type:'input',
            message: 'What is the name of the Department?',
            name: "departmentName",

        },
    ])
    .then((response) => {
       db.query(`INSERT INTO department (name) VALUES ('${response.departmentName}')`, function(err, data) {
        if (err) console.log(err);
        console.table(data)
       })
    }
    )

}
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

// USE THIS Application allows users to view the total utilized budget of a department—in other words, the combined salaries of all employees in that department (8 points).
//SELECT COUNT(column_name)
//FROM table_name
//WHERE condition;


//================================================================



//========================================DRAFTING===============================================================
// use below to write new file but in this case you will need to find the on the method to add an entry to db.
    // fs.writeFile('main.html', getHTML(response), (err) =>
    //   err ? console.log(err) : console.log('Success!')
    // );
//========================================DRAFTING===============================================================
  