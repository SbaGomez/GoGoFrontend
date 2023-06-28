SELECT * FROM AUTO;
SELECT * FROM USER;
SELECT * FROM VIAJE;
SELECT * FROM UBICACION;

insert into user (id,apellido,clave,dni,edad,email,nombre,sexo,auto_id) values(1, 'Gomez', '$2a$10$rBvRfl/7A0ZoAIaQ4ICY/eyGb9q9kpzP5rCYbnhQYdIdYyY2ciEDq', 39164065, 27, 'sgomez@uade.edu.ar', 'Sebastian', 'M', 1);
insert into user (id,apellido,clave,dni,edad,email,nombre,sexo,auto_id) values(2, 'Loreti', '$2a$10$rBvRfl/7A0ZoAIaQ4ICY/eyGb9q9kpzP5rCYbnhQYdIdYyY2ciEDq', 42589652, 21, 'gloreti@uade.edu.ar', 'Giuliano', 'M', null);

insert into auto values (1, 'Gris Oscuro', 'Ford', 'Focus', 'AB765AG');

insert into ubicacion values(1,'Villa Gesell');
insert into ubicacion values(2,'Madariaga');
insert into ubicacion values(3,'Pinamar');
insert into ubicacion values(4,'Mar de las Pampas');
insert into ubicacion values(5,'UADE');