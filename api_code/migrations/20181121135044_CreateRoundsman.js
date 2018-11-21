
exports.up = function(knex, Promise) {
  return knex.schema.createTable('roundsman', function (table) {
    table.increments();
    table.integer('orders_id').unique().unsigned().index().references('orders.id');
    table.string('name');
    table.string('celular');
    table.string('zone_code');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('roundsman');
};
