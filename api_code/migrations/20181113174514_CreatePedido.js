
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pedidos', function (table) {
    table.increments();
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pedidos');
};
