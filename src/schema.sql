CREATE TABLE users (
    id integer PRIMARY KEY AUTO_INCREMENT,
    userName VARCHAR(50),
    email VARCHAR(100)
);

INSERT INTO
    users (userName, email)
VALUES
    ('Luka Tenkes', 'luka.tenkes@gmail.com'),
    ('Boris Tenkes', 'boris.tenkes@gmail.com');