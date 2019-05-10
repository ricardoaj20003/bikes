
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('prepagos', function (table) {
      table.increments();
      table.decimal('price', 9, 2);
      table.decimal('orders', 6, 2);
      table.timestamps();
    }),
    knex.schema.table('price_rates', table => {
      table.integer('prepago_id').unsigned().index().references('prepagos.id');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('prepago_rates'),
    knex.schema.table('price_rates', table => {
      table.dropColumn('prepago_id');
    })
  ]); 
};
