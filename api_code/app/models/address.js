const config = require('./base'),
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
