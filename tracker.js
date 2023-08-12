const mysql = require('mysql2');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Dantas123',
    database: 'employee_db'
  });

  connection.connect(function (err) {
    if (err) return console.log(err);
    InquirerPrompt();
});

const InquirerPrompt = () => {
  inquirer.prompt([
      {
          type: 'list',
          name: 'choices',
          message: 'What would you like to do?',
          choices: [
              'View all departments',
              'View all roles',
              'View all employees',
              'Add department',
              'Add role',
              'Add employee',
              'Update all departments',
              'Update employee infomation',
              'Exit'
          ]
      }
  ])

      .then((answers) => {
          const { choices } = answers;

          if (choices === "View all departments") {
              showDepartments();
          }

          if (choices === "View all roles") {
              showRoles();
          }

          if (choices === "View all employees") {
              showEmployees();
          }

          if (choices === "Add department") {
              addDepartments();
          }

          if (choices === "Add role") {
              addRoles();
          }

          if (choices === "Add employee") {
              addEmployees();
          }

          if (choices === "Update all departments") {
              allDepartments();
          }

          if (choices === "Update employee infomation") {
              employeeInfomation();
          }

          if (choices === "Exit") {
              connection.end();
          }
      });
};

