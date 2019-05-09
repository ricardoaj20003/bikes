
exports.up = function(knex, Promise) {
  return knex.schema.table('orders', table => {
    table.timestamp('start_at');
    table.timestamp('close_at');
    table.timestamp('cancel_at');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('orders', table => {
    table.dropColumn('start_at');
    table.dropColumn('close_at');
    table.dropColumn('cancel_at');
  });
};
