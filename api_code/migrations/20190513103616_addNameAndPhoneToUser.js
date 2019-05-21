
exports.up = function(knex, Promise) {
  return knex.schema.table('users', table => {
    table.string('phone');
    table.string('name');
    table.boolean('is_admin').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', table => {
    table.dropColumn('phone');
    table.dropColumn('name');
    table.dropColumn('is_admin');
  });
};
