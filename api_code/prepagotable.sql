INSERT INTO prepagos (price, orders)
       VALUES (500.00, 25);

INSERT INTO prepagos (price, orders)
       VALUES (900.00, 60);

UPDATE price_rates SET prepago_id = 1 WHERE id = 5;
UPDATE price_rates SET prepago_id = 2 WHERE id = 6;
