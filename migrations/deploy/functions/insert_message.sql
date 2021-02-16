-- Deploy meetmypet:function/insert_message to pg

BEGIN;

-- Création d'un nouveau message

-- CREATE FUNCTION
-- 	new_message(
--         mcnt text, 
--         msndat timestampz, 
--         msndto int
--         )
-- RETURNS void AS $$
-- INSERT INTO "message" (
--     content,
--     send_at,
--     send_to)
-- VALUES (
-- 	mcnt, 
--     msndat, 
--     msndto
-- );
-- $$ LANGUAGE sql STRICT;

COMMIT;
