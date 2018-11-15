const config = require('./base'),
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
