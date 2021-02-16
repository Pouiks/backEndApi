-- Deploy meetMyPet:create_tables to pg

BEGIN;

-- DROP TABLE "user" CASCADE;
-- DROP TABLE "group" CASCADE;
-- DROP TABLE "message"CASCADE;
-- DROP TABLE "animal" CASCADE;
-- DROP TABLE "list" CASCADE;

-- CREATE TABLE "user" (
--     id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     first_name VARCHAR NOT NULL,
--     city VARCHAR NOT NULL,
--     address VARCHAR,
--     email VARCHAR NOT NULL UNIQUE,
--     address VARCHAR NOT NULL,
--     password VARCHAR NOT NULL,
--     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
--     updated_at TIMESTAMPTZ
-- );

-- CREATE TABLE "group" (
--     id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     name VARCHAR NOT NULL,
--     latitude FLOAT8 NOT NULL,
--     longitude FLOAT8 NOT NULL,
--     address VARCHAR NULL,
--     city VARCHAR NOT NULL,
--     country VARCHAR NOT NULL,
--     description TEXT NOT NULL,
--     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
--     updated_at TIMESTAMPTZ
-- );

-- CREATE TABLE "message"(
--     id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     content TEXT NOT NULL,
--     send_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
--     send_to INT NOT NULL REFERENCES "group"(id),
--     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
--     updated_at TIMESTAMPTZ
-- );

-- CREATE TABLE animal (
--     id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     specie VARCHAR NOT NULL DEFAULT 'Chien', -- Ici le DEFAULT est pour la V1, en V2 en le supprimera. 
--     name VARCHAR NOT NULL,
--     age INT NOT NULL,
--     sex VARCHAR NOT NULL,
--     description TEXT NOT NULL,
--     breed VARCHAR NOT NULL,
--     image VARCHAR UNIQUE,
--     size VARCHAR NOT NULL,
--     user_id INT REFERENCES "user"(id),
--     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
--     updated_at TIMESTAMPTZ
-- );

-- CREATE TABLE "list"(
--     id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     chatroom_id INT NOT NULL REFERENCES "group"(id),
--     animal_id INT NOT NULL REFERENCES animal(id),
--     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
--     updated_at TIMESTAMPTZ
-- );

-- -- ALTER TABLE "user"
--    -- ADD animal_id INT REFERENCES "animal"(id); 

-- ALTER TABLE "group"
--     ADD created_by INT NOT NULL REFERENCES animal(id); -- NE PAS mettre en UNIQUE : l'animal peut créer plusieurs groupes 

-- ALTER TABLE "message"
--     ADD send_by INT NOT NULL REFERENCES animal(id);

COMMIT;