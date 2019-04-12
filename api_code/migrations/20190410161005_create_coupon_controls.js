
exports.up = function(knex, Promise) {
  return knex.schema.createTable('coupon_controls', function (table) {
    table.increments();
    table.integer('order_id').unsigned().index().references('orders.id');
    table.integer('coupon_id').unsigned().index().references('coupons.id');
    table.integer('user_id').unsigned().index().references('users.id');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('coupon_controls');
};
