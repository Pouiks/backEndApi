-- Deploy meetmypet:functions/insert_user to pg

BEGIN;

-- Création d'un nouveau compte utilisateur

-- CREATE FUNCTION
-- 	new_user(
--         ufstn varchar, 
--         ucty varchar, 
--         uads varchar, 
--         uemail varchar,
--         upsw varchar)
-- RETURNS void AS $$
-- INSERT INTO "user" (
--     first_name VARCHAR NOT NULL,
--     city VARCHAR NOT NULL,
--     address VARCHAR NOT NULL,
--     email VARCHAR NOT NULL UNIQUE,
--     password VARCHAR)
-- VALUES (
-- 	ufstn, 
--     ucty, 
--     uads, 
--     uemail,
--     upsw
-- );
-- $$ LANGUAGE sql STRICT;
CREATE FUNCTION insert_user(juser json) 
RETURNS "user"
AS $$
	INSERT INTO "user"(first_name, city, address, email, password)
    VALUES (
        (juser->>'first_name')::VARCHAR,
        (juser->>'city')::VARCHAR,
        (juser->>'address')::VARCHAR,
        (juser->>'email')::VARCHAR,
        (juser->>'password')::VARCHAR        
        )
	RETURNING *
$$ LANGUAGE SQL STRICT;

COMMIT;
