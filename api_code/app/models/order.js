const baseModel      = require('./base'),
      bookshelf      = require('bookshelf')(baseModel.knex),
      Person         = require('./person').Person,
      Address        = require('./address').Address,
      OrderControl   = require('./order_control').OrderControl,
      CouponControl   = require('./coupon_control').CouponControl,
      PaymentDetail  = require('./payment_detail.js').PaymentDetail;

let Order = bookshelf.Model.extend({
  tableName: 'orders',
  hasTimestamps: true,
  person: function() {
    return this.hasOne(Person);
  },
  address: function() {
    return this.hasOne(Address);
  },
  paymentDetail: function() {
    return this.hasOne(PaymentDetail);
  },
  orderControl: function() {
    return this.hasOne(OrderControl);
  },
  couponControl: function() {
    return this.hasOne(CouponControl);
  }
});

module.exports = {
  Order : Order
};
