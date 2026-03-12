CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    PASSWORD VARCHAR(255) NOT NULL
);

INSERT INTO
    users (userName, name, email, PASSWORD)
VALUES
    ('Luka Tenkes', 'luka.tenkes@gmail.com'),
    ('Boris Tenkes', 'boris.tenkes@gmail.com');