
exports.up = function(knex, Promise) {
  return knex.schema.createTable('persons', function (table) {
    table.increments();
    table.integer('order_id').unique().unsigned().index().references('orders.id');
    table.string('name');
    table.string('celular');
    table.string('email');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('persons');
};
