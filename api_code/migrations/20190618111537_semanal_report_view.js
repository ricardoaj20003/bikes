
exports.up = function(knex, Promise) {
  return knex.raw(`
      CREATE OR REPLACE VIEW reporte_semanal AS 
        SELECT to_char(orders.created_at, 'MM/DD/YYYY') as dia, to_char(orders.created_at, 'HH:MI:SS') as hora, roundsman.name as mensajero, CONCAT(distance, ' Km') as distancia, references_notes as notas, 
        origin as origen, destination as destino, persons.name as para, persons.celular as telefono_contacto, credit as credito, total, (total * 0.65) as comision FROM orders 
        INNER JOIN addresses ON addresses.order_id = orders.id
        INNER JOIN persons ON persons.order_id = orders.id
        INNER JOIN payment_details ON payment_details.order_id = orders.id
        INNER JOIN order_controls ON order_controls.order_id = orders.id
        INNER JOIN roundsman ON roundsman.id = order_controls.roundsman_id
        WHERE orders.created_at > current_date - interval '7 days';
  `);
};

exports.down = function(knex, Promise) {
  return knex.raw('DROP VIEW "reporte_semanal";');
};
