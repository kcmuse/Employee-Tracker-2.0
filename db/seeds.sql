USE employees_db;

INSERT INTO department (name)
VALUES
('Executive'),
('Finance'),
('Legal'),
('Advertising'),
('IT');

INSERT INTO role (title, salary, department_id)
VALUES
('El Presidente', 2000000, 1),
('El Vice Presidente', 1200000, 1),
('Finance Lead', 120000, 2),
('Accountant', 65000, 2),
('Head Legal', 500000, 3),
('Lawyer', 120000, 3),
('Legal Assistant', 60000, 3),
('Advertising Lead', 125000, 4),
('Advertising Assistant', 60000, 4),
('IT Head', 100000, 5),
('IT Helper', 75000, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
('Michael', 'Jordan', 1),
('LeBron', 'James', 2),
('Kevin', 'Durant', 3),
('Chris', 'Paul', 4),
('Steve', 'Nash', 5),
('Magic', 'Johnson', 6),
('Tony', 'Parker', 7),
('Tim', 'Duncan', 8),
('Tom', 'Brady', 9),
('Larry', 'Bird', 10),
('Jason', 'Luv', 11);
