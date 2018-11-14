const baseModel = require('./base'),
      bookshelf = require('bookshelf')(baseModel.knex),
      Person    = require('./person').Person,
      Address   = require('./address').Address;

let Pedido = bookshelf.Model.extend({
  tableName: 'pedidos',
  hasTimestamps: true,
  person: function() {
    return this.hasOne(Person);
  },
  address: function() {
    return this.hasOne(Address);
  }
});

module.exports = {
  Pedido : Pedido
};
