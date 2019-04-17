const config = require('./base'),
      Pedido    = require('./order').Pedido,
      bookshelf = require('bookshelf')(config.knex);

let Address = bookshelf.Model.extend({
  tableName: 'addresses',
  hasTimestamps: true,
  order: function(){
    return this.belongsTo(Pedido);
  }
});

module.exports = {
  Address : Address
};
