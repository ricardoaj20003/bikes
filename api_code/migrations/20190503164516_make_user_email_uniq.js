
exports.up = function(knex, Promise) {
  return knex.schema.table('users', table => {
    table.unique('email');
    table.unique('username');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', table => {
    table.dropUnique('email');
    table.dropUnique('username');
  });
};
