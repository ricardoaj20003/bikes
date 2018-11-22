const config = require('./base'),
      Pedido    = require('./person').Pedido,
      bookshelf = require('bookshelf')(config.knex);

let PaymentDetail = bookshelf.Model.extend({
  tableName: 'payment_details',
  hasTimestamps: true,
  pedido: function(){
    return this.belongsTo(Pedido);
  }
});

module.exports = {
  PaymentDetail : PaymentDetail
};
