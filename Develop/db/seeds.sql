USE employees_db;

INSERT INTO department (name)
VALUES  ("Finance"),
        ("Sales"),
        ("Legal"),
        ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES  ("Lawyer", 90000, 3),
        ("Legal Team Lead", 100000, 3),
        ("Sales Lead", 80000, 2),
        ("Salesperson", 70000, 2),
        ("Accountant", 80000, 1),
        ("Account Manager", 100000, 1),
        ("Marketing Manager", 90000, 4),
        ("Graphic Designer", 80000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("Jess", "James", 2, NULL),
        ("Robert", "Pan", 3, NULL),
        ("Allan", "Stevens", 6, NULL),
        ("Alison", "Jones", 7, NULL),
        ("Ian", "Brown", 1, 1),
       ("Mark", "Green", 4, 2),
       ("Shaun", "Short", 5, 3),
       ("May", "Best", 8, 4);



SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employees;
