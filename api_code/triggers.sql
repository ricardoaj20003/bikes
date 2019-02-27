CREATE OR REPLACE FUNCTION assignNextRoundsman()
RETURNS trigger AS
$BODY$
DECLARE
last_roundsman INTEGER;
next_roundsman INTEGER;
BEGIN
  SELECT order_controls.next_roundsman INTO last_roundsman FROM order_controls WHERE created_at NOTNULL ORDER BY created_at DESC LIMIT 1;
  IF last_roundsman ISNULL THEN
    SELECT id INTO last_roundsman FROM roundsman ORDER BY ID ASC LIMIT 1;
  END IF;
  NEW.roundsman_id = last_roundsman;
  IF EXISTS (SELECT id FROM roundsman WHERE id > last_roundsman) THEN
    SELECT id INTO next_roundsman FROM roundsman WHERE id > last_roundsman ORDER BY id ASC LIMIT 1;
  ELSE
    SELECT id INTO next_roundsman FROM roundsman ORDER BY ID ASC LIMIT 1;
  END IF;
  NEW.next_roundsman = next_roundsman;
  RETURN NEW;
END;
$BODY$
LANGUAGE plpgsql

CREATE TRIGGER assing_next_roundsman
BEFORE INSERT
ON order_controls
FOR EACH ROW
  EXECUTE PROCEDURE assignNextRoundsman();
