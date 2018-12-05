const config = require('./base'),
      Pedido    = require('./person').Pedido,
      bookshelf = require('bookshelf')(config.knex);

let Person = bookshelf.Model.extend({
  tableName: 'persons',
  hasTimestamps: true,
  pedido: function(){
    return this.belongsTo(Pedido);
  }
});

module.exports = {
  Person : Person
};
