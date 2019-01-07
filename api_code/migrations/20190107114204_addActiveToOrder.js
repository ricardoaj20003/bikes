
exports.up = function(knex, Promise) {
  knex.schema.table('orders', table => {
    table.boolean('active').defaultTo(true);
  });
};

exports.down = function(knex, Promise) {
  knex.schema.table('orders', table => {
    table.dropColumn('active');
  });
};
