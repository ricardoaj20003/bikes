
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('price_rates', function (table) {
      table.increments();
      table.decimal('distance', 7, 2);
      table.decimal('price', 5, 2);
      table.decimal('unit_price', 5, 2);
      table.decimal('unit_distance', 7, 2);
      table.timestamps();
    }),
    knex.schema.table('users', table => {
      table.integer('price_rate_id').unsigned().index().references('price_rates.id');
    }),
    knex.schema.table('orders', table => {
      table.integer('user_id').unsigned().index().references('users.id');
    }),
    knex.schema.table('payment_details', table => {
      table.integer('coupon_control_id').unsigned().index().references('coupon_controls.id');
    }),
    knex.schema.table('coupon_controls', table => {
      table.dropColumn('user_id');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', table => {
      table.dropColumn('price_rate_id');
    }),
    knex.schema.dropTable('price_rates'),
    knex.schema.table('orders', table => {
      table.dropColumn('user_id');
    }),
    knex.schema.table('payment_details', table => {
      table.dropColumn('coupon_control_id');
    }),
    knex.schema.table('coupon_controls', table => {
      table.integer('user_id').unsigned().index().references('users.id');
    })
  ]);
};
