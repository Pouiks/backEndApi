-- Deploy meetMyPet:checks to pg

BEGIN;

ALTER TABLE "animal" 
    ADD CONSTRAINT "age" CHECK (age > 0);


-- On ajoute ici la possibilité au propriétaire de la BDD adminmeetmypet d'avoir accès aux tables et non que postgres en soit propriétaire
GRANT ALL PRIVILEGES ON "animal" TO adminmeetmypet;

COMMIT;