-- Deploy meetMyPet:checks to pg

BEGIN;

ALTER TABLE animal 
    ADD CONSTRAINT "age" CHECK (age > 0);

COMMIT;