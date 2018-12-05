
exports.up = function(knex, Promise) {
  return knex.schema.createTable('conversation_codes', function (table) {
    table.increments();
    table.integer('roundsman_id').unique().unsigned().index().references('roundsman.id');
    table.string('message');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('conversation_codes');
};
