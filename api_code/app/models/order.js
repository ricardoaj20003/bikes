const baseModel      = require('./base'),
      bookshelf      = require('bookshelf')(baseModel.knex),
      Person         = require('./person').Person,
      Address        = require('./address').Address,
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
  }
});

module.exports = {
  Order : Order
};
