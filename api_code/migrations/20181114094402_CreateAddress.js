
exports.up = function(knex, Promise) {
  return knex.schema.createTable('addresses', function (table) {
    table.increments();
    table.integer('order_id').unique().unsigned().index().references('orders.id');
    table.text('references_notes');
    table.string('origin');
    table.string('destination');
    table.decimal('distance');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('addresses');
};
