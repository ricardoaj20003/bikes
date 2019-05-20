
exports.up = function(knex, Promise) {
  return knex.schema.table('payment_details', table => {
    table.decimal('extraCost');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('payment_details', table => {
    table.dropColumn('extraCost');
  });
};