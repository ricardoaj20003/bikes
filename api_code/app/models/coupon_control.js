const config = require('./base'),
      bookshelf = require('bookshelf')(config.knex);

let CouponControl = bookshelf.Model.extend({
  tableName: 'coupon_controls',
  hasTimestamps: true,
  idAttribute: null,
  order : function() {
    let Order = require('./order').Order;
    return this.belongsTo(Order);
  },
  coupon : function() {
    let Coupon = require('./coupon').Coupon;
    return this.belongsTo(Coupon);
  },
  user : function() {
    let User = require('./user').User;
    return this.belongsTo(User);
  },
  couponObject: function(){
    return this.coupon()
      .where({id: this.attributes.coupon_id}).fetch();
  },
  orderObject: function(){
    return this.order()
      .where({id: this.attributes.order_id}).fetch({withRelated: ['address', 'person', 'paymentDetail']});
  },
});

module.exports = {
  CouponControl : CouponControl
};