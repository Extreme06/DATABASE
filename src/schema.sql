CREATE TABLE users (
    id integer PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100)
);

INSERT INTO
    users (first_name, last_name, email)
VALUES
    ('Luka', 'Tenkes', 'luka.tenkes@gmail.com'),
    ('Boris', 'Tenkes', 'boris.tenkes@gmail.com');