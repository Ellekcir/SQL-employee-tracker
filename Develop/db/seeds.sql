USE employees ;

INSERT INTO department (name)
VALUES  ("Finance"),
        ("Sales"),
        ("Legal"),
        ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES  ( "Lawyer", 90000, 3),
        ( "Legal Team Lead", 100000, 3),
        ( "Sales Lead", 80000, 2),
        ( "Salesperson", 70000, 2),
        ( "Accountant", 80000, 1),
        ( "Account Manager", 100000, 1),
        ( "Marketing Manager", 90000, 4),
        ( "Graphic Designer", 80000, 4);

-- Insert mananger with NULL work down the page for sequence numbers
-- INSERT INTO employees (first_name, last_name, role_id, manager_id)
-- VALUES  ("Marie", "Black", 8, NULL),
--         ("Jason", "White", 5, NULL);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Ian", "Brown", 1, NULL),
       ("Jess", "Red", 2, 1),
       ("Robert", "Orange", 3, 2),
       ("Mark", "Yellow", 4, NULL),
       ("Shaun", "Green", 5, NULL),
       ("Allan", "Blue", 6, 3),
       ("Alison", "Purple", 7, 4),
       ("May", "Pink", 8, NULL);



SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employees;


-- INSERT INTO departments (employees_id, dep_title, dep_role)
-- VALUES (1, "Finance"),
--        (2, "I'm gonna make him an offer you can't refuse, watch this movie"),
--        (1, "Scar is the lion everyone loves to hate"),
--        (3, "Ten years of ballet and three years of tap to join a gang in this neighborhood"),
--        (5, "The tin man gave a metallic, hollow performance"),
--        (1, "Hakuna matata"),
--        (5, "Those flying monkeys are nightmare fuel!");
       
