
exports.up = function(knex, Promise) {
  return knex.schema.table('orders', table => {
    table.timestamp('start_at');
    table.timestamp('close_at');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('orders', table => {
    table.dropTimestamps('start_at')
    table.dropTimestamps('close_at')
  });
};
