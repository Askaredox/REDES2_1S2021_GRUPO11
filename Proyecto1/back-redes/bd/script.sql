
drop database nicte;
CREATE DATABASE IF NOT EXISTS nicte;
USE nicte;

create table asistencia(
	id int NOT NULL AUTO_INCREMENT,
    carnet int NOT NULL,
    nombre varchar(64) NOT NULL,
    nombreEvento varchar(128) NOT NULL,
    idEvento int NOT NULL,
    imagen LONGBLOB not NULL,
    PRIMARY KEY(id)

);

insert into asistencia (carnet, nombre, nombreEvento, idEvento, imagen) values (2001002, 'Estudiante 2', "Conferencia sa", 2,"asdfasdfsdfds");
select *from asistencia;
select nombreEvento, idEvento, imagen from asistencia where carnet = 2000;
