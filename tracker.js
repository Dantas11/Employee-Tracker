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
              'Update employee role',
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

          if (choices === "Update employee role") {
              employeeInfomation();
          }

          if (choices === "Exit") {
              connection.end();
          }
      });
};

showDepartments = () => {
  console.log('All departments are showing.');
  const mysql = `SELECT department.id AS id, department.name AS department FROM department`;

  connection.query(mysql, (err, rows) => {
      if (err) return console.log(err);
      console.table(rows);
      InquirerPrompt();
  });
}

showRoles = () => {
  console.log('Show all roles.');

  const mysql = `SELECT roles.id, roles.title, department.name AS department FROM roles LEFT JOIN department ON roles.department_id = department.id`;

  connection.query(mysql, (err, rows) => {
      console.table(rows);
      InquirerPrompt();
  })
};

showEmployees = () => {
  console.log('All employees are showing.');
  const mysql = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(mgr.first_name, mgr.last_name) AS manager FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employee mgr ON employee.manager_id = mgr.id`;

  connection.query(mysql, (err, rows) => {
      if (err) return console.log(err);
      console.table(rows);
      InquirerPrompt();
  });
};

addDepartments = () => {
  inquirer.prompt([
      {
          type: 'input',
          name: 'department',
          message: 'What department do you want to add?',
      }
  ])
      .then(answer => {
          const mysql = `INSERT INTO department (name) VALUES (?)`;
          connection.query(mysql, answer.department, (err, results) => {
              if (err) return console.log(err);
              console.log('Added' + answer.department + "to departments");

              showDepartments();
          });
      });
}

addRoles = () => {
  inquirer.prompt([
      {
          type: 'input',
          name: 'roles',
          message: "What do you want to add?",

      },
      {
          type: 'input',
          name: 'salary',
          message: 'What is your yearly salary?',
      }

  ])
      .then(answer => {
          const parameters = [answer.roles, answer.salary];
          const roles_var = `SELECT name, id FROM department`;

          connection.query(roles_var, (err, data) => {
              if (err) return console.log(err);
              const department_var = data.map(({ name, id }) => ({ name: name, value: id }));

              inquirer.prompt([
                  {
                      type: 'list',
                      name: 'department_var',
                      message: "What department is this role in?",
                      choices: department_var
                  }
              ])
                  .then(department_varChoice => {
                      const department_var = department_varChoice.department_var;
                      parameters.push(department_var);
                      const mysql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;

                      connection.query(mysql, parameters, (err, result) => {
                          if (err) return console.log(err);
                          console.log('Added' + answer.roles + "to roles");
                          showRoles();
                      });
                  });
          });
      });
};

addEmployees = ()  => {
  inquirer.prompt([
      {
          type: 'input',
          name: 'first_name',
          message: 'Your First Name?',
      },
      {
          type: 'input',
          name: 'last_name',
          message: 'Your Last Name?',
      }
  ])
  .then(answer => {
      const parameters = [answer.first_name, answer.last_name]
      const roles_var = `SELECT roles.id, roles.title FROM roles`;

      connection.query(roles_var, (err, data) => {
          if(err) return console.log(err);
          const roles = data.map(({ id, title }) => ({ name:title, value:id}));

          inquirer.prompt([
              {
                  type: 'list',
                  name: 'role',
                  message: 'What is your role?',
                  choices: roles
              }
          ])
          .then(rolesChoice => {
              const role = rolesChoice.roles;
              parameters.push(roles);

              showEmployees();

         })
      })
  })
}