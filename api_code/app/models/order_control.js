const config = require('./base'),
      Pedido    = require('./person').Pedido,
      bookshelf = require('bookshelf')(config.knex);

let OrderControl = bookshelf.Model.extend({
  tableName: 'order_controls',
  hasTimestamps: true,
  idAttribute: 'order_id',
  pedido: function(){
    return this.belongsTo(Pedido);
  },
  roundsman: function(){
    let Roundsman  = require('./roundsman').Roundsman;
    return this.belongsTo(Roundsman);
  }
});

module.exports = {
  OrderControl : OrderControl
};
