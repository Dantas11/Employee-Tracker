USE employee_db ;

INSERT INTO department (name)
VALUES ('Design'), 
       ('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES ('Design Director', 90000, 1), 
       ('Web Designer', 50000, 1), 
       ('Print Designer', 40000, 1), 
       ('Creative Director', 80000, 2), 
       ('Marketing Manager', 70000, 2), 
       ('Social Media Specialist', 40000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Thiago', 'Dantas', 1, NULL), 
       ('Fernanda', 'Sambudio', 4, NULL), 
       ('Renato', 'Cruz', 5, 1);

