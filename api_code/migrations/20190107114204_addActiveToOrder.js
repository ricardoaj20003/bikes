
exports.up = function(knex, Promise) {
  return knex.schema.table('orders', table => {
    table.boolean('active').defaultTo(true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('orders', table => {
    table.dropColumn('active');
  });
};
