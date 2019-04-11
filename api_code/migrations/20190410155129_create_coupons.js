
exports.up = function(knex, Promise) {
  return knex.schema.createTable('coupons', function (table) {
    table.increments();
    table.string('code');
    table.integer('limit_number');
    table.date('limit_date');
    table.string('function_name');
    table.decimal('discount_value', 5, 2);
    table.string('message_note');
    table.string('remove_message');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('coupons');
};
