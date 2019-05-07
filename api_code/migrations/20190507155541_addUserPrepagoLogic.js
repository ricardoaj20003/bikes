
exports.up = function(knex, Promise) {
  return knex.schema.table('price_rates', table => {
    table.boolean('prepago').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('price_rates', table => {
    table.dropColumn('prepago');
  });
};
