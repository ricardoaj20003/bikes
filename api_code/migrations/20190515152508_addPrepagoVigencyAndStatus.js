
exports.up = function(knex, Promise) {
  return knex.schema.table('users', table => {
    table.boolean('prepago_active').defaultTo(false);
    table.timestamp('prepago_start_at');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', table => {
    table.dropColumn('prepago_active');
    table.dropColumn('prepago_start_at');
  });
};
