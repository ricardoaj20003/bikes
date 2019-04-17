const config = require('./base'),
      Pedido    = require('./order').Pedido,
      bookshelf = require('bookshelf')(config.knex);

let PaymentDetail = bookshelf.Model.extend({
  tableName: 'payment_details',
  hasTimestamps: true,
  pedido: function(){
    return this.belongsTo(Pedido);
  },
  couponControl: function(){
    let CouponControl = require('./coupon_control').CouponControl;
    return this.belongsTo(CouponControl);
  }
});

module.exports = {
  PaymentDetail : PaymentDetail
};
