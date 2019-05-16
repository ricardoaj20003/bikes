INSERT INTO prepagos (price, orders)
       VALUES (1200.00, 60);

INSERT INTO prepagos (price, orders)
       VALUES (1500.00, 100);

UPDATE price_rates SET prepago_id = 1 WHERE id = 5;
UPDATE price_rates SET prepago_id = 2 WHERE id = 6;
