
exports.up = function(knex, Promise) {
  return knex.schema.createTable('payment_details', function (table) {
    table.increments();
    table.integer('order_id').unique().unsigned().index().references('orders.id');
    table.boolean('credit').defaultTo(true);
    table.boolean('invoice').defaultTo(true);
    table.decimal('total');
    table.decimal('iva');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('payment_details');
};
