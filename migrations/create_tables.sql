-- Deploy meetMyPet:create_tables to pg

BEGIN;

DROP TABLE IF EXISTS "user", "group", "message", "animal", "group_has_animal" CASCADE;

CREATE TABLE "user" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "first_name" VARCHAR NOT NULL,
    "city" VARCHAR NOT NULL,
    "address" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL UNIQUE,
    "password" VARCHAR NOT NULL,
    "latitude" FLOAT8 NULL,
    "longitude" FLOAT8 NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE "animal" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    specie VARCHAR NULL DEFAULT 'Chien', -- Ici pour une V2 on pourra avoir le choix entre plusieurs espèces 
    name VARCHAR NOT NULL,
    age INT NOT NULL,
    sex VARCHAR NOT NULL,
    description TEXT NOT NULL,
    breed VARCHAR NOT NULL,
    size VARCHAR NOT NULL,
    image VARCHAR UNIQUE, -- Ici, pas de not null, un utilisateur peut ne pas mettre de photo. En revanche, elle doit être unique.
    user_id INT REFERENCES "user"(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE "group" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    latitude FLOAT8 NOT NULL,
    longitude FLOAT8 NOT NULL,
    address VARCHAR NULL,
    city VARCHAR NOT NULL,
    country VARCHAR NOT NULL,
    description TEXT NOT NULL,
    created_by INT NOT NULL REFERENCES "animal"(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE "message"(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    content TEXT NOT NULL,
    send_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    send_to INT NOT NULL REFERENCES "group"(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

-- Cette table sera utile pour des futures statistiques. La gestion des autorisations se fera en front lors de la création du compte
-- CREATE TABLE "authorization" (
--     id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     cgu BOOLEAN NOT NULL DEFAULT FALSE,
--     cookies BOOLEAN NOT NULL DEFAULT FALSE,
--     localisation BOOLEAN NOT NULL DEFAULT FALSE,
--     user_id INT NOT NULL REFERENCES "user"(id),
--     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
--     updated_at TIMESTAMPTZ
-- );

CREATE TABLE "group_has_animal"(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    group_id INT NOT NULL REFERENCES "group"(id) ON DELETE CASCADE,
    animal_id INT NOT NULL REFERENCES "animal"(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

-- ALTER TABLE "user"
--     ADD "animal_id" INT REFERENCES "animal"(id);

-- ALTER TABLE "group"
--     ADD created_by INT NOT NULL REFERENCES "animal"(id);

ALTER TABLE "message"
    ADD send_by INT NOT NULL REFERENCES "animal"(id) ON DELETE CASCADE;

-- On ajoute ici le droit au propriétaire de la BDD adminmeetmypet d'avoir accès aux tables et non que postgres en soit propriétaire
GRANT ALL PRIVILEGES ON "user", "group", "message", "animal", "group_has_animal" TO adminmeetmypet;


COMMIT;