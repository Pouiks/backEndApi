-- Revert meetMyPet:checks from pg

BEGIN;

ALTER TABLE animal 
    DROP CONSTRAINT "age";

COMMIT;