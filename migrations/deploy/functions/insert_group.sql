-- Deploy meetmypet:functions/insert_group to pg

BEGIN;

-- Création d'un nouveau groupe

-- CREATE FUNCTION
-- 	new_group(
--         gnm varchar, 
--         glat float8, 
--         glgt float8, 
--         gads varchar, 
--         gcty varchar, 
--         gcnt varchar, 
--         gdsc text, 
--         gctr int
-- )
-- RETURNS void AS $$
-- INSERT INTO "group" (
--     name, 
--     latitude,
--     longitude,
--     address,
--     city,
--     country, 
--     description,
--     chatroom_id)
-- VALUES (
-- 	gnm, 
--     glat, 
--     glgt, 
--     gads, 
--     gcty, 
--     gcnt, 
--     gdsc, 
--     gctr
-- )
-- $$ LANGUAGE sql STRICT;

COMMIT;
