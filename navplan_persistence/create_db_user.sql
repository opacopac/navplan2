CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
--CREATE USER 'username'@'%' IDENTIFIED BY 'password';

GRANT SELECT, INSERT, UPDATE, DELETE ON tschanz_navplan.* TO 'username'@'localhost';
--GRANT ALL PRIVILEGES ON * . * TO 'username'@'%';

FLUSH PRIVILEGES;
