INSERT INTO coupons (code, limit_number, limit_date, function_name, discount_value, message_note, remove_message, created_at, updated_at)
       VALUES ('FREEDMA19', 100, '2019-04-30', 'apply_discount', 100, 'Pedido sin cobro', ' Precio:', current_timestamp, current_timestamp);

INSERT INTO coupons (code, limit_number, limit_date, function_name, discount_value, message_note, remove_message, created_at, updated_at)
       VALUES ('TOTESTNOVALID', -1, '2018-04-30', 'apply_discount', 100, 'Pedido sin cobro', ' Precio:', current_timestamp, current_timestamp);

INSERT INTO price_rates (distance, price, unit_price, unit_distance, created_at, updated_at)
       VALUES (6000.00, 35.00, 5.00, 1000, current_timestamp, current_timestamp);

INSERT INTO price_rates (distance, price, unit_price, unit_distance, created_at, updated_at)
       VALUES (15000.00, 35.00, 5.00, 1000, current_timestamp, current_timestamp);

INSERT INTO price_rates (distance, price, unit_price, unit_distance, created_at, updated_at)
       VALUES (15000.00, 30.00, 5.00, 1000, current_timestamp, current_timestamp);

UPDATE users SET price_rate_id = 1;
