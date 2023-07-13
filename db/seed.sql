
INSERT INTO department (name)
VALUES  
("Marketing"),
("Accounting"),
("Customer Service"),
("Tech Support"),
("HR"),
("Management");


INSERT INTO role (title, salary, department_id)
VALUES
("Marketing Employee", 75000, 1),
("Accounting Employee", 90000, 2),
("Customer Service Employee", 60000, 3),
("Tech Support Employee", 82000, 4),
("HR Employee", 71000, 5),
("Management Employee", 97000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Tyler", "Underwood", 2, 6),
("Adam", "Sandler", 1, 6),
("Chris", "Rock", 5,6),
("Emma", "Watson", 4, 6),
("Morgan", "Freeman", 3, 6),
("Elon", "Musk", 6, NULL);