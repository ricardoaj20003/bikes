
exports.up = function(knex, Promise) {
  return knex.schema.createTable('order_controls', function (table) {
    table.integer('order_id').unsigned().index().references('orders.id');
    table.integer('roundsman_id').unsigned().index().references('roundsman.id');
    table.integer('next_roundsman');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('order_controls');
};
