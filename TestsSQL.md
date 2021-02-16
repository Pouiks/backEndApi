- récupérer tous les groupes d'un animal
-> passer dans le WHERE à la place de group_has_animal.animal_id l'id de l'animal recherché.
SELECT "group".id, "group".name, "group".description FROM "animal" JOIN "group_has_animal" ON animal.id = $1 JOIN "group" ON group_has_animal.group_id = "group".id GROUP BY "group".id;


- récupérer tous les animaux d'un groupe 
-> passer dans le WHERE à la place de group_has_animal.group_id l'id du groupe recherché.

SELECT "animal".id AS animal_id, "animal".name, "group".id FROM "animal", "group_has_animal", "group" WHERE "group".id = group_has_animal.group_id GROUP BY "animal".id, "group".id;

<!-- SELECT "animal".id AS animal_id, "animal".name, "group".id FROM "animal", "group_has_animal", "group" WHERE "group".id = 13 GROUP BY "animal".id, "group".id; -->

- récupérer tous les messages d'un groupe
-> passer dans le WHERE à la place de group_id l'id du groupe recherché.

SELECT animal.id, animal.name, message.id, message.content, message.send_at FROM "message" JOIN "group" ON message.send_to = "group".id JOIN "animal" ON message.send_by = animal.id GROUP BY animal.id, message.id ORDER BY message.send_at DESC;

- Insertion de données dans la table message
insert into MESSAGE (content, send_to, send_by) values ('Lena', 13, 2);
insert into MESSAGE (content, send_to, send_by) values ('Gracie', 14, 3);
insert into MESSAGE (content, send_to, send_by) values ('Agnola', 14, 4);