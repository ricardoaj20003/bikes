const config = require('./base'),
      Pedido    = require('./person').Pedido,
      bookshelf = require('bookshelf')(config.knex);

let Address = bookshelf.Model.extend({
  tableName: 'addresses',
  hasTimestamps: true,
  pedido: function(){
    return this.belongsTo(Pedido);
  }
});

module.exports = {
  Address : Address
};
