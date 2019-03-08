
exports.up = function(knex, Promise) {
  return knex.schema.createTable('facebook_conversation_logics', function (table) {
    table.increments();
    table.string('request');
    table.string('response');
    table.string('function_name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('facebook_conversation_logics');
};
