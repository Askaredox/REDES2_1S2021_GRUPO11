CREATE DATABASE IF NOT EXISTS P4Redes;
USE P4Redes;

DROP TABLE IF EXISTS Reporte;
DROP TABLE IF EXISTS Estudiante;

CREATE TABLE Estudiante(
    ID_estudiante int NOT NULL AUTO_INCREMENT,
    carnet int NOT NULL,
    nombre varchar(64) NOT NULL,
    curso varchar(128) NOT NULL,

    PRIMARY KEY(ID_estudiante)
);

CREATE TABLE Reporte(
    ID_reporte int NOT NULL AUTO_INCREMENT,
    mensaje varchar(256) NOT NULL,
    procesado varchar(16) NOT NULL,
    fecha date NOT NULL,
    estudiante int NOT NULL,

    PRIMARY KEY(ID_reporte),
    FOREIGN KEY(estudiante) REFERENCES Estudiante(ID_estudiante)
);
